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
    writeConfirmationEmail(sanitize($options));
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

function writeConfirmationEmail($options) {
    global $log;
    $to = $options->email;
    $hash = hash('sha256', SECRET . $options->email);
    $subject = "[design-types.net] Please confirm your notification settings";
    $message = "Please confirm your notification settings by clicking on this link: 
        
    " . BASEPATH . "/php/confirmNotificationOptions?email=$options->email&option=$options->notifyOption&hash=$hash
        
If you don't know what this is about, just ignore this email.

--
design-types.net";
    $headers = "From: email@design-types.net\r\n" .
               "Reply-To: email@design-types.net\r\n" .
               'X-Mailer: PHP/' . phpversion();
    
    if (!mail($to, $subject, $message, $headers)) {
        $log->error("could not send confirmation email");
    }
    $log->debug("sent confirmation email");
}

main();
?>
