var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
var name = "Menu";

import { CustomModels } from './CustomModels.js';
function sceneData() {
    //activer la physique sur la scene 
   
    scene.collisionsEnabled = true;
    
   
    // Configurez une caméra
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl();

    // Ajoutez une lumière
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Créez un matériau pour le cube (bleu)
    var material = new BABYLON.StandardMaterial("blueMaterial", scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 1); // Couleur bleue

    ;

    let sol = new CustomModels(scene);
    //sol.plane(0,15,0,10,16)

    
    var model = new CustomModels();
    model.CreateColiseum(0,0,0 );

      //montrer le layer
   scene.debugLayer.show();

}

function launch() {
    sceneData();
    engine.runRenderLoop(function () {
        scene.render();
    });
}

function getScene() {
    return scene;
}

export { name, scene, sceneData, launch };
