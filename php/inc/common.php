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

function error500($logmessage = 'an error occured') {
    global $log;
    $log->error($logmessage);
    header('HTTP/1.0 500 Internal Server Error');
    header('Content-Type: application/problem+json');
    
    $errorDetails = array(
        'status' => 500,
        'title' => 'Internal Server Error',
        'requestId' => $log->getRequestId()
    );
    
    die(json_encode($errorDetails));
}

function gravatarUrl($email) {
    // https://fr.gravatar.com/site/implement/images/php/
    $default = "mm";
    $size = 35;
    return "http://www.gravatar.com/avatar/".md5(strtolower(trim($email)))."?d=$default&s=$size";
}

header('Content-Type: application/json'); // default
?>
