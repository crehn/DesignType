<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function loadTopDimensionsByRole() {
    global $log;

    $rolename = getRoleName();

    try {
        $log->info("load top dimensions by role");
        $mysqli = connectToDb();
        $result = loadValues($mysqli, $rolename);
        $sortedResult = sortResult($result);
        $jsonresult = json_encode($sortedResult);
        echo $jsonresult;
        $log->debug("result for client: $jsonresult");
        $log->info("finished loading top dimensions by role");
    } finally {
        $mysqli->close();
    }
}

function getRoleName() {
    global $log;

    if (!array_key_exists('rolename', $_GET)) {
        error400("Query parameter missing: rolename");
    }
    $rolename = $_GET['rolename'];
    $log->debug("got rolename: [$rolename]");

    return $rolename;
}

function loadValues($mysqli, $rolename) {
    global $log;
    try {
        $tablename = DB_TABLEPREFIX . "ResultType";
        $query = "select
    simple.role, simple.simple, powerful.powerful, abstract.abstract, concrete.concrete, pragmatic.pragmatic, idealistic.idealistic, robust.robust, technologic.technologic, sum.sum
from
    (select ROLE as role, count(ROLE) as simple
     from $tablename
     where DESIGN_TYPE like 'S___'
     and ROLE = '$rolename'
     group by ROLE)
    as simple
join
    (select ROLE as role, count(ROLE) as powerful
     from $tablename
     where DESIGN_TYPE like 'P___'
     group by ROLE)
    as powerful
on simple.role = powerful.role
join
    (select ROLE as role, count(ROLE) as abstract
     from $tablename
     where DESIGN_TYPE like '_A__'
     group by ROLE)
    as abstract
on simple.role = abstract.role
join
    (select ROLE as role, count(ROLE) as concrete
     from $tablename
     where DESIGN_TYPE like '_C__'
     group by ROLE)
    as concrete
on simple.role = concrete.role
join
    (select ROLE as role, count(ROLE) as pragmatic
     from $tablename
     where DESIGN_TYPE like '__P_'
     group by ROLE)
    as pragmatic
on simple.role = pragmatic.role
join
    (select ROLE as role, count(ROLE) as idealistic
     from $tablename
     where DESIGN_TYPE like '__I_'
     group by ROLE)
    as idealistic
on simple.role = idealistic.role
join
    (select ROLE as role, count(ROLE) as robust
     from $tablename
     where DESIGN_TYPE like '___R'
     group by ROLE)
    as robust
on simple.role = robust.role
join
    (select ROLE as role, count(ROLE) as technologic
     from $tablename
     where DESIGN_TYPE like '___T'
     group by ROLE)
    as technologic
on simple.role = technologic.role
join
    (select ROLE as role, count(ROLE) as sum
     from $tablename
     group by ROLE)
    as sum
on simple.role = sum.role";
        $log->debug($query);
        if (!($stmt = $mysqli->prepare($query))) {
            error500("Prepare for select failed: ({$mysqli->errno}) {$mysqli->error}");
        }
        if (!$stmt->execute()) { 
            error500("Execute failed: ({$mysqli->errno}) {$mysqli->error}");
        }
        return extractResultSet($stmt);
    } finally {
        $stmt->close();
    }
}

function extractResultSet($stmt) {
    global $log;
    $stmt->bind_result($role, $simple, $powerful, $abstract, $concrete, $pragmatic, $idealistic, $robust, $technologic, $sum);
    $result = array();
    while ($stmt->fetch()) {
        $log->debug("found [$sum] values for [$role]");
        $log->debug("values: simple[$simple], powerful[$powerful], abstract[$abstract], concrete[$concrete], pragmatic[$pragmatic], idealistic[$idealistic], robust[$robust], technologic[$technologic], sum[$sum]");
        $result[$role] = array(
            'simple' => asPercent($simple, $sum),
            'powerful' => asPercent($powerful, $sum),
            'abstract' => asPercent($abstract, $sum),
            'concrete' => asPercent($concrete, $sum),
            'pragmatic' => asPercent($pragmatic, $sum),
            'idealistic' => asPercent($idealistic, $sum),
            'robust' => asPercent($robust, $sum),
            'technologic' => asPercent($technologic, $sum)
        );
    }
    return $result;
}

function asPercent($value, $total) {
    return round($value / $total, 2);
}

function sortResult($values) {
    $valuesinorder = array();
    $rolename = key($values);
    foreach ($values as $val) {
        $valuesinorder['simple'] = $val['simple'];
        $valuesinorder['powerful'] = $val['powerful'];
        $valuesinorder['abstract'] = $val['abstract'];
        $valuesinorder['concrete'] = $val['concrete'];
        $valuesinorder['pragmatic'] = $val['pragmatic'];
        $valuesinorder['idealistic'] = $val['idealistic'];
        $valuesinorder['robust'] = $val['robust'];
        $valuesinorder['technologic'] = $val['technologic'];
    }
    arsort($valuesinorder);

    $idxtop4dims = array();
    $idx = 0;
    while ($curelement = current($valuesinorder)) {
        $curkey = key($valuesinorder);
        $idxtop4dims[$idx] = $curkey;
        if ($idx < 3) {
            $idx += 1;
        } else { break; }
        next($valuesinorder);
    }

    // build new array with only the top 4 dimensions
    //$top4valuesinorder = array($idxtop4dims[0] => $valuesinorder[$idxtop4dims[0]], $idxtop4dims[1] => $valuesinorder[$idxtop4dims[1]], $idxtop4dims[2] => $valuesinorder[$idxtop4dims[2]], $idxtop4dims[3] => $valuesinorder[$idxtop4dims[3]]);
    $top4valuesinorder = array();
    $top4valuesinorder[] = array ('type' => $idxtop4dims[0], 'amount' => $valuesinorder[$idxtop4dims[0]]);
    $top4valuesinorder[] = array ('type' => $idxtop4dims[1], 'amount' => $valuesinorder[$idxtop4dims[1]]);
    $top4valuesinorder[] = array ('type' => $idxtop4dims[2], 'amount' => $valuesinorder[$idxtop4dims[2]]);
    $top4valuesinorder[] = array ('type' => $idxtop4dims[3], 'amount' => $valuesinorder[$idxtop4dims[3]]);

    return $top4valuesinorder;
}

loadTopDimensionsByRole();
?>
