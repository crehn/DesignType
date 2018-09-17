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
        $sortedResult = sortResult($result);
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
            (select
               case PROF_YEARS
                  when '26-35' then 'over_25'
                  when '36-45' then 'over_25'
                  when 'over_45' then 'over_25'
                  else PROF_YEARS
               end as experience, count(1) as simple
               from $tablename
               where DESIGN_TYPE like 'S___'
               group by experience)
            as simple
          join
            (select
               case PROF_YEARS
                  when '26-35' then 'over_25'
                  when '36-45' then 'over_25'
                  when 'over_45' then 'over_25'
                  else PROF_YEARS
               end as experience, count(1) as powerful
               from $tablename
               where DESIGN_TYPE like 'P___'
               group by experience)
            as powerful
          on simple.experience = powerful.experience
          join
            (select
               case PROF_YEARS
                  when '26-35' then 'over_25'
                  when '36-45' then 'over_25'
                  when 'over_45' then 'over_25'
                  else PROF_YEARS
               end as experience, count(1) as abstract
               from $tablename
               where DESIGN_TYPE like '_A__'
               group by experience)
            as abstract
          on simple.experience = abstract.experience
          join
            (select
              case PROF_YEARS
                  when '26-35' then 'over_25'
                  when '36-45' then 'over_25'
                  when 'over_45' then 'over_25'
                  else PROF_YEARS
               end as experience, count(1) as concrete
               from $tablename
               where DESIGN_TYPE like '_C__'
               group by experience)
            as concrete
          on simple.experience = concrete.experience
          join
            (select
               case PROF_YEARS
                  when '26-35' then 'over_25'
                  when '36-45' then 'over_25'
                  when 'over_45' then 'over_25'
                  else PROF_YEARS
               end as experience, count(1) as pragmatic
               from $tablename
               where DESIGN_TYPE like '__P_'
               group by experience)
            as pragmatic
          on simple.experience = pragmatic.experience
          join
            (select
               case PROF_YEARS
                  when '26-35' then 'over_25'
                  when '36-45' then 'over_25'
                  when 'over_45' then 'over_25'
                  else PROF_YEARS
               end as experience, count(1) as idealistic
               from $tablename
               where DESIGN_TYPE like '__I_'
               group by experience)
            as idealistic
          on simple.experience = idealistic.experience
          join
            (select
               case PROF_YEARS
                  when '26-35' then 'over_25'
                  when '36-45' then 'over_25'
                  when 'over_45' then 'over_25'
                  else PROF_YEARS
               end as experience, count(1) as robust
               from $tablename
               where DESIGN_TYPE like '___R'
               group by experience)
            as robust
          on simple.experience = robust.experience
          join
            (select
               case PROF_YEARS
                  when '26-35' then 'over_25'
                  when '36-45' then 'over_25'
                  when 'over_45' then 'over_25'
                  else PROF_YEARS
               end as experience, count(1) as technologic
               from $tablename
               where DESIGN_TYPE like '___T'
               group by experience)
            as technologic
          on simple.experience = technologic.experience
          join
            (select case PROF_YEARS
                  when '26-35' then 'over_25'
                  when '36-45' then 'over_25'
                  when 'over_45' then 'over_25'
                  else PROF_YEARS
               end as experience, count(1) as sum
               from $tablename
               group by experience)
            as sum
          on simple.experience = sum.experience";
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

function asPercent($value, $total) {
    return round($value / $total, 2);
}

function sortResult($values) {
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
