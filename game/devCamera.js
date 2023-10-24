class DevCamera {
    constructor(canvas, scene) {
        this.camera = this.createCamera(scene);
    
    }

    createCamera(scene) {
        var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl();
      
        return camera;
    }
    
    createCamera2(scene) {
        var camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl();

        return camera;
    }
    fixMouse() {
        
    }

}

export default DevCamera;