
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
    

    var sceneprod = new CustomModels();
    sceneprod.plane(0,0,-10,10,50,scene);
    
    var plane2 = new CustomModels();



    //testPlayer()
    let player =testPlayer();
    
    
    var tree = new CustomModels();
    tree.CreateTree(0,0,-15 );

      

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
   
    let playerMesh = scene.getMeshByUniqueId(6);
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
    let control = new CharacterController(canvas,scene,engine,boxBody);
    //boxBody.setAngularVelocity(new BABYLON.Vector3(0, 0, 0))
    //setCollisioncallback
    /*
    const constraint = new BABYLON.LockConstraint(box,{
        rotation: {
          x: false,
          y: false,
          z: false
        }
    },scene);
    */

    boxBody.setCollisionCallbackEnabled(true)
    //boxBody.addConstraint(constraint);

    
    return box;

    
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
   

   //createCamPlayer
    var camera = new BABYLON.FollowCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.cameraRotation = 0;
   
        
 
    sceneData().then(playerMesh => {
        console.log(playerMesh); // Utilisez playerMesh comme nécessaire
    
        camera.lockedTarget = playerMesh;
        
    }).catch(error => {
        console.error(error);
    });


    engine.runRenderLoop(function () {
        scene.render();
    });
}

export { name, scene, sceneData, launch };
