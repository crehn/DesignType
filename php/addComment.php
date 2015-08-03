<?php
extract($_POST);
if($_POST['act'] == 'add-com'):
    $name = htmlentities($name);
    if(strlen($name) <= '1'){ $name = 'Guest';}
    $email = htmlentities($email);
    $comment = htmlentities($comment);

    // connect to db
    $config_ini = parse_ini_file("./dbconfig.ini");
    $mysqli = new mysqli($config_ini['host'], $config_ini['user'], $config_ini['pwd'], $config_ini['dbname']);
    if ($mysqli->connect_errno) {
        echo "Failed to connect to database: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    }

    $tablenameCmt = $config_ini['tableprefix'] . "Comments";
    
    //insert comment
    if (!($stmt = $mysqli->prepare("INSERT INTO " . $tablenameCmt . "(name, email, comment, id_post) 
                                                           VALUES (?, ?, ?, ?)"))) {
        echo "Prepare for insert failed: (" . $mysqli->errno . ") " . $mysqli->error;
    }
    
    if (!$stmt->bind_param("sssi", $name, $email, $comment, $id_post)) {
        echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
    }
    
    if (!$stmt->execute()) {
        echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    }

    if(!mysqli_errno()){
      // Get gravatar Image
      // https://fr.gravatar.com/site/implement/images/php/
      $default = "mm";
      $size = 35;
      $grav_url = "http://www.gravatar.com/avatar/" . md5( strtolower( trim( $email ) ) ) . "?d=" . $default . "&s=" . $size;
?>

    <div class="cmt-cnt">
        <img src="<?php echo $grav_url; ?>" alt="" />
        <div class="thecom">
            <h5><?php echo $name; ?></h5><span  class="com-dt"><?php echo date('d-m-Y H:i'); ?></span>
            <br/>
            <p><?php echo $comment; ?></p>
        </div>
    </div><!-- end "cmt-cnt" -->

    <?php } ?>
<?php endif; ?>

<?php 

    // close statement and connection
    $stmt->close();
    $mysqli->close();

?>