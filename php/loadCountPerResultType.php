<?php
require_once('Logger.php');
require_once('config.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function loadCountPerResultType() {
    global $log;
    try {
        $log->info("load load count per result type");
        $mysqli = connectToDb();
        $totalCount = getTotalNumberOfResults($mysqli);
        $counts = getCounts($mysqli, $totalCount);
        echo json_encode($counts);
    } finally {
        $mysqli->close();
    }
}

function connectToDb() {
    global $log;
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    if ($mysqli->connect_errno) {
        $log->error("Failed to connect to database: ({$mysqli->connect_errno}) {$mysqli->connect_error}");
        error500();
    }
    return $mysqli;
}

function error500() {
    global $log;
    header("HTTP/1.0 500 Internal Server Error");
    die("Cannot load count per result type; requestId: " . $log->getRequestId());
}

function getTotalNumberOfResults($mysqli) {
    global $log;
    try {
        $tablename = DB_TABLEPREFIX . "ResultType";
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

function getCounts($mysqli, $totalCount) {
    global $log;
    try {
        $tablename = DB_TABLEPREFIX . "ResultType";
        $query = "SELECT DESIGN_TYPE as type, COUNT(DESIGN_TYPE) as amount FROM $tablename GROUP by DESIGN_TYPE";
        $log->debug($query);
        $result = $mysqli->query($query);
        
        while($row = $result->fetch_array(MYSQLI_ASSOC)) {
          $row['amount'] = round( ($row['amount'] / $totalCount), 2);
          $rows[] = $row;
        }
        return $rows;
    } finally {
        $result->close();
    }
}

loadCountPerResultType();
?>
