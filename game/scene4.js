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
    createPlayer(-20,10,0,'d','q');
    model.CreatePlateform_Scene4();

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


export { name, scene, sceneData, launch };
