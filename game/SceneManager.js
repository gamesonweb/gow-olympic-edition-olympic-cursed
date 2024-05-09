// Importez les modules "scene1.js" et "scene2.js" pour accéder à leurs fonctionnalités

import * as scene1 from './scene1.js';
import * as scene2 from './scene2.js'
import * as scene3 from './scene3.js'
import * as scene4 from './scene4.js'
import * as menu from './Menu.js'



// Fonction principale
function Main() {
    
    // Appelez la fonction "launch" du module "level2" pour lancer la scène 2
    
    //launchLevel1();
   
    //launchLevel2();
   //launchLevel3();
   //launchLevel4();

   launchLevelMenu();
    

   
}
function launchLevelMenu(){
    
    menu.launch();
}
function launchLevel1(){
    
    scene1.launch();
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




 
// Exportez toutes les fonctions d'un coup
export { Main, launchLevel1, launchLevel2, launchLevel3, launchLevel4 };


// Exécute la fonction principale
Main();
