<?php
require_once('inc/config.php');

function connectToDb() {
    global $log;
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    if ($mysqli->connect_errno) {
        error500("Failed to connect to database: ({$mysqli->connect_errno}) {$mysqli->connect_error}");
    }
    return $mysqli;
}

function getHttpPostData($key) {
    //TODO: add proper sanitization
    $result = $_POST[$key];
    if ($result == null) {
        error400("missing POST data: $key");
    }    
    return $result;
}

function error400($detail) {
    global $log;
    $log->warn("bad request: $detail");
    error(400, 'Bad Request', $detail);
}

function error($status, $description, $detail, $type = null) {
    global $log;
    header("HTTP/1.0 $status $description");
    
    $errorDetails = array(
        'status' => $status,
        'title' => $description,
        'detail' => $detail,
        'requestId' => $log->getRequestId()
    );
    
    if ($type != null) {
        $errorDetails['type'] = $type;
    }
  
    die(json_encode($errorDetails, JSON_UNESCAPED_SLASHES));
}

function error409($type, $detail) {
    global $log;
    $log->warn("conflict: $detail");
    error(409, 'Conflict', $detail, $type);
}

function error500($logmessage) {
    global $log;
    $log->error($logmessage);
    $noDetailsForClient = null;
    error(500, 'Internal Server Error', $noDetailsForClient); 
}

function gravatarUrl($email) {
    global $log;
    $log->debug("generating gravatar url for [$email]");
    // https://fr.gravatar.com/site/implement/images/php/
    $default = "mm";
    $size = 35;
    return "http://www.gravatar.com/avatar/".md5(strtolower(trim($email)))."?d=$default&s=$size";
}

function error_handler($severity, $message, $file, $line, $context) {
    global $log;
    switch($severity) {
        case E_ERROR:
        case E_PARSE:
        case E_CORE_ERROR:
        case E_COMPILE_ERROR:
        case E_USER_ERROR:
            $log->error(severityToString($severity) . " $message in $file:$line", json_encode($context));
            break;
        default:
            $log->warn(severityToString($severity) . " $message in $file:$line");
            break;
    }
    return true;
}

function severityToString($severity) {
    switch($severity) {
        case E_ERROR: // 1 // 
            return 'E_ERROR'; 
        case E_WARNING: // 2 // 
            return 'E_WARNING'; 
        case E_PARSE: // 4 // 
            return 'E_PARSE'; 
        case E_NOTICE: // 8 // 
            return 'E_NOTICE'; 
        case E_CORE_ERROR: // 16 // 
            return 'E_CORE_ERROR'; 
        case E_CORE_WARNING: // 32 // 
            return 'E_CORE_WARNING'; 
        case E_COMPILE_ERROR: // 64 // 
            return 'E_COMPILE_ERROR'; 
        case E_COMPILE_WARNING: // 128 // 
            return 'E_COMPILE_WARNING'; 
        case E_USER_ERROR: // 256 // 
            return 'E_USER_ERROR'; 
        case E_USER_WARNING: // 512 // 
            return 'E_USER_WARNING'; 
        case E_USER_NOTICE: // 1024 // 
            return 'E_USER_NOTICE'; 
        case E_STRICT: // 2048 // 
            return 'E_STRICT'; 
        case E_RECOVERABLE_ERROR: // 4096 // 
            return 'E_RECOVERABLE_ERROR'; 
        case E_DEPRECATED: // 8192 // 
            return 'E_DEPRECATED'; 
        case E_USER_DEPRECATED: // 16384 // 
            return 'E_USER_DEPRECATED'; 
    }
    return "unknown error type: $type";
}
set_error_handler("error_handler");
date_default_timezone_set('Europe/Berlin');
header('Content-Type: application/json'); // default
?>
