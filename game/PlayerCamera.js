class PlayerCamera {
    constructor(canvas, scene,engine) {
        this.camera = this.createCamera(scene,canvas);
        this.setupKeyboardInput(canvas,engine);
        this.lockPointer(scene,engine)
      
    }


    createCamera(scene,canvas) {
        var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        // Attach the camera to the canvas
        camera.attachControl(canvas, true)
    
   
        return camera;
    }

    setupPointerLock() {
        canvas.addEventListener("click", () => {
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            canvas.requestPointerLock();
        });

        document.addEventListener("pointerlockchange", () => {
            if (document.pointerLockElement === canvas) {
                // Le pointeur est verrouillé, vous pouvez gérer l'entrée ici
            } else {
                // Le pointeur n'est pas verrouillé
            }
        });
    }
   
    
    lockPointer(scene, engine) {
        scene.onPointerDown = (evt) => {
            if (evt.button === 0) {
                engine.getRenderingCanvas().requestPointerLock();
            } else if (evt.button === 1) {
                document.exitPointerLock();
            }
        };
    }
    

    setupKeyboardInput(canvas,engine) {
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
export default PlayerCamera;