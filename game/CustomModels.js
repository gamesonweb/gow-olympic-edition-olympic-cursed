
//import { ColliderGestionner } from "./ColliderGestionner";

//import { ColliderGestionner } from "/ColliderGestionner";


export class CustomModels {

    constructor(scene) {
        this.scene = scene;
    }

    // Crée un objet 3D personnalisé et le positionne aux coordonnées spécifiées (x, y, z)
    CreateObject(x, y, z) {
        let obj;
        BABYLON.SceneLoader.ImportMesh("", "./models/", "test_Scene.glb", this.scene, (meshes) => {
          console.log("Chargement réussi", meshes);
          obj = meshes[0];
 
          obj.position = new BABYLON.Vector3(x, y, z); // Positionne l'objet aux coordonnées spécifiées
          console.log(obj.position);
       
        }, undefined, undefined, ".glb");
      
    }

    CreateObject2(x, y, z) {
        let obj;
        BABYLON.SceneLoader.ImportMesh("", "./models/", "test_Scene.glb", this.scene, (meshes) => {
            console.log("Chargement réussi", meshes);
            obj = meshes[0];
            obj.position = new BABYLON.Vector3(x, y, z); // Positionne l'objet
    
            // Activer les collisions pour chaque maillage enfant
            const childMeshes = obj.getChildMeshes();
            for (let mesh of childMeshes) {
                mesh.checkCollisions = true;
    
                // Optionnel: Ajouter un imposteur de physique
                // mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
                //   mesh,
                //   BABYLON.PhysicsImpostor.MeshImpostor,
                //   { mass: 0, restitution: 1 },
                //   this.scene
                // );
            }
        }, undefined, undefined, ".glb");
    }
    
      
      
    
    
    // Crée un modèle d'arbre 3D et le positionne aux coordonnées spécifiées (x, y, z)
    CreateTree(x, y, z) {
        let tree;
        let boundingBox;
        let tronc;
       // let  collider = new ColliderGestionner(this.scene);
       //let  collidxer  = new ColliderGestionner();
        // Load the tree model
        BABYLON.SceneLoader.ImportMesh("", "./models/", "Tree.glb", this.scene, (meshes) => {
            console.log("Chargement réussi arbre", meshes);
         
            tree = meshes[0];
            tronc = meshes[1];
            
            
            tree.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
            
            //BOITE DE COLLISION
            boundingBox = BABYLON.MeshBuilder.CreateBox("boundingBox", { size: 1 }, this.scene);
    
            boundingBox.isVisible = false;
            
           /*
            tronc.physicsImpostor =  new BABYLON.PhysicsImpostor(
                tronc,
                BABYLON.PhysicsImpostor.MeshImpostor,
                { mass: 0, restitution: 1},
                this.scene
         
            );*/
            /*
            boundingBox.position =  new BABYLON.Vector3(x, y, z);
            
            boundingBox.physicsImpostor = new BABYLON.PhysicsImpostor(
                boundingBox,
                BABYLON.PhysicsImpostor.BoxImpostor,
                { mass: 0, restitution: 1},
                this.scene
         
            );
          
            tronc.addChild(boundingBox);
            boundingBox.scaling = new BABYLON.Vector3(0.041,-0.209,0.034);
              */
            //boundingBox = collider.createBoudingBox(tronc,x,y,z,0.041,-0.209,0.034);
        
           //return boundingBox;
          
        }, undefined, undefined, ".glb");
    
        return { boundingBox };
    }
    
  
    
   
    async CreateSceneProd(x, y, z) {
       
    }
    async CreatePlayer(x, y, z) {
        
    }
      
    async Zone(x, y, z) {
      
     
    }

    async plane(x, y, z,scene) {

        var ground = BABYLON.Mesh.CreateGround("ground", 20, 20, 2, scene);
        //create physic impostor
        var groundAggregate =new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);
        /*
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(
            ground,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, friction: 0.5, restitution: 0 },
            scene
        );*/
        // create Materials
        var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0.92, 0.29, 0.28); // Rouge doux
         // Set position of the ground
        ground.position = new BABYLON.Vector3(x, y, z);
        //add material to the object
        ground.material = groundMaterial;
     
    }


    
   
}
