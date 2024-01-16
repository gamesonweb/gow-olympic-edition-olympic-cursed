
import CharacterController from './CharacterController.js';
import { CustomModels } from './CustomModels.js';
import { TriggerEvent } from './trigger.js';
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
    
    // Ajoutez une lumière hémisphériques
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    
    const havokInstance = await HavokPhysics();
    // pass the engine to the plugin
    const hk = new BABYLON.HavokPlugin(true, havokInstance);
   
    
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0),  hk);
    scene.collisionsEnabled = true;
    

    var sceneprod = new CustomModels(scene);
    sceneprod.plane(0,0,-10,50,50,scene);

    var tree = new CustomModels(scene);
    tree.CreateTree(0,0,-15 );

    
    var plane2 = new CustomModels();

    

    //testPlayer()
    //let player =testPlayer();
    testPlayer();
   //CreateTree(0,0,-15);
   
    

    //var devcamera = new DevCamera(canvas, scene);
   
    // This creates and positions a free camera (non-mesh)

  //montrer le layer
   scene.debugLayer.show();
   

    var place = new CustomModels();
    //place.CreateObject3(0,0,3,scene);

   
       
 
    //tree.CreateObject(0,0,3);

    // Créer un sol

    /*
    hk.onCollisionObservable.add((ev) => {
        console.log(ev.type);
    });*/ 
   
    //let playerMesh = scene.getMeshByUniqueId(6);
    
    let playerMesh = scene.getMeshByName("player");
    //console.log(scene.getMeshByName("player"));
    //console.log(scene.getMeshByUniqueId(6));
    
    eventHandler(hk);
   return playerMesh;
}





function getScene() {
    return scene;
}

function testphysics2(){
   
    var boxW = 2;
    var boxH = 2;
    var boxD = 2;
    var box = BABYLON.MeshBuilder.CreateBox("blueCube", {width: boxW, height: boxH, depth: boxD});
    box.rotationQuaternion = BABYLON.Quaternion.Identity();

    var boxShape = new BABYLON.PhysicsShapeBox(new BABYLON.Vector3(0,0,0), BABYLON.Quaternion.Identity(), new BABYLON.Vector3(boxW, boxH, boxD), scene);
    var boxBody = new BABYLON.PhysicsBody(box, BABYLON.PhysicsMotionType.DYNAMIC, false, scene);

    boxBody.shape = boxShape;
    boxBody.setMassProperties({mass : 1})

    // Apply a vertical force on all the 3 spheres
    boxBody.applyForce(new BABYLON.Vector3(500, 500, 0), new BABYLON.Vector3(0, 0, 0));
}
function testPlayer(){
    var boxW = 2;
    var boxH = 2;
    var boxD = 2;
    
    var box = BABYLON.MeshBuilder.CreateBox("player", {width: boxW, height: boxH, depth: boxD});
   
    box.rotationQuaternion = BABYLON.Quaternion.Identity();
    box.position = new BABYLON.Vector3(0,5,0);
    var boxShape = new BABYLON.PhysicsShapeBox(new BABYLON.Vector3(0,0,0), BABYLON.Quaternion.Identity(), new BABYLON.Vector3(boxW, boxH, boxD), scene);
    var boxBody = new BABYLON.PhysicsBody(box, BABYLON.PhysicsMotionType.DYNAMIC, false, scene);

    boxBody.shape = boxShape;
    boxBody.setMassProperties({mass : 1})

    // Apply a vertical force on all the 3 spheres
    //boxBody.applyForce(new BABYLON.Vector3(500, 500, 0), new BABYLON.Vector3(0, 0, 0));

    //add create material add tothe cube
    var blueMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    blueMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1); // Rouge doux
    box.material = blueMaterial;
   
    
    boxBody.setCollisionCallbackEnabled(true)
    console.log("j'ai loaded");
    box.computeWorldMatrix(true);
    box.getDirection(BABYLON.Axis.Z);
    // Obtenez la matrice de transformation mondiale de l'objet
    var worldMatrix = box.getWorldMatrix();

    // Obtenez la direction vers l'avant en fonction de la rotation
    var forwardDirection = new BABYLON.Vector3(0, 0, 1);
    var localForward = BABYLON.Vector3.TransformNormal(forwardDirection, worldMatrix);
    
    // Normalisez la direction et appliquez une force
    localForward.normalize();
    let control = new CharacterController(canvas,scene,engine,boxBody,localForward);
    //box.forward;

    scene.addMesh(box);
    return box;

    
}

// Crée un modèle d'arbre 3D et le positionne aux coordonnées spécifiées (x, y, z)
function CreateTree(x, y, z) {
    let tree;
    let boundingBox;
    let tronc;
   
    BABYLON.SceneLoader.ImportMesh("", "./models/", "Tree.glb", scene, (meshes) => {
        console.log("Chargement réussi arbre", meshes);
     
        tree = meshes[0];
        tronc = meshes[1];
        tronc.name ="tronc"
        
       
        tree.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
        
        

        var troncAggregate =new BABYLON.PhysicsAggregate(tronc, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);
        troncAggregate.shape.isTrigger =  true;

        
        var troncAggregate2 =new BABYLON.PhysicsAggregate(tronc, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);
        //troncAggregate.shape.isTrigger =  true;

        /*
        const observable = plugin.onTriggerCollisionObservable;
        const observer = observable.add((collisionEvent) => {
            if (collisionEvent.type === "TRIGGER_ENTERED") {
                // do something when the trigger is entered
                console.log("i entered");
            } else {
                // do something when trigger is exited
            }
        });*/
        
    
       //return boundingBox;
      
    }, undefined, undefined, ".glb");

 

    return { boundingBox };
}

function eventHandler(hk){
    
    hk.onTriggerCollisionObservable.add((ev) => {
        // console.log(ev);
        console.log(ev.type, ':', ev.collider.transformNode.name, '-', ev.collidedAgainst.transformNode.name);
        if(ev.collidedAgainst.transformNode.name =="tronc"){
                console.log("End OF the Game")
        }
    });
}

function launch() {
   /*
    var camera2 = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera2.attachControl(canvas);*/
    //camera2.cameraRotation = 0;
    
   //createCamPlayer
    var camera = new BABYLON.FollowCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.cameraRotation = 0;
   
        
 
    sceneData().then(playerMesh => {
        console.log(playerMesh); // Utilisez playerMesh comme nécessaire
    
        camera.lockedTarget = playerMesh;
        
    }).catch(error => {
        console.error(error);
    });
        //createCamPlayer
    


    engine.runRenderLoop(function () {
        scene.render();
    });
}

export { name, scene, sceneData, launch };
