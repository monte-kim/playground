const express = require('express');
const https = require("https");
const ejs = require('ejs');

const app = express();

const songs = ['Free For', 'Make Us Never Happen', 'Twee', 'Youth Is Wasted On The Young', 'Remember Tonight'];

app.set('view engine', 'ejs');
app.use(express.static('public'));  //css 스타일 적용하기

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/profile.html', function(req, res){
  res.sendFile(__dirname + '/profile.html');
});

app.get('/playlist.ejs', function(req, res){
  res.render('playlist', {songs: songs});
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
