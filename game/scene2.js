import DevCamera from '/DevCamera.js';
import PlayerCamera from '/PlayerCamera.js';
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);

var name = "level2";

function sceneData() {
    // Assurez-vous que l'élément canvas a le focus
    canvas.tabIndex = 1;
    canvas.focus();
    
   // Configurez une caméra
    //var camera =createCamera();
    //var camera = new DevCamera(canvas, scene);
    
 

    // Ajoutez une lumière
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Créez un matériau pour le cube (bleu)
    var material = new BABYLON.StandardMaterial("blueMaterial", scene);
    material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Couleur rouge

   
    // Créez un cube avec le matériau
    var cube = BABYLON.MeshBuilder.CreateBox("blueCube", { size: 2 }, scene);
    cube.material = material;
    
   
    // Positionnez le cube où vous le souhaitez
    cube.position = new BABYLON.Vector3(0, 1, 0);
    console.log(cube.position);
    var camera = new PlayerCamera(canvas, scene,engine,cube);

    //camera.setupKeyboardInput();
}


function moveForward(){


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
