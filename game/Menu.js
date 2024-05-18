let advancedTexture ;
let advancedTexture2 ;
let  musicSound;
//const BABYLON = require('babylonjs');



var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
let soundManager = new SoundManager(scene,"Menu.mp3");
import { CustomModels } from './CustomModels.js';
import * as sceneManager from './SceneManager.js'
import SoundManager from './SoundManager.js';
var createScene = function () {
    
    // GUI
    // Ajoutez une lumière
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

   // Création d'une caméra
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 8, -50), scene);
    //camera.attachControl()
  
   

    let menu = new CustomModels(scene);
    menu.CreateMenu3dScene(0,0,0);

    displayMenu();
    soundManager.initMusic();


    //scene.debugLayer.show();
    return scene;
};
function launch(){
    createScene();

    engine.runRenderLoop(function () {
        
        scene.render();
    });
    

}

function displayMenu(){


       // Création du GUI
    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI_button");
    advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI_text");
    // Création du bouton Play
    const playButton = BABYLON.GUI.Button.CreateSimpleButton("playButton", "Play");
    playButton.width = "150px";
    playButton.height = "40px";
    playButton.color = "white";
    playButton.background = "grey";
    playButton.onPointerClickObservable.add(function () {
        // Mettre ici la logique pour le bouton Play
        console.log("Play button clicked");
        killLevel();
        loadNextLevel();
    });
    advancedTexture.addControl(playButton);

    
    // Création du texte en haut de la page
    const headerText = new BABYLON.GUI.TextBlock();
    headerText.text = "Les Jeux Olympiques Maudits";
    headerText.color = "white";
    headerText.fontSize = 24;
    headerText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    headerText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP; // Modifier cette ligne
    headerText.paddingTop = "-400px"; // Ajout de 20px de padding en haut
    advancedTexture2.addControl(headerText);


  

}

function killLevel(player){
    //scene.dispose();
     
    scene.meshes.forEach(function(mesh) {
        mesh.dispose();
    });
   
    scene.cameras.forEach(function(mesh) {
        mesh.dispose();
    });
    // Supprimer toutes les lumières de la scène
    scene.lights.forEach(function(light) {
        light.dispose();
    });
    advancedTexture2.dispose();
    advancedTexture.dispose();
    engine.stopRenderLoop();
}






export {  scene, launch };