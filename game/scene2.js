
import CharacterController from './CharacterController.js';
import { CustomModels } from './CustomModels.js';
import DevCamera from '/DevCamera.js';
import PlayerCamera from '/PlayerCamera.js';
//import { SceneLoader } from "@babylonjs/core";
//import HavokPhysics from "@babylonjs/havok";

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
var name = "level2";



async function getInitializedHavok() {
  return await HavokPhysics();
}

async function sceneData() {
    
    // Ajoutez une lumière hémisphérique
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Activer la physique sur la scène
    //var physicsEngine = new BABYLON.CannonJSPlugin(true,10);
 
    const havokInstance = await HavokPhysics();
    // pass the engine to the plugin
    const hk = new BABYLON.HavokPlugin(true, havokInstance);
    ////var physicsEngine =  new BABYLON.HavokPlugin()
    
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0),  hk);
    scene.collisionsEnabled = true;
    

    var sceneprod = new CustomModels();
    sceneprod.plane(0,0,3,scene);
    
    var plane2 = new CustomModels();
    plane2.plane(0,0,-15,scene);


    var cube = BABYLON.MeshBuilder.CreateBox("blueCube", { size: 2 }, scene);
    cube.position = new BABYLON.Vector3(0, 5, 0);
    //material
    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1); // Rouge doux
    cube.material = groundMaterial;
    // Ajouter une imposture de physique pour activer les collisions et définir la masse à 1 
    /*
    cube.physicsImpostor = new BABYLON.PhysicsImpostor(
        cube,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 1, friction: 0.5, restitution: 1, resolution: 0.1 },
        scene
    );*/
    //var otherMesh = scene.getMeshByName("boundingBox");
    var tree = new CustomModels();
    tree.CreateTree(0,0,-15 );
    //var otherMesh = tree.CreateTree(0,0,-15 );
        let otherMesh;
    //get meshes
   // var otherMesh = scene.getMeshByName("boundingBox");
    //var otherMesh = scene.getMeshById(21);
    var mesh = scene.getMeshByName("blueCube");
    mesh.actionManager = new BABYLON.ActionManager(scene);
   
    console.log(otherMesh);
    console.log(mesh);

    //var devcamera = new DevCamera(canvas, scene);
    var character = new CharacterController(canvas, scene,engine,cube);
    // This creates and positions a free camera (non-mesh)



         

        /*
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function () {
                // Code à exécuter lors du clic sur l'objet
                console.log("enter")
            }
        )
    );
           
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnIntersectionEnterTrigger,
            function () {
                // Code à exécuter lors du clic sur l'objet
                console.log("enter")
            }
        )
    ); */
    
   
                /*
     // Définition de l'action avec OnIntersectionEnterTrigger
     mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
            parameter: {
                mesh: otherMesh, // mesh cible de l'intersection
                usePreciseIntersection: true // optionnel pour des calculs de collision plus précis
            }
        },
        function () {
            console.log("mesh1 a intersecté avec mesh2");
            // Ajoutez ici le code à exécuter lors de l'intersection
        }
        ));
            */
        // Détecter l'intersection dans la boucle de rendu
        /*
        scene.onBeforeRenderObservable.add(() => {
            if (mesh.intersectsMesh(otherMesh, true)) {
                // Code à exécuter lors de l'intersection
                console.log('mesh1 a intersecté avec mesh2');
            }
        });*/
       /*
        
        if (mesh.intersectsMesh(otherMesh,false)) {
            // Code à exécuter lors de l'intersection
            console.log('mesh1 a intersecté avec mesh2');
        }*/
    /*
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function () {
                // Code à exécuter lors du clic sur l'objet
                console.log("enter")
            }
        )
    );
         */ 
  //montrer le layer
   scene.debugLayer.show();
   

    var place = new CustomModels();
    //place.CreateObject3(0,0,3,scene);

   
       
 
    //tree.CreateObject(0,0,3);

    // Créer un sol
    
   

        
    
   
}



function launch() {
    sceneData();
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.attachControl(canvas, true);
    engine.runRenderLoop(function () {
        scene.render();
    });
}

function getScene() {
    return scene;
}

export { name, scene, sceneData, launch };
