
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
    sceneprod.plane(0,0,-45,40,100,scene);

    var tree = new CustomModels(scene);
    tree.CreateTree(0,0,-15 );
    /*
    var tree2 = new CustomModels(scene);
    tree2.CreateTree(0,0,-10 );*/

    
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
    
    var box = BABYLON.MeshBuilder.CreateBox("player", {width: boxW, height: boxH, depth: boxD},scene);
   
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

    let forwardVector = getForwardVector(box);
    console.log("forward vector"+forwardVector);
    
    
    let localRotation = box.rotationQuaternion;

   
    //box.forward;
    console.log("test"+box.forward);

    // Obtenir la direction avant du mesh
    var forward = box.forward;
    // Appliquer une impulsion dans la direction avant
    var force = forward.scale(-5); // Ajustez la magnitude de la force selon les besoins
    var contactPoint = box.getAbsolutePosition();
    //boxBody.applyImpulse(force, contactPoint);
    //boxBody.applyForce(force, contactPoint);
    console.log(    boxBody.getAngularVelocity());
    console.log(   boxBody.getAngularDamping());
    //boxBody.applyForce(box.forward);
    //boxBody.applyForce(new BABYLON.Vector3(box.forward._x, box.forward._y, box.forward._z), new BABYLON.Vector3(0, 0, 0));
    

    //boxBody.applyForce()
    let control = new CharacterController(canvas,scene,engine,boxBody,forward,contactPoint);
    return box;

    
}
function getForwardVector(_mesh) {
    _mesh.computeWorldMatrix(true);
    var forward_local = new BABYLON.Vector3(0, 0, 1);
    let worldMatrix = _mesh.getWorldMatrix();
    return BABYLON.Vector3.TransformNormal(forward_local, worldMatrix);
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
