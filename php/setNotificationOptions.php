<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function main() {
    $options = json_decode(getRequestBody());
    writeNotificationEmail($options);
    echo json_encode(array('result' => 'ok'));
}

function getRequestBody() {
    return file_get_contents('php://input');
}

function sanitize($options) {
    $options->email = htmlentities($options->email);
    $options->notifyOption = htmlentities($options->notifyOption);
    return $options;
}

function writeNotificationEmail($options) {
    global $log;
    $to = MAILRECIPIENTS;
    $subject = "[design-types.net] notification option set";
    $message = "email: $options->email\r\nnotify: $options->notifyOption\r\ntimestamp: " . date(DateTime::ISO8601);
    $headers = "From: email@design-types.net\r\n" .
               "Reply-To: email@design-types.net\r\n" .
               'X-Mailer: PHP/' . phpversion();
    
    if (!mail($to, $subject, $message, $headers)) {
        $log->error("could not send notification email");
    }
    $log->debug("sent notification email");
}

main();
?>
