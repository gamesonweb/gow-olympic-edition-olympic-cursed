
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
    // Ajoutez une lumière hémisphérique
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Activer la physique sur la scène
    var physicsEngine = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), physicsEngine);
    scene.collisionsEnabled = true;


    var cube = BABYLON.MeshBuilder.CreateBox("redCube", { size: 2 }, scene);
    cube.position = new BABYLON.Vector3(0, 5, 0);
    // Ajouter une imposture de physique pour activer les collisions et définir la masse à 1 
    
    cube.physicsImpostor = new BABYLON.PhysicsImpostor(
        cube,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 1, friction: 0.5, restitution: 1, resolution: 0.1 },
        scene
    );
    var place = new CustomModels();
    //place.CreateObject3(0,0,3,scene);

    var tree = new CustomModels();
    tree.CreateTree3(0,0,3,scene);
    //tree.CreateTree(0,5,3)

    // Créer un sol
    
    var ground = BABYLON.Mesh.CreateGround("ground", 20, 20, 2, scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(
        ground,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0, friction: 0.5, restitution: 0.7 },
        scene
    );
    

    // Créer une sphère
    var sphere = BABYLON.Mesh.CreateSphere("sphere", 16, 2, scene);
    sphere.position = new BABYLON.Vector3(0, 10, 0); // Positionnez la sphère en hauteur
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
        sphere,
        BABYLON.PhysicsImpostor.SphereImpostor,
        { mass: 1, friction: 0.5, restitution: 0.7 },
        scene
    );

    // Créez un matériau pour le sol (par exemple, blanc)
    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5); // Couleur grise
    ground.material = groundMaterial;

    // Créez un matériau pour la sphère (par exemple, bleu)
    var sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial", scene);
    sphereMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1); // Couleur bleue
    sphere.material = sphereMaterial;
    
    var devcamera = new DevCamera(canvas, scene);
    var character = new CharacterController(canvas, scene,engine,cube);
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
