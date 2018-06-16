<?php
require_once('config.php');

    const SHOP_ID = "1111559";
    const SHOP_URL = "https://api.spreadshirt.net/api/v1/shops/" . SHOP_ID;
    const USER_AGENT = "User-Agent: DesignTypesWebsite/1.0 (http://design-types.net; email@design-types.net)";
    const POST = 1;
    const GET = 2;

    function createSprdAuthHeader($method, $url) {
        $apiKey = SHOP_API_KEY;
        $secret = SHOP_PWD;
        $time = time()*1000;
 
        $data = "$method $url $time";
        $sig = sha1("$data $secret");
 
        return "Authorization: SprdAuth apiKey=\"$apiKey\", data=\"$data\", sig=\"$sig\"";
    }
 
    function parseHttpHeaders( $header, $headername ) {
        $retVal = array();
        $fields = explode("\r\n", preg_replace('/\x0D\x0A[\x09\x20]+/', ' ', $header));
        foreach( $fields as $field ) {
            if( preg_match('/('.$headername.'): (.+)/m', $field, $match) ) {
                return $match[2];
            }
        }
        return $retVal;
    }
 
    function getFileData($file) {
        $fp = fopen($file, "r");
        $data = "";
        while(!feof($fp)) {
            $data .= fgets($fp, 1024);
        }
        fclose($fp);
        return $data;
    }

    function setGETCurlOptions(&$curlHandle, $headerurl, $getReturnHeader) {
        // set default opts
        $curlHandle = setDefaultCurlOptions($curlHandle, $getReturnHeader);

        // set GET specifics
        curl_setopt($curlHandle, CURLOPT_HTTPGET, true);
        $header = array();
        $header[] = createSprdAuthHeader("GET", $headerurl);
        curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $header);

        return $curlHandle;
    }

    function setPOSTCurlOptions(&$curlHandle, $headerurl, $contenttype, $postFields, $getReturnHeader) {
        // set default opts
        $curlHandle = setDefaultCurlOptions($curlHandle, $getReturnHeader);

        // set POST specifics
        curl_setopt($curlHandle, CURLOPT_POST, true);
        curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $postFields);
        $header = array();
        $header[] = createSprdAuthHeader("POST", $headerurl);
        $header[] = "Content-Type: " . $contenttype;
        curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $header);

        return $curlHandle;
    }

    function setPUTPOSTCurlOptions(&$curlHandle, $headerurl, $contenttype, $postFields, $getReturnHeader) {
        // set default opts
        $curlHandle = setDefaultCurlOptions($curlHandle, $getReturnHeader);

        // set PUT specifics
        curl_setopt($curlHandle, CURLOPT_POST, true);
        curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $postFields);
        $header = array();
        $header[] = createSprdAuthHeader("PUT", $headerurl);
        $header[] = "Content-Type: " . $contenttype;
        curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $header);

        return $curlHandle;
    }

    function setDefaultCurlOptions(&$curlHandle, $getReturnHeader) {
        $header = array();
        curl_setopt($curlHandle, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($curlHandle, CURLOPT_USERAGENT, USER_AGENT);
        curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
        //curl_setopt($curlHandle, CURLOPT_VERBOSE, true); // just for better output
        //curl_setopt($curlHandle, CURLINFO_HEADER_OUT, true); // just for better output
        if ($getReturnHeader) {
            curl_setopt($curlHandle, CURLOPT_HEADER, true);
        }
        return $curlHandle;
    }
?>