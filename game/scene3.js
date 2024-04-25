var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
var name = "level3";

import { CustomModels } from './CustomModels.js';
import CharacterController2 from './CharacterController2.js';
import * as sceneManager from './SceneManager.js';
import PlayerLevel2 from './PlayerLevel2.js';

async function getInitializedHavok() {
    return await HavokPhysics();
}

async function sceneData() {
    //activer la physique sur la scene 

    const havokInstance = await HavokPhysics();
 

    // pass the engine to the plugin
    const hk = new BABYLON.HavokPlugin(true, havokInstance);


    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), hk);
    scene.collisionsEnabled = true;
    
   
    // Configurez une caméra
   
    // Ajoutez une lumière
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    


    // Créez un cube avec le matériau
  
    
    let player1 = new PlayerLevel2(scene,engine,"player1",'s','f', 10,15,0);
    let player2 = new PlayerLevel2(scene,engine,"player2",'k','m',0,10,0);



    //player2.position.x =0;
    //player2.position.y =0;
    //player2.position.z =0;

    //var devcamera = new DevCamera(canvas, scene);
    // Positionnez le cube où vous le souhaitez

    triggerEnd();
    eventHandler(hk);

    // Ajoutez l'événement de clic à la scène
    scene.onPointerDown = function (evt, pickResult) {
        onPointerDown(evt, pickResult);
    };

    var plane2 = new CustomModels(scene);
    plane2.CreatePlateform(0,0, -472,678);

   
    //scene.debugLayer.show();

}

function launch() {
   

    
   
    //var camera = new BABYLON.FollowCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    var camera = new BABYLON.FollowCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.cameraRotation = 0;
    camera.viewport = new BABYLON.Viewport(0.5, 0, 0.5, 0.5);
    
    
    var camera2 = new BABYLON.FollowCamera("camera2", new BABYLON.Vector3(-3, 5, -10), scene);
    camera2.cameraRotation = 0;
    camera2.viewport = new BABYLON.Viewport(0, 0, 0.5, 0.5); 
   
    //scene.activeCameras.push(camera);
    scene.activeCameras.push(camera2);
    scene.activeCameras.push(camera)



  

    



    


    //cam1
    sceneData().then(playerMesh => {
        let playerMesh2 = scene.getMeshByName("player2");
        console.log("MESH PLAYER2"+playerMesh2); // Utilisez playerMesh comme nécessaire

        let playerMesh1 = scene.getMeshByName("player1");
        //console.log("MESH PLAYER2"+playerMesh); // Utilisez playerMesh comme nécessaire
        
        camera.lockedTarget = playerMesh2;
        camera2.lockedTarget = playerMesh1;
        
    }).catch(error => {
        console.error(error);
    });


    engine.runRenderLoop(function () {
        scene.render();
    });
}

// Fonction appelée lorsqu'un clic est détecté
function onPointerDown(evt, pickResult) {
    if (pickResult.hit) {
        // Votre code d'interaction ici, par exemple, changez la couleur de l'objet
        if(pickResult.pickedMesh.name =="player"){

            pickResult.pickedMesh.material.diffuseColor = new BABYLON.Color3(0, 1, 0); // Vert
        }
       
    }
}



function catchPlayer(){
    
}

function createPlayer(x,y,z , input1,inputJump){

    var boxW = 2;
    var boxH = 2;
    var boxD = 2;
    
    var box = BABYLON.MeshBuilder.CreateBox("player", {width: boxW, height: boxH, depth: boxD},scene);
   
    box.rotationQuaternion = BABYLON.Quaternion.Identity();
    //box.position = new BABYLON.Vector3(0,5,0);
    box.position = new BABYLON.Vector3(x,y,z);
    var boxShape = new BABYLON.PhysicsShapeBox(new BABYLON.Vector3(0,0,0), BABYLON.Quaternion.Identity(), new BABYLON.Vector3(boxW, boxH, boxD), scene);
    var boxBody = new BABYLON.PhysicsBody(box, BABYLON.PhysicsMotionType.DYNAMIC, false, scene);

    boxBody.shape = boxShape;
    boxBody.setMassProperties({mass : 1})


    //add create material add tothe cube
    var blueMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    blueMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1); // Rouge doux
    box.material = blueMaterial;
   
    
    boxBody.setCollisionCallbackEnabled(true)
  
   
    
 

 
 
    

    //boxBody.applyForce()
    //let control = new CharacterController2(canvas,scene,engine,boxBody,'s',' ');
    let control = new CharacterController2(canvas,scene,engine,boxBody,input1,inputJump);
    return box;
}


function getScene() {
    return scene;
}


function triggerEnd(){

    const shapeBox1 = new BABYLON.PhysicsShapeBox(
        new BABYLON.Vector3(0, 0, 0),        // center of the box
        new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
        new BABYLON.Vector3(25, 2, 2000),      // dimensions of the box
        scene                                // scene of the shape
    );
    


    var boxW = 20;
    var boxH = 20;
    var boxD = 20;

    var box = BABYLON.MeshBuilder.CreateBox("Ending", {width: boxW, height: boxH, depth: boxD},scene);
    box.isVisible = false;

    box.position.x = 5,132;
    box.position.y = 11,546;
    box.position.z = -962,739;
        
        
  
    var Aggregate2 =new BABYLON.PhysicsAggregate(box, BABYLON.PhysicsShapeType.MESH, { mass: 0 }, scene);
    Aggregate2.shape.isTrigger =  true;

    
}


function eventHandler(hk){
    
    hk.onTriggerCollisionObservable.add((ev) => {
        // console.log(ev);
        console.log(ev.type, ':', ev.collider.transformNode.name, '-', ev.collidedAgainst.transformNode.name);
       
        if(ev.collidedAgainst.transformNode.name =="Ending"){
            console.log("YOU WINNNNNNN")
            killLevel();
            loadNextLevel();

        }
      
    });
}

function loadNextLevel(){
    
    sceneManager.launchLevel4();

}
function killLevel(){
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

    
    engine.stopRenderLoop();
}


export { name, scene, sceneData, launch };
