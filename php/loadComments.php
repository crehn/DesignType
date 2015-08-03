<?php
$pageId = $_GET['pageId'];

// connect to db
$config_ini = parse_ini_file("./dbconfig.ini");
$mysqli = new mysqli($config_ini['host'], $config_ini['user'], $config_ini['pwd'], $config_ini['dbname']);
if ($mysqli->connect_errno) {
    echo "Failed to connect to database: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$tablenameCmt = $config_ini['tableprefix'] . "Comments";

//insert comment
$amountOfCommentsToLoad = 20;
if (!($stmt = $mysqli->prepare("SELECT name, email, comment, date FROM ". $tablenameCmt . " WHERE id_post = ? order by id desc limit " . $amountOfCommentsToLoad))) {
    echo "Prepare for select failed: (" . $mysqli->errno . ") " . $mysqli->error;
}

if (!$stmt->bind_param("i", $pageId)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}

$stmt->bind_result($name, $email, $comment, $date);

$resultArray;
$idx = 0;
while ($stmt->fetch()) {
    // Get gravatar Image
    // https://fr.gravatar.com/site/implement/images/php/
    $default = "mm";
    $size = 35;
    $grav_url = "http://www.gravatar.com/avatar/".md5(strtolower(trim($email)))."?d=".$default."&s=".$size;

    $resultArray[$idx] = array($name, $grav_url, $comment, $date);
    $idx = $idx +1;
}
// resort to show the newest comments first
$sortedResult = array_reverse($resultArray);

// close statement and connection
$stmt->close();
$mysqli->close();

// return objects as json
echo json_encode($sortedResult);

?>