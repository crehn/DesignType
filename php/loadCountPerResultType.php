<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function loadCountPerResultType() {
    global $log;
    try {
        $log->info("load count per result type");
        $mysqli = connectToDb();
        $totalCount = getTotalNumberOfResults($mysqli);
        $counts = getCounts($mysqli, $totalCount);
        echo json_encode($counts);
        $log->info("finished loading count per result type");
    } finally {
        $mysqli->close();
    }
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
            $log->debug("found {$row['type']}: {$row['amount']}");
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
