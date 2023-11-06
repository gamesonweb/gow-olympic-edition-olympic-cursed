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
            const childMeshes = obj.getChildMeshes()
            obj.position = new BABYLON.Vector3(x, y, z); // Positionne l'objet aux coordonnées spécifiées
            //ground
            //activer les collision de chaques mesh
            for (let mesh of childMeshes) {
                mesh.checkCollisions = true
            }
            /*
            obj.physicsImpostor = new BABYLON.PhysicsImpostor(
                obj,
                BABYLON.PhysicsImpostor.BoxImpostor,
                { mass: 0,  restitution: 1 },
                this.scene
            );*/

            

        }, undefined, undefined, ".glb");
    }

    // Crée un modèle d'arbre 3D et le positionne aux coordonnées spécifiées (x, y, z)
    CreateTree(x, y, z) {
        let tree;
        BABYLON.SceneLoader.ImportMesh("", "./models/", "Tree.glb", this.scene, (meshes) => {
            console.log("Chargement réussi", meshes);
            tree = meshes[0];
            tree.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux coordonnées spécifiées
            /*
             // Ajouter une imposture de physique pour activer les collisions
            tree.physicsImpostor = new BABYLON.PhysicsImpostor(
                tree,
                BABYLON.PhysicsImpostor.MeshImpostor,
                { mass: 0, friction: 0.5, restitution: 0.2 },
                this.scene
            );*/

           
        }, undefined, undefined, ".glb");

        
        
    }
   
}
