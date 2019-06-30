<?php
require_once "connection.php";
$sql="select * from highscores where year(time)=year(current_date) and month(time)=month(current_date) order by time desc ";
$results=$mysqli->query($sql);
if (!$results)
    die('Couldn\'t fetch records');
$num_fields =mysqli_num_fields($results);
$headers = array();
for ($i = 0; $i < $num_fields; $i++) {
    $temp=mysqli_fetch_field_direct($results,$i);
    $headers[] = $temp->name;
}
$fp = fopen('php://output', 'w');
if ($fp && $results) {
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="monthly_list.csv"');
    header('Pragma: no-cache');
    header('Expires: 0');
    fputcsv($fp, $headers);
    while ($row = $results->fetch_array(MYSQLI_NUM)) {
        fputcsv($fp, array_values($row));
    }
    die;
}
?>