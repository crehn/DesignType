<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function loadCountOfSurveyParticipants() {
    global $log;
    try {
        $log->info("load count of survey participants");
        $mysqli = connectToDb();
        $totalCount = getTotalNumberOfSurveyParticipants($mysqli);
        echo json_encode($totalCount);
        $log->info("finished loading count of survey participants");
    } finally {
        $mysqli->close();
    }
}

function getTotalNumberOfSurveyParticipants($mysqli) {
    global $log;
    try {
        $tablename = DB_TABLEPREFIX . "ChosenStatements";
        $query = "SELECT COUNT(*) FROM " . $tablename;
        $log->debug($query);
        $result = $mysqli->query($query);
        $resultrow = $result->fetch_row();
        $totalCount = $resultrow[0];
        $log->info("totalCount: $totalCount");
        return $totalCount;
    } finally {
        $result->close();
    }
}

loadCountOfSurveyParticipants();
?>
