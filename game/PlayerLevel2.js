
import CharacterController2 from './CharacterController2.js';


var canvas = document.getElementById("renderCanvas");
//var engine2 = new BABYLON.Engine(canvas2, true);

//variables



export class PlayerLevel2 {

    constructor(scene,engine,name,forward,jump,x,y,z) {
        this.scene = scene;
        this.engine = engine;
        this.name = name;
        this.boxBody ;
        this.boxMesh;
        this.animationGroups;

        this.createPlayer(x,y,z);
        this.enablePlayerControl(forward,jump);
       // this.Character(x,y,z);
     
    }
    

    async createPlayer(x,y,z){

        var boxW = 2;
        var boxH = 2;
        var boxD = 2;
        
        var box = BABYLON.MeshBuilder.CreateBox(this.name, {width: boxW, height: boxH, depth: boxD},this.scene);
        this.boxMesh = box;
        //ADD character disable box visibility 
        //box.visibility = false;
       //this.Character(x, y, z, box); 



        box.rotationQuaternion = BABYLON.Quaternion.Identity();
        //box.position = new BABYLON.Vector3(0,5,0);
        box.position = new BABYLON.Vector3(x,y,z);
        var boxShape = new BABYLON.PhysicsShapeBox(new BABYLON.Vector3(0,0,0), BABYLON.Quaternion.Identity(), new BABYLON.Vector3(boxW, boxH, boxD),this.scene);
        var boxBody = new BABYLON.PhysicsBody(box, BABYLON.PhysicsMotionType.DYNAMIC, false, this.scene);
        this.boxBody = boxBody;
        boxBody.shape = boxShape;
        boxBody.setMassProperties({mass : 1})
    
    
        //add create material add tothe cube
        var blueMaterial = new BABYLON.StandardMaterial("groundMaterial", this.scene);
        blueMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1); // Rouge doux
        box.material = blueMaterial;
       
        
        boxBody.setCollisionCallbackEnabled(true)
        await this.Character(x, y, z, box);
       
        
     
    
     
     
        
    
        //boxBody.applyForce()
        //let control = new CharacterController2(canvas,scene,engine,boxBody,'s',' ');
        //let control = new CharacterController2(canvas,scene,engine,boxBody,input1,inputJump);
        return box;
    }
    
  
 
    enablePlayerControl(forward,jump){
       let control = new CharacterController2(canvas,this.scene,this.engine,this.boxBody,forward,jump,this.animationGroups);
    }
    

    destroyPlayer(){
        
        control = null;
    }

   
    async Character(x, y, z, parent) {
        let mesh; // Déclaration de mesh à un niveau supérieur pour qu'il soit accessible en dehors de la fonction de rappel
    
        const { meshes, animationGroups } = await BABYLON.SceneLoader.ImportMeshAsync("", "./models/character1_anim/", "animCharacter.glb", this.scene);
    
        mesh = meshes[0]; // Assignation de meshes[0] à mesh
        mesh.name = "RUNNER";
        mesh.position = new BABYLON.Vector3(x, y - 1.05, z); // Positionne le modèle une fois chargé
    
        if (parent) {
            mesh.setParent(parent); // Attacher le modèle au parent si spécifié
        }
        this.animationGroups = animationGroups;
        // Vous pouvez ajouter des manipulations supplémentaires sur le mesh ici, comme l'échelle ou la rotation
    
        console.log("Chargement réussi Personnage", mesh);
        //gerer les animations
        //console.log("ANIMATION GROUP :"+animationGroups)
  
        //animationGroups[0].play();
        //animationGroups[1].play();
    
        return { mesh };
    }
    




}
export default PlayerLevel2;