<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');
require_once('loadQuestionnaireDetailsBase.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function main() {
    if (!array_key_exists('ukey', $_GET)) {
        error400("Query parameter missing: ukey");
    }
    loadQuestionnaireDetails($_GET['ukey']);
}

function loadQuestionnaireDetails($ukey) {
    global $log;
    try {
        $log->info("load questionnaire details for ukey [$ukey]");
        $mysqli = connectToDb();
        $stmt = executeSelect($mysqli, $ukey);
        $result = constructResult($stmt);
        echo json_encode($result);
        $log->info("finished loading questionnaire details for ukey [$ukey]");
    } finally {
        $stmt->close();
        $mysqli->close();
    }
}

main();
?>
