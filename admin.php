
<?php
require_once "connection.php";
?>
<html>
<head>
    <title>
        Admin
    </title>
    <script src="https://www.jsdelivr.com/package/npm/chart.js?path=dist"></script>
    <script src="https://cdnjs.com/libraries/Chart.bundle.js"></script>
    <script src="node_modules\chart.js\dist\Chart.bundle.js"></script>
    <style>

        table{
            margin: auto;
            display: block;
            width: 90%;
            border: 1px solid #eee;
            max-height: 620px;
            overflow: auto;
        }
        caption{
            display: block;
            line-height: 3em;
            width: 100%;
            -webkit-align-items: stretch;
            border: 1px solid #eee
        }
        tbody{
            display: -webkit-flex;
            height: 400px;
            overflow: auto;
            -webkit-flex-flow: row wrap;
        }
        tbody tr{
            display: -webkit-flex;
            width: 100%;
        }
        thead{
            display: -webkit-flex;
            -webkit-flex-flow: row;
        }
        thead tr{
            padding-right: 15px;
            display: -webkit-flex;
            width: 100%;
            -webkit-align-items: stretch;
         }
        td,th{
            text-align: left;
            padding: 8px;
            width: 15%;
        }
        tr:nth-child(even) {background-color: #f2f2f2;}
        canvas{
            margin: auto;
            height: 600px;
            width: 1200px;
        }
        button{
            -webkit-align-items: stretch;
            line-height: 3em;
            float: right;
            width: 200px;
            height: inherit;
            background-color:rgb(255, 99, 132);
            color: whitesmoke;
            margin: auto;
        }
    </style>
</head>
<body>
<table id="all">
    <caption>All time scores
    <button onclick="getfull()">Get the full table as csv</button></caption>
    <thead>
    <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Score</th>
        <th>Stage</th>
        <th>Time</th>
    </tr>
    </thead>
    <tbody>
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

?></tbody>
</table>
<canvas id="allchart"></canvas>
<table id="thismonth">
    <caption>This months scores
    <button onclick="getmonth()">Get this months table as a csv</button></caption>
<thead>
    <tr>
    <th>ID</th>
    <th>Username</th>
    <th>Score</th>
    <th>Stage</th>
    <th>Time</th>
    </tr>
</thead>
<tbody>
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
</tbody>
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
<script>
    function getfull() {
        window.location.replace('full_csv.php');
    }
    function getmonth() {
        window.location.replace('month_csv.php');
    }
</script>
</body>
</html>
