<?php
require_once('inc/config.php');

function connectToDb() {
    global $log;
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    if ($mysqli->connect_errno) {
        $log->error("Failed to connect to database: ({$mysqli->connect_errno}) {$mysqli->connect_error}");
        error500();
    }
    return $mysqli;
}

function error500() {
    global $log;
    header("HTTP/1.0 500 Internal Server Error");
    
    $errorDetails = array(
        'status' => 500,
        'description' => 'Internal Server Error',
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

header('Content-Type: application/json');
?>
