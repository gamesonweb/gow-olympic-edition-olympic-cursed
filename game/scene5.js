var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
import { CustomModels } from './CustomModels.js';
var createScene = function () {
   
    // GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    scene.debugLayer.show();
    return scene;
};
function launch(){
    createScene();

    engine.runRenderLoop(function () {
        
        scene.render();
    });

}



export {  scene, launch };