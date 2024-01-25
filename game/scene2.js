
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
    let plane = sceneprod.plane(5,0,-45,25,100,scene);
    
   

    var tree = new CustomModels(scene);
    //tree.CreateTree(0,5,-15 );
    let x = -10;
    var pineTree = new CustomModels(scene);
    var pineTree2 = new CustomModels(scene);
    var pineTree3 = new CustomModels(scene);
    var pineTree4 = new CustomModels(scene);

    pineTree.CreatePineTree(0,3,-10+x);
    pineTree2.CreatePineTree(10,3,-10+x);
    pineTree.CreatePineTree(15,3,-10+x);
    pineTree.CreatePineTree(-5,3,-10+x);
    var deadTrees = new CustomModels(scene);
    //deadTrees.createDeadTree(0,5,-20);

    var snowTrees = new CustomModels(scene);
    var snowTrees2 = new CustomModels(scene);
    var snowTrees3 = new CustomModels(scene);
    var snowTrees4 = new CustomModels(scene);

    snowTrees.createSnowTree(0,4.5,-30+x);
    snowTrees2.createSnowTree(5,4.5,-30+x);
    //snowTrees3.createSnowTree(10,6,-30);
    snowTrees4.createSnowTree(15,4.5,-30+x);

    var snowLitleTrees = new CustomModels(scene);
    snowLitleTrees.createLitleSnowTree(-5,3.5,-45+x);
    snowLitleTrees.createLitleSnowTree(9,3.5,-45+x);
    snowLitleTrees.createLitleSnowTree(15,3.5,-45+x);


    var snowMan= new CustomModels(scene);
    //snowMan.createSnowMan(0,1,-50+x);
    snowMan.createSnowMan(0,-2.5,-60+x);
    snowMan.createSnowMan(-5,-2.5,-60+x);
    snowMan.createSnowMan(5,-2.5,-60+x);

    var rampe_1 = new CustomModels(scene);
    //rampe_1.CreateRampe1(-10,1,-40);
   
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


    //add create material add tothe cube
    var blueMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    blueMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1); // Rouge doux
    box.material = blueMaterial;
   
    
    boxBody.setCollisionCallbackEnabled(true)
  
   
    
 

 
 
    

    //boxBody.applyForce()
    let control = new CharacterController(canvas,scene,engine,boxBody);
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
    
    var camera2 = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera2.attachControl(canvas);

    //camera2.cameraRotation = 0;
   
    //createCamPlayer and camera
    /*
    var camera = new BABYLON.FollowCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.cameraRotation = 0;*/
   
        
 
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
