<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function storeData() {
    global $log;
    try {
        $ukey = uniqid();
        $log->info("store data for ukey [$ukey]");
        $mysqli = connectToDb();
        $resultTypeFk = insertResultType($mysqli, $ukey);
        insertChosenStatements($mysqli, $resultTypeFk);
        echo json_encode($ukey);
    } finally {
        $mysqli->close();
    }
}

function insertResultType($mysqli, $ukey) {
    global $log;
    
    try {
        $tablenameRT = DB_TABLEPREFIX . "ResultType";
        $insertStatement = "INSERT INTO $tablenameRT (USERKEY, DESIGN_TYPE, GENDER, AGE, PROF_YEARS, EDU_LEVEL, 
            EDU_BACKGROUND, ROLE, PROG_LANG, METHODOLOGY, LATITUDE, LONGITUDE, 
            COMPANY_SIZE, INDUSTRY_SECTOR) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $log->debug($insertStatement);
        if (!($stmt = $mysqli->prepare($insertStatement))) {
            error500("Prepare for insert failed: ({$mysqli->errno}) {$mysqli->error}");
        }

        $designType = getData('designType');
        $gender = getData('gender');
        $age = getData('age');
        $professionalYears = getData('professionalYears');
        $educationLevel = getData('educationLevel');
        $educationBackground = getData('educationBackground');
        $role = getData('role');
        $programmingLanguage = getData('programmingLanguage');
        $methodology = getData('methodology');
        $companySize = getData('companySize');
        $industrySector = getData('industrySector');
        $latitude = getData('latitude');
        $longitude = getData('longitude');

        $log->info("ukey=$ukey, designType=$designType, gender=$gender, age=$age, professionalYears=$professionalYears,"
             . "educationLevel=$educationLevel, educationBackground=$educationBackground, role=$role, "
             . "programmingLanguage=$programmingLanguage, methodology=$methodology, companySize=$companySize, "
             . "industrySector=$industrySector, latitude=$latitude, longitude=$longitude");
        if (!$stmt->bind_param("ssssssssssddss", 
            $ukey, $designType, $gender, $age, $professionalYears, $educationLevel, $educationBackground, $role, 
            $programmingLanguage, $methodology, $latitude, $longitude, $companySize, $industrySector)) {
            error500("Binding parameters failed: ({$mysqli->errno}) {$mysqli->error}");
        }

        if (!$stmt->execute()) {
            error500("Execute failed: ({$mysqli->errno}) {$mysqli->error}");
        }

        $insertId = $stmt->insert_id;
        $log->debug("inserted record with id [$insertId] into table [$tablenameRT]");
        return $insertId; //TODO: use ukey to correlate both tables
    } finally {
        $stmt->close();
    }
}

function getData($key) {
    //TODO: add proper sanitization
    return $_POST[$key];
}

function insertChosenStatements($mysqli, $resultTypeFk) {
    global $log;
    try {
        $tablenameCS = DB_TABLEPREFIX . "ChoosenStatements"; //TODO: correct typo in table name

        //TODO: consider a separate table for the statements; that way there could be additional data for the statements; furthermore there wouldn't be that many cols
        $insertStatement = "INSERT INTO $tablenameCS (SIMPLE_1, SIMPLE_2, SIMPLE_3, SIMPLE_4, SIMPLE_5, SIMPLE_6,
            POWERFUL_1, POWERFUL_2, POWERFUL_3, POWERFUL_4, POWERFUL_5, POWERFUL_6,
            ABSTRACT_1, ABSTRACT_2, ABSTRACT_3, ABSTRACT_4, ABSTRACT_5, ABSTRACT_6,
            CONCRETE_1, CONCRETE_2, CONCRETE_3, CONCRETE_4, CONCRETE_5, CONCRETE_6,
            PRAGMATIC_1, PRAGMATIC_2, PRAGMATIC_3, PRAGMATIC_4, PRAGMATIC_5, PRAGMATIC_6,
            IDEALISTIC_1, IDEALISTIC_2, IDEALISTIC_3, IDEALISTIC_4, IDEALISTIC_5, IDEALISTIC_6,
            TECHNOLOGIC_1, TECHNOLOGIC_2, TECHNOLOGIC_3, TECHNOLOGIC_4, TECHNOLOGIC_5, TECHNOLOGIC_6,
            ROBUST_1, ROBUST_2, ROBUST_3, ROBUST_4, ROBUST_5, ROBUST_6,
            FK) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $log->debug($insertStatement);
        if (!($stmt = $mysqli->prepare($insertStatement))) {
            error500("Prepare for insert failed: ({$mysqli->errno}) {$mysqli->error}");
        }

        if (!$stmt->bind_param("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", 
            statementAsInt('simple1'),
            statementAsInt('simple2'),
            statementAsInt('simple3'),
            statementAsInt('simple4'),
            statementAsInt('simple5'),
            statementAsInt('simple6'),
            
            statementAsInt('powerful1'),
            statementAsInt('powerful2'),
            statementAsInt('powerful3'),
            statementAsInt('powerful4'),
            statementAsInt('powerful5'),
            statementAsInt('powerful6'),
            
            statementAsInt('abstract1'),
            statementAsInt('abstract2'),
            statementAsInt('abstract3'),
            statementAsInt('abstract4'),
            statementAsInt('abstract5'),
            statementAsInt('abstract6'),
            
            statementAsInt('concrete1'),
            statementAsInt('concrete2'),
            statementAsInt('concrete3'),
            statementAsInt('concrete4'),
            statementAsInt('concrete5'),
            statementAsInt('concrete6'),
            
            statementAsInt('pragmatic1'),
            statementAsInt('pragmatic2'),
            statementAsInt('pragmatic3'),
            statementAsInt('pragmatic4'),
            statementAsInt('pragmatic5'),
            statementAsInt('pragmatic6'),
            
            statementAsInt('idealistic1'),
            statementAsInt('idealistic2'),
            statementAsInt('idealistic3'),
            statementAsInt('idealistic4'),
            statementAsInt('idealistic5'),
            statementAsInt('idealistic6'),
            
            statementAsInt('technologic1'),
            statementAsInt('technologic2'),
            statementAsInt('technologic3'),
            statementAsInt('technologic4'),
            statementAsInt('technologic5'),
            statementAsInt('technologic6'),
            
            statementAsInt('robust1'),
            statementAsInt('robust2'),
            statementAsInt('robust3'),
            statementAsInt('robust4'),
            statementAsInt('robust5'),
            statementAsInt('robust6'),
            $resultTypeFk)) {
            error500("Binding parameters failed: ({$mysqli->errno}) {$mysqli->error}");
        }

        if (!$stmt->execute()) {
            error500("Execute failed: ({$mysqli->errno}) {$mysqli->error}");
        }
        
        $insertId = $stmt->insert_id;
        $log->debug("inserted record with id [$insertId] into table [$tablenameCS]");
    } finally {
        $stmt->close();
    }
}

function statementAsInt($statementKey) {
    return ($_POST[$statementKey] === "true") ? 1 : 0;
}

storeData();
?>
