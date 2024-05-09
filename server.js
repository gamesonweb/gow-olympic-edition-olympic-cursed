"use strict"





var express = require('express');
var mustache = require('mustache-express');
//var babylon = require('babylonjs');
var babylon = require('babylonjs');
var app = express();

//app.head("Content-type: application/JavaScript; charset=UTF-8");

// parse form arguments in POST requests
const bodyParser = require('body-parser');
const { rawListeners, title } = require('process');
const { Console } = require('console');
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './view');



app.use(express.static('./view/css'));
app.use(express.static('./view/img'));
app.use(express.static('game'));
app.use(express.static('game/models'));
app.use(express.static('game/gui'));
//app.use(express.static('game/models/character1_anim'));
app.use(addSecurityHeader);  







/**** Routes pour voir les pages du site ****/

/* Retourne une page principale avec le nombre de recettes */
app.get('/', (req, res) => {


    res.render('index.html');

});








function addSecurityHeader(req, res, next) {
  // Ajoute l'en-tête X-Content-Type-Options à chaque réponse
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
}






  



app.listen(3000, () => console.log('listening on http://localhost:3000'));

