<?php
require_once('config.php');

    const SHOP_ID = "1111559";
    const SHOP_URL = "http://api.spreadshirt.net/api/v1/shops/" . SHOP_ID;
    
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
?>