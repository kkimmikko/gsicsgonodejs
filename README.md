# Node.js CSGO GSI module
`gsicsgonodejs` provides an socket driven interface for CSGO live GameState Integration data. When configured, the CSGO client will send messages to the `gsicsgonodejs` server, which emits an event for each attribute whenever it changes.

## Installation

`npm install gsicsgonodejs`

## Examples

```javascript
var csgogsi = require('gsicsgonodejs');
var io = require('socket.io-client');
var server = new csgogsi();

// Connect to the socket
var socket = io('http://127.0.0.1:3000');

socket.on('newclient', (client) => {
    console.log("New client connection, IP address: " + client.ip);
    if (client.auth && client.auth.token) {
        console.log("Auth token: " + client.auth.token);
    } else {
        console.log("No Auth token");
    }
});

socket.on('bomb:countdown', (msg) => {
    console.log("Bomb " + msg);
});

socket.on('map:current_spectators', (msg) => {
    console.log("Spectators " + msg);
});

socket.on('map:round', (msg) => {
    console.log("Current round " + msg);
});


// All data that received.
// socket.on('newdata', (msg) => {
//     console.log(JSON.stringify(msg, null, 2))
// });

```

## Configuring the Dota 2 Client

To configure the Dota client to report gamestate, you need to add a config file in `steamapps\common\dota 2 beta\game\csgo\cfg\`. The file must use the name pattern called `gamestate_integration_*.cfg`, for example `gamestate_integration_test.cfg`.

The following example is included in this repository, you can copy it straight into your Dota directory to get started.
```
"Test integration v2"
{
 "uri" "http://127.0.0.1:3000"
 "timeout" "0.1"
 "buffer"  "0.008"
 "throttle" "0.0"
 "heartbeat" "1.0"
 "data"
 {
		"provider"            		"1" // info about the game providing info 
		"map"                 		"1" // mode, map, phase, team scores
		"round"               		"1" // round phase and the winning team
		"player_id"           		"1" // steamid
		"player_state"        		"1" // armor, flashed, equip_value, health, etc. 
		"map_round_wins"      		"1"	// history of round wins
		"player_match_stats"  		"1"	// scoreboard info
		"player_weapons"			"1" // list of player weapons and weapon state
    "allplayers"              "1"
		"allplayers_id"       		"1" // the steam id of each player
		"allplayers_state"    		"1" // the player_state for each player 
		"allplayers_match_stats"  	"1" // the scoreboard info for each player
		"allplayers_weapons"  		"1" // the player_weapons for each player
		"allplayers_position" 		"1" // player_position but for each player
		"phase_countdowns"    		"1" // time remaining in tenths of a second, which phase
		"allgrenades"         		"1" // grenade effecttime, lifetime, owner, position, type, velocity
		"bomb"                		"1" // location of the bomb, whos carrying it, dropped or not
		"player_position"     		"1" // forward direction, position for currently spectated player
 }
}

```

For more information, see the [CS:GO GameState Integration page](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration)

## WIP

This is a component of bigger project oriented on evaluating data using analytical and statistical tools to discover useful information that could be shown to end-users with a main goal of increasing viewer experience in e-sports. My goal is to use it for data analysis purposes related to games such as Dota, CSGO etc. and to build a framework, that developers could use to boost their viewers experience. If that rings a bell or you interested in such things, hit me up on [Twitter](https://twitter.com/kkimmikko), I'm looking for new connections in this field.

## Credits

Inspired and based on works of [Xzion](https://github.com/xzion) and [Osztenkurden](https://github.com/osztenkurden)
