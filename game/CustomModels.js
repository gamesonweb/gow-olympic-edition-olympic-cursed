


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
            
        
          
          
        }, undefined, undefined, ".glb");

     
    
        return { boundingBox };
    }

    async CreatePineTree(x, y, z) {
        let tree;
        let boundingBox;
        let tronc;
       
        return   BABYLON.SceneLoader.ImportMesh("", "./models/", "Pine Tree with Snow.glb", this.scene, (meshes) => {
            console.log("Chargement réussi arbre", meshes);
            meshes[0].scaling.x = 3
            meshes[0].scaling.y = 2
            meshes[0].scaling.z = 4
            tree = meshes[0];
            tronc = meshes[1];
            tronc.name ="tronc"
            console.log(tronc.name);
            
           
            tree.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
            
            const shapeBox1 = new BABYLON.PhysicsShapeBox(
                new BABYLON.Vector3(0, 1, 3),        // center of the box
                new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
                new BABYLON.Vector3(3, 3, 5),      // dimensions of the box
                this.scene                                // scene of the shape
            );
            const shapeBox2 = new BABYLON.PhysicsShapeBox(
                new BABYLON.Vector3(0, 1, 3),        // center of the box
                new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
                new BABYLON.Vector3(3, 3, 5),      // dimensions of the box
                this.scene                                // scene of the shape
            );
            
            var troncAggregate =new BABYLON.PhysicsAggregate(tronc, shapeBox1, { mass: 0 }, this.scene);
            troncAggregate.shape.isTrigger =  true;
            //troncAggregate.shape.

            
            var troncAggregate2 =new BABYLON.PhysicsAggregate(tronc, shapeBox2, { mass: 0 }, this.scene);
           
            
        
           //return boundingBox;
          
        }, undefined, undefined, ".glb");

     
    
       
    }



    CreateSnowManOnSki(x, y, z) {
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
    async createDeadTree(x, y, z) {
        let tree;
        let boundingBox;
        let tronc;
       
        BABYLON.SceneLoader.ImportMesh("", "./models/", "Dead Trees With Snow.glb", this.scene, (meshes) => {
            console.log("Chargement réussi arbre", meshes);
            
            meshes[0].scaling.x = 30
            meshes[0].scaling.y = 20
            meshes[0].scaling.z = 20
            let globalMesh = meshes[0];
            tronc = meshes[1];

            tronc.name ="tronc"
            console.log(tronc.name);

            const shapeBox1 = new BABYLON.PhysicsShapeBox(
                new BABYLON.Vector3(0, 1, 3),        // center of the box
                new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
                new BABYLON.Vector3(30, 30, 30),      // dimensions of the box
                this.scene                                // scene of the shape
            );
           
            
           
            globalMesh.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
            
            

            var troncAggregate =new BABYLON.PhysicsAggregate(tronc, shapeBox1, { mass: 0 }, this.scene);
            troncAggregate.shape.isTrigger =  true;

            
            var troncAggregate2 =new BABYLON.PhysicsAggregate(tronc, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
          

  
          
        }, undefined, undefined, ".glb");

     
    
        return { boundingBox };
    }
    async createSnowTree(x, y, z) {
        let tree;
        let boundingBox;
        let tronc;
       
        BABYLON.SceneLoader.ImportMesh("", "./models/", "Snow Tree.glb", this.scene, (meshes) => {
            console.log("Chargement réussi arbre", meshes);
            
            meshes[0].scaling.x = 10
            meshes[0].scaling.y = 10
            meshes[0].scaling.z = 10
            let globalMesh = meshes[0];
            tronc = meshes[1];

            tronc.name ="tronc"
            console.log(tronc.name);

            const shapeBox1 = new BABYLON.PhysicsShapeBox(
                new BABYLON.Vector3(0, 0, -1),        // center of the box
                new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
                new BABYLON.Vector3(5, 10, 5),      // dimensions of the box
                this.scene                                // scene of the shape
            );
            const shapeBox2 = new BABYLON.PhysicsShapeBox(
                new BABYLON.Vector3(0, 0, -1),        // center of the box
                new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
                new BABYLON.Vector3(5, 10, 5),      // dimensions of the box
                this.scene                                // scene of the shape
            );
           
            
           
            globalMesh.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
            
            

            var troncAggregate =new BABYLON.PhysicsAggregate(tronc, shapeBox1, { mass: 0 }, this.scene);
            troncAggregate.shape.isTrigger =  true;

            
            var troncAggregate2 =new BABYLON.PhysicsAggregate(tronc,shapeBox2, { mass: 0 }, this.scene);
          
          
        }, undefined, undefined, ".glb");

     
    
        return { boundingBox };
    }
    async createLitleSnowTree(x, y, z) {
        let tree;
        let boundingBox;
        let tronc;
       
        BABYLON.SceneLoader.ImportMesh("", "./models/", "Pine Tree with Snow two.glb", this.scene, (meshes) => {
            console.log("Chargement réussi arbre", meshes);
            
            meshes[0].scaling.x = 10
            meshes[0].scaling.y = 10
            meshes[0].scaling.z = 10

            let globalMesh = meshes[0];
            tronc = meshes[1];

            tronc.name ="tronc"
            console.log(tronc.name);

            const shapeBox1 = new BABYLON.PhysicsShapeBox(
                new BABYLON.Vector3(0, 0, -1),        // center of the box
                new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
                new BABYLON.Vector3(5, 10, 5),      // dimensions of the box
                this.scene                                // scene of the shape
            );
            const shapeBox2 = new BABYLON.PhysicsShapeBox(
                new BABYLON.Vector3(0, 0, -1),        // center of the box
                new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
                new BABYLON.Vector3(5, 10, 5),      // dimensions of the box
                this.scene                                // scene of the shape
            );
           
            
           
            globalMesh.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
            
            

            var troncAggregate =new BABYLON.PhysicsAggregate(tronc, shapeBox1, { mass: 0 }, this.scene);
            troncAggregate.shape.isTrigger =  true;

            
            var troncAggregate2 =new BABYLON.PhysicsAggregate(tronc,shapeBox2, { mass: 0 }, this.scene);
      
        
          
        }, undefined, undefined, ".glb");

     
    
        return { boundingBox };
    }
    async createSnowMan(x, y, z) {
        let tree;
        let boundingBox;
        let tronc;
       
        BABYLON.SceneLoader.ImportMesh("", "./models/", "SnowManRotated.glb", this.scene, (meshes) => {
            console.log("Chargement réussi arbre", meshes);
            
            meshes[0].scaling.x = 1
            meshes[0].scaling.y = 1
            meshes[0].scaling.z = 1
            //meshes[0].rotationQuaternion._y=250
           
            //meshes[0].absoluteRotationQuaternion._y= -110.0000;
            //meshes[0].rotationQuaternion._y= -110.0000;
            let globalMesh = meshes[0];
            //globalMesh.rotationQuaternion = -50;
            tronc = meshes[1];

            //tronc.name ="tronc"
            console.log("SNOWMAN "+globalMesh.name);

            const shapeBox1 = new BABYLON.PhysicsShapeBox(
                new BABYLON.Vector3(0, 4, 0),        // center of the box
                new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
                new BABYLON.Vector3(5, 10, 5),      // dimensions of the box
                this.scene                                // scene of the shape
            );
            
            const shapeBox2 = new BABYLON.PhysicsShapeBox(
                new BABYLON.Vector3(0, 4, -1),        // center of the box
                new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
                new BABYLON.Vector3(5, 10, 5),      // dimensions of the box
                this.scene                                // scene of the shape
            );
           
            
           
            globalMesh.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
            
            

            var troncAggregate =new BABYLON.PhysicsAggregate(tronc, shapeBox1, { mass: 0 }, this.scene);
            troncAggregate.shape.isTrigger =  true;

            
            var troncAggregate2 =new BABYLON.PhysicsAggregate(tronc,shapeBox2, { mass: 0 }, this.scene);
      
        
          
        }, undefined, undefined, ".glb");

     
    
        return { boundingBox };
    }

    CreateRampe1(x, y, z) {
        let tree;
        let boundingBox;
        let tronc;
       
        
        let bigMesh = BABYLON.SceneLoader.ImportMesh("", "./models/", "rampe_2.glb", this.scene, (meshes) => {
            console.log("Chargement réussi", meshes);
            //meshes[1].rotationQuaternion._y = -1
            meshes[0].scaling.x = 5
            meshes[0].scaling.y = 5
            meshes[0].scaling.z = 5
            //meshes[0].rotationQuaternion._y = 0
            //meshes[1].rotationQuaternion._y = -5
           
            let mesh = meshes[0];
            console.log(meshes[1].name);
            //tronc = meshes[1];
            mesh.name ="Rampe"
            let elment =meshes[1] ;
           
            mesh.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
            
        
             

            var troncAggregate =new BABYLON.PhysicsAggregate(elment, BABYLON.PhysicsShapeType.MESH, { mass: 0 }, this.scene);
           

            
            //var troncAggregate2 =new BABYLON.PhysicsAggregate(tronc, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
          
          
        }, undefined, undefined, ".glb");

        bigMesh.position= new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
            
    
        return {  bigMesh};
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
