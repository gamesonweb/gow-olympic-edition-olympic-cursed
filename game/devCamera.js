class DevCamera {
    constructor(canvas, scene) {
        this.camera = this.createCamera(scene);
    
    }

    createCamera(scene) {
        var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(new BABYLON.Vector3(0, 10, 0));
        camera.attachControl();
      
        return camera;
    }
    
    

}

export default DevCamera;