var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
import { CustomModels } from './CustomModels.js';
import * as sceneManager from './SceneManager.js';
var createScene = function () {
    // Ajoutez une lumière
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -22), scene);
    if(sceneManager.winCountPlayer1 > sceneManager.winCountPlayer2){
        playerWin(9,0,0);
        playerLoose(-11,0,0);

    }else{
        playerWin(-11,0,0);
        playerLoose(9,0,0);
    }

    //scene.debugLayer.show();
    displayControlUI();
    //hideControlUI();
    return scene;
};
function launch(){
    createScene();

    engine.runRenderLoop(function () {
        
        scene.render();
    });
    

}
function loadNextLevel(){
    
    sceneManager.launchLevel4();

}

function displayControlUI(){
  
    // Récupération de l'élément par son ID
    var level1 = document.getElementById("End");
 
    // Afficher l'élément
    level1.style.display = "block";
 
 }
function hideControlUI(){
    // Récupération de l'élément par son ID
    var level1 = document.getElementById("End");

    // Afficher l'élément
    level1.style.display = "none";

}
function playerWin(x,y,z){
    
    
    BABYLON.SceneLoader.ImportMesh("", "./models/", "Loose.glb", scene, (meshes) => {
        console.log("Chargement réussi coliseum", meshes);
     
        let mesh = meshes[0];
       
        mesh.name ="playerLoose"
        
       
        mesh.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
        
        
    
      
      
    }, undefined, undefined, ".glb");



}
function playerLoose(x,y,z){
  
    BABYLON.SceneLoader.ImportMesh("", "./models/", "victory.glb", scene, (meshes) => {
        console.log("Chargement réussi coliseum", meshes);
     
        let mesh = meshes[0];
       
        mesh.name ="playerLoose"
        
       
        mesh.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
        
        
    
      
      
    }, undefined, undefined, ".glb");
}

export {  scene, launch };
