class DevCamera {
    constructor(canvas, scene) {
        this.camera = this.createCamera(scene); // Crée une caméra "FreeCamera" et l'assigne à this.camera
    }

    // Crée une caméra "FreeCamera" avec une vue par défaut
    createCamera(scene) {
        var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(new BABYLON.Vector3(0, 10, 0)); // Définit la cible de la caméra
        camera.attachControl(); // Attache les contrôles de la caméra au canvas de la scène

        return camera;
    }
}

export default DevCamera; // Exporte la classe DevCamera pour pouvoir l'utiliser ailleurs.
