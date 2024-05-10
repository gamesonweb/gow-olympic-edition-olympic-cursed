
import CharacterController from './CharacterController.js';
import { CustomModels } from './CustomModels.js';

import {PlayerLevel1} from "./PlayerLevel1.js";
import * as sceneManager from './SceneManager.js';
let advancedTexture ;

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
var name = "level2";
var value = "start";     
//var player = new PlayerLevel1(scene);

async function getInitializedHavok() {
  return await HavokPhysics();
}

async function sceneData() {
    //displayControlUI();
    // Ajoutez une lumière hémisphériques
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    
    const havokInstance = await HavokPhysics();
    // pass the engine to the plugin
    const hk = new BABYLON.HavokPlugin(true, havokInstance);
   
    

    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0),  hk);
    scene.collisionsEnabled = true;
    

    var sceneprod = new CustomModels(scene);
    //PART 1 LEVEL
    
    //first plane 
    //let plane = sceneprod.plane(5,0,-45,25,150,scene);
  
   

    let x = -10;


//********************************************************** PART 5 LEVEL ******************************************************************************/////////////////
    //rajoute d'un plane
    


    //trigger to die and pass
    triggerDie(-1.79, -1.02, -832.37);
    

    

    displayControlUI();

   //testPlayer();

   let player = new PlayerLevel1(scene,engine,'player1','z','s','q','d',5,160,0);

   let player2 = new PlayerLevel1(scene,engine,'player2','ArrowUp','ArrowDown','ArrowLeft','ArrowRight',0,160,0);

   triggerRespawn(2,-45,200);
    
   //montrer le layer
   //scene.debugLayer.show();
   
   

    var place = new CustomModels(scene);
    //place.createFinalScene2(4,-24,-970);
   
    place.Createlevel1(0,0,-800)
    
 

    
    let playerMesh = scene.getMeshByName("player1");
    //let playerMesh2 = scene.gezzzzzzztMeshByName("player2");
    //console.log(scene.getMeshByName("player"));
    //console.log(scene.getMeshByUniqueId(6));
    
    eventHandler(hk,player);
   return playerMesh;
}





function getScene() {
    return scene;
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


    //add create material add tothe cube
    var blueMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    blueMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1); // Rouge doux
    box.material = blueMaterial;
   
    
    boxBody.setCollisionCallbackEnabled(true)
  
   
    
 

 
 
    

    //boxBody.applyForce()
    let control = new CharacterController(canvas,scene,engine,boxBody);
    return box;

    
}

function triggerDie(x,y,z){

    const shapeBox1 = new BABYLON.PhysicsShapeBox(
        new BABYLON.Vector3(0, 0, 0),        // center of the box
        new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
        new BABYLON.Vector3(40, 40, 40),      // dimensions of the box
        scene                                // scene of the shape
    );
    

    let RainBowMesh = scene.getMeshByName("RainBow");

    var boxW = 2;
    var boxH = 2;
    var boxD = 2;

    var box = BABYLON.MeshBuilder.CreateBox("Ending", {width: boxW, height: boxH, depth: boxD},scene);
    box.isVisible = false;

    box.position.x = x;
    box.position.y = y;
    box.position.z = z;
    //box.position = BABYLON.Vector3(4,-24,-850);    
        
    var Aggregate =new BABYLON.PhysicsAggregate(box, shapeBox1, { mass: 0 },scene);
    Aggregate.shape.isTrigger =  true;

    
}

function triggerRespawn(x,y,z){

    const shapeBox1 = new BABYLON.PhysicsShapeBox(
        new BABYLON.Vector3(0, 0, 0),        // center of the box
        new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
        new BABYLON.Vector3(25, 2, 2000),      // dimensions of the box
        scene                                // scene of the shape
    );
    


    var boxW = x;
    var boxH = y;
    var boxD = z;

    var box = BABYLON.MeshBuilder.CreateBox("Die", {width: boxW, height: boxH, depth: boxD},scene);
    box.isVisible = false;

    box.position.x = 2;
    box.position.y = -45;
    box.position.z = -800;
        
        
  
    var Aggregate2 =new BABYLON.PhysicsAggregate(box, BABYLON.PhysicsShapeType.MESH, { mass: 0 }, scene);
    Aggregate2.shape.isTrigger =  true;

    
}



function eventHandler(hk,player){
    
    hk.onTriggerCollisionObservable.add((ev) => {
        // console.log(ev);
        console.log(ev.type, ':', ev.collider.transformNode.name, '-', ev.collidedAgainst.transformNode.name);
        if(ev.collider.transformNode.name =="player1" && ev.collidedAgainst.transformNode.name == "Ending"){
            console.log("PLAYER 111111 PASSSSSS")
            sceneManager.setcountPlayer1()
            console.log("COUNT_WIN PLAYER1:"+sceneManager.winCountPlayer1)
        }
        if(ev.collider.transformNode.name =="player2" && ev.collidedAgainst.transformNode.name == "Ending"){
            console.log("PLAYER 2 PASSSSSS")
            sceneManager.setcountPlayer2()
            console.log("COUNT_WIN PLAYER2"+sceneManager.winCountPlayer2)
        }
        if(ev.collidedAgainst.transformNode.name =="tronc"){
                console.log("End OF the Game")
                reloadlevel();
               
                player = null;
}      
        if(ev.collidedAgainst.transformNode.name =="Ending"){

            console.log("COUNT_WIN PLAYER1:"+sceneManager.winCountPlayer1+"  COUNT_WIN PLAYER2"+sceneManager.winCountPlayer2)
           //console.log("YOU WINNNNNNN")
            killLevel();
            loadNextLevel();
            player = null;
  

        }
        if(ev.collidedAgainst.transformNode.name =="Die"){
            console.log("YOU DIEEEEEEEEEE");
            value = "death";
            reloadlevel();
            player = null;
           
            //return "death";
        }
    });
}

function launch() {
 
    
    var camera = new BABYLON.FollowCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.cameraRotation = 0;
    camera.viewport = new BABYLON.Viewport(0, 0, 0.5, 0.5);
    
    
    var camera2 = new BABYLON.FollowCamera("camera2", new BABYLON.Vector3(0, 5, -10), scene);
    camera2.cameraRotation = 0;
    camera2.viewport = new BABYLON.Viewport(0.5, 0, 0.5, 0.5); 
   
    scene.activeCameras.push(camera);
    scene.activeCameras.push(camera2);

    //cam1
    sceneData().then(playerMesh => {
        let playerMesh2 = scene.getMeshByName("player2");
        console.log(playerMesh); // Utilisez playerMesh comme nécessaire
        
        camera.lockedTarget = playerMesh;
        camera2.lockedTarget = playerMesh2;
        
    }).catch(error => {
        console.error(error);
    });

    
       
 
    engine.runRenderLoop(function () {
       //console.log(value)
       scene.render();
       
     
    });
    
   
}
function killLevel(player){
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
    hideControlUI();
}

function reloadlevel(){
    let playerMesh = scene.getMeshByName("player1");
    let playerMesh2 = scene.getMeshByName("player2");

 

}

function loadNextLevel(){
    
    sceneManager.launchLevel3();

}

function displayControlUI(){
  
   // Récupération de l'élément par son ID
   var level1 = document.getElementById("level1");

   // Afficher l'élément
   level1.style.display = "block";

}
function hideControlUI(){
       // Récupération de l'élément par son ID
   var level1 = document.getElementById("level1");

   // Afficher l'élément
   level1.style.display = "none";

}

export { name, scene, sceneData, launch,killLevel };
