<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

const MAX_COMMENTS = 100; //TODO: maybe use paging

function main() {
    if (!array_key_exists('pageId', $_GET)) {
        error400("Query parameter missing: pageId");
    }
    loadComments($_GET['pageId']);
}

function loadComments($pageId) {
    global $log;
    try {  
        $log->info("load comments for page [$pageId]");
        $mysqli = connectToDb();
        $stmt = executeSelect($mysqli, DB_TABLEPREFIX, $pageId);
        $result = constructResult($stmt);
        $sortedResult = array_reverse($result); // newest comments first
        echo json_encode($sortedResult);
        $count = count($sortedResult);
        $log->info("finished loading [$count] comments on page [$pageId]");
    } finally {
        $stmt->close();
        $mysqli->close();
    }
}

function executeSelect($mysqli, $tableprefix, $pageId) {
    global $log;
    
    $tablenameCmt = $tableprefix . "Comments";
    $selectStement = "SELECT name, email, comment, date FROM $tablenameCmt WHERE pageId = ? ORDER BY id DESC LIMIT " . MAX_COMMENTS;
    $log->debug($selectStement);

    if (!($stmt = $mysqli->prepare($selectStement))) {
        error500("Prepare for select failed: ({$mysqli->errno}) {$mysqli->error}");
    }

    if (!$stmt->bind_param("s", $pageId)) {
        error500("Binding parameters failed: ({$mysqli->errno}) {$mysqli->error}");
    }

    if (!$stmt->execute()) {
        error500("Execute failed: ({$mysqli->errno}) {$mysqli->error}");
    }
    return $stmt;
}

function constructResult($stmt) {
    global $log;
    
    $result = array();
    $stmt->bind_result($name, $email, $text, $timestamp);
    while ($stmt->fetch()) {
        $log->debug("found comment by [$name] at [$timestamp]");
        $result[] = array(
            'name' => $name, 
            'avatar' => gravatarUrl($email), 
            'text' => $text, 
            'timestamp' => $timestamp
        );
    }
    return $result;
}

main();
?>
