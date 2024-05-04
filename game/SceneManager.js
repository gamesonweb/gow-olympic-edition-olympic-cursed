// Importez les modules "scene1.js" et "scene2.js" pour accéder à leurs fonctionnalités
import * as level1 from './scene1.js'; // Remplacez './scene1.js' par le chemin vers votre fichier de scène 1
import * as sceneTest2 from './sceneTest2.js'
import * as scene2 from './scene2.js'
import * as scene3 from './scene3.js'
import * as scene4 from './scene4.js'
import * as menu from './Menu.js'
import * as scene5 from './scene5.js'

// Fonction principale
function Main() {
    // Appelez la fonction "launch" du module "level2" pour lancer la scène 2
    
    launchLevel1();
   
    //launchLevel2();
   //launchLevel3();
   //launchLevel4();
   //launchLevel5();
   
}
function launchLevelMenu(){
    
    menu.launch();
}
function launchLevel1(){
    
    level1.launch();
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
function launchLevel5(){
    
    scene5.launch();
}
 

 



// Exécute la fonction principale
Main();
export { launchLevel2 ,launchLevel1,launchLevel3,launchLevel4,launchLevelMenu};