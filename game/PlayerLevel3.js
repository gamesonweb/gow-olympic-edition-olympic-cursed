
import CharacterController3 from './CharacterController3.js';

var canvas2 = document.getElementById("renderCanvas");
//var engine2 = new BABYLON.Engine(canvas2, true);

//variables



export class PlayerLevel3 {

    constructor(scene,engine,name,left,right,x,y,z) {
        this.scene = scene;
        this.engine = engine;
        this.boxBody ;

        this.testPlayer(scene,engine,name,x,y,z);
        this.enablePlayerControl(left,right);
     
    }
    

    testPlayer(scene,engine,name,x,y,z){
        var boxW = 2;
        var boxH = 2;
        var boxD = 2;
        
       
        var box = BABYLON.MeshBuilder.CreateBox(name, {width: boxW, height: boxH, depth: boxD},scene);

   
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
      
       
        this.boxBody = boxBody;
     
    
     
     
        
    

      
        
    }
  
 
    enablePlayerControl(inputLeft,inputRight){
       //let control = new CharacterController(canvas2,this.engine,this.boxBody,forward,backward,left,right);
       let control = new CharacterController3(canvas2,this.engine,this.boxBody, inputRight,inputLeft);
    }
    

    destroyPlayer(){
        
        control = null;
    }



}
export default PlayerLevel3;