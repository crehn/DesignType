<?php

$userkey = $_GET['userkey'];

//echo "ukey: " . $userkey . "\n";

// connect to db
$config_ini = parse_ini_file("./dbconfig.ini");
$mysqli = new mysqli($config_ini['host'], $config_ini['user'], $config_ini['pwd'], $config_ini['dbname']);
if ($mysqli->connect_errno) {
    echo "Failed to connect to database: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$tablenameCS = $config_ini['tableprefix'] . "ChoosenStatements";
$tablenameRT = $config_ini['tableprefix'] . "ResultType";
//insert result type and statistic data
if (!($stmt = $mysqli->prepare("SELECT 
                              (SIMPLE_1 + SIMPLE_2 + SIMPLE_3 + SIMPLE_4 + SIMPLE_5 + SIMPLE_6) as sum_simple,
                              (POWERFUL_1 + POWERFUL_2 + POWERFUL_3 + POWERFUL_4 + POWERFUL_5 + POWERFUL_6) as sum_powerful, 
                              (ABSTRACT_1 + ABSTRACT_2 + ABSTRACT_3 + ABSTRACT_4 + ABSTRACT_5 + ABSTRACT_6) as sum_abstract,  
                              (CONCRETE_1 + CONCRETE_2 + CONCRETE_3 + CONCRETE_4 + CONCRETE_5 + CONCRETE_6) as sum_concrete, 
                              (PRAGMATIC_1 + PRAGMATIC_2 + PRAGMATIC_3 + PRAGMATIC_4 + PRAGMATIC_5 + PRAGMATIC_6) as sum_pragmatic,  
                              (IDEALISTIC_1 + IDEALISTIC_2 + IDEALISTIC_3 + IDEALISTIC_4 + IDEALISTIC_5 + IDEALISTIC_6) as sum_idealistic,
                              (ROBUST_1 + ROBUST_2 + ROBUST_3 + ROBUST_4 + ROBUST_5 + ROBUST_6) as sum_robust,   
                              (TECHNOLOGIC_1 + TECHNOLOGIC_2 + TECHNOLOGIC_3 + TECHNOLOGIC_4 + TECHNOLOGIC_5 + TECHNOLOGIC_6) as sum_technologic
                              from " . $tablenameCS . " cs inner join ". $tablenameRT . " rt on (cs.FK = rt.ID) where rt.USERKEY=?"))) {
    echo "Prepare for insert failed: (" . $mysqli->errno . ") " . $mysqli->error;
}

if (!$stmt->bind_param("s", $userkey)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}

$stmt->bind_result($sumSimple, $sumPowerful, $sumAbstract, $sumConcrete, $sumPragmatic, $sumIdealistic, $sumRobust, $sumTechnologic);

$resultArray;
while ($stmt->fetch()) {
    $resultArray = array($sumSimple, $sumPowerful, $sumAbstract, $sumConcrete, $sumPragmatic, $sumIdealistic, $sumRobust, $sumTechnologic);
}
    
// close statement and connection
$stmt->close();
$mysqli->close();

// deliver user key for recognization
echo json_encode($resultArray);

?>
