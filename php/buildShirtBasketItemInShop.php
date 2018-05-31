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
const PRODUCT_TYPE_ID = "6"; // 6=Men's T-Shirt; 812=Men’s Premium T-Shirt; 813=Women’s Premium T-Shirt; 631=Women's T-Shirt
const PRINT_TYPE_ID = "2"; // 14=Flex Print (smooth); 17=Digital-direct printing
const PRINT_COLOR_IDs = "13,20";
const PRODUCT_TYPE_APPEARANCE_ID = "2"; // 1
const PRODUCT_TYPE_PRINT_AREA_ID = "4";
const USER_AGENT = "User-Agent: DesignTypesWebsite/1.0 (http://design-types.net; email@design-types.net)";
    
function buildShirt() {
    global $log;
    
    $ukey = getHttpPostData('ukey');
    $log->debug("create shirt image for ukey: " . $ukey);
    
    // build the shirt design
    $designId = buildShirtDesign($ukey);
    
    // build the product
    $product = buildIndividualShirtProduct($designId);
    
    // build the basket with item and return checkout link
    $shirtsize = getHttpPostData('shirt_size');
    $shirtcolor = getHttpPostData('shirt_color');
    //$shipcountry = getHttpPostData('ship_country');
    $checkoutUrl = buildBasket($product, $shirtsize, $shirtcolor);

    $log->debug("##### T-shirt checkout was triggered for ukey: " . $ukey . "#####");
    
    echo json_encode($checkoutUrl);
}


function buildShirtDesign($nameResultImg) {
    global $log;
    
    //### 1. Create design entity via data api
    
    $designUrl = SHOP_URL . "/designs";
    $log->debug("### send design description to our shop designs: " . $designUrl);
    $header = array();
    $header[] = createSprdAuthHeader("POST", $designUrl);
    $header[] = "Content-Type: application/xml";
 
    $designXml = new SimpleXMLElement(getFileData(PATH_SHIRTDESIGN_XML));
    $designXml->size->width = SHIRT_WIDTH;
    $designXml->size->height = SHIRT_HEIGHT;
    $log->debug("enriched design xml: \n" . $designXml->asXML());
 
    // Initialize handle and set options
    $curlHandle = curl_init($designUrl);
    curl_setopt($curlHandle, CURLOPT_POST, true);
    curl_setopt($curlHandle, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $header);
    curl_setopt($curlHandle, CURLOPT_USERAGENT, USER_AGENT);
    curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $designXml->asXML());
    curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlHandle, CURLOPT_HEADER, true);
    $result = curl_exec($curlHandle);
    // Close the handle
    curl_close($curlHandle);
 
    $dataUrl = parseHttpHeaders($result, "Location");
 
    //$log->debug("#Phase 1) Result: " . $result);
    $log->info("#Phase 1) Design URL: " . $dataUrl);
    $designId = substr (strrchr ($dataUrl, "/"), 1);
    $log->debug("Design-Id: " . $designId);


    //### 2. Fetch design data to retrieve upload url
    $log->debug("### fetch design data for upload url");
    $header = array();
    $header[] = createSprdAuthHeader("GET", $dataUrl);

    $curlHandle = curl_init($dataUrl);
    curl_setopt($curlHandle, CURLOPT_HTTPGET, true);
    curl_setopt($curlHandle, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($curlHandle, CURLOPT_USERAGENT, USER_AGENT);
    curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlHandle, CURLOPT_HEADER, true); // changed to true
    curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $header); //added
    //curl_setopt($curlHandle, CURLOPT_VERBOSE, true); // just for better output
    //curl_setopt($curlHandle, CURLINFO_HEADER_OUT, true); // just for better output
    $result = curl_exec($curlHandle);
    //$log->debug(curl_getinfo($curlHandle, CURLINFO_HEADER_OUT)); // added
    // Close the handle
    curl_close($curlHandle);
    
    $log->debug("#Phase 2) Result: " . $result);
 
    $start = strpos($result, "resource xlink:href=\"")+21;
    $end = strpos($result, "\"", $start);
    $imageUrl = substr($result, $start, $end-$start);
 
    $log->info("#Phase 2) Image URL: " . $imageUrl);
 
 
    //### 3. Upload design data via image API
    $log->debug("### upload image");
    $imageData = getFileData("./shirtorders/" . $nameResultImg . ".png");
 
    $header = array();
    $header[] = createSprdAuthHeader("PUT", $imageUrl);
    $header[] = "Content-Type: image/png";
 
    $curlHandle = curl_init($imageUrl."?method=PUT");
    curl_setopt($curlHandle, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($curlHandle, CURLOPT_USERAGENT, USER_AGENT);
    curl_setopt($curlHandle, CURLOPT_POST, true);
    curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $header);
    curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $imageData);
    curl_setopt($curlHandle, CURLOPT_HEADER, true);
    curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlHandle, CURLOPT_ENCODING, '');
    $result = curl_exec($curlHandle);
    curl_close($curlHandle);
 
    $log->debug("#Phase 3) Result: " . $result);
    
    return $designId;
}

 
function buildIndividualShirtProduct($designId) {
    global $log;
    
    // ### now configure the shop
    // 1. Get shop data
    $shop = getShop();
    $namespaces = $shop->getNamespaces(true);
 
    // 2. Get product type data
    $log->debug("### get product type data");

    $attributes = $shop->productTypes->attributes($namespaces['xlink']);
    $productTypeUrl = $attributes->href . "/" . PRODUCT_TYPE_ID;
    $log->info("ProductTypeUrl: " . $productTypeUrl);

    $header = array();
    $header[] = createSprdAuthHeader("GET", $productTypeUrl);

    $curlHandle = curl_init($productTypeUrl);
    curl_setopt($curlHandle, CURLOPT_HTTPGET, true);
    curl_setopt($curlHandle, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($curlHandle, CURLOPT_USERAGENT, USER_AGENT);
    curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlHandle, CURLOPT_HEADER, false);
    curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $header);
    $result = curl_exec($curlHandle);
    // Close the handle
    curl_close($curlHandle);

// $log->debug("#Phase 2) Result: " . $result);
  
    $productType = new SimpleXMLElement($result);
 
    // 3. Get design data
    $log->debug("### get design data");    
    $attributes = $shop->designs->attributes($namespaces['xlink']);
    $designUrl = $attributes->href . "/" . $designId;
    $log->info("#Phase 3) Design-Url: " . $designUrl);

    $header = array();
    $header[] = createSprdAuthHeader("GET", $designUrl);

    $curlHandle = curl_init($designUrl);
    curl_setopt($curlHandle, CURLOPT_HTTPGET, true);
    curl_setopt($curlHandle, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($curlHandle, CURLOPT_USERAGENT, USER_AGENT);
    curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlHandle, CURLOPT_HEADER, false);
    curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $header);
    $result = curl_exec($curlHandle);
    // Close the handle
    curl_close($curlHandle);
 
    $log->debug("#Phase 3) Result: " . $result);
  
    $design = new SimpleXMLElement($result);
 
    // 4. Prepare product
    $log->debug("### prepare product");     
    // get positioning data for selected product type
    $printArea = null;
    foreach ($productType->printAreas->printArea as $current) {
        if ($current['id'] == PRODUCT_TYPE_PRINT_AREA_ID) {
            $printArea = $current;
            $log->debug("found print area with id: " . PRODUCT_TYPE_PRINT_AREA_ID);           
        }
    }
 
    $product = new SimpleXMLElement(getFileData(PATH_PRODUCTCONFIG_XML));
    $image['designId'] = $designId;

    $log->debug("#Phase 4) Product: as xml: " . $product->asXML());

    // 5. Create product
    $log->debug("### create product");     
    $attributes = $shop->products->attributes($namespaces['xlink']);
    $productsUrl = $attributes->href;
 
    $header = array();
    $header[] = createSprdAuthHeader("POST", $productsUrl);
    $header[] = "Content-Type: application/xml";
 
    $curlHandle = curl_init($productsUrl);
    curl_setopt($curlHandle, CURLOPT_POST, true);
    curl_setopt($curlHandle, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($curlHandle, CURLOPT_USERAGENT, USER_AGENT);
    curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $header);
    curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $product->asXML());
    curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlHandle, CURLOPT_HEADER, true);
    $result = curl_exec($curlHandle);
    // Close the handle
    curl_close($curlHandle);
 
    //$log->debug("#Phase 5) Result 1: " . $result);
 
    $productUrl = parseHttpHeaders($result, "Location");

    $header = array();
    $header[] = createSprdAuthHeader("GET", $productUrl);

    $curlHandle = curl_init($productUrl);
    curl_setopt($curlHandle, CURLOPT_HTTPGET, true);
    curl_setopt($curlHandle, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($curlHandle, CURLOPT_USERAGENT, USER_AGENT);
    curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $header);
    curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlHandle, CURLOPT_HEADER, false);
    $result = curl_exec($curlHandle);
    // Close the handle
    curl_close($curlHandle);

    $log->debug("#Phase 5) Result 2: " . $result);
 
    $product = new SimpleXMLElement($result);
    $resource = $product->resources->resource[0];
    $attributes = $resource->attributes($namespaces['xlink']);
 
    $log->info("Product available at: " . $productUrl);
    //$log->info("Product viewable at: " . $attributes->href . '?width=1000");

    return $product;
}

function buildBasket($product, $shirtsize, $shirtcolor) {
    global $log;
    
    $log->debug("### start basket...");
    
    $shop = getShop();
    $namespaces = $shop->getNamespaces(true);
    
    $productId = $product['id'];
    $prodAttributes = $product->attributes($namespaces['xlink']);
    $productUrl = $prodAttributes->href;
    $log->debug("product url: " . $productUrl);
    $log->debug("product user: " . $product->user->asXML());
    
    //$attributes = $shop->articles->attributes($namespaces['xlink']);
    //$articlesUrl = $attributes->href;
    
     // 5. Create basket
    $basket = new SimpleXMLElement(getFileData(PATH_BASKET_XML));
    //$basket->user['id'] = $product->user['id'];
    $prodUserAttributes = $product->user->attributes($namespaces['xlink']);
    $log->debug("# prod user href: " . $prodUserAttributes->href);    
    $userAttributes = $basket->user->attributes($namespaces['xlink']);
    //$userAttributes->href = "http://api.spreadshirt.net/v1/users/" . $product->user['id'];
    
    $log->debug("# Phase 5 basket: " . $basket->asXML());
    
    $basketItem = new SimpleXMLElement(getFileData(PATH_BASKETITEM_XML));
    $itemAttributes = $basketItem->element->attributes($namespaces['xlink']);
    $itemAttributes->href = $productUrl;
    $basketItem->element['id'] = $productId;
    
    $basketItem->element->properties->property[0] = $shirtcolor;
    $basketItem->element->properties->property[1] = $shirtsize;

    $attributes = $shop->baskets->attributes($namespaces['xlink']);
    $basketsUrl = $attributes->href;
    $log->debug("# baskets url: " . $basketsUrl);    

    $header = array();
    $header[] = createSprdAuthHeader("POST", $basketsUrl);
    $header[] = "Content-Type: application/xml";

    $curlHandle = curl_init($basketsUrl);
    curl_setopt($curlHandle, CURLOPT_POST, true);
    curl_setopt($curlHandle, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($curlHandle, CURLOPT_USERAGENT, USER_AGENT);
    curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $header);
    curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $basket->asXML());
    curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlHandle, CURLOPT_HEADER, true);
    $result = curl_exec($curlHandle);
    // Close the handle
    curl_close($curlHandle);

    $basketUrl = parseHttpHeaders($result, "Location");
    
    $log->debug("# Phase 5 basket item: " . $basketItem->asXML());

    // 6. Create basket item
    $basketItemsUrl = $basketUrl . "/items";

    $header = array();
    $header[] = createSprdAuthHeader("POST", $basketItemsUrl);
    $header[] = "Content-Type: application/xml";

    $curlHandle = curl_init($basketItemsUrl);
    curl_setopt($curlHandle, CURLOPT_POST, true);
    curl_setopt($curlHandle, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($curlHandle, CURLOPT_USERAGENT, USER_AGENT);
    curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $header);
    curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $basketItem->asXML());
    curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlHandle, CURLOPT_HEADER, true);
    $result = curl_exec($curlHandle);
    // Close the handle
    curl_close($curlHandle);

    // 7. Get checkout url
    $basketCheckoutUrl = $basketUrl . "/checkout";

    $header = array();
    $header[] = createSprdAuthHeader("GET", $basketCheckoutUrl);
    $header[] = "Content-Type: application/xml";

    $curlHandle = curl_init($basketCheckoutUrl);
    curl_setopt($curlHandle, CURLOPT_HTTPGET, true);
    curl_setopt($curlHandle, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($curlHandle, CURLOPT_USERAGENT, USER_AGENT);
    curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $header);
    curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlHandle, CURLOPT_HEADER, false);
    $result = curl_exec($curlHandle);
    // Close the handle
    curl_close($curlHandle);

    $checkoutRef = new SimpleXMLElement($result);
    $log->debug("# Phase 7 checkout: " . $checkoutRef->asXML());    
    
    $refAttributes = $checkoutRef->attributes($namespaces['xlink']);
    $checkoutUrl = $refAttributes->href;
    
    $log->info("# Phase 7 checkout url: " . $checkoutUrl);  
    
    return $checkoutUrl;   
}

function getShop() {
    global $log;
    $log->debug("# get shop data");
    $header = array();
    $header[] = createSprdAuthHeader("GET", SHOP_URL);

    $curlHandle = curl_init(SHOP_URL);
    curl_setopt($curlHandle, CURLOPT_HTTPGET, true);
    curl_setopt($curlHandle, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($curlHandle, CURLOPT_USERAGENT, USER_AGENT);
    curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlHandle, CURLOPT_HEADER, false);
    curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $header);
    $result = curl_exec($curlHandle);
    // Close the handle
    curl_close($curlHandle);
 
    $log->debug("shop result infos: " . $result);
 
    $shop = new SimpleXMLElement($result);
    
    return $shop;
}

buildShirt();
 
?>