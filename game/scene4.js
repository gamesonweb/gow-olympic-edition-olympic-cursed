var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
var name = "level4";

import { CustomModels } from './CustomModels.js';
import CharacterController3 from './CharacterController3.js';
import PlayerLevel3 from './PlayerLevel3.js';
import BowlingPin from './BowlingPin.js';
let player1;
let player2;

let countPlayer1 =0;
let countPlayer2 =0;



async function sceneData() {
    //activer la physique sur la scene 

    const havokInstance = await HavokPhysics();


    // pass the engine to the plugin
    const hk = new BABYLON.HavokPlugin(true, havokInstance);


    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), hk);
    scene.collisionsEnabled = true;
       
    

    // Ajoutez une lumière
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

   

    var model = new CustomModels(scene);
    
    var listeQuilles1 = [];

    

    let add =13 ;
    var listeQuilles2 = [];
   
    
    
   
   // console.log(countPlayer1);
 

    //model.CreateBowlingBall(0,12,0)

  //let player2 = new PlayerLevel3(scene,engine,"player2","ArrowLeft","ArrowRight","ArrowUp",-5,5,0)

 
   // console.log(countPlayer1);
     player1 = new PlayerLevel3(scene,engine,"player1",'q','d','s',' ',0,8,0);
     player2 = new PlayerLevel3(scene,engine,"player2",'j','l','i','Enter',28,8,0);

     //let pin = new BowlingPin(scene,0,2,19.397);
    
   
    let ball1 = scene.getMeshByName("player1");
    
    
    //CreateBowlingBall(0,6,0);

    eventHandler(hk,player1,player2);

    model.CreatePlateform_Scene4();
    listeQuilles1 =  addQuille(listeQuilles1,0,0,-10);
    listeQuilles2 =  addQuille(listeQuilles2,28,0,-10);

    testSearch(listeQuilles1,countPlayer1,"player1");
    testSearch(listeQuilles2,countPlayer2,"player2");

    
        

    let ball = scene.getMeshByName("ball");
    
    

  

    //trigger Player1
    triggerRespawn(0,2,97.43,30, 30, 10);
    triggerRespawn(7.5,2,48,1, 30,90);
    triggerRespawn(-7.5,2,48,1, 30,90);

    //trigger Player2
    triggerRespawn(30,2,97.43,30, 30, 10);
    triggerRespawn(20,2,48,1, 30,90);
    triggerRespawn(35.5,2,48,1, 30,90);

   
    
    //scene.debugLayer.show();


}

function launch() {
      
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.inertia = 0;
    camera.angularSensibility = 0;
    camera.detachControl(canvas);
    camera.cameraRotation = 0;
    scene.activeCameras.push(camera);
    camera.viewport = new BABYLON.Viewport(0, 0, 0.5, 1);
    scene.activeCameras.push(camera);


    var camera2 = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(27, 5, -10), scene);
    camera2.inertia = 0;
    camera2.angularSensibility = 0;
    camera2.detachControl(canvas);
    camera2.cameraRotation = 0;
    scene.activeCameras.push(camera2);
    camera2.viewport = new BABYLON.Viewport(0.5,0 , 0.5, 1);
    scene.activeCameras.push(camera2);
    /*
    var camera2 = new BABYLON.FollowCamera("camera2", new BABYLON.Vector3(0, 5, -10), scene);
    camera2.cameraRotation = 0;
    camera2.viewport = new BABYLON.Viewport(0.5, 0.5, 0.5, 0.5); 
    scene.activeCameras.push(camera2);*/
 
   

    sceneData();
  

    let playerMesh = scene.getMeshByName("player1");
    let playerMesh2 = scene.getMeshByName("player2");
    console.log(playerMesh2);
    //console.log(playerMesh); // Utilisez playerMesh comme nécessaire
    
    camera.lockedTarget = playerMesh;
    //camera2.lockedTarget = playerMesh2;

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


function triggerRespawn(x,y,z,sizeX,sizeY,sizeZ){

    const shapeBox1 = new BABYLON.PhysicsShapeBox(
        new BABYLON.Vector3(0, 0, 0),        // center of the box
        new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
        new BABYLON.Vector3(sizeX,sizeY,sizeZ),      // dimensions of the box
        scene                                // scene of the shape
    );
    

    //let RainBowMesh = scene.getMeshByName("RainBow");

    var boxW = 2;
    var boxH = 2;
    var boxD = 2;

    var box = BABYLON.MeshBuilder.CreateBox("Respawn", {width: boxW, height: boxH, depth: boxD},scene);
    box.isVisible = false;

    box.position.x = x;
    box.position.y = y;
    box.position.z = z;
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

        if(ev.collidedAgainst.transformNode.name =="Respawn" && ( ev.collider.transformNode.name == "player1" || ev.collider.transformNode.name == "player2" ) ){
            console.log("YOU RESPAWNWNNN");

            if(ev.collider.transformNode.name == "player1"){
                let ball1 = scene.getMeshByName("player1");
         
                player1.disableThisObject();
                //player1 = null;
                ball1.dispose();
                
                player1 = new PlayerLevel3(scene,engine,"player1",'q','d','s',' ',-5,5,0);
            
     
            }else{
                let ball2 = scene.getMeshByName("player2");
                player2.disableThisObject();
                //player2 = null;
                ball2.dispose()

                player2= new PlayerLevel3(scene,engine,"player2",'j','l','i','Enter',28,5,0);
              
            }
          
         

            
          
        }
     
    });

   //pinsCount(hk);

   
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



function pinsCount(hk){

    hk.onCollisionObservable.add((ev) => {
        //console.log(ev.type);
        //console.log(ev.type, ':', ev.collider.transformNode.name, '-', ev.collidedAgainst.transformNode.name);
       //check if Pin is collided add count to counter of the player
   
       if(ev.collidedAgainst.transformNode.name =="Pin" ){
            //console.log("YOU collide a pin");
            let uniqueId =ev.collidedAgainst.transformNode.uniqueId;
            //console.log(ev.collidedAgainst.transformNode.uniqueId);
            //list.push();
            if(ev.collider.transformNode.name == "player2"){

                //console.log("player1 IS ON THE PLACE")

                testSearch(uniqueId);
              
                countPlayer1++;
                console.log(countPlayer1);
                
            }
      
        }
});

}

async function testSearch(listeQuilles1,countPlayer1,playerText){

 
    engine.runRenderLoop(async () => {

        for(let i=0;i<listeQuilles1.length; i++){
            const meshIdQuille = await listeQuilles1[i].getMeshId();
            const quille =  listeQuilles1[i];
            //console.log(meshIdQuille);
            /*
            if(meshIdQuille == id){
                
                quille.disableThisObject();
            
            }*/
            if(!quille.isPinUp()){
                countPlayer1++;
                
                listeQuilles1.splice(i, 1);

                // Décrémenter i pour compenser la suppression de l'élément
                i--;
                    
            };
        }
        console.log("compteur "+playerText+" " +countPlayer1);




    })
   
  
    
 
}


function addQuille( listeQuilles1,x,y,z){


    listeQuilles1 = [
        //-3
        new BowlingPin(scene, 0.25+x, 2+y,21+z),
        //-2
             
        //new BowlingPin(scene, 0, 2, 21.5),
       
        
        new BowlingPin(scene, 0+x, 2+y,21.5+z),
        new BowlingPin(scene, 0.50+x, 2+y,21.5+z),
        //new BowlingPin(scene, 0.60, 2,21.5),
      


        //-1
        
        new BowlingPin(scene, 0+x, 2+y, 22+z),
       
        
        new BowlingPin(scene, 0.25+x, 2+y, 22+z),
        new BowlingPin(scene, 0.60+x, 2+y,22+z),
        
      


        //0
        new BowlingPin(scene, -0.5+x, 2+y, 22.5+z),
       
        
        new BowlingPin(scene, 0+x, 2+y, 22.5+z),
        new BowlingPin(scene, 0.5+x, 2+y,22.5+z),
        new BowlingPin(scene, 1+x, 2+y,22.5+z),
        
        //1
        new BowlingPin(scene, -0.5+x, 2+y, 23+z),
        new BowlingPin(scene, -1+x, 2+y, 23+z),
       
        
        new BowlingPin(scene, 0+x, 2+y, 23+z),
        new BowlingPin(scene, 0.5+x, 2+y,23+z),
        new BowlingPin(scene, 1+x, 2+y,23+z),
        new BowlingPin(scene, 1.5+x, 2+y,23+z),
   
        //2
        new BowlingPin(scene, -0.5+x, 2+y, 23.5+z),
        new BowlingPin(scene, -1+x, 2+y, 23.5+z),
        new BowlingPin(scene, -1.5+x, 2+y, 23.5+z),

   
      
      
        
 
                
        
        new BowlingPin(scene, 0+x, 2+y, 23.5+z),
        new BowlingPin(scene, 0.5+x, 2+y,23.5+z),
        new BowlingPin(scene, 1+x, 2+y,23.5+z),
        new BowlingPin(scene, 1.5+x, 2+y,23.5+z),
        new BowlingPin(scene, 2+x, 2+y,23.5+z),
      
        
        //3
        new BowlingPin(scene, -0.5+x, 2+y, 24+z),
        new BowlingPin(scene, -1+x, 2+y, 24+z),
        new BowlingPin(scene, -1.5+x, 2+y, 24+z),
        new BowlingPin(scene, -2+x, 2+y, 24+z),
   
      
      
        
 
                
        
        new BowlingPin(scene, 0+x, 2+y, 24+z),
        new BowlingPin(scene, 0.5+x, 2+y, 24+z),
        new BowlingPin(scene, 1+x, 2+y, 24+z),
        new BowlingPin(scene, 1.5+x, 2+y, 24+z),
        new BowlingPin(scene, 2+x, 2+y,24+z),
        new BowlingPin(scene, 2.5+x, 2+y, 24+z),
        
        //4
        new BowlingPin(scene, -0.5+x, 2+y, 24.5+z),
        new BowlingPin(scene, -1+x, 2+y, 24.5+z),
        new BowlingPin(scene, -1.5+x, 2+y, 24.5+z),
        new BowlingPin(scene, -2+x, 2+y, 24.5+z),
        new BowlingPin(scene, -2.5+x, 2+y, 24.5+z),
      
      
        
 
                
        
        new BowlingPin(scene, 0+x, 2+y, 24.5+z),
        new BowlingPin(scene, 0.5+x, 2+y, 24.5+z),
        new BowlingPin(scene, 1+x, 2+y, 24.5+z),
        new BowlingPin(scene, 1.5+x, 2+y, 24.5+z),
        new BowlingPin(scene, 2+x, 2+y,24.5+z),
        new BowlingPin(scene, 2.5+x, 2+y, 24.5+z),
        new BowlingPin(scene, 3+x, 2+y, 24.5+z),
       


        
        //5

        new BowlingPin(scene, -0.5+x, 2+y, 25+z),
        new BowlingPin(scene, -1+x, 2+y, 25+z),
        new BowlingPin(scene, -1.5+x, 2+y, 25+z),
        new BowlingPin(scene, -2+x, 2+y, 25+z),
        new BowlingPin(scene, -2.5+x, 2+y, 25+z),
        new BowlingPin(scene, -3+x, 2+y, 25+z),
      
        
 
                
        
        new BowlingPin(scene, 0+x, 2+y, 25+z),
        new BowlingPin(scene, 0.5+x, 2+y, 25+z),
        new BowlingPin(scene, 1+x, 2+y, 25+z),
        new BowlingPin(scene, 1.5+x, 2+y, 25+z),
        new BowlingPin(scene, 2+x, 2+y, 25+z),
        new BowlingPin(scene, 2.5+x, 2+y, 25+z),
        new BowlingPin(scene, 3+x, 2+y, 25+z),
        new BowlingPin(scene, 3.5+x, 2+y, 25+z),
        //new BowlingPin(scene, 4, 2, 25),
        
        

       //6
       
        new BowlingPin(scene, -0.5+x, 2+y, 25.5+z),
        new BowlingPin(scene, -1+x, 2+y, 25.5+z),
        new BowlingPin(scene, -1.5+x, 2+y, 25.5+z),
        new BowlingPin(scene, -2+x, 2+y, 25.5+z),
        new BowlingPin(scene, -2.5+x, 2+y, 25.5+z),
        new BowlingPin(scene, -3+x, 2+y, 25.5+z),
        new BowlingPin(scene, -3.5+x, 2+y, 25.5+z),
        
 
                
        
        new BowlingPin(scene, 0+x, 2+y, 25.5+z),
        new BowlingPin(scene, 0.5+x, 2+y, 25.5+z),
        new BowlingPin(scene, 1+x, 2+y, 25.5+z),
        new BowlingPin(scene, 1.5+x, 2+y, 25.5+z),
        new BowlingPin(scene, 2+x, 2+y, 25.5+z),
        new BowlingPin(scene, 2.5+x, 2+y, 25.5+z),
        new BowlingPin(scene, 3+x, 2+y, 25.5+z),
        new BowlingPin(scene, 3.5+x, 2+y, 25.5+z),
        new BowlingPin(scene, 4+x, 2+y, 25.5+z),
   
        

        //7
        new BowlingPin(scene, -0.5+x, 2+y, 26+z),
        new BowlingPin(scene, -1+x, 2+y, 26+z),
        new BowlingPin(scene, -1.5+x, 2+y, 26+z),
        new BowlingPin(scene, -2+x, 2+y, 26+z),
        new BowlingPin(scene, -2.5+x, 2+y, 26+z),
        new BowlingPin(scene, -3+x, 2+y, 26+z),
        new BowlingPin(scene, -3.5+x, 2+y, 26+z),
        new BowlingPin(scene, -4+x, 2+y, 26+z),
 
                
        
        new BowlingPin(scene, 0+x, 2+y, 26+z),
        new BowlingPin(scene, 0.5+x, 2+y, 26+z),
        new BowlingPin(scene, 1+x, 2+y, 26+z),
        new BowlingPin(scene, 1.5+x, 2+y, 26+z),  
        new BowlingPin(scene, 2+x, 2+y, 26+z),
        new BowlingPin(scene, 2.5+x, 2+y, 26+z),
        new BowlingPin(scene, 3+x, 2+y, 26+z),
        new BowlingPin(scene, 3.5+x, 2+y, 26+z),
        new BowlingPin(scene, 4+x, 2+y, 26+z),
        new BowlingPin(scene, 4.5+x, 2+y, 26+z),

        //listeQuilles1.forEach(pin => pin.position.y += 5)
    
     
    ];
    return listeQuilles1;
}


export { name, scene, sceneData, launch };
