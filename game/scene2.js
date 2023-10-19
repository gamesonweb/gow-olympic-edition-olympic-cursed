var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
var name = "level2";

function sceneData() {
    // Configurez une caméra
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());

    createDeveloperCamera(scene, canvas);


    // Ajoutez une lumière
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Créez un matériau pour le cube (bleu)
    var material = new BABYLON.StandardMaterial("redMaterial", scene);
    material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Couleur rouge


    // Créez un cube avec le matériau
    var cube = BABYLON.MeshBuilder.CreateBox("redCube", { size: 2 }, scene);
    cube.material = material;

    // Positionnez le cube où vous le souhaitez
    cube.position = new BABYLON.Vector3(0, 1, 0);
}

function createDeveloperCamera(scene, canvas) {
    var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    
    camera.keysUp = [38];    // Touche Haut (flèche vers le haut)
    camera.keysDown = [40];  // Touche Bas (flèche vers le bas)
    camera.keysLeft = [37];  // Touche Gauche (flèche vers la gauche)
    camera.keysRight = [39]; // Touche Droite (flèche vers la droite)
    
    
    camera.upperBetaLimit = Math.PI / 2;
    camera.lowerBetaLimit = 0;
    
    camera.attachControl(canvas, true);
  
    return camera;
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
