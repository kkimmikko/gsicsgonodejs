'use strict';
var csgogsi = require('gsicsgonodejs');
var io = require('socket.io-client');
var server = new csgogsi();

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

socket.on('newdata', () => {
    let res = [];
    for (var steamid in this.allplayers) {
        let player = this.allplayers[steamid];
        if (player.observer_slot == 0) player.observer_slot = 10;
        player.steamid = steamid;
        res.push(player);
    }
    res.sort(function (a, b) {
        return a.observer_slot - b.observer_slot;
    });
    console.log(res)
    return res;
});