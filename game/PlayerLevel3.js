
import CharacterController3 from './CharacterController3.js';

var canvas2 = document.getElementById("renderCanvas");
//var engine2 = new BABYLON.Engine(canvas2, true);

//variables



export class PlayerLevel3 {

    constructor(scene,engine,name,left,right,jump,action,x,y,z) {
        this.control;
        this.scene = scene;
        this.engine = engine;
        this.name= name;
        this.boxBody ;
        this.sphereBody;
        this.box;
        this.rayHelper;
        //this.testPlayer(scene,engine,name,x,y,z);
      
        this.shootBall(left,right,jump,action,x,y,z);
    
        this.enablePlayerControl(left,right,jump,action);

        
     
     
    }
    

    testPlayer(scene,engine,name,x,y,z){
        var boxW = 2;
        var boxH = 2;
        var boxD = 2;
        
       
        var box = BABYLON.MeshBuilder.CreateBox(name, {width: boxW, height: boxH, depth: boxD},scene);
        this.box =box;
   
        box.rotationQuaternion = BABYLON.Quaternion.Identity();

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
      
       
        this.boxBody = boxBody;
        
    
     
     
        
    

      
        
    }
  
 
    enablePlayerControl(inputLeft,inputRight,jump,action){

        let control2 = new CharacterController3(canvas2,this.engine,this.sphereBody, inputRight,inputLeft,jump,action);
        this.control = control2;
     
      
    }

   
    shootBall(left,right,jump,action,x,y,z){
        let segments = 16;
        let diameter = 2;

        const sphere = BABYLON.MeshBuilder.CreateSphere(this.name, { segments, diameter }, this.scene);
        sphere.position = new BABYLON.Vector3(x,y,z);

       
        var sphereShape = new BABYLON.PhysicsShapeSphere(new BABYLON.Vector3(0,0,0),diameter-1,this.scene);
        var sphereBody = new BABYLON.PhysicsBody(sphere, BABYLON.PhysicsMotionType.DYNAMIC, false, this.scene);
        sphereBody.shape = sphereShape;
        sphereBody.setMassProperties({mass : 2});

       
        
        this.sphereBody = sphereBody;
       
    }
    disableThisObject(){

        this.control.destroy();
        this.control = null;
        
  
       
    }
  
    





}
export default PlayerLevel3;