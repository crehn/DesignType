<?php
require_once('Logger.php');
require_once('config.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

const MAX_COMMENTS = 20;

function loadComments() {
    global $log;
    try {  
        $pageId = $_GET['pageId'];
        $log->info("load comments for page [$pageId]");
        $mysqli = connectToDb();
        $stmt = executeSelect($mysqli, DB_TABLEPREFIX, $pageId);
        $result = constructResult($stmt);
        $sortedResult = array_reverse($result); // newest comments first
        echo json_encode($sortedResult);
    } finally {
        $stmt->close();
        $mysqli->close();
    }
}

function connectToDb() {
    global $log;
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    if ($mysqli->connect_errno) {
        $log->error("Failed to connect to database: ({$mysqli->connect_errno}) {$mysqli->connect_error}");
        error500();
    }
    return $mysqli;
}

function executeSelect($mysqli, $tableprefix, $pageId) {
    global $log;
    
    $tablenameCmt = $tableprefix . "Comments";
    $selectStement = "SELECT name, email, comment, date FROM $tablenameCmt WHERE id_post = ? ORDER BY id DESC LIMIT " . MAX_COMMENTS;
    $log->debug($selectStement);

    if (!($stmt = $mysqli->prepare($selectStement))) {
        $log->error("Prepare for select failed: ({$mysqli->errno}) {$mysqli->error}");
        error500();
    }

    if (!$stmt->bind_param("i", $pageId)) {
        $log->error("Binding parameters failed: ({$mysqli->errno}) {$mysqli->error}");
        error500();
    }

    if (!$stmt->execute()) {
        $log->error("Execute failed: ({$mysqli->errno}) {$mysqli->error}");
        error500();
    }
    return $stmt;
}

function error500() {
    global $log;
    header("HTTP/1.0 500 Internal Server Error");
    die("Cannot load comments; requestId: " . $log->getRequestId());
}

function constructResult($stmt) {
    global $log;
    
    $result;
    $index = 0;
    $stmt->bind_result($name, $email, $comment, $date);
    while ($stmt->fetch()) {
        $log->debug("found comment by [$name] at [$date]");
        $result[$index] = array($name, gravatarUrl($email), $comment, $date); //TODO: use a proper object rather than encoding by array index
        $index++;
    }
    return $result;
}

function gravatarUrl($email) {
    // https://fr.gravatar.com/site/implement/images/php/
    $default = "mm";
    $size = 35;
    return "http://www.gravatar.com/avatar/".md5(strtolower(trim($email)))."?d=".$default."&s=".$size;
}

loadComments();
?>
