<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');
require_once('inc/spreadshirthelper.php');


$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

// common constants
const SHIRT_WIDTH = "261.937";
const SHIRT_HEIGHT = "378.354";
const PATH_SHIRTDESIGN_XML = "./shirtconfig/shirtdesign.xml";
const PATH_PRODUCTCONFIG_XML = "./shirtconfig/productconfig.xml";
const PATH_BASKET_XML = "./shirtconfig/basket.xml";
const PATH_BASKETITEM_XML = "./shirtconfig/basketitem.xml";
const PRINT_TYPE_ID = "2"; // 14=Flex Print (smooth); 17=Digital-direct printing
const PRINT_COLOR_IDs = "13,20";
const PRODUCT_TYPE_APPEARANCE_ID = "2"; // 1
const PRODUCT_TYPE_PRINT_AREA_ID_MALE = "4";
const PRODUCT_TYPE_PRINT_AREA_ID_FEMALE = "1280";
const PRODUCT_TYPE_ID_MALE = "6";
const PRODUCT_TYPE_ID_FEMALE = "631";
const GENDER_MALE = "male";
const GENDER_FEMALE = "female";


function buildShirt() {
    global $log;

    $ukey = getHttpPostData('ukey');
    $shirtsize = getHttpPostData('shirt_size');
    $shirtcolor = getHttpPostData('shirt_color');
    $shirtgender = getHttpPostData('shirt_gender');
    $log->debug("shirt order for ukey: " . $ukey . "; size: " . $shirtsize . "; color: " . $shirtcolor . "; gender: " . $shirtgender);
    // 6=Men's T-Shirt; 812=Men’s Premium T-Shirt; 813=Women’s Premium T-Shirt; 631=Women's T-Shirt
    $product_type_id = PRODUCT_TYPE_ID_MALE;
    if ($shirtgender == GENDER_FEMALE) {
        $product_type_id = PRODUCT_TYPE_ID_FEMALE;
        $log->debug("shirt order is for female - reconfigure to product type with id: " . $product_type_id);
    }

    // just for test purposes (e.g. using postman) to create an valid api key
    if (DEBUG) {
        $testurl = "https://api.spreadshirt.net/api/v1/shops/1111559/productTypes/631";
        $testapikey = createSprdAuthHeader("GET", $testurl);
        $log->debug("api key for url: " . $testurl . "\n is: " . $testapikey);
    }

    $log->debug("create shirt image for ukey: " . $ukey);

    // build the shirt design
    $designId = buildShirtDesign($ukey);

    // build the product
    $product = buildIndividualShirtProduct($designId, $product_type_id);

    // build the basket with item and return checkout link
    $checkoutUrl = buildBasket($product, $shirtsize, $shirtcolor);

    $log->debug("##### T-shirt checkout was triggered for ukey: " . $ukey . "#####");
    
    echo json_encode($checkoutUrl);
}


function buildShirtDesign($nameResultImg) {
    global $log;
    
    //### 1. Create design entity via data api
    $designUrl = SHOP_URL . "/designs";
    $log->info("#buildShirtDesign: Step 1: send design specification to our shop designs: " . $designUrl);
 
    $designXml = new SimpleXMLElement(getFileData(PATH_SHIRTDESIGN_XML));
    $designXml->size->width = SHIRT_WIDTH;
    $designXml->size->height = SHIRT_HEIGHT;
    $log->debug("enriched design xml: \n" . $designXml->asXML());
 
    // do the HTTP call
    $curlHandle = curl_init($designUrl);
    setPOSTCurlOptions($curlHandle, $designUrl, "application/xml", $designXml->asXML(), true);
    $result = curl_exec($curlHandle);
    curl_close($curlHandle);
    //$log->debug("#buildShirtDesign: Step 1: Result: " . $result);

    $dataUrl = parseHttpHeaders($result, "Location");
    $designId = substr (strrchr ($dataUrl, "/"), 1);
    $log->info("#buildShirtDesign: Step 1: from result xml parsed Design ID: " . $designId . " and Design URL: " . $dataUrl);

    //### 2. Fetch design data to retrieve upload url
    $log->info("#buildShirtDesign: Step 2: request upload url by using GET request on Design URL: " . $dataUrl);
    // do the HTTP call
    $curlHandle = curl_init($dataUrl);
    setGETCurlOptions($curlHandle, $dataUrl, true);
    $result = curl_exec($curlHandle);
    //$log->debug(curl_getinfo($curlHandle, CURLINFO_HEADER_OUT)); // added
    curl_close($curlHandle);
    $log->debug("#buildShirtDesign: Step 2: Result: " . $result);

    $start = strpos($result, "resource xlink:href=\"")+21;
    $end = strpos($result, "\"", $start);
    $imageUploadUrl = substr($result, $start, $end-$start);
 
    $log->info("#buildShirtDesign: Step 2: got image upload URL: " . $imageUploadUrl);

    //### 3. Upload design data via image API
    $imageFilePath = "./shirtorders/" . $nameResultImg . ".png";
    $log->info("#buildShirtDesign: Step 3: upload image: " . $imageFilePath);
    $imageData = getFileData($imageFilePath);
    // do the HTTP call
    $curlHandle = curl_init($imageUploadUrl . "?method=PUT");
    setPUTPOSTCurlOptions($curlHandle, $imageUploadUrl, "image/png", $imageData, true);
    curl_setopt($curlHandle, CURLOPT_ENCODING, '');
    $result = curl_exec($curlHandle);
    curl_close($curlHandle);
    $log->debug("#buildShirtDesign: Step 3: uploaded Image - Result: " . $result);

    return $designId;
}

 
function buildIndividualShirtProduct($designId, $product_type_id) {
    global $log;
    
    $log->debug("#buildIndividualShirtProduct: Step 1: get product type data");
    // get shop data
    $shop = getShop();
    $namespaces = $shop->getNamespaces(true);
    $attributes = $shop->productTypes->attributes($namespaces['xlink']);
    $productTypeUrl = $attributes->href . "/" . $product_type_id;
    $log->info("#buildIndividualShirtProduct: Step 1: url of product type: " . $productTypeUrl);

    // do the HTTP call
    $curlHandle = curl_init($productTypeUrl);
    setGETCurlOptions($curlHandle, $productTypeUrl, false);
    $result = curl_exec($curlHandle);
    curl_close($curlHandle);
    $log->debug("#buildIndividualShirtProduct: Step 1: result is product type spec as xml: " . $result);

    $productType = new SimpleXMLElement($result);

    $attributes = $shop->designs->attributes($namespaces['xlink']);
    $designUrl = $attributes->href . "/" . $designId;
    $log->info("#buildIndividualShirtProduct: Step 2: load design spec from url: " . $designUrl);

    // do the HTTP call
    $curlHandle = curl_init($designUrl);
    setGETCurlOptions($curlHandle, $designUrl, false);
    $result = curl_exec($curlHandle);
    curl_close($curlHandle);
    $log->debug("#buildIndividualShirtProduct: Step 2: result is design spec as xml: " . $result);

    $design = new SimpleXMLElement($result);
 
    $log->info("#buildIndividualShirtProduct: Step 3: prepare product (find right print area and build product spec)");
    // get positioning data for selected product type
    $printArea = null;
    foreach ($productType->printAreas->printArea as $current) {
        //$log->debug("current print area: " . var_dump($current));
        if ($current['id'] == PRODUCT_TYPE_PRINT_AREA_ID_MALE) {
            $printArea = $current;
            $log->debug("#buildIndividualShirtProduct: Step 3: found print area for male shirts with id: " . PRODUCT_TYPE_PRINT_AREA_ID_MALE);
            break;
        }
        if ($current['id'] == PRODUCT_TYPE_PRINT_AREA_ID_FEMALE) {
            $printArea = $current;
            $log->debug("#buildIndividualShirtProduct: Step 3: found print area for female shirts with id: " . PRODUCT_TYPE_PRINT_AREA_ID_FEMALE);
            break;
        }
    }
 
    $product = new SimpleXMLElement(getFileData(PATH_PRODUCTCONFIG_XML));
    // set product type id
    $product->productType['id'] = $product_type_id;
    // set printArea
    $product->configurations->configuration[0]->printArea['id'] = $printArea['id'];
    // set female offset
    if ($product_type_id == PRODUCT_TYPE_ID_FEMALE) {
        $product->configurations->configuration[0]->offset->x = "50.0";
    }
    // set right design id
    $imageElement = $product->configurations->configuration[0]->content->svg->image;
    //$log->debug("#buildIndividualShirtProduct: Step 3: image element within xml: " . $imageElement->asXML());
    $imageElement['designId'] = $designId;
    $log->debug("#buildIndividualShirtProduct: Step 3: product spec (extended by design id) as xml: " . $product->asXML());

    $attributes = $shop->products->attributes($namespaces['xlink']);
    $productsUrl = $attributes->href;
    $log->info("#buildIndividualShirtProduct: Step 3: create product using product url: " . $productsUrl);

    // do the HTTP call
    $curlHandle = curl_init($productsUrl);
    setPOSTCurlOptions($curlHandle, $productsUrl, "application/xml", $product->asXML(), true);
    $result = curl_exec($curlHandle);
    curl_close($curlHandle);
    $log->debug("#buildIndividualShirtProduct: Step 3: product created with result: " . $result);

    $productUrl = parseHttpHeaders($result, "Location");
    $log->debug("#buildIndividualShirtProduct: Step 4: load product spec from url: " . $productUrl);
    // do the HTTP call
    $curlHandle = curl_init($productUrl);
    setGETCurlOptions($curlHandle, $productUrl, false);
    $result = curl_exec($curlHandle);
    curl_close($curlHandle);
    $log->debug("#buildIndividualShirtProduct: Step 4: loaded product spec: " . $result);

    $product = new SimpleXMLElement($result);
    $resource = $product->resources->resource[0];
    $attributes = $resource->attributes($namespaces['xlink']);
    $log->debug("#buildIndividualShirtProduct: Step 4: product viewable at: " . $attributes->href . "?width=1000");

    return $product;
}

function buildBasket($product, $shirtsize, $shirtcolor) {
    global $log;
    
    $log->info("#buildBasket: Step 1: build basket.");

    $shop = getShop();
    $namespaces = $shop->getNamespaces(true);
    
    $productId = $product['id'];
    $prodAttributes = $product->attributes($namespaces['xlink']);
    $productUrl = $prodAttributes->href;
    $log->debug("#buildBasket: Step 1: use product url: " . $productUrl . " and user: " . $product->user->asXML());
    //$attributes = $shop->articles->attributes($namespaces['xlink']); //$articlesUrl = $attributes->href;
    // load basket xml template
    $basket = new SimpleXMLElement(getFileData(PATH_BASKET_XML));
    //$basket->user['id'] = $product->user['id'];
    $prodUserAttributes = $product->user->attributes($namespaces['xlink']);
    $log->debug("#buildBasket: Step 1: prod user href: " . $prodUserAttributes->href);
    //$userAttributes = $basket->user->attributes($namespaces['xlink']);
    //$userAttributes->href = "http://api.spreadshirt.net/v1/users/" . $product->user['id'];
    $log->debug("#buildBasket: Step 1: current basket: " . $basket->asXML());

    // load basket item and manipulate it
    $basketItem = new SimpleXMLElement(getFileData(PATH_BASKETITEM_XML));
    $itemAttributes = $basketItem->element->attributes($namespaces['xlink']);
    $itemAttributes->href = $productUrl;
    $basketItem->element['id'] = $productId;
    $basketItem->element->properties->property[0] = $shirtcolor;
    $basketItem->element->properties->property[1] = $shirtsize;
    $attributes = $shop->baskets->attributes($namespaces['xlink']);
    $basketsUrl = $attributes->href;
    $log->debug("#buildBasket: Step 1: baskets url: " . $basketsUrl);

    // do the HTTP call
    $curlHandle = curl_init($basketsUrl);
    setPOSTCurlOptions($curlHandle, $basketsUrl, "application/xml", $basket->asXML(), true); // true mandatory/needed
    $result = curl_exec($curlHandle);
    curl_close($curlHandle);
    $basketUrl = parseHttpHeaders($result, "Location");
    $log->debug("#buildBasket: Step 2: basket created at url: " . $basketUrl);

    // create basket item
    $basketItemsUrl = $basketUrl . "/items";
    $log->debug("#buildBasket: Step 3: create basket item using url: " . $basketItemsUrl . " and item as xml: " . $basketItem->asXML());
    // do the HTTP call
    $curlHandle = curl_init($basketItemsUrl);
    setPOSTCurlOptions($curlHandle, $basketItemsUrl, "application/xml", $basketItem->asXML(), false);
    $result = curl_exec($curlHandle);
    curl_close($curlHandle);
    $log->debug("#buildBasket: Step 3: created basket: " . $result);

    $basketCheckoutUrl = $basketUrl . "/checkout";
    $log->debug("#buildBasket: Step 4: get checkout url using: " . $basketCheckoutUrl);
    // do the HTTP call
    $curlHandle = curl_init($basketCheckoutUrl);
    setGETCurlOptions($curlHandle, $basketCheckoutUrl, false);
    $result = curl_exec($curlHandle);
    curl_close($curlHandle);
    $log->debug("#buildBasket: Step 4: result of call: " . $result);

    $checkoutRef = new SimpleXMLElement($result);
    $refAttributes = $checkoutRef->attributes($namespaces['xlink']);
    $checkoutUrl = $refAttributes->href;
    $log->info("#buildBasket: Step 4: checkout url: " . $checkoutUrl);
    
    return $checkoutUrl;   
}

function getShop() {
    global $log;
    $log->debug("#getShop: get shop data");

    // do the HTTP call
    $curlHandle = curl_init(SHOP_URL);
    setGETCurlOptions($curlHandle, SHOP_URL, false);
    $result = curl_exec($curlHandle);
    curl_close($curlHandle);

    $log->debug("getShop: shop result infos: " . $result);
    $shop = new SimpleXMLElement($result);
    
    return $shop;
}

buildShirt();
 
?>