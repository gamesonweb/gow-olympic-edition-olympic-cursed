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
}
