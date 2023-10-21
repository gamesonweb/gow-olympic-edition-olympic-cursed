var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
var name = "level2";

function sceneData() {
    // Assurez-vous que l'élément canvas a le focus
    canvas.tabIndex = 1;
    canvas.focus();

    // Configurez une caméra
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl();

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


    // Appel de la fonction pour configurer les touches clavier
    setupKeyboardInput();
}
function createCamera(){
        // Configurez une caméra
        var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl();
    
}

function setupKeyboardInput() {
    var keys = {};

    // Écoutez les événements de clavier sur l'élément canvas
    canvas.addEventListener('keydown', function (event) {
        keys[event.key] = true;
    });

    canvas.addEventListener('keyup', function (event) {
        keys[event.key] = false;
    });

    engine.runRenderLoop(function () {
        // Vérifiez l'état des touches ici
        if (keys['z']) {
            // Code à exécuter lorsque la touche Z est enfoncée
            console.log('Touche Z enfoncée');
        }
        if (keys['s']) {
            // Code à exécuter lorsque la touche S est enfoncée
            console.log('Touche S enfoncée');
        }
        if (keys['q']) {
            // Code à exécuter lorsque la touche Q est enfoncée
            console.log('Touche Q enfoncée');
        }
        if (keys['d']) {
            // Code à exécuter lorsque la touche D est enfoncée
            console.log('Touche D enfoncée');
        }

       
    });
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
