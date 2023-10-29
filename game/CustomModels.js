//import "@babylonjs/loaders";
//import { Scene,Engine, SceneLoader } from "babylonjs";
//import { SceneLoader } from "@babylonjs/core";


export class CustomModels {
    constructor(scene) {
        this.scene = scene;
    }

    CreateObject(x,y,z) {
        let  obj;
        BABYLON.SceneLoader.ImportMesh("", "./models/", "test_Scene.glb", this.scene, (meshes) => {
            console.log("Chargement réussi", meshes);
            obj = meshes[0];
            obj.position = new BABYLON.Vector3(x, y, z);
        }, undefined, undefined, ".glb");
        
    }
    CreateTree(x,y,z) {
        let  tree;
        BABYLON.SceneLoader.ImportMesh("", "./models/", "Tree.glb", this.scene, (meshes) => {
            console.log("Chargement réussi", meshes);
            tree = meshes[0];
            tree.position = new BABYLON.Vector3(x, y, z);
        }, undefined, undefined, ".glb");
         
    }
    
}
