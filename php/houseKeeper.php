<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

const FILENAME_LAST_STATUS_DATE = "./last_status_date.txt";

$statusMessages = array();

function doHouseKeeping() {
    global $log;
    try {
        $action = $_GET['action'];
        if (strcmp($action, "clean") == 0) {
            $log->info("start housekeeping");

            // get interval
            $statusTill = time();
            $statusFrom = getLastStatusTimestamp();
            storeAndlogStatusMessage("Status interval from: " . date('d.m.Y - H:i:s', $statusFrom) . " till: " . date('d.m.Y - H:i:s', $statusTill));

            // get all questionnaire result files in a sorted array
            $allResultImagesTimeDesc = getAllFilesOfAKindSortedTimeDesc(HK_PATH_QUEST_RESULTS . '/*.png');
            // count new questionnaire results
            if (HK_TOGGLE_COUNT_QUEST_RESULTS) {
                $questionnaireResults = countResultsSinceTimestamp($allResultImagesTimeDesc, $statusFrom);
                storeAndlogStatusMessage("There have been " . $questionnaireResults . " new questionnaire results.");
            }
            // remove oldest questionnaire results
            if (HK_TOGGLE_REMOVE_OLD_RESULTS) {
                $removedFiles = removeOldestQuestionnaireResults($allResultImagesTimeDesc);
                storeAndlogStatusMessage("Removed " . $removedFiles . " old result files, only keeping the last: " . HK_QUEST_RESULTS_TO_KEEP);
            }

            // get all log files
            $allLogFilesTimeDesc = getAllFilesOfAKindSortedTimeDesc('./log' . '/*.log');
            // count possible shirt orders
            if (HK_TOGGLE_COUNT_SHIRT_ORDERS) {
                $possibleShirtOrders = countPossibleShirtOrders($allLogFilesTimeDesc, $statusFrom);
                storeAndlogStatusMessage("Found " . $possibleShirtOrders . " possible shirt orders documented in the log files.");
            }
            // collect all errors
            if (HK_TOGGLE_COLLECT_ERRORS) {
                $errorLogEntries = collectErrorLogLines($allLogFilesTimeDesc, $statusFrom);
                storeAndlogStatusMessage("All errors from the log files:");
                foreach($errorLogEntries as $curLogline) {
                    storeAndlogStatusMessage($curLogline);
                }
            }
            // archive old logs
            if (HK_TOGGLE_ARCHIVE_LOGS) {
                $archivedLogFiles = archiveOldLogs($allLogFilesTimeDesc, $statusFrom, $statusTill);
                storeAndlogStatusMessage("Archived " . $archivedLogFiles . " log files.");
            }
            // send status mail
            if (HK_TOGGLE_SEND_STATUS_MAIL) {
                $message = buildMailMessage();
                writeNotificationEmail($message);
            }
            // save back new last status timestamp
            writeLastStatusTimestamp($statusTill);

            echoStatus();
            $log->info("finished housekeeping");
        } else if (strcmp($action, "status") == 0) {
            investigateAndPrintoutCurrentStatus();
        } else {
            echo "The housekeeper only works for the privileged ones!";
        }
    } finally {
    }
}

function archiveOldLogs($allLogFilesTimeDesc, $statusFrom, $statusTill) {
    global $log;
    $archivedFiles = 0;
    $oldFilesToDelete = array();
    $errorLogZip = new ZipArchive;
    $appLogZip = new ZipArchive;
    $errorzipname = './log/errorlogs-' . date('Ymd', $statusFrom) . '-' . date('Ymd', $statusTill) . '.zip';
    $appzipname = './log/applogs-' . date('Ymd', $statusFrom) . '-' . date('Ymd', $statusTill) . '.zip';
    $log->debug("create zip for error logs: " . $errorzipname . " and zip for app logs: " . $appzipname);
    $zip1Ready = $errorLogZip->open($errorzipname, ZIPARCHIVE::CREATE | ZIPARCHIVE::OVERWRITE);
    $zip2Ready = $appLogZip->open($appzipname, ZIPARCHIVE::CREATE | ZIPARCHIVE::OVERWRITE);
    if ($zip1Ready === TRUE && $zip2Ready === TRUE ) {
        foreach($allLogFilesTimeDesc as $curLogfile) {
            if (filemtime($curLogfile) < $statusFrom) {
                if (strpos($curLogfile, "error") !== false) {
                    //$log->debug("add log file: " . $curLogfile . " to zip of error logs.");
                    $errorLogZip->addFile($curLogfile, basename($curLogfile));
                }
                if (strpos($curLogfile, "app") !== false) {
                    //$log->debug("add log file: " . $curLogfile . " to zip of app logs.");
                    $appLogZip->addFile($curLogfile, basename($curLogfile));
                }
                $archivedFiles += 1;
                $oldFilesToDelete[] = $curLogfile;
            }
        }
        $errorLogZip->close();
        $appLogZip->close();
        // now remove all
        foreach($oldFilesToDelete as $curFileToDelete) {
            unlink($curFileToDelete);
        }
    } else {
        $log->error("could not archive error and app logs.");
    }
    return $archivedFiles;
}

function investigateAndPrintoutCurrentStatus() {
    // just printout status
    $statusFrom = getDateBeforeDays(7);
    $allResultImagesTimeDesc = getAllFilesOfAKindSortedTimeDesc(HK_PATH_QUEST_RESULTS . '/*.png');
    $questionnaireResults = countResultsSinceTimestamp($allResultImagesTimeDesc, $statusFrom);
    $allLogFilesTimeDesc = getAllFilesOfAKindSortedTimeDesc('./log' . '/*.log');
    $possibleShirtOrders = countPossibleShirtOrders($allLogFilesTimeDesc, $statusFrom);
    $errorLogEntries = collectErrorLogLines($allLogFilesTimeDesc, $statusFrom);
    echo "Housekeeper Status Page\n\nAll relevant status infos for design-types.net\nsince " . date('d.m.Y - H:i:s', $statusFrom) . " until now.\n";
    echo "New questionnaire results: " . $questionnaireResults . "\n";
    echo "Possible shirt orders: " . $possibleShirtOrders . "\n";
    echo "\nAll errors from logs:\n";
    foreach($errorLogEntries as $curLogline) {
        echo $curLogline . "\n";
    }
    echo "\nBest regards\nYour Housekeeper";
}

function collectErrorLogLines($allLogFilesTimeDesc, $statusFrom) {
    global $log;
    $errorLogLines = array();
    foreach($allLogFilesTimeDesc as $curLogfile) {
        if (strpos($curLogfile, "error") !== false) {
            //$log->debug("cur log file: " . $curLogfile);
            if (filemtime($curLogfile) > $statusFrom) {
                $lines = file($curLogfile);
                foreach ($lines as $line) {
                    //$log->debug("cur line: " . $line);
                    if (strpos($line, '#') != 0) { // not the first char in line
                        $errorLogLines[] = $line;
                        //echo "found log line with error: " . $line;
                    }
                }
            }
        }
    }
    return $errorLogLines;
}

function countPossibleShirtOrders($allLogFilesTimeDesc, $statusFrom) {
    global $log;
    $countedOrders = 0;
    $matchString = "created image for shirt";
    foreach($allLogFilesTimeDesc as $curLogfile) {
        if (strpos($curLogfile, "app") !== false) {
            //$log->debug("cur log file: " . $curLogfile);
            if (filemtime($curLogfile) > $statusFrom) {
                $lines = file($curLogfile);
                foreach ($lines as $line) {
                    //$log->debug("cur line: " . $line);
                    if (strpos($line, $matchString) !== false) {
                        $countedOrders += 1;
                        //echo "found possible shirt order in line: " . $line;
                    }
                }
            }
        }
    }
    return $countedOrders;
}

function echoStatus() {
    global $log;
    global $statusMessages;
    $echoMessage = "Housekeeper Cleanup Info Page\n\nAll relevant actions that have been done for design-types.net in the current interval.\n";
    foreach($statusMessages as $curMsg) {
        $echoMessage .= $curMsg . "\n";
    }
    $echoMessage .= "\n\nBest regards\nYour Housekeeper";
    echo $echoMessage;
}

function buildMailMessage() {
    global $log;
    global $statusMessages;
    $mailMessage = "Hi Christian and Matthias,\n\nall status information for design-types.net for a specific interval.\n\n";
    foreach($statusMessages as $curMsg) {
        $mailMessage .= $curMsg . "\n";
    }
    $mailMessage .= "\nBest regards\n\n Your Housekeeper";
    //$log->debug("mail message: " . $mailMessage);
    return $mailMessage;
}

function countResultsSinceTimestamp($allResultFiles, $statusFrom) {
    global $log;
    $count = 0;
    $timestampStatusFrom = date('Ymd', $statusFrom);
    foreach($allResultFiles as $file) {
        //$log->debug(filemtime($file) . " > " . $statusFrom);
        if (filemtime($file) > $statusFrom) {
            $count += 1;
        }
        $log->debug($file . " has timestamp: " . date('Ymd', filemtime($file)) . " counted if > " . $timestampStatusFrom);
    }
    return $count;
}

function removeOldestQuestionnaireResults($allResultFiles) {
    global $log;
    $count = 0;
    $max = sizeof($allResultFiles);
    for($i = 0; $i < $max; $i++) {
        if ($i >= HK_QUEST_RESULTS_TO_KEEP) {
            unlink($allResultFiles[$i]);
            $log->info("Removed file: " . $allResultFiles[$i]);
            $count += 1;
        } else {
            $log->debug("keep file: " . $allResultFiles[$i]);
        }
    }
    return $count;
}

function getAllQuestionnaireResultsFilesSortedTimeDesc() {
    global $log;
    $files = glob(HK_PATH_QUEST_RESULTS . '/*.png');
    usort($files, function($a, $b) {
        return filemtime($a) < filemtime($b);
    });
    return $files;
}

function getAllFilesOfAKindSortedTimeDesc($pathquery) {
    global $log;
    $files = glob($pathquery);
    usort($files, function($a, $b) {
        return filemtime($a) < filemtime($b);
    });
    return $files;
}

function writeLastStatusTimestamp($newStatusTimestamp) {
    global $log;
    file_put_contents(FILENAME_LAST_STATUS_DATE, $newStatusTimestamp, FILE_APPEND | LOCK_EX);
    $log->debug("wrote new status timestamp to status date file: " . date('d.m.Y - H:i:s', $newStatusTimestamp) . "; in INT: " . $newStatusTimestamp);
}

function getLastStatusTimestamp() {
    global $log;
    if(file_exists(FILENAME_LAST_STATUS_DATE) && is_file(FILENAME_LAST_STATUS_DATE)) {
        $fileContent = file_get_contents(FILENAME_LAST_STATUS_DATE, false);
        //$log->debug("file content: " . $fileContent);
        $timestamp = substr($fileContent, 0, 10);
        $log->debug("last status date: " . date('d.m.Y - H:i:s', $timestamp));
        return $timestamp;
    } else {
        $log->error("could not access file: " . FILENAME_LAST_STATUS_DATE);
        die('Error: could not access file: '.FILENAME_LAST_STATUS_DATE);
    }
}

function storeAndlogStatusMessage($message) {
    global $log;
    global $statusMessages;
    $statusMessages[] = $message;
    $log->info("STATUS: " . $message);
}

function getDateBeforeDays($dayOffset) {
    global $log;
    $dateResult = mktime(0, 0, 0, date("m"), date("d")-$dayOffset, date("Y"));
    $log->debug("result date: ".date('d.m.Y', $dateResult));
    return $dateResult;
}

function writeNotificationEmail($message) {
    global $log;
    $to = "email@design-types.net";
    $subject = "[design-types.net] status update";
    $headers = "From: email@design-types.net\r\n" .
               "Reply-To: email@design-types.net\r\n" .
               'X-Mailer: PHP/' . phpversion();

    if (!mail($to, $subject, $message, $headers)) {
        $log->error("could not send status email");
    }
    $log->info("sent status email with status: " . $message);
}

doHouseKeeping();
?>
