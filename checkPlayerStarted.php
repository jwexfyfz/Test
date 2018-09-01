<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_POST["weekNum"];
	$fantasyID = $_POST["fantasyID"];
	$position = $_POST["position"];
	if (isset($_POST["playerName"])) {
		$playerName = urldecode($_POST["playerName"]);
	}
	else {
		$playerName = null;
	}
	if (isset($_POST["team"])) {
		$team = $_POST["team"];
	}
	else {
		$team = null;
	}
	
	$gametimes[""] = "";
	
	$index = 0;
	if (isset($team)) {
		// Returns teamID, gametime for a given team
		// Input: week, teamID
		$sql = "select distinct C.teamID, C.teamName, D.gametime from (select * from collegeTeams where teamName=\"$team\") as C inner join gameTimes as D on C.teamID=D.teamID and week=$weekNum";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			// output data of each row
			while($row = $result->fetch_assoc()) {
				$gametimes[$row["teamName"]] = $row["gametime"];
			}
		} 
	}
	elseif (isset($playerName)) {
		// Returns playerID, teamID, gametime for a given player
		// Input: week, playerName
		$sql = "select distinct C.playerID, C.playerName, D.gametime from (select * from collegeteamroster where PlayerName=\"$playerName\") as C inner join gameTimes as D on C.teamID=D.teamID and week=$weekNum";
	
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			// output data of each row
			while($row = $result->fetch_assoc()) {
				$gametimes[$row["playerName"]] = $row["gametime"];
			}
		} 
	}
	
	$sql = "select distinct C.playerID, C.playerName, C.teamID, C.position, C.hasPlayed, D.gametime from (select A.playerName, B.playerID, B.teamID, A.position, A.hasPlayed from (select playerName, position, hasPlayed from teamroster where week=$weekNum and teamID=$fantasyID and position=\"$position\") as A inner join collegeteamroster as B on A.playerName=B.PlayerName or A.playerName=B.team) as C inner join gameTimes as D on C.teamID=D.teamID and week=$weekNum";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			$gametimes[$row["playerName"]] = $row["gametime"];
		}
	} 
    
    //Output table to testpage2.js
	echo json_encode($gametimes);
	
    
    $conn->close();
?>