<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function loadTopAndFlopStatements() {
    global $log;
    try {
        $log->info("load top and flop statements");
        $mysqli = connectToDb();
        $totalCount = getTotalCount($mysqli);
        $values = getCountByStatement($mysqli);
        $result = asPercent($values, $totalCount);
        echo json_encode($result);
    } finally {
        $mysqli->close();
    }
}

function getTotalCount($mysqli) {
    $tablename = DB_TABLEPREFIX . "ChoosenStatements";

    $query = "SELECT COUNT(*) FROM $tablename";
    $result = $mysqli->query($query);
    $resultrow = $result->fetch_row();
    return $resultrow[0];
}

function getCountByStatement($mysqli) {
    global $log;
    try {
        $tablename = DB_TABLEPREFIX . "ChoosenStatements";
        $query = "SELECT 
            SUM(SIMPLE_1) as S1, SUM(SIMPLE_2) as S2, SUM(SIMPLE_3) as S3, SUM(SIMPLE_4) as S4, SUM(SIMPLE_5) as S5, SUM(SIMPLE_6) as S6,
            SUM(POWERFUL_1) as P1, SUM(POWERFUL_2) as P2, SUM(POWERFUL_3) as P3, SUM(POWERFUL_4) as P4, SUM(POWERFUL_5) as P5, SUM(POWERFUL_6) as P6,
            SUM(ABSTRACT_1) as A1, SUM(ABSTRACT_2) as A2, SUM(ABSTRACT_3) as A3, SUM(ABSTRACT_4) as A4, SUM(ABSTRACT_5) as A5, SUM(ABSTRACT_6) as A6,
            SUM(CONCRETE_1) as C1, SUM(CONCRETE_2) as C2, SUM(CONCRETE_3) as C3, SUM(CONCRETE_4) as C4, SUM(CONCRETE_5) as C5, SUM(CONCRETE_6) as C6,
            SUM(PRAGMATIC_1) as PR1, SUM(PRAGMATIC_2) as PR2, SUM(PRAGMATIC_3) as PR3, SUM(PRAGMATIC_4) as PR4, SUM(PRAGMATIC_5) as PR5, SUM(PRAGMATIC_6) as PR6,
            SUM(IDEALISTIC_1) as I1, SUM(IDEALISTIC_2) as I2, SUM(IDEALISTIC_3) as I3, SUM(IDEALISTIC_4) as I4, SUM(IDEALISTIC_5) as I5, SUM(IDEALISTIC_6) as I6,
            SUM(TECHNOLOGIC_1) as T1, SUM(TECHNOLOGIC_2) as T2, SUM(TECHNOLOGIC_3) as T3, SUM(TECHNOLOGIC_4) as T4, SUM(TECHNOLOGIC_5) as T5, SUM(TECHNOLOGIC_6) as T6,
            SUM(ROBUST_1) as R1, SUM(ROBUST_2) as R2, SUM(ROBUST_3) as R3, SUM(ROBUST_4) as R4, SUM(ROBUST_5) as R5, SUM(ROBUST_6) as R6
            FROM $tablename";
        $log->debug($query);
        if (!($stmt = $mysqli->prepare($query))) {
            $log->error("Prepare for select failed: ({$mysqli->errno}) {$mysqli->error}");
            error500();
        }

        if (!$stmt->execute()) {
            $log->error("Execute failed: ({$mysqli->errno}) {$mysqli->error}");
            error500();
        }

        $stmt->bind_result($s1, $s2, $s3, $s4, $s5, $s6, $p1, $p2, $p3, $p4, $p5, $p6, $a1, $a2, $a3, $a4, $a5, $a6, $c1, $c2, $c3, $c4, $c5, $c6, $pr1, $pr2, $pr3, $pr4, $pr5, $pr6, $i1, $i2, $i3, $i4, $i5, $i6, $t1, $t2, $t3, $t4, $t5, $t6, $r1, $r2, $r3, $r4, $r5, $r6);
        $stmt->fetch();
        return array($s1, $s2, $s3, $s4, $s5, $s6, $p1, $p2, $p3, $p4, $p5, $p6, $a1, $a2, $a3, $a4, $a5, $a6, $c1, $c2, $c3, $c4, $c5, $c6, $pr1, $pr2, $pr3, $pr4, $pr5, $pr6, $i1, $i2, $i3, $i4, $i5, $i6, $t1, $t2, $t3, $t4, $t5, $t6, $r1, $r2, $r3, $r4, $r5, $r6);
    } finally {        
        $stmt->close();
    }
}

function asPercent($values, $totalCount) {
    foreach ($values as $index => $value) {
        $percentage = round( ($value / $totalCount), 2);
        $result[] = array("index" => $index, "percentage" => $percentage);
    }
    return $result;
}

loadTopAndFlopStatements();
?>
