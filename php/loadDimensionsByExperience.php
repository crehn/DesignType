<?php

// connect to db
$config_ini = parse_ini_file("./dbconfig.ini");
$mysqli = new mysqli($config_ini['host'], $config_ini['user'], $config_ini['pwd'], $config_ini['dbname']);
if ($mysqli->connect_errno) {
    echo "Failed to connect to database: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$tablename = $config_ini['tableprefix'] . "ResultType";

// # load result dimension grouped by working experience for SIMPLE
if (!($stmt1 = $mysqli->prepare("SELECT PROF_YEARS as exp, count(PROF_YEARS) as simple
                                FROM " . $tablename . " WHERE DESIGN_TYPE like 'S___' group by PROF_YEARS"))) {
    echo "Prepare for insert failed: (" . $mysqli->errno . ") " . $mysqli->error;
}
// execute and bind
if (!$stmt1->execute()) { echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error; }
$stmt1->bind_result($exp1, $simple);
// put results in assoc array
$resultArSimple = array();
while ($stmt1->fetch()) {
    $resultArSimple = array_merge($resultArSimple, array($exp1 => $simple));
}
//echo "\nSimple:" . json_encode($resultArSimple);

// # load result dimension grouped by working experience for POWERFUL
if (!($stmt2 = $mysqli->prepare("SELECT PROF_YEARS as exp, count(PROF_YEARS) as simple
                                FROM " . $tablename . " WHERE DESIGN_TYPE like 'P___' group by PROF_YEARS"))) {
    echo "Prepare for insert failed: (" . $mysqli->errno . ") " . $mysqli->error;
}
// execute and bind
if (!$stmt2->execute()) { echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error; }
$stmt2->bind_result($exp2, $powerful);
// put results in assoc array
$resultArPowerful = array();
while ($stmt2->fetch()) {
    $resultArPowerful = array_merge($resultArPowerful, array($exp2 => $powerful));
}
//echo "\nPowerful:" . json_encode($resultArPowerful);

// # load result dimension grouped by working experience for ABSTRACT
if (!($stmt3 = $mysqli->prepare("SELECT PROF_YEARS as exp, count(PROF_YEARS) as simple
                                FROM " . $tablename . " WHERE DESIGN_TYPE like '_A__' group by PROF_YEARS"))) {
    echo "Prepare for insert failed: (" . $mysqli->errno . ") " . $mysqli->error;
}
// execute and bind
if (!$stmt3->execute()) { echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error; }
$stmt3->bind_result($exp3, $abstract);
// put results in assoc array
$resultArAbstract = array();
while ($stmt3->fetch()) {
    $resultArAbstract = array_merge($resultArAbstract, array($exp3 => $abstract));
}
//echo "\nAbstract:" . json_encode($resultArAbstract);

// # load result dimension grouped by working experience for CONCRETE
if (!($stmt4 = $mysqli->prepare("SELECT PROF_YEARS as exp, count(PROF_YEARS) as simple
                                FROM " . $tablename . " WHERE DESIGN_TYPE like '_C__' group by PROF_YEARS"))) {
    echo "Prepare for insert failed: (" . $mysqli->errno . ") " . $mysqli->error;
}
// execute and bind
if (!$stmt4->execute()) { echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error; }
$stmt4->bind_result($exp4, $concrete);
// put results in assoc array
$resultArConcrete = array();
while ($stmt4->fetch()) {
    $resultArConcrete = array_merge($resultArConcrete, array($exp4 => $concrete));
}
//echo "\nConcrete:" . json_encode($resultArConcrete);

// # load result dimension grouped by working experience for PRAGMATIC
if (!($stmt5 = $mysqli->prepare("SELECT PROF_YEARS as exp, count(PROF_YEARS) as simple
                                FROM " . $tablename . " WHERE DESIGN_TYPE like '__P_' group by PROF_YEARS"))) {
    echo "Prepare for insert failed: (" . $mysqli->errno . ") " . $mysqli->error;
}
// execute and bind
if (!$stmt5->execute()) { echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error; }
$stmt5->bind_result($exp5, $pragmatic);
// put results in assoc array
$resultArPragmatic = array();
while ($stmt5->fetch()) {
    $resultArPragmatic = array_merge($resultArPragmatic, array($exp5 => $pragmatic));
}
//echo "\nPragmatic:" . json_encode($resultArPragmatic);

// # load result dimension grouped by working experience for IDEALISTIC
if (!($stmt6 = $mysqli->prepare("SELECT PROF_YEARS as exp, count(PROF_YEARS) as simple
                                FROM " . $tablename . " WHERE DESIGN_TYPE like '__I_' group by PROF_YEARS"))) {
    echo "Prepare for insert failed: (" . $mysqli->errno . ") " . $mysqli->error;
}
// execute and bind
if (!$stmt6->execute()) { echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error; }
$stmt6->bind_result($exp6, $idealistic);
// put results in assoc array
$resultArIdealistic = array();
while ($stmt6->fetch()) {
    $resultArIdealistic = array_merge($resultArIdealistic, array($exp6 => $idealistic));
}
//echo "\nIdealistic:" . json_encode($resultArIdealistic);

// # load result dimension grouped by working experience for ROBUST
if (!($stmt7 = $mysqli->prepare("SELECT PROF_YEARS as exp, count(PROF_YEARS) as simple
                                FROM " . $tablename . " WHERE DESIGN_TYPE like '___R' group by PROF_YEARS"))) {
    echo "Prepare for insert failed: (" . $mysqli->errno . ") " . $mysqli->error;
}
// execute and bind
if (!$stmt7->execute()) { echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error; }
$stmt7->bind_result($exp7, $robust);
// put results in assoc array
$resultArRobust = array();
while ($stmt7->fetch()) {
    $resultArRobust = array_merge($resultArRobust, array($exp7 => $robust));
}
//echo "\nRobust:" . json_encode($resultArRobust);

// # load result dimension grouped by working experience for TECHNOLOGIC
if (!($stmt8 = $mysqli->prepare("SELECT PROF_YEARS as exp, count(PROF_YEARS) as simple
                                FROM " . $tablename . " WHERE DESIGN_TYPE like 'S___' group by PROF_YEARS"))) {
    echo "Prepare for insert failed: (" . $mysqli->errno . ") " . $mysqli->error;
}
// execute and bind
if (!$stmt8->execute()) { echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error; }
$stmt8->bind_result($exp8, $technologic);
// put results in assoc array
$resultArTechnologic = array();
while ($stmt8->fetch()) {
    $resultArTechnologic = array_merge($resultArTechnologic, array($exp8 => $technologic));
}
//echo "\nTechnologic:" . json_encode($resultArTechnologic);


$resultArray = array();
$resultArray[] = array("experience" => "none", "simple" => is_null($resultArSimple['none']) ? 0 : $resultArSimple['none'], "powerful" => is_null($resultArPowerful['none']) ? 0 : $resultArPowerful['none'], "abstract" => is_null($resultArAbstract['none']) ? 0 : $resultArAbstract['none'], "concrete" => is_null($resultArConcrete['none']) ? 0 : $resultArConcrete['none'], "pragmatic" => is_null($resultArPragmatic['none']) ? 0 : $resultArPragmatic['none'], "idealistic" => is_null($resultArIdealistic['none']) ? 0 : $resultArIdealistic['none'], "robust" => is_null($resultArRobust['none']) ? 0 : $resultArRobust['none'], "technologic" => is_null($resultArTechnologic['none']) ? 0 : $resultArTechnologic['none']);
$resultArray[] = array("experience" => "1-3", "simple" => is_null($resultArSimple['1-3']) ? 0 : $resultArSimple['1-3'], "powerful" => is_null($resultArPowerful['1-3']) ? 0 : $resultArPowerful['1-3'], "abstract" => is_null($resultArAbstract['1-3']) ? 0 : $resultArAbstract['1-3'], "concrete" => is_null($resultArConcrete['1-3']) ? 0 : $resultArConcrete['1-3'], "pragmatic" => is_null($resultArPragmatic['1-3']) ? 0 : $resultArPragmatic['1-3'], "idealistic" => is_null($resultArIdealistic['1-3']) ? 0 : $resultArIdealistic['1-3'], "robust" => is_null($resultArRobust['1-3']) ? 0 : $resultArRobust['1-3'], "technologic" => is_null($resultArTechnologic['1-3']) ? 0 : $resultArTechnologic['1-3']);
$resultArray[] = array("experience" => "4-6", "simple" => is_null($resultArSimple['4-6']) ? 0 : $resultArSimple['4-6'], "powerful" => is_null($resultArPowerful['4-6']) ? 0 : $resultArPowerful['4-6'], "abstract" => is_null($resultArAbstract['4-6']) ? 0 : $resultArAbstract['4-6'], "concrete" => is_null($resultArConcrete['4-6']) ? 0 : $resultArConcrete['4-6'], "pragmatic" => is_null($resultArPragmatic['4-6']) ? 0 : $resultArPragmatic['4-6'], "idealistic" => is_null($resultArIdealistic['4-6']) ? 0 : $resultArIdealistic['4-6'], "robust" => is_null($resultArRobust['4-6']) ? 0 : $resultArRobust['4-6'], "technologic" => is_null($resultArTechnologic['4-6']) ? 0 : $resultArTechnologic['4-6']);
$resultArray[] = array("experience" => "7-9", "simple" => is_null($resultArSimple['7-9']) ? 0 : $resultArSimple['7-9'], "powerful" => is_null($resultArPowerful['7-9']) ? 0 : $resultArPowerful['7-9'], "abstract" => is_null($resultArAbstract['7-9']) ? 0 : $resultArAbstract['7-9'], "concrete" => is_null($resultArConcrete['7-9']) ? 0 : $resultArConcrete['7-9'], "pragmatic" => is_null($resultArPragmatic['7-9']) ? 0 : $resultArPragmatic['7-9'], "idealistic" => is_null($resultArIdealistic['7-9']) ? 0 : $resultArIdealistic['7-9'], "robust" => is_null($resultArRobust['7-9']) ? 0 : $resultArRobust['7-9'], "technologic" => is_null($resultArTechnologic['7-9']) ? 0 : $resultArTechnologic['7-9']);
$resultArray[] = array("experience" => "10-12", "simple" => is_null($resultArSimple['10-12']) ? 0 : $resultArSimple['10-12'], "powerful" => is_null($resultArPowerful['10-12']) ? 0 : $resultArPowerful['10-12'], "abstract" => is_null($resultArAbstract['10-12']) ? 0 : $resultArAbstract['10-12'], "concrete" => is_null($resultArConcrete['10-12']) ? 0 : $resultArConcrete['10-12'], "pragmatic" => is_null($resultArPragmatic['10-12']) ? 0 : $resultArPragmatic['10-12'], "idealistic" => is_null($resultArIdealistic['10-12']) ? 0 : $resultArIdealistic['10-12'], "robust" => is_null($resultArRobust['10-12']) ? 0 : $resultArRobust['10-12'], "technologic" => is_null($resultArTechnologic['10-12']) ? 0 : $resultArTechnologic['10-12']);
$resultArray[] = array("experience" => "13-15", "simple" => is_null($resultArSimple['13-15']) ? 0 : $resultArSimple['13-15'], "powerful" => is_null($resultArPowerful['13-15']) ? 0 : $resultArPowerful['13-15'], "abstract" => is_null($resultArAbstract['13-15']) ? 0 : $resultArAbstract['13-15'], "concrete" => is_null($resultArConcrete['13-15']) ? 0 : $resultArConcrete['13-15'], "pragmatic" => is_null($resultArPragmatic['13-15']) ? 0 : $resultArPragmatic['13-15'], "idealistic" => is_null($resultArIdealistic['13-15']) ? 0 : $resultArIdealistic['13-15'], "robust" => is_null($resultArRobust['13-15']) ? 0 : $resultArRobust['13-15'], "technologic" => is_null($resultArTechnologic['13-15']) ? 0 : $resultArTechnologic['13-15']);
$resultArray[] = array("experience" => "16-25", "simple" => is_null($resultArSimple['16-25']) ? 0 : $resultArSimple['16-25'], "powerful" => is_null($resultArPowerful['16-25']) ? 0 : $resultArPowerful['16-25'], "abstract" => is_null($resultArAbstract['16-25']) ? 0 : $resultArAbstract['16-25'], "concrete" => is_null($resultArConcrete['16-25']) ? 0 : $resultArConcrete['16-25'], "pragmatic" => is_null($resultArPragmatic['16-25']) ? 0 : $resultArPragmatic['16-25'], "idealistic" => is_null($resultArIdealistic['16-25']) ? 0 : $resultArIdealistic['16-25'], "robust" => is_null($resultArRobust['16-25']) ? 0 : $resultArRobust['16-25'], "technologic" => is_null($resultArTechnologic['16-25']) ? 0 : $resultArTechnologic['16-25']);
// currently too less results here
//$resultArray[] = array("experience" => "26-35", "simple" => is_null($resultArSimple['26-35']) ? 0 : $resultArSimple['26-35'], "powerful" => is_null($resultArPowerful['26-35']) ? 0 : $resultArPowerful['26-35'], "abstract" => is_null($resultArAbstract['26-35']) ? 0 : $resultArAbstract['26-35'], "concrete" => is_null($resultArConcrete['26-35']) ? 0 : $resultArConcrete['26-35'], "pragmatic" => is_null($resultArPragmatic['26-35']) ? 0 : $resultArPragmatic['26-35'], "idealistic" => is_null($resultArIdealistic['26-35']) ? 0 : $resultArIdealistic['26-35'], "robust" => is_null($resultArRobust['26-35']) ? 0 : $resultArRobust['26-35'], "technologic" => is_null($resultArTechnologic['26-35']) ? 0 : $resultArTechnologic['26-35']);
//$resultArray[] = array("experience" => "36-45", "simple" => is_null($resultArSimple['36-45']) ? 0 : $resultArSimple['36-45'], "powerful" => is_null($resultArPowerful['36-45']) ? 0 : $resultArPowerful['36-45'], "abstract" => is_null($resultArAbstract['36-45']) ? 0 : $resultArAbstract['36-45'], "concrete" => is_null($resultArConcrete['36-45']) ? 0 : $resultArConcrete['36-45'], "pragmatic" => is_null($resultArPragmatic['36-45']) ? 0 : $resultArPragmatic['36-45'], "idealistic" => is_null($resultArIdealistic['36-45']) ? 0 : $resultArIdealistic['36-45'], "robust" => is_null($resultArRobust['36-45']) ? 0 : $resultArRobust['36-45'], "technologic" => is_null($resultArTechnologic['36-45']) ? 0 : $resultArTechnologic['36-45']);
//$resultArray[] = array("experience" => "over 45", "simple" => is_null($resultArSimple['over 45']) ? 0 : $resultArSimple['over 45'], "powerful" => is_null($resultArPowerful['over 45']) ? 0 : $resultArPowerful['over 45'], "abstract" => is_null($resultArAbstract['over 45']) ? 0 : $resultArAbstract['over 45'], "concrete" => is_null($resultArConcrete['over 45']) ? 0 : $resultArConcrete['over 45'], "pragmatic" => is_null($resultArPragmatic['over 45']) ? 0 : $resultArPragmatic['over 45'], "idealistic" => is_null($resultArIdealistic['over 45']) ? 0 : $resultArIdealistic['over 45'], "robust" => is_null($resultArRobust['over 45']) ? 0 : $resultArRobust['over 45'], "technologic" => is_null($resultArTechnologic['over 45']) ? 0 : $resultArTechnologic['over 45']);

// recalc to percent values
for($i = 0; $i < count($resultArray); ++$i) {
    $spsum = $resultArray[$i]['simple'] + $resultArray[$i]['powerful'];
    $resultArray[$i]['simple'] = round( ($resultArray[$i]['simple'] / $spsum), 2);
    $resultArray[$i]['powerful'] = round( ($resultArray[$i]['powerful'] / $spsum), 2);
    
    $acsum = $resultArray[$i]['abstract'] + $resultArray[$i]['concrete'];
    $resultArray[$i]['abstract'] = round( ($resultArray[$i]['abstract'] / $acsum), 2);
    $resultArray[$i]['concrete'] = round( ($resultArray[$i]['concrete'] / $acsum), 2);
    
    $pisum = $resultArray[$i]['pragmatic'] + $resultArray[$i]['idealistic'];
    $resultArray[$i]['pragmatic'] = round( ($resultArray[$i]['pragmatic'] / $pisum), 2);
    $resultArray[$i]['idealistic'] = round( ($resultArray[$i]['idealistic'] / $pisum), 2);
    
    $rtsum = $resultArray[$i]['robust'] + $resultArray[$i]['technologic'];
    $resultArray[$i]['robust'] = round( ($resultArray[$i]['robust'] / $rtsum), 2);
    $resultArray[$i]['technologic'] = round( ($resultArray[$i]['technologic'] / $rtsum), 2);
}

echo json_encode($resultArray);
    
// close statement and connection
$stmt1->close();
$stmt2->close();
$stmt3->close();
$stmt4->close();
$stmt5->close();
$stmt6->close();
$stmt7->close();
$stmt8->close();
$mysqli->close();

?>
