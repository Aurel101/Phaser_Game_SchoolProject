
<?php
require_once "connection.php";
?>
<html>
<head>
    <title>
        Admin
    </title>
    <script src="https://www.jsdelivr.com/package/npm/chart.js?path=dist"></script>
    <script src="https://cdnjs.com/libraries/Chart.js"></script>
    <script src="node_modules\chart.js\dist\Chart.bundle.js"></script>
    <style>
        table{
            margin: auto;
            width: 1200px;
            max-height: 400px;
            overflow: scroll;
            border-collapse: collapse;
        }
        td,th{
            text-align: left;
            padding: 8px;
        }
        tr:nth-child(even) {background-color: #f2f2f2;}
        canvas{
            margin: auto;
            height: 600px;
            width: 1200px;
        }
    </style>
</head>
<body>
<table id="all">
    <tr>
        <caption>All time scores</caption>
        <th>ID</th>
        <th>Username</th>
        <th>Score</th>
        <th>Stage</th>
        <th>Time</th>
    </tr>
<?php
$counter=1;
$score=array();
$stage=array();
$time=array();
$sql="select * from highscores order by time asc ";
$results=$mysqli->query($sql);
while ($row = $results->fetch_assoc())
{
    array_push($score,$row['score']);
    array_push($stage,$row['stage']);
    array_push($time,$row['time']);
    echo "<tr>";
    echo "<td>".$counter++."</td><td>".$row['username']."</td><td>".$row['score']."</td><td>".$row['stage']."</td><td>".$row['time']."</td>";
    echo "</tr>";
}
?>
</table>
<canvas id="allchart"></canvas>
<table id="thismonth">
    <caption>This months scores</caption>
    <tr>
    <th>ID</th>
    <th>Username</th>
    <th>Score</th>
    <th>Stage</th>
    <th>Time</th>
    </tr>
<?php
$counter=1;
$mscore=array();
$mstage=array();
$mtime=array();
$sql="select * from highscores where year(time)=year(current_date) and month(time)=month(current_date) order by time asc";
$results=$mysqli->query($sql);
while ($row = $results->fetch_assoc())
{
    array_push($mscore,$row['score']);
    array_push($mstage,$row['stage']);
    array_push($mtime,$row['time']);
    echo "<tr>";
    echo "<td>".$counter++."</td><td>".$row['username']."</td><td>".$row['score']."</td><td>".$row['stage']."</td><td>".$row['time']."</td>";
    echo "</tr>";
}
?>
</table>
<canvas id="thismonthchart"></canvas>
<script>
    var ctx = document.getElementById('allchart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels:<?php echo json_encode($time);?>,
            datasets: [{
                label: 'All time scores',
                borderColor: 'rgb(255, 99, 132)',
                lineTension:0.0,
                data: <?php echo json_encode($score);?>
            }]
        },

        // Configuration options go here
        options: {scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'month'
                    }
                }]
            },responsive:false}
    });
    var ctx2 = document.getElementById('thismonthchart').getContext('2d');
    var chart2 = new Chart(ctx2, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels:<?php echo json_encode($mtime);?>,
            datasets: [{
                label: 'Monthly scores',
                borderColor: 'rgb(255, 99, 132)',
                lineTension:0.0,
                data:<?php echo json_encode($mscore);?>
            }]
        },

        // Configuration options go here
        options: {scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                }]
            },
        responsive:false}
    });
</script>
<br>
</body>
</html>
