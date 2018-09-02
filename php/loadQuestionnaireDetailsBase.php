<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function executeSelect($mysqli, $ukey) {
    global $log;
    $tablenameCS = DB_TABLEPREFIX . "ChosenStatements";
    $tablenameRT = DB_TABLEPREFIX . "ResultType";
    $query = "SELECT 
        (SIMPLE_1 + SIMPLE_2 + SIMPLE_3 + SIMPLE_4 + SIMPLE_5 + SIMPLE_6) as sum_simple,
        (POWERFUL_1 + POWERFUL_2 + POWERFUL_3 + POWERFUL_4 + POWERFUL_5 + POWERFUL_6) as sum_powerful, 
        (ABSTRACT_1 + ABSTRACT_2 + ABSTRACT_3 + ABSTRACT_4 + ABSTRACT_5 + ABSTRACT_6) as sum_abstract,  
        (CONCRETE_1 + CONCRETE_2 + CONCRETE_3 + CONCRETE_4 + CONCRETE_5 + CONCRETE_6) as sum_concrete, 
        (PRAGMATIC_1 + PRAGMATIC_2 + PRAGMATIC_3 + PRAGMATIC_4 + PRAGMATIC_5 + PRAGMATIC_6) as sum_pragmatic,  
        (IDEALISTIC_1 + IDEALISTIC_2 + IDEALISTIC_3 + IDEALISTIC_4 + IDEALISTIC_5 + IDEALISTIC_6) as sum_idealistic,
        (ROBUST_1 + ROBUST_2 + ROBUST_3 + ROBUST_4 + ROBUST_5 + ROBUST_6) as sum_robust,   
        (TECHNOLOGIC_1 + TECHNOLOGIC_2 + TECHNOLOGIC_3 + TECHNOLOGIC_4 + TECHNOLOGIC_5 + TECHNOLOGIC_6) as sum_technologic
        from $tablenameCS cs inner join $tablenameRT rt on (cs.ResultId = rt.ID) where rt.USERKEY=?";
    $log->debug($query);
    if (!($stmt = $mysqli->prepare($query))) {
        error500("Prepare for select failed: ({$mysqli->errno}) {$mysqli->error}");
    }

    if (!$stmt->bind_param("s", $ukey)) {
        error500("Binding parameters failed: ({$mysqli->errno}) {$mysqli->error}");
    }

    if (!$stmt->execute()) {
        error500("Execute failed: ({$mysqli->errno}) {$mysqli->error}");
    }
    return $stmt;
}

function constructResult($stmt) {
    global $log;
    $stmt->bind_result($sumSimple, $sumPowerful, $sumAbstract, $sumConcrete, $sumPragmatic, $sumIdealistic, $sumRobust, $sumTechnologic);
    $stmt->fetch();
    $result = array(
        "simple" => $sumSimple, 
        "powerful" => $sumPowerful, 
        "abstract" => $sumAbstract, 
        "concrete" => $sumConcrete, 
        "pragmatic" => $sumPragmatic, 
        "idealistic" => $sumIdealistic, 
        "robust" => $sumRobust, 
        "technologic" => $sumTechnologic
    );
    
    $log->debug("result: [" . json_encode($result) . "]");
    return $result;
}

?>
