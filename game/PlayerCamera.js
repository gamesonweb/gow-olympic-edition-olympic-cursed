class PlayerCamera {
    constructor(canvas, scene) {
        this.camera = this.createCamera(scene);
        this.setupKeyboardInput(canvas);
    }


    createCamera(scene) {
        var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        
        // Désactivez les contrôles au clavier pour empêcher la caméra de bouger avec les flèches directionnelles
        camera.inputs.clear();
        
        return camera;
    }
    

    setupKeyboardInput(canvas) {
        this.keys = {};

        canvas.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });

        canvas.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });

        engine.runRenderLoop(() => {
            if (this.keys['z']) {
                console.log('Touche Z enfoncée');
            }
            if (this.keys['s']) {
                console.log('Touche S enfoncée');
            }
            if (this.keys['q']) {
                console.log('Touche Q enfoncée');
            }
            if (this.keys['d']) {
                console.log('Touche D enfoncée');
            }
        });
    }
}
