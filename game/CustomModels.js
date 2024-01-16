


export class CustomModels {

    constructor(scene) {
        this.scene = scene;
    }

    
    
    /** ######################################################################## LEVEL2 3D MODEL #########################################################################**/

    // Crée un modèle d'arbre 3D et le positionne aux coordonnées spécifiées (x, y, z)
    async CreateTree(x, y, z) {
        let tree;
        let boundingBox;
        let tronc;
       
        BABYLON.SceneLoader.ImportMesh("", "./models/", "Tree.glb", this.scene, (meshes) => {
            console.log("Chargement réussi arbre", meshes);
         
            tree = meshes[0];
            tronc = meshes[1];
            tronc.name ="tronc"
            
           
            tree.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
            
            

            var troncAggregate =new BABYLON.PhysicsAggregate(tronc, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
            troncAggregate.shape.isTrigger =  true;

            
            var troncAggregate2 =new BABYLON.PhysicsAggregate(tronc, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
            //troncAggregate.shape.isTrigger =  true;

            /*
            const observable = plugin.onTriggerCollisionObservable;
            const observer = observable.add((collisionEvent) => {
                if (collisionEvent.type === "TRIGGER_ENTERED") {
                    // do something when the trigger is entered
                    console.log("i entered");
                } else {
                    // do something when trigger is exited
                }
            });*/
            
        
           //return boundingBox;
          
        }, undefined, undefined, ".glb");

     
    
        return { boundingBox };
    }

    async CreatePineTree(x, y, z) {
        let tree;
        let boundingBox;
        let tronc;
       
        BABYLON.SceneLoader.ImportMesh("", "./models/", "Pine Tree with Snow.glb", this.scene, (meshes) => {
            console.log("Chargement réussi arbre", meshes);
            meshes[0].scaling.x = 3
            meshes[0].scaling.y = 2
            meshes[0].scaling.z = 4
            tree = meshes[0];
            tronc = meshes[1];
            tronc.name ="tronc"
            console.log(tronc.name);
            
           
            tree.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
            
            

            var troncAggregate =new BABYLON.PhysicsAggregate(tronc, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
            troncAggregate.shape.isTrigger =  true;

            
            var troncAggregate2 =new BABYLON.PhysicsAggregate(tronc, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
            //troncAggregate.shape.isTrigger =  true;

            /*
            const observable = plugin.onTriggerCollisionObservable;
            const observer = observable.add((collisionEvent) => {
                if (collisionEvent.type === "TRIGGER_ENTERED") {
                    // do something when the trigger is entered
                    console.log("i entered");
                } else {
                    // do something when trigger is exited
                }
            });*/
            
        
           //return boundingBox;
          
        }, undefined, undefined, ".glb");

     
    
        return { boundingBox };
    }



    CreateSnowMan(x, y, z) {
        let tree;
        let boundingBox;
        let tronc;
       
        
        let bigMesh = BABYLON.SceneLoader.ImportMesh("", "./models/", "snowman_on_skis.glb", this.scene, (meshes) => {
            console.log("Chargement réussi coliseum", meshes);
         
            mesh = meshes[0];
            //tronc = meshes[1];
            mesh.name ="SnowMan"
            
           
            //mesh.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
            
            

            //var troncAggregate =new BABYLON.PhysicsAggregate(tronc, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
           // troncAggregate.shape.isTrigger =  true;

            
            //var troncAggregate2 =new BABYLON.PhysicsAggregate(tronc, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
          
          
        }, undefined, undefined, ".glb");

        bigMesh.position= new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
            
    
        return {  bigMesh};
    }
    
  
    
   
    async CreateSceneProd(x, y, z) {
       
    }
    async CreatePlayer(x, y, z) {
        
    }
      
    async Zone(x, y, z) {
      
     
    }

    async plane(x, y, z,width,height,scene) {
      
        let subdivisions = 1
        
        var ground = BABYLON.MeshBuilder.CreateGround("ground", { width, height, subdivisions },scene);
        ground.position.addInPlace(new BABYLON.Vector3(x, y, z)); 
        // Créez un quaternion pour représenter la rotation souhaitée
       
       
        ground.rotation = new BABYLON.Vector3(-0.1, 0, 0);

        
        //create physic impostor
        var groundAggregate =new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);
        
            // Appliquez la rotation au sol
      
        // create Materials
        var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0.92, 0.29, 0.28); // Rouge doux
         // Set position of the ground
        //ground.position = new BABYLON.Vector3(x, y, z);
        
        //add material to the object
        ground.material = groundMaterial;
        //console.log(ground);
        return ground;
     
    }
    /** ######################################################################## MENU 3D MODEL #########################################################################**/



        // Crée un modèle d'arbre 3D et le positionne aux coordonnées spécifiées (x, y, z)
        CreateColiseum(x, y, z) {
            let tree;
            let boundingBox;
            let tronc;
           
            BABYLON.SceneLoader.ImportMesh("", "./models/", "coliseum.glb", this.scene, (meshes) => {
                console.log("Chargement réussi coliseum", meshes);
             
                let mesh = meshes[0];
                //tronc = meshes[1];
                mesh.name ="coliseum"
                
               
                mesh.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
                
                
    
                //var troncAggregate =new BABYLON.PhysicsAggregate(tronc, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
               // troncAggregate.shape.isTrigger =  true;
    
                
                //var troncAggregate2 =new BABYLON.PhysicsAggregate(tronc, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
              
              
            }, undefined, undefined, ".glb");
    
         
        
            return { boundingBox };
        }


    
   
}
