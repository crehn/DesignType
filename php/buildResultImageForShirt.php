<?php
require_once('inc/Logger.php');
require_once('inc/config.php');
require_once('inc/common.php');
require_once('loadQuestionnaireDetailsBase.php');

$log = new Logger(basename(__FILE__, ".php"));
if (DEBUG) {
    $log->setLogLevel(LogLevel::debug());
}

function createResultImage() {
    global $log;
    $ukey = getHttpPostData('ukey');
    $type = getHttpPostData('restype');
    $log->debug("print shirt image for type: " . $type . " and ukey: " . $ukey);
    
    $resultImg = imagecreatefrompng("../img/shirt/shirt_bg.png");
    $fontArial = '../fonts/arial.ttf';
    
    // just for help  
    //imageline ($resultImg, (imagesx($resultImg) / 2), 0, (imagesx($resultImg) / 2), imagesy($resultImg), $txtHeaderColor);

    writeCoatOfArmsToResultImage($resultImg, $type);
    writeProgrammingTxtToResultImage($resultImg, $fontArial, $type);
    writeDimensionOverlapToResultImage($resultImg, $ukey);
    writeUrlToResultImage($resultImg, $fontArial);
    
    $outputfilename = "./shirtorders/" . $ukey . ".png";
    imagepng($resultImg, $outputfilename);
    $log->debug("created shirt image at: " . $outputfilename);
    
    overwriteResultImageSpreadshirtCompatible($resultImg, $outputfilename);
    $log->debug("overwrote shirt image spreadshirt compatible at: " . $outputfilename);
    
    imagedestroy($resultImg); 
    
    $log->info("created image for shirt print for ukey: " . $ukey);
    echo json_encode($outputfilename);
}

function overwriteResultImageSpreadshirtCompatible($resultImg, $outputfilename) {
    $newwidth = 990;
    $newheight = 1430;
    $width = 1436;
    $height = 2074;
    $resizedImg = imagecreatetruecolor($newwidth, $newheight);
    //----
    imagesavealpha($resizedImg, true);
    $color = imagecolorallocatealpha($resizedImg, 0, 0, 0, 127);
    imagefill($resizedImg, 0, 0, $color);
    //----
    imagecopyresampled($resizedImg, $resultImg, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
    imagepng($resizedImg, $outputfilename);
    imagedestroy($resizedImg);
}

function writeCoatOfArmsToResultImage($resultImg, $type) {
    global $log;
    $typeImgFile = "../img/types/" . $type . ".png";
    $coatOfArmsImg = imagecreatefrompng($typeImgFile);
    $dst_x = (imagesx($resultImg) / 2) - (imagesx($coatOfArmsImg) / 2);
    $dst_y = 250; // TODO: not hardcoded or constant instead
    imagecopy($resultImg, $coatOfArmsImg, $dst_x, $dst_y, 0, 0, imagesx($coatOfArmsImg), imagesy($coatOfArmsImg));
    $log->debug("placed coat of arms [" . $typeImgFile . " in shirt image on position (x/y): " . $dst_x . "/" . $dst_y);
}

function writeDimensionOverlapToResultImage($resultImg, $ukey) {
    global $log;
    $dimensionsImg = imagecreatefrompng("../img/shirt/dimensions.png");
    $dst_x = (imagesx($resultImg) / 2) - (imagesx($dimensionsImg) / 2);
    $dst_y = (imagesy($resultImg) / 2) + 300; // TODO: not hardcoded or constant instead
    imagecopy($resultImg, $dimensionsImg, $dst_x, $dst_y, 0, 0, imagesx($dimensionsImg), imagesy($dimensionsImg));
    
    $xCoords = array( ($dst_x + 10), ($dst_x + 66), ($dst_x + 122), ($dst_x + 178), ($dst_x + 234), ($dst_x + 290));
    $yCoords = array( ($dst_y + 19), ($dst_y + 119), ($dst_y + 219), ($dst_y + 319) );

    //var_dump($xCoords); 
    //var_dump($yCoords); 
    
    $matchesPerDim = loadQuestionnaireDetailsAsArray($ukey);
    //var_dump($matchesPerDim);
    
    $midOfArray = 5;    
    writeOverlapToDimensionChart($resultImg, $xCoords[($midOfArray - $matchesPerDim["simple"])], $yCoords[0]);
    writeOverlapToDimensionChart($resultImg, $xCoords[($midOfArray - $matchesPerDim["abstract"])], $yCoords[1]);
    writeOverlapToDimensionChart($resultImg, $xCoords[($midOfArray - $matchesPerDim["pragmatic"])], $yCoords[2]);
    writeOverlapToDimensionChart($resultImg, $xCoords[($midOfArray - $matchesPerDim["robust"])], $yCoords[3]);
    $log->debug("drew the overlap chart to x/y: " . $dst_x . "/" . $dst_y);
}

function writeOverlapToDimensionChart($resultImg, $posX, $posY) {
    global $log;
    $overlapImg = imagecreatefrompng("../img/shirt/overlap_box.png");
    $log->debug("draw an overlap box to x/y: " . $posX . "/" . $posY);
    imagecopy($resultImg, $overlapImg, $posX, $posY, 0, 0, imagesx($overlapImg), imagesy($overlapImg));
}

function writeUrlToResultImage($resultImg, $font) {
    global $log;
    $txtDesignTypesUrl = "design-types.net";
    
    $fontSize = 40;
    $txtColor = imagecolorallocate($resultImg, 127, 127, 127);
    
    $bbox = imagettfbbox($fontSize, 0, $font, $txtDesignTypesUrl);
    $px = $bbox[0] + (imagesx($resultImg) / 2) - ($bbox[4] / 2);
    $py = imagesy($resultImg) - 150;

    // write url
    imagettftext($resultImg, $fontSize, 0, $px, $py, $txtColor, $font, $txtDesignTypesUrl);
    $log->debug("wrote design-types-url to x/y: " . $px . "/" . $py);
}

function writeProgrammingTxtToResultImage($resultImg, $font, $type) {
    global $log;
    $txtHeader = "Programming is";
    
    $fontSize = 40;
    $txtHeaderColor = imagecolorallocate($resultImg, 0, 0, 0);
    $txtColor = imagecolorallocate($resultImg, 127, 127, 127);
    
    $bboxHeader = imagettfbbox($fontSize, 0, $font, $txtHeader);
    $pxHeader = $bboxHeader[0] + (imagesx($resultImg) / 2) - ($bboxHeader[4] / 2);
    $pyHeader = (imagesy($resultImg) / 2); // TODO: not hardcoded or constant instead
    $lineIncrement = (($bboxHeader[1] - $bboxHeader[7]) * 1.5);
    imagettftext($resultImg, $fontSize, 0, $pxHeader, $pyHeader, $txtHeaderColor, $font, $txtHeader);
    
    $txtContent = readProgrammingTxtFromFile($type);
    foreach ($txtContent as $i => $curLine) {
        $bboxTxt = imagettfbbox($fontSize, 0, $font, $curLine);
        $pxTxt = $bboxTxt[0] + (imagesx($resultImg) / 2) - ($bboxTxt[4] / 2);
        $pyTxt = $pyHeader + $lineIncrement;
        $lineIncrement += $lineIncrement;
        //echo "7: " . $bboxTxt[7] . "; 1: " . $bboxTxt[1] . "; 5: " . $bboxTxt[5] . "; 3: " . $bboxTxt[3] . "\n";
        //echo "x header: " . $pxHeader . "; y header: " . $pyHeader . "; x Txt: " . $pxTxt . "; y Txt: " . $pyTxt . "\n";
        imagettftext($resultImg, $fontSize, 0, $pxTxt, $pyTxt, $txtColor, $font, $curLine);
        $log->debug("For Type: " . $type . " programing is: " . $curLine);
    }
}

function readProgrammingTxtFromFile($type) {
    global $log;
    $progIs;
    $sepArray = array("sapt" => " on", "sapr" => " Something", "sait" => " a mixture", "sair" => "NONE",
                      "scpt" => " --", "scpr" => "NONE", "scit" => "NONE", "scir" => "NONE", 
                      "papt" => "NONE", "papr" => "NONE", "pait" => "NONE", "pair" => "NONE", 
                      "pcpt" => " It", "pcpr" => " to", "pcit" => "NONE", "pcir" => "NONE");
    $typeLowerCase = strtolower($type);
    
    $dataOfFile = file_get_contents('../types_data.js', FILE_USE_INCLUDE_PATH);
   
    $lines = explode("\n", $dataOfFile);
    //var_dump($lines);
    $takeNext = false;
    $log->debug("load 'programming is' defs from '../types_data.js'. Found: " . count($lines) . " lines.");
    for ($i = 0; $i < count($lines); $i++) {
        if ($takeNext) {
            $posProgTxt = strpos($lines[$i], "programming: ");
            if ($posProgTxt !== false) {
                $idxStart = strpos($lines[$i], "'") + 1;
                $length = strlen($lines[$i]) - $idxStart - 2;
                //$log->debug("start: " . $idxStart . "; end: " . $length . "; length: " . strlen($lines[$i]));
                $progIs = substr($lines[$i], $idxStart, $length);
                break;
            }
        } else {
            $pos = strpos($lines[$i], $typeLowerCase);
            if ($pos !== false) {
                $takeNext = true;
            }
        }
    }

    $linesOfTxt;
    $curSep = $sepArray[$typeLowerCase];
    if ($curSep == "NONE") {
        $linesOfTxt = array($progIs);
    } else {
        $posSep = strpos($progIs, $curSep);
        $str1 = trim(substr($progIs, 0, $posSep));
        $str2 = trim(substr($progIs, $posSep));
        $linesOfTxt = array($str1, $str2);
        //var_dump($linesOfTxt);
    }
    
    return $linesOfTxt;
}

function loadQuestionnaireDetailsAsArray($ukey) {
    global $log;
    try {
        $log->info("asArray: load questionnaire details for ukey [$ukey]");
        $mysqli = connectToDb();
        $stmt = executeSelect($mysqli, $ukey);
        $result = constructResult($stmt);
        $log->info("asArray: finished loading questionnaire details for ukey [$ukey]");
        return $result;
    } finally {
        $stmt->close();
        $mysqli->close();
    }
}

createResultImage();
?>
