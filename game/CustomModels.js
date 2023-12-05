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
          const childMeshes = obj.getChildMeshes();
          obj.position = new BABYLON.Vector3(x, y, z); // Positionne l'objet aux coordonnées spécifiées
        
          // Activer les collisions pour chaque maillage
          for (let mesh of childMeshes) {
            mesh.checkCollisions = true;
            /*
            // Créer un imposteur de maillage pour chaque maillage enfant
            mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
              mesh,
              BABYLON.PhysicsImpostor.MeshImpostor,
              { mass: 0, restitution: 1 },
              this.scene
            );*/
          }
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
    
      
      
    CreateObject3(x, y, z,scene) {
        let obj;
        BABYLON.SceneLoader.ImportMesh("", "./models/", "test_Scene.glb", scene, (meshes) => {
            console.log("Chargement réussi", meshes);
            obj = meshes[0];
            obj.position = new BABYLON.Vector3(x, y, z); // Positionne l'objet
            
            obj.physicsImpostor = new BABYLON.PhysicsImpostor(
                obj,
                BABYLON.PhysicsImpostor.MeshImpostor,
                { mass: 1, friction: 0.5, restitution: 0.7 },
                scene
            );
        }, undefined, undefined, ".glb");
    }
    

    // Crée un modèle d'arbre 3D et le positionne aux coordonnées spécifiées (x, y, z)
    CreateTree(x, y, z) {
        let tree;
        BABYLON.SceneLoader.ImportMesh("", "./models/", "Tree.glb", this.scene, (meshes) => {
            console.log("Chargement réussi", meshes);
            tree = meshes[0];
            tree.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux coordonnées spécifiées
         
        }, undefined, undefined, ".glb");
    }
    
    CreateTree2(x, y, z) {
        let tree;
        BABYLON.SceneLoader.ImportMesh("", "./models/", "Tree.glb", this.scene, (meshes) => {
        console.log("Chargement réussi", meshes);
    
        // Parcourir tous les meshes
        for (let i = 0; i < meshes.length; i++) {
            // Créer un nouveau physics impostor
            let physicsImpostor = new BABYLON.PhysicsImpostor(
            meshes[i],
            BABYLON.PhysicsImpostor.MeshImpostor,
            { mass: 1, friction: 0.5, restitution: 0.1 },
            this.scene
            );
    
            // Attacher le physics impostor au mesh
            meshes[i].physicsImpostor = physicsImpostor;
        }
        }, undefined, undefined, ".glb");
    }
    // Crée un modèle d'arbre 3D et le positionne aux coordonnées spécifiées (x, y, z)
    CreateTree3(x, y, z,scene) {
        let tree;
        BABYLON.SceneLoader.ImportMesh("", "./models/", "Tree.glb", scene, (meshes) => {
            console.log("Chargement réussi", meshes);
            tree = meshes[0];
            tree.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux coordonnées spécifiées

            tree.physicsImpostor = new BABYLON.PhysicsImpostor(
                tree,
                BABYLON.PhysicsImpostor.MeshImpostor,
                { mass: 1, friction: 0.5, restitution: 0.7 },
                scene
            );
        
        }, undefined, undefined, ".glb");
    }
}
