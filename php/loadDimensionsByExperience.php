<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function loadDimensionsByExperience() {
    global $log;
    try {
        $log->info("load dimensions by experience");
        $mysqli = connectToDb();
        $result = loadValues($mysqli);
        // $sortedResult = sortResult($result);
        // TODO remove hack
        $sortedResult = sortResultSetSkippingLast3Categories($result);
        echo json_encode($sortedResult);
        $log->info("finished loading dimensions by experience");
    } finally {
        $mysqli->close();
    }
}

function loadValues($mysqli) {
    global $log;
    try {
        $tablename = DB_TABLEPREFIX . "ResultType";
        $query = "select 
	simple.experience, simple.simple, powerful.powerful, abstract.abstract, concrete.concrete, pragmatic.pragmatic, idealistic.idealistic, robust.robust, technologic.technologic, sum.sum
from 
	(select PROF_YEARS as experience, count(PROF_YEARS) as simple 
     from $tablename 
     where DESIGN_TYPE like 'S___' 
     group by PROF_YEARS) 
	as simple
join 
	(select PROF_YEARS as experience, count(PROF_YEARS) as powerful 
     from $tablename 
     where DESIGN_TYPE like 'P___' 
     group by PROF_YEARS) 
	as powerful 
on simple.experience = powerful.experience
join 
	(select PROF_YEARS as experience, count(PROF_YEARS) as abstract 
     from $tablename 
     where DESIGN_TYPE like '_A__' 
     group by PROF_YEARS) 
	as abstract 
on simple.experience = abstract.experience
join 
	(select PROF_YEARS as experience, count(PROF_YEARS) as concrete 
     from $tablename 
     where DESIGN_TYPE like '_C__' 
     group by PROF_YEARS) 
	as concrete 
on simple.experience = concrete.experience
join 
	(select PROF_YEARS as experience, count(PROF_YEARS) as pragmatic 
     from $tablename 
     where DESIGN_TYPE like '__P_' 
     group by PROF_YEARS) 
	as pragmatic 
on simple.experience = pragmatic.experience
join 
	(select PROF_YEARS as experience, count(PROF_YEARS) as idealistic
     from $tablename 
     where DESIGN_TYPE like '__I_' 
     group by PROF_YEARS) 
	as idealistic 
on simple.experience = idealistic.experience
join 
	(select PROF_YEARS as experience, count(PROF_YEARS) as robust
     from $tablename 
     where DESIGN_TYPE like '___R' 
     group by PROF_YEARS) 
	as robust
on simple.experience = robust.experience
join 
	(select PROF_YEARS as experience, count(PROF_YEARS) as technologic
     from $tablename 
     where DESIGN_TYPE like '___T' 
     group by PROF_YEARS) 
	as technologic
on simple.experience = technologic.experience
join 
	(select PROF_YEARS as experience, count(PROF_YEARS) as sum
     from $tablename 
     group by PROF_YEARS) 
	as sum
on simple.experience = sum.experience";
        $log->debug($query);
        if (!($stmt = $mysqli->prepare($query))) {
            error500("Prepare for select failed: ({$mysqli->errno}) {$mysqli->error}");
        }
        if (!$stmt->execute()) { 
            error500("Execute failed: ({$mysqli->errno}) {$mysqli->error}");
        }
        // return extractResultSet($stmt);
        // TODO remove hack
        return extractResultSetSkippingLast3Categories($stmt);
    } finally {
        $stmt->close();
    }
}

function extractResultSet($stmt) {
    global $log;
    $stmt->bind_result($experience, $simple, $powerful, $abstract, $concrete, $pragmatic, $idealistic, $robust, $technologic, $sum);
    $result = array();
    while ($stmt->fetch()) {
        $log->debug("found [$sum] values for [$experience]");
        $result[$experience] = array(
            'experience' => $experience,
            'simple' => asPercent($simple, $sum),
            'powerful' => asPercent($powerful, $sum),
            'abstract' => asPercent($abstract, $sum), 
            'concrete' => asPercent($concrete, $sum), 
            'pragmatic' => asPercent($pragmatic, $sum),
            'idealistic' => asPercent($idealistic, $sum),
            'robust' => asPercent($robust, $sum),
            'technologic' => asPercent($technologic, $sum),
            'sum' => $sum
        );
    }
    return $result;
}

// TODO: HACK-METHOD
function extractResultSetSkippingLast3Categories($stmt) {
    global $log;
    $stmt->bind_result($experience, $simple, $powerful, $abstract, $concrete, $pragmatic, $idealistic, $robust, $technologic, $sum);
    $experience_cond = "over_25";
    $simple_cond = 0;
    $powerful_cond = 0;
    $abstract_cond = 0;
    $concrete_cond = 0;
    $pragmatic_cond = 0;
    $idealistic_cond = 0;
    $robust_cond = 0;
    $technologic_cond = 0;
    $sum_cond = 0;
    $result = array();
    while ($stmt->fetch()) {
        $log->debug("found [$sum] values for [$experience]");
        // condense these 3 experience categories to one otherwise default behavior
        if (strcmp($experience, '26-35') == 0
            or strcmp($experience, '36-45') == 0
            or strcmp($experience, 'over_45') == 0) {
            $simple_cond += $simple;
            $powerful_cond += $powerful;
            $abstract_cond += $abstract;
            $concrete_cond += $concrete;
            $pragmatic_cond += $pragmatic;
            $idealistic_cond += $idealistic;
            $robust_cond += $robust;
            $technologic_cond += $technologic;
            $sum_cond += $sum;
        } else {
            $result[$experience] = array(
                'experience' => $experience,
                'simple' => asPercent($simple, $sum),
                'powerful' => asPercent($powerful, $sum),
                'abstract' => asPercent($abstract, $sum),
                'concrete' => asPercent($concrete, $sum),
                'pragmatic' => asPercent($pragmatic, $sum),
                'idealistic' => asPercent($idealistic, $sum),
                'robust' => asPercent($robust, $sum),
                'technologic' => asPercent($technologic, $sum),
                'sum' => $sum
            );
        }
    }
    // now put it into the result array
    $result[$experience_cond] = array(
        'experience' => $experience_cond,
        'simple' => asPercent($simple_cond, $sum_cond),
        'powerful' => asPercent($powerful_cond, $sum_cond),
        'abstract' => asPercent($abstract_cond, $sum_cond),
        'concrete' => asPercent($concrete_cond, $sum_cond),
        'pragmatic' => asPercent($pragmatic_cond, $sum_cond),
        'idealistic' => asPercent($idealistic_cond, $sum_cond),
        'robust' => asPercent($robust_cond, $sum_cond),
        'technologic' => asPercent($technologic_cond, $sum_cond),
        'sum' => $sum_cond
    );

    return $result;
}

function asPercent($value, $total) {
    return round($value / $total, 2);
}
 
function sortResult($values) {
    $result = array();
    $order = array('none', '1-3', '4-6', '7-9', '10-12', '13-15', '16-25', '26-35', '36-45', 'over_45');
    foreach ($order as $experience) {
        if (array_key_exists($experience, $values))
            $result[] = $values[$experience];
    }
    return $result;
}

// TODO: HACK-METHOD
function sortResultSetSkippingLast3Categories($values) {
    $result = array();
    $order = array('none', '1-3', '4-6', '7-9', '10-12', '13-15', '16-25', 'over_25');
    foreach ($order as $experience) {
        if (array_key_exists($experience, $values))
            $result[] = $values[$experience];
    }
    return $result;
}

loadDimensionsByExperience();
?>
