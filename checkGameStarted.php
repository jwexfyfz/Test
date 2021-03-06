<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_POST["weekNum"];
	$fantasyID = $_POST["fantasyID"];
	
	// Returns playerID, teamID, position, hasPlayed, and gametime for all players from a given fantasy team for a given week
	// Input: week, fantasyID
	$sql = "select distinct C.playerID, C.teamID, C.position, C.hasPlayed, D.gametime from (select A.playerName, B.playerID, B.teamID, A.position, A.hasPlayed from (select playerName, position, hasPlayed from teamroster where week=$weekNum and teamID=$fantasyID) as A inner join collegeteamroster as B on A.playerName=B.PlayerName or A.playerName=B.team) as C inner join gameTimes as D on C.teamID=D.teamID and week=$weekNum";
	
	$result = $conn->query($sql);

	$index = 0;
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			$playerID = $row["playerID"];
			$teamID = $row["teamID"];
			$position = $row["position"];
			$hasPlayed = $row["hasPlayed"];
			$gametime = $row["gametime"];

			
			//Assign rows from table to gametimes array
			$gametimes[$index] = array(
				"playerID"=>$playerID,
				"teamID"=>$teamID,
				"position"=>$position,
				"hasPlayed"=>$hasPlayed,
				"gametime"=>$gametime);

			$index++;
		}
	} 
	else {
		//Set everything to null so at least you return something
		$gametimes[0] = array(
			"playerID"=>null,
			"teamID"=>null,
			"position"=>null,
			"hasPlayed"=>null,
			"gametime"=>null);
	}	
    
    //Output table to testpage2.js
	echo json_encode($gametimes);
	
    
    $conn->close();
?>