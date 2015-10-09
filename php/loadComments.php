<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

const MAX_COMMENTS = 20;

function loadComments($pageId) {
    global $log;
    try {  
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

function executeSelect($mysqli, $tableprefix, $pageId) {
    global $log;
    
    $tablenameCmt = $tableprefix . "Comments";
    $selectStement = "SELECT name, email, comment, date FROM $tablenameCmt WHERE id_post = ? ORDER BY id DESC LIMIT " . MAX_COMMENTS;
    $log->debug($selectStement);

    if (!($stmt = $mysqli->prepare($selectStement))) {
        error500("Prepare for select failed: ({$mysqli->errno}) {$mysqli->error}");
    }

    if (!$stmt->bind_param("i", $pageId)) {
        error500("Binding parameters failed: ({$mysqli->errno}) {$mysqli->error}");
    }

    if (!$stmt->execute()) {
        error500("Execute failed: ({$mysqli->errno}) {$mysqli->error}");
    }
    return $stmt;
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

loadComments($_GET['pageId']);
?>
