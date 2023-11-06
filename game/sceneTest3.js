
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
   
    
    //activer la physique sur la scene 
    var physicsEngine = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), physicsEngine);
    scene.collisionsEnabled = true;
   
    

   // Configurez une caméra
    //var camera =createCamera();
    //var camera = new DevCamera(canvas, scene);
    
    var map = new CustomModels(); 
    map.CreateObject(0,-1,0)

    var tree = new CustomModels();
    tree.CreateTree(10,1,0)
    

    
    var tree = new CustomModels();
    tree.CreateTree(5,1,3)
    //map.CreateObject();

    // Ajoutez une lumière
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Créez un matériau pour le cube (bleu)
    var material = new BABYLON.StandardMaterial("redMaterial", scene);
    material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Couleur rouge
    
   
    // Créez un cube avec le matériau
    var cube = BABYLON.MeshBuilder.CreateBox("redCube", { size: 2 }, scene);
    // Ajouter une imposture de physique pour activer les collisions et définir la masse à 1 
    /*
    cube.physicsImpostor = new BABYLON.PhysicsImpostor(
        cube,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0, friction: 0.5, restitution: 1, resolution: 0.1 },
        scene
    );*/
    cube.material = material;
/*

    var cube2 = BABYLON.MeshBuilder.CreateBox("redCube", { size: 2 }, scene);
    cube2.position = new BABYLON.Vector3(0, 1.1, 0);
    // Ajouter une imposture de physique pour activer les collisions et définir la masse à 1
    cube2.physicsImpostor = new BABYLON.PhysicsImpostor(
        cube2,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0, friction: 0.5, restitution: 1, resolution: 0.1 },
        scene
    );
   

*/
    //physique cube 

    // Récupérer l'abstract mesh
    //var mesh = cube.getMeshUniformBuffer();
    // Afficher les informations de l'abstract mesh
    

   
    // Positionnez le cube où vous le souhaitez
    //floor.position = new BABYLON.Vector3(0, cube.position.y - 1, 0);
    cube.position = new BABYLON.Vector3(0, 1.1, 0);
    // map.position = new BABYLON.Vector3(0, 110, 0);
    console.log(cube.position);

    var camera = new PlayerCamera(canvas, scene,engine,cube);
    camera.checkCollisions = true
    //var devcamera = new DevCamera(canvas,scene)
    var character = new CharacterController(canvas, scene,engine,cube);
    //character.setupKeyboardInput();
    //camera.setupKeyboardInput();
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
