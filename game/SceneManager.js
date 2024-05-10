// Importez les modules "scene1.js" et "scene2.js" pour accéder à leurs fonctionnalités

import * as end from './End.js';
import * as scene2 from './scene2.js'
import * as scene3 from './scene3.js'
import * as scene4 from './scene4.js'
import * as menu from './Menu.js'

let winCountPlayer1 =0;
let winCountPlayer2 =0;
// Fonction principale
function Main() {
    
    // Appelez la fonction "launch" du module "level2" pour lancer la scène 2
    
    //launchEnd();
   
    //launchLevel2();
   //launchLevel3();
   //launchLevel4();

   launchLevelMenu();
    

   
}
function launchLevelMenu(){
    
    menu.launch();
}
function launchEnd(){
    
    end.launch();
}
function launchLevel2(){
    scene2.killLevel();
    scene2.launch();
}


function launchLevel3(){
    
   scene3.launch();
}

function launchLevel4(){
    
    scene4.launch();
}


function setcountPlayer1(){
    winCountPlayer1++;
}
function setcountPlayer2(){
    winCountPlayer2++;
}
 
// Exportez toutes les fonctions d'un coup
export { Main, launchEnd, launchLevel2, launchLevel3, launchLevel4,setcountPlayer1,setcountPlayer2,winCountPlayer1,winCountPlayer2 };


// Exécute la fonction principale
Main();
