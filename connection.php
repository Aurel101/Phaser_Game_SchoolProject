<?php
define('USERNAME','root');
define('PASSWORD','');
define('HOST','localhost');
define('DATABASE','game');

$mysqli=new mysqli(HOST,USERNAME,PASSWORD,DATABASE);
if ($mysqli->connect_error)
    die('Problem with the database connection:'.$mysqli->connect_error);
 ?>