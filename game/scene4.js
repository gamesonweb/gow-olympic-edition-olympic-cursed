var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
var name = "level4";

import { CustomModels } from './CustomModels.js';
import CharacterController3 from './CharacterController3.js';

async function sceneData() {
    //activer la physique sur la scene 

    const havokInstance = await HavokPhysics();


    // pass the engine to the plugin
    const hk = new BABYLON.HavokPlugin(true, havokInstance);


    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), hk);
    scene.collisionsEnabled = true;
       
    

    // Ajoutez une lumière
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Créez un matériau pour le cube (bleu)
    
    //var devcamera = new DevCamera(canvas, scene);
    // Positionnez le cube où vous le souhaitez
    
    

    var model = new CustomModels(scene);

    //model.CreateBowlingBall(0,12,0)

    //createPlayer(0,10,0,'d','q');
    createPlayer2(0,20,0,'d','q');

    CreateBowlingBall(0,6,0);

    model.CreatePlateform_Scene4();

    raycast();
    
        

    let ball = scene.getMeshByName("ball");
    
    

    console.log(ball);
    
    

  
    scene.debugLayer.show();


}

function launch() {
       
    // Configurez une caméra
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl();

    sceneData();
    engine.runRenderLoop(function () {
        scene.render();
    });
}

function getScene() {
    return scene;
}


function createPlayer(x,y,z , inputRight,inputLeft){

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
    let control = new CharacterController3(canvas,scene,engine,boxBody, inputRight,inputLeft);
    return box;
}


function createPlayer2(x,y,z , inputRight,inputLeft){

    var boxW = 2;
    var boxH = 2;
    var boxD = 2;
    
    //var box = BABYLON.MeshBuilder.CreateBox("player", {width: boxW, height: boxH, depth: boxD},scene);
    let box = CreateBowlingBall(x,y,z);
    //let box = scene.getMeshByName("player");
   
   
    //box.position = new BABYLON.Vector3(0,5,0);
    box.position = new BABYLON.Vector3(x,y,z);
    //var boxShape = new BABYLON.PhysicsShapeBox(new BABYLON.Vector3(0,0,0), BABYLON.Quaternion.Identity(), new BABYLON.Vector3(boxW, boxH, boxD), scene);
    var sphereshape = new BABYLON.PhysicsShapeSphere(new BABYLON.Vector3(0,0,0), 15,scene);
    var boxBody = new BABYLON.PhysicsBody(box, BABYLON.PhysicsMotionType.DYNAMIC, false, scene);

    //boxBody.shape = sphereshape;
    //boxBody.setMassProperties({mass : 1})


 /*
   
    
    boxBody.setCollisionCallbackEnabled(true)
  
   
    
 

 
 
    

    //boxBody.applyForce()
    //let control = new CharacterController2(canvas,scene,engine,boxBody,'s',' ');
    let control = new CharacterController3(canvas,scene,engine,boxBody, inputRight,inputLeft);*/
    return box;
}

function raycast() {
    // Get the player mesh by name
    var playerMesh = scene.getMeshByName("player");
    // Ensure the player mesh exists
    if (!playerMesh) {
        console.error("Player mesh not found");
        return;
    }
    // Get the player's position
    var rayOrigin = playerMesh.position;
    // Set the ray direction along the positive Z-axis
    var rayDirection = new BABYLON.Vector3(0, 0, 1);
    // Set the ray length
    var rayLength = 50;
    // Calculate the destination point of the ray
    var rayDestination = rayOrigin.add(rayDirection.scale(rayLength));
    // Create the ray
    var ray = new BABYLON.Ray(rayOrigin, rayDirection, rayLength);
    // Create a ray helper for visualization (optional)
    var rayHelper = new BABYLON.RayHelper(ray);
    rayHelper.show(scene, new BABYLON.Color3(0.9, 0, 0));
    // Perform raycasting or any other actions with the ray
    // Example: Check if the ray intersects with a mesh
    var hit = scene.pickWithRay(ray);
    /*
    if (hit.pickedMesh) {
        console.log("Ray hits:", hit.pickedMesh.name);
        // Do something with the intersected mesh
    }*/
}

function CreateBowlingBall(x, y, z) {
    let tree;
    let boundingBox;
    let tronc;
    var mesh 
    BABYLON.SceneLoader.ImportMesh("", "./models/", "Spiky Ball.glb", scene, (meshes) => {
        console.log("Chargement réussi ball", meshes);
    
        mesh = meshes[0];
      
        mesh.name ="ball"
        
    

        mesh.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
        
        //var troncAggregate =new BABYLON.PhysicsAggregate(mesh, BABYLON.PhysicsShapeType.SPHERE, { mass: 0 }, this.scene);
     
    
    }, undefined, undefined, ".glb");



    return {mesh};
}





export { name, scene, sceneData, launch };
