class PlayerCamera {
    constructor(canvas, scene, engine, target) {
        this.camera = this.createCamera2(scene, canvas, target); // Crée la caméra de suivi et l'assigne à this.camera
        this.lockPointer(scene, engine); // Appelle la fonction pour gérer le verrouillage du pointeur
    }

    // Crée une caméra universelle
    createCamera(scene, canvas, target) {
        var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, -10), scene);

        //camera.setTarget(target); // Utilisez cette méthode pour définir la cible de la caméra

        camera.inputs.clear();
        camera.inputs.addMouse();
        camera.attachControl(canvas, true);

        return camera;
    }

    // Crée une caméra de suivi
    createCameraFollow(scene, canvas, targetMesh) {
        var followCamera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 0, -10), scene, targetMesh);

        followCamera.attachControl(canvas, true);

        return followCamera;
    }

    // Crée une caméra ArcRotate
    createCamera3(scene, canvas, targetMesh) {
        var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 10, targetMesh, scene);

        camera.attachControl(canvas, true);

        return camera;
    }

    // Configure le verrouillage du pointeur
    lockPointer(scene, engine) {
        scene.onPointerDown = (evt) => {
            if (evt.button === 0) {
                engine.getRenderingCanvas().requestPointerLock();
            } else if (evt.button === 1) {
                document.exitPointerLock();
            }
        };
    }
}

export default PlayerCamera;
