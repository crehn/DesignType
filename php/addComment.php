<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function main() {
    if (!array_key_exists('pageId', $_GET)) {
        error400("Query parameter missing: pageId");
    }
    
    $pageId = htmlentities($_GET['pageId']);
    $comment = json_decode(getRequestBody());
    addComment($pageId, sanitize($comment));
}

function getRequestBody() {
    return file_get_contents('php://input');
}

function sanitize($comment) {
    $comment->name = htmlentities($comment->name);
    if(strlen($comment->name) <= '1'){ $comment->name = 'Guest';}
    $comment->email = htmlentities($comment->email);
    $comment->text = htmlentities($comment->text);
    return $comment;
}

function addComment($pageId, $comment) {
    global $log;
    try {
        $log->info("add comment by [{$comment->name}] to page [$pageId]");
        $mysqli = connectToDb();

        insertComment($mysqli, $pageId, $comment);
        writeNotificationEmail($pageId, $comment);
        $result = buildResult($comment);
        echo json_encode($result);
        $log->info("finished adding comment by [{$comment->name}] to page [$pageId]");
    } finally {
        $mysqli->close();
    }
}

function insertComment($mysqli, $pageId, $comment) {
    global $log;
    try {    
        $tablenameCmt = DB_TABLEPREFIX . "Comments";
        $insertStatement = "INSERT INTO $tablenameCmt (name, email, comment, id_post) VALUES (?, ?, ?, ?)";
        $log->debug($insertStatement);
        if (!($stmt = $mysqli->prepare($insertStatement))) {
            error500("Prepare for insert failed: ({$mysqli->errno}) {$mysqli->error}");
        }
        
        if (!$stmt->bind_param("sssi", $comment->name, $comment->email, $comment->text, $pageId)) {
            error500("Binding parameters failed: ({$mysqli->errno}) {$mysqli->error}");
        }
        
        if (!$stmt->execute()) {
            error500("Execute failed: ({$mysqli->errno}) {$mysqli->error}");
        }
        $log->debug("inserted comment with id [{$stmt->insert_id}]");
    } finally {
        $stmt->close();
    }
}

function buildResult($comment) {
    return array(
        'name' => $comment->name,
        'avatar' => gravatarUrl($comment->email), 
        'email' => $comment->email,
        'timestamp' => date(DATE_ATOM),
        'text' => $comment->text
    );
}

function writeNotificationEmail($pageId, $comment) {
    global $log;
    $to = MAILRECIPIENTS;
    $subject = "[design-types.net] {$comment->name} wrote a comment";
    $message = "New comment for page with id: $pageId \r\n\r\nContent:\r\n" . replaceLineBreaks($comment->text);
    $message = wordwrap($message, 70, "\r\n");
    $headers = "From: email@design-types.net\r\n" .
               "Reply-To: email@design-types.net\r\n" .
               'X-Mailer: PHP/' . phpversion();
    
    if (!mail($to, $subject, $message, $headers)) {
        $log->error("could not send notification email");
    }
    $log->debug("sent notification email");
}

function replaceLineBreaks($text) {
    return str_replace('[br]', "\n", $text);
}

main();
?>
