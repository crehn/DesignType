<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function main() {
    $options = (object)[
        email => htmlentities($_GET['email']),
        notifyOption => htmlentities($_GET['option']),
        hash => htmlentities($_GET['hash'])
    ];
    checkHash($options);
    writeNotificationEmail($options);
    header('Location: /message.html');
}

function checkHash($options) {
    global $log;
    if ($options->hash !== hash('sha256', SECRET . $options->email)) {
        $log->warn("hashes do not match");
        die("hashes do not match");
    }
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
