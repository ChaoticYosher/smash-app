var players;		// the list of people playing in the tournament
var fighters;		// the list of playable fighters
var matches;		// keep track of all matches
var selectedPlayer;	// to allow swapping of characters

// Helper Methods		//////////////////////////

function rand(){
	return Math.floor( Math.random() * players.length )
}

function randNum(k){
	return Math.floor( Math.random() * k )
}

function rand(array){
	return Math.floor( Math.random() * array.length )
}

function copy( array ){
	newArray = []
	for( var i = 0 ; i < array.length ; i++ ){
		newArray[i] = array[i]
	}
	return newArray
}

function copyIndexes( array ){
	newArray = []
	for( var i = 0 ; i < array.length ; i++ ){
		newArray[i] = i
	}
	return newArray
}

function shuffle( array ){
	var i, j, t
	for( var k = 0 ; k < 100 ; k++ ){
		i = randNum( array.length )
		j = randNum( array.length )
		t = array[i]
		array[i] = array[j]
		array[j] = t
	}
}

function shiftArrayUp( array, i ){
		for( ; i < array.length - 1 ; i++ ){
		array[i] = array[i+1]
	}
	array.pop()
}

function checkPairs( array ){
	for( var i = 0 ; i < array.length ; i++ ){
		for( var j = i + 1 ; j < array.length ; j++ ){
			if( array[i] == array[j] ){
				return false
			}
		}
	}
	return true
}

function openFile(event) {
	var input = event.target;

	var reader = new FileReader();
	reader.onload = function(){
	  var text = reader.result;
	  console.log(reader.result.substring(0, 200))
	};
	reader.readAsText(input.files[0]);
}
////////////////////////////////

// Dynamic Web Page Building
function rootImageDir(){
	return "_images\\"
}

function applyAttribute( element, attribute, value ){
	var attr = document.createAttribute(attribute)
	attr.value = value
	element.setAttributeNode( attr )
}

function removeChildren( node ){
	var n = node.childNodes.length
	for( var i = 0 ; i < n ; i++ ){
		node.removeChild( node.childNodes[0] )
	}
}

function addTextNode( parent, value ){
	var div, p, txt
	div = document.createElement("div")
	applyAttribute( div, "class", "standingItem" )
	p = document.createElement("p")
	txt = document.createTextNode( value )
	p.appendChild( txt )
	div.appendChild( p )
	parent.appendChild( div )
}

//////////////////////////////

function fighterDiv( name, fighter ){
	var div = document.createElement( "div" )
	applyAttribute( div, "class", "playerEntryBorder" )
	var innerDiv = document.createElement( "div" )
	applyAttribute( innerDiv, "class", "playerEntry" )
	var text = document.createTextNode( name )
	innerDiv.appendChild( text )
	var img = document.createElement( "img" )
	applyAttribute( img, "class", "playerPic" )
	applyAttribute( img, "src", rootImageDir() + "Fighters\\" + fighter + ".png" )
	div.appendChild( img )
	div.appendChild( innerDiv )
	return div
}

function playerDiv( player ){
	if( player === -1 ){
		return fighterDiv( "Bye", "MissingNo" )
	}
	player = players[player]
	return fighterDiv( player.name, player.fighter )
}

function playerStandDiv( board, player, type ){
	var main, div, name, fighter, img, score, rank, ranks, kos, falls,
	player = players[player]
	main = document.createElement( "div" )
	applyAttribute( main, "class", (type) ? "standingNode" : "standingNode2" )
	addTextNode( main, player.name )
	fighter = document.createElement( "div" )
	applyAttribute( fighter, "class", "standingItem" )
	img = document.createElement( "img" )
	applyAttribute( img, "src", rootImageDir() + "Avatars\\" + player.fighter + ".png" )
	fighter.appendChild( img )
	main.appendChild( fighter )
	addTextNode( main, "Score: " + player.score )
	addTextNode( main, "KOs: " + player.kos )
	addTextNode( main, "Falls: " + player.falls )
	ranks = document.createElement( "div" )
	applyAttribute( ranks, "class", "standingRank" )
	for( var i = 0 ; i < player.ranks.length ; i++ ){
		rank = rankNode( player.ranks[i] )
		ranks.appendChild(rank);
	}
	main.appendChild( ranks )
	board.appendChild( main )
}

function rankNode( i ){
	var node = document.createElement( "div" )
	applyAttribute( node, "class", "standingItem" )
	var img = document.createElement( "img" )
	applyAttribute( img, "src", rootImageDir() + "Images\\" + i + ".png" )
	node.appendChild( img )
	return node
}

function init(){
	matches = []
	players = []
	loadFighters()
	addMatchListeners()
	showQuery( 'robin' )
	selectFighter( randomFighter() )
}

function loadFighters(){
	var t
	fighters = ['Mario','Luigi','Peach', 'Bowser','Yoshi','Rosalina',
 				'Bowser Jr','Wario','Game and Watch','DK','Diddy Kong',
				'Link','Zelda','Sheik','Ganondorf','Toon Link','Samus',
				'Zero Suit Samus','Pit','Palutena','Marth','Ike',
				'Robin','Kirby','King Dedede','Meta Knight',
				'Little Mac','Fox','Falco','Pikachu','Charizard',
				'Lucario','Jigglypuff','Greninja','Duck Hunt','ROB',
				'Ness','Captain Falcon','Villager','Olimar',
				'Wii Fit Trainer','Dr Mario','Dark Pit','Lucina',
				'Shulk','Pacman','Megaman','Sonic','Random']
	var portraitDiv, divClass, img, imgSrc, clickEvent
	for( var i = 0 ; i < fighters.length ; i++ ){
		portraitDiv = document.createElement("div")
		img = document.createElement("img")
		divClass = document.createAttribute("class")
		imgSrc = document.createAttribute("src")
		clickEvent = document.createAttribute("onclick")
		divClass.value = "charPortrait"
		imgSrc.value = rootImageDir() + "Avatars\\" + fighters[i] + ".png"
		portraitDiv.setAttributeNode( divClass )
		img.setAttributeNode( imgSrc )
		clickEvent = document.createAttribute("onclick")
		clickEvent.value = "fighterClicked('" + fighters[i] + "')"
		img.setAttributeNode( clickEvent )
		portraitDiv.appendChild( img )
		document.getElementById("chars").appendChild( portraitDiv )
	}
}

function showQuery(){
 	document.getElementById('rr-opt').style.display = (document.getElementById('robin').checked) ? "block" : "none"
	document.getElementById('se-opt').style.display = (document.getElementById('single-elim').checked) ? "block" : "none"
	document.getElementById('de-opt').style.display = (document.getElementById('double-elim').checked) ? "block" : "none"
}

function addMatchListeners(){
	document.getElementById('robin').addEventListener('click',function(e){showQuery()})
	document.getElementById('two-tree').addEventListener('click',function(e){showQuery()})
	document.getElementById('single-elim').addEventListener('click',function(e){showQuery()})
	document.getElementById('double-elim').addEventListener('click',function(e){showQuery()})
}

function randomFighter(){
	var i = Math.floor( Math.random() * fighters.length )
	return fighters[i];
}

function selectFighter(name){
	document.SelectedChar.src = rootImageDir() + "Fighters\\" + name + ".png"
	document.getElementById("character").value = name
}

function fighterClicked( fighter ){
	selectFighter( fighter )
	document.getElementById('PlayerName').focus()
}

function randomPlayer(){
	if( players.length <= 0 ){
		return randomFighter()
	} else {
		var i = Math.floor( Math.random() * players.length )
		return  players[i].fighter
	}
}

function addPlayer(name, fighter){
	var div = fighterDiv( name, fighter )
	players[players.length] = { name:name, fighter:fighter, kos:0, falls:0, ranks:[] };
	document.getElementById('players').appendChild( div )
	return false 			// stop the submit button from leaving the page
}

function resetPlayers(){
	for( var i = 0 ; i < players.length ; i++ ){
		players[i].ranks = []
		players[i].kos = 0
		players[i].falls = 0
	}
}

function fillWithBys( array, n ){
	var i = 0;
	while ( i * n < array.length ){ i++ }
	var k = i * n
	while( array.length < k ){
		array[array.length] = -1;
	}
}

function addMatch(array){
	var match = matches.length
	var person;
	var temp = { players:[], played:false };
	for( var i = 0 ; i < array.length ; i++ ){
		temp.players[i] = {
			player:array[i],
			rank:i+1,
			ko:1,
			fall:0
		}
	}
	matches[match] = temp
}

function displayMatch( main, matches, i ){
	var matchForm, playerSet, playerNode, fighterNode, rankLabel, matchRank, KOLabel, matchKO, fallLabel, matchFall, matchSubmit, tempText
	var backColors = ['#dd3223','#2332dd','#dddd23','#32dd23','#ff5e00','#40d5cc','#8f2b91','#333333']
	var borderColors = ['#963223','#233296','#969623','#329623','#dd3223','#2332dd','#2e0e2e','#000000']
	matchForm = document.createElement("form")
	applyAttribute( matchForm, "class", (matches[i].played) ? "playedMatch" : "matchNode" )
	applyAttribute( matchForm, "id", "match" + i )
	playerSet = document.createElement("div")
	applyAttribute( playerSet, "class", "playerSet" )
	for( var j = 0 ; j < matches[i].players.length ; j++ ){
		playerNode = document.createElement("div")
		applyAttribute( playerNode, "class", "playerNode" )
		playerNode.style.backgroundColor = backColors[j%backColors.length]
		playerNode.style.borderColor = borderColors[j%borderColors.length]
		fighterNode = playerDiv( matches[i].players[j].player )
		applyAttribute( fighterNode, "class", "playerNodeEntry" )
		playerNode.appendChild( fighterNode )

		rankLabel = document.createElement("label")
		applyAttribute( rankLabel, "class", "playerNodeEntry" )
		applyAttribute( rankLabel, "for", "Rank-M" + i + "-P" + j )
		tempText = document.createTextNode( "Rank:" )
		rankLabel.appendChild( tempText )
		playerNode.appendChild( rankLabel )
		matchRank = document.createElement("input")
		applyAttribute( matchRank, "class", "playerNodeEntry" )
		applyAttribute( matchRank, "id", "Rank-M" + i + "-P" + j )
		applyAttribute( matchRank, "type", "number" )
		applyAttribute( matchRank, "min", 1 )
		applyAttribute( matchRank, "max", matches[i].players.length )
		applyAttribute( matchRank, "value", matches[i].players[j].rank )
		matchRank.style.borderColor = borderColors[j%borderColors.length]
		playerNode.appendChild( matchRank )
		
		KOLabel = document.createElement("label")
		applyAttribute( KOLabel, "class", "playerNodeEntry" )
		applyAttribute( KOLabel, "for", "KO-M" + i + "-P" + j )
		tempText = document.createTextNode( "KOs:" )
		KOLabel.appendChild( tempText )
		playerNode.appendChild( KOLabel )
		matchKO = document.createElement("input")
		applyAttribute( matchKO, "class", "playerNodeEntry" )
		applyAttribute( matchKO, "id", "KO-M" + i + "-P" + j )
		applyAttribute( matchKO, "type", "number" )
		applyAttribute( matchKO, "min", 0 )
		applyAttribute( matchKO, "max", 20 )
		applyAttribute( matchKO, "value", matches[i].players[j].ko )
		matchKO.style.borderColor = borderColors[j%borderColors.length]
		playerNode.appendChild( matchKO )
		
		fallLabel = document.createElement("label")
		applyAttribute( fallLabel, "class", "playerNodeEntry" )
		applyAttribute( fallLabel, "for", "Fall-M" + i + "-P" + j )
		tempText = document.createTextNode( "Falls:" )
		fallLabel.appendChild( tempText )
		playerNode.appendChild( fallLabel )
		matchFall = document.createElement("input")
		applyAttribute( matchFall, "class", "playerNodeEntry" )
		applyAttribute( matchFall, "id", "Fall-M" + i + "-P" + j )
		applyAttribute( matchFall, "type", "number" )
		applyAttribute( matchFall, "min", 0 )
		applyAttribute( matchFall, "max", 20 )
		applyAttribute( matchFall, "value", matches[i].players[j].fall )
		matchFall.style.borderColor = borderColors[j%borderColors.length]
		playerNode.appendChild( matchFall )
		playerSet.appendChild( playerNode )
	}
	matchForm.appendChild( playerSet )
	matchSubmit = document.createElement( "input" )
	applyAttribute( matchSubmit, "type", "button" )
	applyAttribute( matchSubmit, "value", "Submit" )
	applyAttribute( matchSubmit, "onclick", "submitScore(" + i + ")" )
	matchForm.appendChild( matchSubmit )
	main.appendChild( matchForm )
}

function displayMatches(){
	var main = document.getElementById('matches')
	removeChildren( main )
	for( var i = 0 ; i < matches.length ; i++ ){
		displayMatch( main, matches, i )
	}
	calcStandings()
}

function swapMatch( match1, player1, match2, player2 ){
	var t = matches[match1].players[player1]
	matches[match1].players[player1] = matches[match2].players[players2]
	matches[match2].players[players2] = t
}

// generate a match between n players updating data structures as necessary
function genMatches( n, numRounds ){
	var k = 0;
	var tempArray = copyIndexes( players )
	//fillWithBys( tempArray, n )
	shuffle( tempArray )
	var parent, m
	while( k < numRounds ){
		tempMatch = []
		if( n == 4 ){
			// take 4 or 3 players off the queue
			m = ( tempArray.length === 9 || tempArray.length === 6 || tempArray.length === 3 ) ? 3 : n;
			for( var i = 0 ; i < m ; i++ ){
				if( tempArray[i] !== undefined ){
					tempMatch[i] = tempArray[i]
				}
			}
			tempArray.splice(0,m)		// removes m elements starting at index 0, and inserts nothing
			addMatch( tempMatch )
		} else {
			// take n players off the queue
			for( var i = 0 ; i < n ; i++ ){
				if( tempArray[i] !== undefined ){
					tempMatch[i] = tempArray[i]
				}
			}
			tempArray.splice(0,n)		// removes n elements starting at index 0, and inserts nothing
			addMatch( tempMatch )
		}
		if( tempArray.length === 0 ){
			for( var i = 0 ; i < players.length ; i++ ){
				tempArray.push( i )
			}
			shuffle( tempArray )
			k++
		}
	}
	displayMatches()
}

function removeMatch( i ){
	shiftArrayUp( matches, i )
}

function clearMatches(){
	//for all matches
	for( var i = matches.length ; i > 0 ;  ){
		i--
		//remove if hasn't been played
		if( !matches[i].played ){
			removeMatch( i );
		}
	}
	displayMatches();
}

function submitScore( match ){
	var rank, ko, fall
	var node = matches[match]
	for( var i = 0 ; i < node.players.length ; i++ ){
		node.players[i].rank = document.getElementById('Rank-M'+match+'-P'+i).value
		node.players[i].ko = document.getElementById('KO-M'+match+'-P'+i).value
		node.players[i].fall = document.getElementById('Fall-M'+match+'-P'+i).value
	}
	node.played = true
	applyAttribute( document.getElementById('match' + match), "class", "playedMatch" )
	calcStandings()
}

function evaluateScore( kos, falls, ranks ){
	var rank = 0, t;
	for( var i = 0 ; i < ranks.length ; i++ ){
		switch( ranks[i] ){
			case "1": 
				t = document.calculate.firstPts.value 
				break
			case "2": 
				t = document.calculate.secondPts.value 
				break
			case "3": 
				t = document.calculate.thirdPts.value 
				break
			case "4": 
				t = document.calculate.fourthPts.value 
				break
			default: t = 0
		}
		rank += t*1
	}
	kos *= 1
	falls *= 1
	return eval( document.calculate.pointFunction.value )
}

function addToStandings( result ){
	if( result.player >= 0 ){
		var p = players[result.player]
		p.kos += result.ko*1
		p.falls += result.fall*1
		p.ranks.push( result.rank )
	}
}

function createStandings(){
	var standNode = document.getElementById('standings')
	removeChildren( standNode )
	var temp, standings = copyIndexes( players )
	for( var i = 0 ; i < standings.length ; i++ ){
		for( var j = i + 1 ; j < standings.length ; j++ ){
			if( players[standings[i]].score < players[standings[j]].score ){
				temp = standings[i]
				standings[i] = standings[j]
				standings[j] = temp
			}
		}
	}
	for( var i= 0 ; i < standings.length ; i++ ){
		playerStandDiv( standNode, standings[i], i%2 )
	}
}

function calcStandings(){
	resetPlayers()
	// add the results from every match to the appropriate players
	for( var i = 0 ; i < matches.length ; i++ ){
		if( matches[i].played ){
			for( var j = 0 ; j < matches[i].players.length ; j++ ){
				addToStandings( matches[i].players[j] )
			}
		}
	}
	for( var i = 0 ; i < players.length ; i++ ){
			players[i].score = evaluateScore( players[i].kos, players[i].falls, players[i].ranks )
	}
	createStandings();
}

function key(){
	return "EDP5GOpNDEekVZnznp5I5XSNyOkwiK7iWDgNhVdW"
}

function tourn(){
	return "busmashsocialtest2"
}

function PlayersJSON(){
	var json = '{'
		json += '"api_key": "' + key() + '",'
		json += '"participants": ['
		for( var i = 0 ; i < players.length ; i++ ){
			json += '{ "participant": {'
				json += '"name": "' + players[i].name + '"'
				json += '"fighter": "' + players[i].fighter + '"'
			json += '}}'
			if( i < players.length - 1 ) json += ", "
		}
	json += ']}'
	return json
}

function UpdateTournParticipants(){
	var xmlhttp = new XMLHttpRequest();
	var url ="https://api.challonge.com/v1/tournaments/" + tourn() + "/participants/bulk_add.json"
	//var url = "players.txt";
	//var url = "https://api.challonge.com/v1/tournaments/" + tourn() + "/participants.json"
	var players = PlayersJSON()
	document.getElementById('participant-post').innerHTML += players
	xmlhttp.onreadystatechange = function () {
		alert( xmlhttp.readyState + " : " + xmlhttp.status + " : " + url )
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			alert(xmlhttp.responseText);
		} 
	}

	xmlhttp.open("POST", url, true);
	xmlhttp.send(players);
}
