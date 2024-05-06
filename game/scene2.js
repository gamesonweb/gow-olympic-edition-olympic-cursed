
import CharacterController from './CharacterController.js';
import { CustomModels } from './CustomModels.js';
import * as sceneManager from './SceneManager.js'
import {PlayerLevel1} from "./PlayerLevel1.js";
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
    let plane = sceneprod.plane(5,0,-45,25,150,scene);
  
   

    let x = -10;
    var pineTree = new CustomModels(scene);
    
    pineTree.CreatePineTree(0,3,-10+x);
    pineTree.CreatePineTree(10,3,-10+x);
    pineTree.CreatePineTree(15,3,-10+x);
    pineTree.CreatePineTree(-5,3,-10+x);
    var deadTrees = new CustomModels(scene);
    //deadTrees.createDeadTree(0,5,-20);

    var snowTrees = new CustomModels(scene);
    snowTrees.createSnowTree(0,4.5,-30+x);
    snowTrees.createSnowTree(5,4.5,-30+x);
    snowTrees.createSnowTree(15,4.5,-30+x);

    var snowLitleTrees = new CustomModels(scene);
    snowLitleTrees.createLitleSnowTree(-5,3,-50+x);
    snowLitleTrees.createLitleSnowTree(9,3,-50+x);
    snowLitleTrees.createLitleSnowTree(15,3,-50+x);


    var snowMan= new CustomModels(scene);
    snowMan.createSnowMan(0,-2.5,-70+x);
    snowMan.createSnowMan(-5,-2.5,-70+x);
    snowMan.createSnowMan(5,-2.5,-70+x);


 

  

  


    var ascendingRampe= new CustomModels(scene);

    ascendingRampe.CreateRampe1(10,-5,-100+x);

    //********************************************************** PART 2 LEVEL ******************************************************************************/////////////////

    //second plane 
    sceneprod.plane(5,-25,-250,25,230,scene);


    var rampe_1 = new CustomModels(scene);

    //rajout de neige
    var snowMount= new CustomModels(scene);
    
    snowMount.createSnowMount(0,-12,-150+x);
    snowMount.createSnowMount(11,-20,-210+x);
    snowMount.createSnowMount(0,-23,-255+x);
    snowMount.createSnowMount(11,-25.5,-290+x);
    
    //rajout d'une rampe
    ascendingRampe.CreateRampe1(-5,-34.5,-350+x);


    
    var tree2 = new CustomModels(scene);
    tree2.CreateTree(0,0,-10 );

    
    var plane2 = new CustomModels();
    sceneprod.plane(5,-25,-250,25,230,scene);

 //********************************************************** PART 3 LEVEL ******************************************************************************/////////////////
    //rajoute d'un plane 
    var plane3 = new CustomModels(scene);
    
    plane3.flatplane(5,-32,-445,25,100,scene);

    rampe_1.CreateRampe1(12,-32,-500);
    snowMan.createSnowMan(12,-28,-500);
    
    rampe_1.CreateRampe1(4,-32,-500);
    snowMan.createSnowMan(5,-28,-500);

    rampe_1.CreateRampe1(-4,-32,-500);

//********************************************************** PART 4 LEVEL ******************************************************************************/////////////////
    //rajoute d'un plane 
    var plane3 = new CustomModels(scene);
    
    plane3.flatplane(5,-28,-580,25,100,scene);

    rampe_1.CreateRampe1(12,-28,-630);

    snowMount.createSnowMount(4,-24,-630);

//********************************************************** PART 5 LEVEL ******************************************************************************/////////////////
    //rajoute d'un plane
    
    var plane3 = new CustomModels(scene);
    plane3.flatplane(5,-24,-750,25,200,scene);

    snowMan.createSnowTree(12,-20,-705);
    snowMount.createSnowTree(-4,-20,-705);

    snowMan.createSnowTree(12,-20,-715);
    snowMount.createSnowTree(-4,-20,-715);

    snowMan.createSnowTree(12,-20,-725);
    snowMount.createSnowTree(-4,-20,-725);
    
    snowMan.createSnowTree(12,-20,-735);
    snowMount.createSnowTree(-4,-20,-735);

    snowMan.createSnowTree(12,-20,-745);
    snowMount.createSnowTree(-4,-20,-745);

    snowMan.createSnowTree(12,-20,-755);
    snowMount.createSnowTree(-4,-20,-755);

    snowMan.createSnowTree(12,-20,-765);
    snowMount.createSnowTree(-4,-20,-765);

    snowMan.createSnowTree(12,-20,-770);
    snowMount.createSnowTree(-4,-20,-770);

    snowMan.createSnowTree(12,-20,-775);
    snowMount.createSnowTree(-4,-20,-775);


    snowMan.createSnowTree(12,-20,-785);
    snowMount.createSnowTree(-4,-20,-785);

    snowMan.createSnowTree(12,-20,-800);
    snowMount.createSnowTree(-4,-20,-800);

    snowMan.createSnowTree(12,-20,-810);
    snowMount.createSnowTree(-4,-20,-810);

    snowMan.createSnowTree(12,-20,-820);
    snowMount.createSnowTree(-4,-20,-820);

    snowMan.createSnowTree(12,-20,-830);
    snowMount.createSnowTree(-4,-20,-830);

    snowMan.createSnowTree(12,-20,-840);
    snowMount.createSnowTree(-4,-20,-840);

    rampe_1.CreateRampe1(4,-24,-850);

    //trigger to die and pass
    triggerDie();
   

    



   //testPlayer();

   let player = new PlayerLevel1(scene,engine,'player1','z','s','q','d',5,5,0);

   let player2 = new PlayerLevel1(scene,engine,'player2','i','k','j','l',0,5,0);

   triggerRespawn();
    displayMenu();
   //montrer le layer
   //scene.debugLayer.show();
   
   

    var place = new CustomModels(scene);
    place.createFinalScene2(4,-24,-970);
   
    
 

    
    let playerMesh = scene.getMeshByName("player1");
    //let playerMesh2 = scene.getMeshByName("player2");
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

function triggerDie(){

    const shapeBox1 = new BABYLON.PhysicsShapeBox(
        new BABYLON.Vector3(0, 0, 0),        // center of the box
        new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
        new BABYLON.Vector3(10, 10, 10),      // dimensions of the box
        scene                                // scene of the shape
    );
    

    let RainBowMesh = scene.getMeshByName("RainBow");

    var boxW = 2;
    var boxH = 2;
    var boxD = 2;

    var box = BABYLON.MeshBuilder.CreateBox("Ending", {width: boxW, height: boxH, depth: boxD},scene);
    box.isVisible = false;

    box.position.x = 2;
    box.position.y = -24;
    box.position.z = -1010;
    //box.position = BABYLON.Vector3(4,-24,-850);    
        
    var Aggregate =new BABYLON.PhysicsAggregate(box, shapeBox1, { mass: 0 },scene);
    Aggregate.shape.isTrigger =  true;

    
}

function triggerRespawn(){

    const shapeBox1 = new BABYLON.PhysicsShapeBox(
        new BABYLON.Vector3(0, 0, 0),        // center of the box
        new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
        new BABYLON.Vector3(25, 2, 2000),      // dimensions of the box
        scene                                // scene of the shape
    );
    


    var boxW = 100;
    var boxH = 2;
    var boxD = 2000;

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
        if(ev.collidedAgainst.transformNode.name =="tronc"){
                console.log("End OF the Game")
                reloadlevel();
               
                player = null;
        }
        if(ev.collidedAgainst.transformNode.name =="Ending"){
            console.log("YOU WINNNNNNN")
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
   /*
    var camera2 = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera2.attachControl(canvas);*/

    //camera2.cameraRotation = 0;
   
    //createCamPlayer and camera
    /*
    scene.meshes.forEach(function(mesh) {
        mesh.dispose();
    });*/
    
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
}

function reloadlevel(){
    let playerMesh = scene.getMeshByName("player1");
    let playerMesh2 = scene.getMeshByName("player2");

 

}

function loadNextLevel(){
    
    sceneManager.launchLevel3();

}

function displayMenu(){
    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI_textControl");



  

}

export { name, scene, sceneData, launch,killLevel };
