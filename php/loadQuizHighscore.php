<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function loadQuizHighscore() {
    global $log;
    try {
        $log->info("load highscore");
        $mysqli = connectToDb();
        $stmt = executeSelect($mysqli);
        $result = buildResultSet($stmt);
        echo json_encode($result);
        $log->info("finished loading highscore");
    } finally {
        $stmt->close();
        $mysqli->close();
    }
}

function executeSelect($mysqli) {
    global $log;
    $tablenameQS = DB_TABLEPREFIX . "QuizScore";
    $query = "SELECT USERALIAS, SCORE, RESULTDATE from $tablenameQS 
              where RESULTDATE > DATE_SUB(DATE(NOW()), INTERVAL 1 MONTH) 
              order by SCORE desc limit 15";    // BEFORE 1 MONTH
    $log->debug($query);
    if (!($stmt = $mysqli->prepare($query))) {
        error500("Prepare for select failed: ({$mysqli->errno}) {$mysqli->error}");
    }

    if (!$stmt->execute()) {
        error500("Execute failed: ({$mysqli->errno}) {$mysqli->error}");
    }
    return $stmt;
}

function constructResult($stmt) {
    global $log;
    $stmt->bind_result($userAlias, $score, $resultDate);
    $stmt->fetch();
    $result = array(
        "alias" => $userAlias, 
        "score" => $score, 
        "resultdate" => $resultDate
    );
    
    $log->debug("result: [" . json_encode($result) . "]");
    return $result;
}
function buildResultSet($stmt) {
    global $log;
    $stmt->bind_result($userAlias, $score, $resultDate);
    $result = array();
    $idx = 0;
    while ($stmt->fetch()) {
        $log->debug("values: alias[$userAlias], score[$score], resultdate[$resultDate]");
        $result[$idx] = array(
            "alias" => $userAlias,
            "score" => $score,
            "resultdate" => $resultDate
        );
        $idx++;
    }
    return $result;
}

loadQuizHighscore();
?>
