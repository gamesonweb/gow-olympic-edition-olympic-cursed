"use strict"



//cookie
const cookieSession = require('cookie-session');
//var model = require('./model');



var express = require('express');
var mustache = require('mustache-express');

var app = express();
// DÃ©finition du dossier pour les fichiers statiques (images, CSS, etc.)



// parse form arguments in POST requests
const bodyParser = require('body-parser');
const { rawListeners, title } = require('process');
const { Console } = require('console');
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './view');

app.use(express.static('public'));

app.use(express.static('./view/css'));
app.use(express.static('./view/img'));
app.use(express.static('game'));
app.use(express.static('game/models'));

app.use(cookieSession({
  secret: 'mot-de-passe-du-cookie',
}));
app.use(authenticated);
//app.use(change_header);

function is_authenticated(req, res, next) {
 
  if (!req.session.userid) {
   // res.redirect('/not_authenticated')
    return res.redirect('/login')
    
  }
  
  next();
}
function authenticated(req, res, next) {
  if(req.session.userid && req.session){
    res.locals.authenticated =true;
    res.locals.name = req.session.name;
   
  }else{
    // la session n'est pas valide
    res.locals.authenticated = false;
  }
 
  next();
}



/**** Routes pour voir les pages du site ****/

/* Retourne une page principale avec le nombre de recettes */
app.get('/', (req, res) => {


    res.render('index.html');

});




app.get('/Menu', (req, res) => {


  res.render('gamedev.html');

});


app.get('/contact', (req, res) => {


  res.render('contact.html');

});

app.get('/experience', (req, res) => {


  res.render('experience.html');

});


app.get('/portfolio', (req, res) => {


  res.render('portfolio.html');

});










  



app.listen(3000, () => console.log('listening on http://localhost:3000'));

