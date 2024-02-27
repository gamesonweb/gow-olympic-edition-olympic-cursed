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

  //let player2 = new PlayerLevel3(scene,engine,"player2","ArrowLeft","ArrowRight","ArrowUp",-5,5,0)
    
    let player1 = new PlayerLevel3(scene,engine,"player1",'q','d','s',' ',-5,5,0);
    let player2 = new PlayerLevel3(scene,engine,"player2",'j','l','i','Enter',0,5,0);
    //player2.shootBall();

    let ball1 = scene.getMeshByName("player1");
   
    
    //CreateBowlingBall(0,6,0);

    eventHandler(hk,player1,player2);

    model.CreatePlateform_Scene4();

    //raycast();
    
        

    let ball = scene.getMeshByName("ball");
    
    

    console.log(ball);
    
    triggerRespawn();
    

  
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


function triggerRespawn(){

    const shapeBox1 = new BABYLON.PhysicsShapeBox(
        new BABYLON.Vector3(0, 0, 0),        // center of the box
        new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
        new BABYLON.Vector3(30, 30, 10),      // dimensions of the box
        scene                                // scene of the shape
    );
    

    //let RainBowMesh = scene.getMeshByName("RainBow");

    var boxW = 2;
    var boxH = 2;
    var boxD = 2;

    var box = BABYLON.MeshBuilder.CreateBox("Respawn", {width: boxW, height: boxH, depth: boxD},scene);
    box.isVisible = false;

    box.position.x = 0;
    box.position.y = 2;
    box.position.z = 97,43;
    //box.position = BABYLON.Vector3(4,-24,-850);    
        
    var Aggregate =new BABYLON.PhysicsAggregate(box, shapeBox1, { mass: 0 },scene);
    Aggregate.shape.isTrigger =  true;
    

    
    //Aggregate.dispose();
    
}

function eventHandler(hk,player1,player2){
    
    hk.onTriggerCollisionObservable.add((ev) => {
        // console.log(ev);
        console.log(ev.type, ':', ev.collider.transformNode.name, '-', ev.collidedAgainst.transformNode.name);
       
        if(ev.collidedAgainst.transformNode.name =="Ending"){
            console.log("YOU WINNNNNNN")
            //killLevel();
            //loadNextLevel();
            player1 = null;
  

        }
        if(ev.collidedAgainst.transformNode.name =="Respawn"){
            console.log("YOU RESPAWNWNNN");

            if(ev.collider.transformNode.name == "player1"){
                let ball1 = scene.getMeshByName("player1");
         
                player1.disableThisObject();
                player1 = null;
                ball1.dispose();
            
     
            }else{
                let ball2 = scene.getMeshByName("player2");
                player2.disableThisObject();
                player2 = null;
                ball2.dispose()
              
            }
          
         

            
          
        }
    });
}


export { name, scene, sceneData, launch };
