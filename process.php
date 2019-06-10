<?php
require_once "connection.php";

if (isset($_REQUEST['name'])){
    $_REQUEST['name']=trim($_REQUEST['name'],'\t\n\r');
    $sql="INSERT INTO highscores (username,score,stage) VALUES ('".$_REQUEST['name']."','".$_REQUEST['score']."','".$_REQUEST['stage']."')";
    if($mysqli->query($sql)==false)
        die('Procedure was unsuccessfull!:'.$mysqli->error);
}
else{
    $text="Top 10 highscores \n";
    $i=1;
    $sql='SELECT * FROM top10';
    $result=$mysqli->query($sql);
    if($result->num_rows>0){
        while($row=$result->fetch_assoc()){
            $text=$text.$i++.'.'.$row['username'].'    '.$row['score']." \n";
        }
    }
    else
    {
        $text='Empty';
    }
    echo ($text);
}

?>