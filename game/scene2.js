
import CharacterController from './CharacterController.js';
import { CustomModels } from './CustomModels.js';
import DevCamera from '/DevCamera.js';
import PlayerCamera from '/PlayerCamera.js';
//import { SceneLoader } from "@babylonjs/core";

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);

var name = "level2";

function sceneData() {
    // Assurez-vous que l'élément canvas a le focus
    canvas.tabIndex = 1;
    canvas.focus();
    
   // Configurez une caméra
    //var camera =createCamera();
    //var camera = new DevCamera(canvas, scene);
    
    var map = new CustomModels(); 
    //map.CreateTree(0,110,0);
    map.CreateObject(0,90,0)
    //map.CreateObject();

    // Ajoutez une lumière
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Créez un matériau pour le cube (bleu)
    var material = new BABYLON.StandardMaterial("redMaterial", scene);
    material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Couleur rouge

   
    // Créez un cube avec le matériau
    var cube = BABYLON.MeshBuilder.CreateBox("redCube", { size: 2 }, scene);
    //var floor = BABYLON.MeshBuilder.CreateBox("floor", { size: 200 }, scene);
    cube.material = material;
    // Récupérer l'abstract mesh
    //var mesh = cube.getMeshUniformBuffer();
    // Afficher les informations de l'abstract mesh
    

   
    // Positionnez le cube où vous le souhaitez
    //floor.position = new BABYLON.Vector3(0, cube.position.y - 1, 0);
    cube.position = new BABYLON.Vector3(0, 100, 0);
    // map.position = new BABYLON.Vector3(0, 110, 0);
    console.log(cube.position);
    //var camera = new PlayerCamera(canvas, scene,engine,cube);
    var devcamera = new DevCamera(canvas,scene)
    var character = new CharacterController(canvas, scene,engine,cube);
    //camera.setupKeyboardInput();
}


function moveForward(){


}
function launch() {
    sceneData();
    engine.runRenderLoop(function () {
        scene.render();
    });
}

function getScene() {
    return scene;
}

export { name, scene, sceneData, launch };
