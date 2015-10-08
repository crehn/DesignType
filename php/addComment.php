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
        $log->info("add comment by [$name] to gabe [$pageId]");
        $mysqli = connectToDb();

        insertComment($mysqli, $pageId, $name, $email, $comment);
        writeNotificationEmail($pageId, $name, $email, $comment);
        writeHtml($name, $email, $comment);
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
            $log->error("Prepare for insert failed: ({$mysqli->errno}) {$mysqli->error}");
            error500();
        }
        
        if (!$stmt->bind_param("sssi", $name, $email, $comment, $pageId)) {
            $log->error("Binding parameters failed: ({$mysqli->errno}) {$mysqli->error}");
            error500();
        }
        
        if (!$stmt->execute()) {
            $log->error("Execute failed: ({$mysqli->errno}) {$mysqli->error}");
            error500();
        }
    } finally {
        $stmt->close();
    }
}

function writeHtml($name, $email, $comment) {
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
    $to = MAILRECIPIENTS;
    $subject = "[design-types.net] $name wrote a comment";
    $message = "New comment for page with id: $pageId \r\n\r\nContent:\r\n $comment";
    $headers = "From: email@design-types.net\r\n" .
               "Reply-To: email@design-types.net\r\n" .
               'X-Mailer: PHP/' . phpversion();
    
    mail($to, $subject, $message, $headers);
}

addComment();
?>
