<?php

$ukey = $_POST['ukey'];
$designType = $_POST['designType'];
$gender = $_POST['gender'];
$age = $_POST['age'];
$professionalYears = $_POST['professionalYears'];
$educationLevel = $_POST['educationLevel'];
$educationBackground = $_POST['educationBackground'];
$role = $_POST['role'];
$programmingLanguage = $_POST['programmingLanguage'];
$methodology = $_POST['methodology'];
$companySize = $_POST['companySize'];
$industrySector = $_POST['industrySector'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];

$boxValueTrue = "true";

//echo "simple1: " . $_POST['simple1'] . "; simple2: " . $_POST['simple2'] . "\n";

$simple1 = (strcmp($_POST['simple1'], $boxValueTrue) == 0) ? 1 : 0;
$simple2 = (strcmp($_POST['simple2'], $boxValueTrue) == 0) ? 1 : 0;
$simple3 = (strcmp($_POST['simple3'], $boxValueTrue) == 0) ? 1 : 0;
$simple4 = (strcmp($_POST['simple4'], $boxValueTrue) == 0) ? 1 : 0;
$simple5 = (strcmp($_POST['simple5'], $boxValueTrue) == 0) ? 1 : 0;
$simple6 = (strcmp($_POST['simple6'], $boxValueTrue) == 0) ? 1 : 0;
$powerful1 = (strcmp($_POST['powerful1'], $boxValueTrue) == 0) ? 1 : 0;
$powerful2 = (strcmp($_POST['powerful2'], $boxValueTrue) == 0) ? 1 : 0;
$powerful3 = (strcmp($_POST['powerful3'], $boxValueTrue) == 0) ? 1 : 0;
$powerful4 = (strcmp($_POST['powerful4'], $boxValueTrue) == 0) ? 1 : 0;
$powerful5 = (strcmp($_POST['powerful5'], $boxValueTrue) == 0) ? 1 : 0;
$powerful6 = (strcmp($_POST['powerful6'], $boxValueTrue) == 0) ? 1 : 0;
$abstract1 = (strcmp($_POST['abstract1'], $boxValueTrue) == 0) ? 1 : 0;
$abstract2 = (strcmp($_POST['abstract2'], $boxValueTrue) == 0) ? 1 : 0;
$abstract3 = (strcmp($_POST['abstract3'], $boxValueTrue) == 0) ? 1 : 0;
$abstract4 = (strcmp($_POST['abstract4'], $boxValueTrue) == 0) ? 1 : 0;
$abstract5 = (strcmp($_POST['abstract5'], $boxValueTrue) == 0) ? 1 : 0;
$abstract6 = (strcmp($_POST['abstract6'], $boxValueTrue) == 0) ? 1 : 0;
$concrete1 = (strcmp($_POST['concrete1'], $boxValueTrue) == 0) ? 1 : 0;
$concrete2 = (strcmp($_POST['concrete2'], $boxValueTrue) == 0) ? 1 : 0;
$concrete3 = (strcmp($_POST['concrete3'], $boxValueTrue) == 0) ? 1 : 0;
$concrete4 = (strcmp($_POST['concrete4'], $boxValueTrue) == 0) ? 1 : 0;
$concrete5 = (strcmp($_POST['concrete5'], $boxValueTrue) == 0) ? 1 : 0;
$concrete6 = (strcmp($_POST['concrete6'], $boxValueTrue) == 0) ? 1 : 0;
$pragmatic1 = (strcmp($_POST['pragmatic1'], $boxValueTrue) == 0) ? 1 : 0;
$pragmatic2 = (strcmp($_POST['pragmatic2'], $boxValueTrue) == 0) ? 1 : 0;
$pragmatic3 = (strcmp($_POST['pragmatic3'], $boxValueTrue) == 0) ? 1 : 0;
$pragmatic4 = (strcmp($_POST['pragmatic4'], $boxValueTrue) == 0) ? 1 : 0;
$pragmatic5 = (strcmp($_POST['pragmatic5'], $boxValueTrue) == 0) ? 1 : 0;
$pragmatic6 = (strcmp($_POST['pragmatic6'], $boxValueTrue) == 0) ? 1 : 0;
$idealistic1 = (strcmp($_POST['idealistic1'], $boxValueTrue) == 0) ? 1 : 0;
$idealistic2 = (strcmp($_POST['idealistic2'], $boxValueTrue) == 0) ? 1 : 0;
$idealistic3 = (strcmp($_POST['idealistic3'], $boxValueTrue) == 0) ? 1 : 0;
$idealistic4 = (strcmp($_POST['idealistic4'], $boxValueTrue) == 0) ? 1 : 0;
$idealistic5 = (strcmp($_POST['idealistic5'], $boxValueTrue) == 0) ? 1 : 0;
$idealistic6 = (strcmp($_POST['idealistic6'], $boxValueTrue) == 0) ? 1 : 0;
$technologic1 = (strcmp($_POST['technologic1'], $boxValueTrue) == 0) ? 1 : 0;
$technologic2 = (strcmp($_POST['technologic2'], $boxValueTrue) == 0) ? 1 : 0;
$technologic3 = (strcmp($_POST['technologic3'], $boxValueTrue) == 0) ? 1 : 0;
$technologic4 = (strcmp($_POST['technologic4'], $boxValueTrue) == 0) ? 1 : 0;
$technologic5 = (strcmp($_POST['technologic5'], $boxValueTrue) == 0) ? 1 : 0;
$technologic6 = (strcmp($_POST['technologic6'], $boxValueTrue) == 0) ? 1 : 0;
$robust1 = (strcmp($_POST['robust1'], $boxValueTrue) == 0) ? 1 : 0;
$robust2 = (strcmp($_POST['robust2'], $boxValueTrue) == 0) ? 1 : 0;
$robust3 = (strcmp($_POST['robust3'], $boxValueTrue) == 0) ? 1 : 0;
$robust4 = (strcmp($_POST['robust4'], $boxValueTrue) == 0) ? 1 : 0;
$robust5 = (strcmp($_POST['robust5'], $boxValueTrue) == 0) ? 1 : 0;
$robust6 = (strcmp($_POST['robust6'], $boxValueTrue) == 0) ? 1 : 0;

$userKeyUnique = uniqid();

$httpParams = "ukey: " . $userKeyUnique . "; gender: " . $gender . "; age: " . $age . "; educationLevel: " . $educationLevel . "; role: " . $role . "; latitude: " . $latitude . "; longitude: " . $longitude
     . "; simple1: " . $simple1 . "; simple2: " . $simple2 . "; simple3: " . $simple3 . "; simple4: " . $simple4 . "; simple5: " . $simple5 . "; simple6: " . $simple6
     . "; powerful1: " . $powerful1 . "; powerful2: " . $powerful2 . "; powerful3: " . $powerful3 . "; powerful4: " . $powerful4 . "; powerful5: " . $powerful5 . "; powerful6: " . $powerful6
     . "; abstract1: " . $abstract1 . "; abstract2: " . $abstract2 . "; abstract3: " . $abstract3 . "; abstract4: " . $abstract4 . "; abstract5: " . $abstract5 . "; abstract6: " . $abstract6
     . "; concrete1: " . $concrete1 . "; concrete2: " . $concrete2 . "; concrete3: " . $concrete3 . "; concrete4: " . $concrete4 . "; concrete5: " . $concrete5 . "; concrete6: " . $concrete6
     . "; pragmatic1: " . $pragmatic1 . "; pragmatic2: " . $pragmatic2 . "; pragmatic3: " . $pragmatic3 . "; pragmatic4: " . $pragmatic4 . "; pragmatic5: " . $pragmatic5 . "; pragmatic6: " . $pragmatic6
     . "; idealistic1: " . $idealistic1 . "; idealistic2: " . $idealistic2 . "; idealistic3: " . $idealistic3 . "; idealistic4: " . $idealistic4 . "; idealistic5: " . $idealistic5 . "; idealistic6: " . $idealistic6
     . "; technologic1: " . $technologic1 . "; technologic2: " . $technologic2 . "; technologic3: " . $technologic3 . "; technologic4: " . $technologic4 . "; technologic5: " . $technologic5 . "; technologic6: " . $technologic6
     . "; robust1: " . $robust1 . "; robust2: " . $robust2 . "; robust3: " . $robust3 . "; robust4: " . $robust4 . "; robust5: " . $robust5 . "; robust6: " . $robust6 . "\n";

//echo $httpParams;
$file = 'mw_php.log';
file_put_contents($file, $httpParams, FILE_APPEND);

// connect to db
$config_ini = parse_ini_file("./dbconfig.ini");
$mysqli = new mysqli($config_ini['host'], $config_ini['user'], $config_ini['pwd'], $config_ini['dbname']);
if ($mysqli->connect_errno) {
    echo "Failed to connect to database: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

//insert result type and statistic data
if (!($stmt = $mysqli->prepare("INSERT INTO ResultType(USERKEY, DESIGN_TYPE, GENDER, AGE, PROF_YEARS, EDU_LEVEL, 
                                                       EDU_BACKGROUND, ROLE, PROG_LANG, METHODOLOGY, LATITUDE, LONGITUDE, 
                                                       COMPANY_SIZE, INDUSTRY_SECTOR) 
                                                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"))) {
    echo "Prepare for insert failed: (" . $mysqli->errno . ") " . $mysqli->error;
}

if (!$stmt->bind_param("ssssssssssddss", $userKeyUnique, $designType, $gender, $age, $professionalYears, 
                                         $educationLevel, $educationBackground, $role, $programmingLanguage, 
                                         $methodology, $latitude, $longitude, $companySize, $industrySector)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}

$fkType = $stmt->insert_id;
//echo "FK: " . $fkType . "\n";

// insert specific choosen statements
if (!($stmt2 = $mysqli->prepare("INSERT INTO ChoosenStatements(SIMPLE_1, SIMPLE_2, SIMPLE_3, SIMPLE_4, SIMPLE_5, SIMPLE_6,
                                                        POWERFUL_1, POWERFUL_2, POWERFUL_3, POWERFUL_4, POWERFUL_5, POWERFUL_6,
                                                        ABSTRACT_1, ABSTRACT_2, ABSTRACT_3, ABSTRACT_4, ABSTRACT_5, ABSTRACT_6,
                                                        CONCRETE_1, CONCRETE_2, CONCRETE_3, CONCRETE_4, CONCRETE_5, CONCRETE_6,
                                                        PRAGMATIC_1, PRAGMATIC_2, PRAGMATIC_3, PRAGMATIC_4, PRAGMATIC_5, PRAGMATIC_6,
                                                        IDEALISTIC_1, IDEALISTIC_2, IDEALISTIC_3, IDEALISTIC_4, IDEALISTIC_5, IDEALISTIC_6,
                                                        TECHNOLOGIC_1, TECHNOLOGIC_2, TECHNOLOGIC_3, TECHNOLOGIC_4, TECHNOLOGIC_5, TECHNOLOGIC_6,
                                                        ROBUST_1, ROBUST_2, ROBUST_3, ROBUST_4, ROBUST_5, ROBUST_6,
                                                        FK) 
                                                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"))) {
    echo "Prepare for insert failed: (" . $mysqli->errno . ") " . $mysqli->error;
}

if (!$stmt2->bind_param("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", $simple1, $simple2, $simple3, $simple4, $simple5, $simple6,
                                         $powerful1, $powerful2, $powerful3, $powerful4, $powerful5, $powerful6, 
                                         $abstract1, $abstract2, $abstract3, $abstract4, $abstract5, $abstract6, 
                                         $concrete1, $concrete2, $concrete3, $concrete4, $concrete5, $concrete6, 
                                         $pragmatic1, $pragmatic2, $pragmatic3, $pragmatic4, $pragmatic5, $pragmatic6, 
                                         $idealistic1, $idealistic2, $idealistic3, $idealistic4, $idealistic5, $idealistic6, 
                                         $technologic1, $technologic2, $technologic3, $technologic4, $technologic5, $technologic6, 
                                         $robust1, $robust2, $robust3, $robust4, $robust5, $robust6, 
                                         $fkType)) {
    echo "Binding parameters failed: (" . $stmt2->errno . ") " . $stmt2->error;
}

if (!$stmt2->execute()) {
    echo "Execute failed: (" . $stmt2->errno . ") " . $stmt2->error;
}


// close statement and connection
$stmt->close();
$stmt2->close();
$mysqli->close();


// deliver user key for recognization
echo json_encode($userKeyUnique);

?>
