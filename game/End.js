var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
import { CustomModels } from './CustomModels.js';
import * as sceneManager from './SceneManager.js';
var createScene = function () {
    // Ajoutez une lumière
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 4, -12.5), scene);

    camera.attachControl();
    if(sceneManager.winCountPlayer1 > sceneManager.winCountPlayer2){
        playerWin(-4,0,-1);
        playerLoose(2,0,0);

    }else{
        playerWin(2,0,-1);
        playerLoose(-4,0,0);
    }

    //scene.debugLayer.show();
    displayControlUI();
    loadEndScene();
    //hideControlUI();
    return scene;
};
function launch(){
    createScene();

    engine.runRenderLoop(function () {
        
        scene.render();
    });
    

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
function playerLoose(x,y,z){
    
    
    BABYLON.SceneLoader.ImportMesh("", "./models/", "Loose.glb", scene, (meshes) => {
        console.log("Chargement réussi coliseum", meshes);
     
        let mesh = meshes[0];
       
        mesh.name ="playerLoose"
        
       
        mesh.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
        
        
    
      
      
    }, undefined, undefined, ".glb");



}
function playerWin(x,y,z){
  
    BABYLON.SceneLoader.ImportMesh("", "./models/", "victory.glb", scene, (meshes) => {
        console.log("Chargement réussi coliseum", meshes);
     
        let mesh = meshes[0];
       
        mesh.name ="playerWin"
        
       
        mesh.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
        
        
    
      
      
    }, undefined, undefined, ".glb");
}

function loadEndScene(x,y,z){
    
    BABYLON.SceneLoader.ImportMesh("", "./models/", "recommencer.glb", scene, (meshes) => {
        console.log("Chargement réussi end scene", meshes);
     
        let mesh = meshes[0];
       
        mesh.name ="EndScene"
        
       
        mesh.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
        
        
    
      
      
    }, undefined, undefined, ".glb");

}
export {  scene, launch };

