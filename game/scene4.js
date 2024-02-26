var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
var name = "level4";

import { CustomModels } from './CustomModels.js';
import CharacterController3 from './CharacterController3.js';
import PlayerLevel3 from './PlayerLevel3.js';

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


    //let player1 = new PlayerLevel3(scene,engine,"player1",'q','d','z',0,5,0)
    let player2 = new PlayerLevel3(scene,engine,"player2",'j','l','i',-5,5,0)
    
    player2.shootBall();
    
    //let player2 = new PlayerLevel3(scene,engine,"player2","ArrowLeft","ArrowRight","ArrowUp",-5,5,0)
    //CreateBowlingBall(0,6,0);

    model.CreatePlateform_Scene4();

    //raycast();
    
        

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
