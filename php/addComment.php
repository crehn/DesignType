<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function addComment() {
    $pageId = htmlentities($_POST['pageId']);
    $name = htmlentities($_POST['name']);
    if(strlen($name) <= '1'){ $name = 'Guest';}
    $email = htmlentities($_POST['email']);
    $comment = htmlentities($_POST['comment']);
    doAddComment($pageId, $name, $email, $comment);
}

function doAddComment($pageId, $name, $email, $comment) {
    global $log;
    try {
        $log->info("add comment by [$name] to page [$pageId]");
        $mysqli = connectToDb();

        insertComment($mysqli, $pageId, $name, $email, $comment);
        writeNotificationEmail($pageId, $name, $email, $comment);
        writeHtml($name, $email, $comment);
        $log->info("finished adding comment by [$name] to page [$pageId]");
    } finally {
        $mysqli->close();
    }
}

function insertComment($mysqli, $pageId, $name, $email, $comment) {
    global $log;
    try {    
        $tablenameCmt = DB_TABLEPREFIX . "Comments";
        $insertStatement = "INSERT INTO $tablenameCmt (name, email, comment, id_post) VALUES (?, ?, ?, ?)";
        $log->debug($insertStatement);
        if (!($stmt = $mysqli->prepare($insertStatement))) {
            error500("Prepare for insert failed: ({$mysqli->errno}) {$mysqli->error}");
        }
        
        if (!$stmt->bind_param("sssi", $name, $email, $comment, $pageId)) {
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

function writeHtml($name, $email, $comment) {
    header('Content-Type: text/html');
?>
    <div class="cmt-cnt">
        <img src="<?php echo gravatarUrl($email); ?>" alt="" />
        <div class="thecom">
            <h5><?php echo $name; ?></h5><span  class="com-dt"><?php echo date('Y-m-d H:i'); ?></span>
            <br/>
            <p><?php echo $comment; ?></p>
        </div>
    </div>
<?php     
}

function writeNotificationEmail($pageId, $name, $email, $comment) {
    global $log;
    $to = MAILRECIPIENTS;
    $subject = "[design-types.net] $name wrote a comment";
    $message = "New comment for page with id: $pageId \r\n\r\nContent:\r\n $comment";
    $message = wordwrap($message, 70, "\r\n");
    $headers = "From: email@design-types.net\r\n" .
               "Reply-To: email@design-types.net\r\n" .
               'X-Mailer: PHP/' . phpversion();
    
    if (!mail($to, $subject, $message, $headers)) {
        $log->error("could not send notification email");
    }
    $log->debug("sent notification email");
}

addComment();
?>
