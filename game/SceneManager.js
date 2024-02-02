// Importez les modules "scene1.js" et "scene2.js" pour accéder à leurs fonctionnalités
import * as level1 from './scene1.js'; // Remplacez './scene1.js' par le chemin vers votre fichier de scène 1
import * as sceneTest2 from './sceneTest2.js'
import * as scene2 from './scene2.js'
import * as menu from './Menu.js'


// Fonction principale
function Main() {
    // Appelez la fonction "launch" du module "level2" pour lancer la scène 2
    //menu.launch();
    //level1.launch();
    //level2.launch(); 
    //sceneTest2.launch();
    //  sceneTest2.launch();
    //scene2.launch();
    //scene2.killLevel();
    //level1.launch();
    launchLevel2();
}
function launchLevel1(){
    
    level1.launch();
}
function launchLevel2(){
    scene2.killLevel();
    scene2.launch();
}


function launchLevel3(){
    
    level3.launch();
}



// Exécute la fonction principale
Main();
export { launchLevel2 ,launchLevel1};