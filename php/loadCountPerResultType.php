<?php

// connect to db
$config_ini = parse_ini_file("./dbconfig.ini");
$mysqli = new mysqli($config_ini['host'], $config_ini['user'], $config_ini['pwd'], $config_ini['dbname']);
if ($mysqli->connect_errno) {
    echo "Failed to connect to database: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$tablename = $config_ini['tableprefix'] . "ResultType";
$query1 = "SELECT COUNT(*) FROM " . $tablename;
$result1 = $mysqli->query($query1);
$resultrow = $result1->fetch_row();
$resultsTotal = $resultrow[0];

$query2 = "SELECT DESIGN_TYPE as type, COUNT(DESIGN_TYPE) as amount FROM " . $tablename . " GROUP by DESIGN_TYPE";
$result2 = $mysqli->query($query2);

while($row = $result2->fetch_array(MYSQLI_ASSOC)) {
  $row['amount'] = round( ($row['amount'] / $resultsTotal), 2);
  $rows[] = $row;
}

/*
while($row = $result2->fetch_array()) {
  //$rows[$row[0]] = $row[1]; // total numbers instead of percentage like below
  //$rows[$row[0]] = round( ($row[1] * 100 / $resultsTotal), 2);
  $rows[$row[0]] = round( ($row[1] / $resultsTotal), 2);
  //$rows['type'] = $row[0];
  //$rows['count'] = round( ($row[1] / $resultsTotal), 2);
}
*/

$result1->close();
$result2->free();
    
// close connection
$mysqli->close();

// deliver user key for recognization
echo json_encode($rows);

?>
