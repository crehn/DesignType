<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function storeQuizScore() {
    global $log;
    try {
        $log->info("store score");
        $mysqli = connectToDb();
        $mysqli->begin_transaction();
        $idOfInsert = insertScore($mysqli);
        $mysqli->commit();
        echo json_encode($idOfInsert);
        $log->info("finished storing score");
    } catch (Exception $e) {
        $log->warn('rollback transaction');
        $mysqli->rollback();
    } finally {
        $mysqli->close();
    }
}

function insertScore($mysqli) {
    global $log;
    
    try {
        $tablenameQS = DB_TABLEPREFIX . "QuizScore";
        $insertStatement = "INSERT INTO $tablenameQS (USERALIAS, SCORE, RESULTDATE) VALUES (?, ?, ?)";
        $log->debug($insertStatement);
        if (!($stmt = $mysqli->prepare($insertStatement))) {
            error500("Prepare for insert failed: ({$mysqli->errno}) {$mysqli->error}");
        }

        $useralias = getHttpPostData('userAlias');
        $score = getHttpPostData('score');
        $resultdate = date("Y-m-d");
        
        $log->info("userAlias=$useralias, score=$score, resultdate=$resultdate");
        if (!$stmt->bind_param("sis", $useralias, $score, $resultdate)) {
            error500("Binding parameters failed: ({$mysqli->errno}) {$mysqli->error}");
        }

        if (!$stmt->execute()) {
            error500("Execute failed: ({$mysqli->errno}) {$mysqli->error}");
        }

        $insertId = $stmt->insert_id;
        $log->debug("inserted record with id [$insertId] into table [$tablenameQS]");
        return $insertId; 
    } finally {
        $stmt->close();
    }
}

storeQuizScore();
?>
