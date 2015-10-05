<html>
	<head>
		<title>	Super Smash Bros for Wii U </title>
		<script src="Smash.js" ></script>
		<link rel="stylesheet" type="css" href="Smash.css">
	</head>
	<%if Session("Logged") then%>
	<body onload="init()">
		<article id = "main">
			<section class = "addPlayer">
				<div class="char-select">
					<img name="SelectedChar" class="select-pic" src="Fighters\\Mario.png"/>
					<form name="add" onsubmit="return addPlayer(playName.value,fighter.value)" method="post">
						<input type="text" name="fighter" id="character" class="readonly" readonly>
						<input type="text" id="PlayerName" name="playName" value="Alex" class="playerForm" onfocus="this.select()">
						<input type="submit" id="AddPlayer" name="Add" value="Add" class="playerForm">
					</form>
				</div>
				<div id = "chars"> </div>
				<div id="players" class='players'><p>Players:<p>
					<form id="participant-post">
					</form>
				</div>
			</section>
			<section name="matchEdit" class="matchEdit">
				<form name="SetMatch">
					<div id="options">
						<input type="radio" class="tournOption" id="robin" name="matchType" value="robin" checked>Round Robin
						<input type="checkbox" class="tournOption" id="two-tree" name="matchType" value="two-tree">A Side : B Side
						<input type="radio" class="tournOption" id="single-elim" name="matchType" value="single-elim">Single Elimination
						<input type="radio" class="tournOption" id="double-elim" name="matchType" value="double-elim">Double Elimination
					</div>
					<div id="rr-opt">
						<label for="numRounds" id="round-q">How many rounds? </label>
						<input type="number" id="numRounds" name="numRounds" value="1" min="1" max="4">
						<label for="numParts" id="round-p">How many players each match? </label>
						<input type="number" id="numPlayer" name="numPlayer" value="4" min="2" max="8">
						<input type="button" id="genRR" name="genMatch" value="Generate" onclick="genMatches(numPlayer.value,numRounds.value)">
					</div>
					<div id="se-opt">
<!--						<label for="numRounds" id="sep-q"> How many players? </label>
						<input type="text" id="numSE" name="numSE" value="32">
						<input type="button" id="genSE" name="genSE" value="Generate" onclick="">
-->					</div>
					<div id="de-opt">
<!--					<label for="numRounds" id="dep-q">How many players? </label>
						<input type="text" id="numDE" name="numDE" value="32">
						<input type="button" id="genDE" name="genDE" value="Generate" onclick="">
-->					</div>
					<input type="button" id="clearMatch" value="Clear" onclick="clearMatches()">					
					<div id="matchErr"></div>
				</form>
			</section>
			<section id="matches">
			</section>
			<section>
				<form id="calculate" name="calculate">
					<div class="ptin">
						<label for="firstPts"> 1st:
						<input type="number" name="firstPts" value="7" min="-10" max="20">
						<label for="firstPts"> Points
					</div>
					<div class="ptin">
						<label for="secondPts"> 2nd:
						<input type="number" name="secondPts" value="5" min="-10" max="20">
						<label for="secondPts"> Points
					</div>
					<div class="ptin">
						<label for="thirdPts"> 3rd:
						<input type="number" name="thirdPts" value="3" min="-10" max="20">
						<label for="thirdPts"> Points
					</div>
					<div class="ptin">
						<label for="fourthPts"> 4th:
						<input type="number" name="fourthPts" value="1" min="-10" max="20">
						<label for="fourthPts"> Points
					</div>
					<div class="ptin">
						<label for="pointFunction">Evaluation:
						<input type="text" name="pointFunction" value="rank">
					</div>
					<div class="ptin">
						<input type="button" value="Recalculate" onclick="calcStandings()">
					</div>
					<div class="doorGen">
						<input type="text" name="numDoorParts">
						<input type="button" value="Generate Door Prize Number" onclick="doorWinner.value = randNum( numDoorParts.value )">
						<input type="text" class="readonly" name="doorWinner" readonly>
					</div>
				</form>
				<div id="standings"> </div>
			</section>
		</article>
	</body>
	<%end if%>
</html>