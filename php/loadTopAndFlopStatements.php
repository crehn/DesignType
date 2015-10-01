<?php

// connect to db
$config_ini = parse_ini_file("./dbconfig.ini");
$mysqli = new mysqli($config_ini['host'], $config_ini['user'], $config_ini['pwd'], $config_ini['dbname']);
if ($mysqli->connect_errno) {
    echo "Failed to connect to database: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$tablename = $config_ini['tableprefix'] . "ChoosenStatements";

$query1 = "SELECT COUNT(*) FROM " . $tablename;
$result1 = $mysqli->query($query1);
$resultrow = $result1->fetch_row();
$resultsTotal = $resultrow[0];

if (!($stmt = $mysqli->prepare("SELECT 
            SUM(SIMPLE_1) as S1, SUM(SIMPLE_2) as S2, SUM(SIMPLE_3) as S3, SUM(SIMPLE_4) as S4, SUM(SIMPLE_5) as S5, SUM(SIMPLE_6) as S6,
            SUM(POWERFUL_1) as P1, SUM(POWERFUL_2) as P2, SUM(POWERFUL_3) as P3, SUM(POWERFUL_4) as P4, SUM(POWERFUL_5) as P5, SUM(POWERFUL_6) as P6,
            SUM(ABSTRACT_1) as A1, SUM(ABSTRACT_2) as A2, SUM(ABSTRACT_3) as A3, SUM(ABSTRACT_4) as A4, SUM(ABSTRACT_5) as A5, SUM(ABSTRACT_6) as A6,
            SUM(CONCRETE_1) as C1, SUM(CONCRETE_2) as C2, SUM(CONCRETE_3) as C3, SUM(CONCRETE_4) as C4, SUM(CONCRETE_5) as C5, SUM(CONCRETE_6) as C6,
            SUM(PRAGMATIC_1) as PR1, SUM(PRAGMATIC_2) as PR2, SUM(PRAGMATIC_3) as PR3, SUM(PRAGMATIC_4) as PR4, SUM(PRAGMATIC_5) as PR5, SUM(PRAGMATIC_6) as PR6,
            SUM(IDEALISTIC_1) as I1, SUM(IDEALISTIC_2) as I2, SUM(IDEALISTIC_3) as I3, SUM(IDEALISTIC_4) as I4, SUM(IDEALISTIC_5) as I5, SUM(IDEALISTIC_6) as I6,
            SUM(TECHNOLOGIC_1) as T1, SUM(TECHNOLOGIC_2) as T2, SUM(TECHNOLOGIC_3) as T3, SUM(TECHNOLOGIC_4) as T4, SUM(TECHNOLOGIC_5) as T5, SUM(TECHNOLOGIC_6) as T6,
            SUM(ROBUST_1) as R1, SUM(ROBUST_2) as R2, SUM(ROBUST_3) as R3, SUM(ROBUST_4) as R4, SUM(ROBUST_5) as R5, SUM(ROBUST_6) as R6
            FROM " . $tablename))) {
    echo "Prepare for insert failed: (" . $mysqli->errno . ") " . $mysqli->error;
}

if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}

$stmt->bind_result($s1, $s2, $s3, $s4, $s5, $s6, $p1, $p2, $p3, $p4, $p5, $p6, $a1, $a2, $a3, $a4, $a5, $a6, $c1, $c2, $c3, $c4, $c5, $c6, $pr1, $pr2, $pr3, $pr4, $pr5, $pr6, $i1, $i2, $i3, $i4, $i5, $i6, $t1, $t2, $t3, $t4, $t5, $t6, $r1, $r2, $r3, $r4, $r5, $r6);

$resultArray;
while ($stmt->fetch()) {
    $resultArray = array($s1, $s2, $s3, $s4, $s5, $s6, $p1, $p2, $p3, $p4, $p5, $p6, $a1, $a2, $a3, $a4, $a5, $a6, $c1, $c2, $c3, $c4, $c5, $c6, $pr1, $pr2, $pr3, $pr4, $pr5, $pr6, $i1, $i2, $i3, $i4, $i5, $i6, $t1, $t2, $t3, $t4, $t5, $t6, $r1, $r2, $r3, $r4, $r5, $r6);
}
    
// close statement and connection
$stmt->close();
$mysqli->close();

$resultsInPercentage = array();
$curIdx = 0;
foreach ($resultArray as $oldVal) {
    $perc = round( ($oldVal / $resultsTotal), 2);
    $resultsInPercentage[] = array("index" => $curIdx, "percentage" => $perc);
    $curIdx = $curIdx + 1;
}
echo "\n" . json_encode($resultsInPercentage);

?>
