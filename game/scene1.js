var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);


import { CustomModels } from './CustomModels.js';
function sceneData() {

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Créez un matériau pour le cube (bleu)
    var material = new BABYLON.StandardMaterial("blueMaterial", scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 1); // Couleur bleue

    
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    // Créez un cube avec le matériau
    var cube = BABYLON.MeshBuilder.CreateBox("blueCube", { size: 2 }, scene);
    cube.material = material;

    // Positionnez le cube où vous le souhaitez
    cube.position = new BABYLON.Vector3(0, 1, 20);   

    /*
    var followCamera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 5, -10), scene,cube);
    followCamera.attachControl(canvas, true);*/

    //var devcamera = new DevCamera(canvas, scene);
  

    var model = new CustomModels(scene);
    model.CreateColiseum(0,0,0 );
  
    scene.debugLayer.show();


  

}

function launch() {
    
    scene.meshes.forEach(function(mesh) {
        mesh.dispose();
    });
    
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.attachControl();
    sceneData();
   
    engine.runRenderLoop(function () {
        scene.render();
    });
}

function killLevel(){
    scene.dispose();
}


function getScene() {
    return scene;
}

export {   sceneData, launch , killLevel };
