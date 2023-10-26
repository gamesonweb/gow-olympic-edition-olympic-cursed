class PlayerCamera {
    constructor(canvas, scene,engine,target) {
        this.camera = this.createCamera2(scene,canvas,target);
        //this.camera = this.createCamera3(scene,canvas);
        //this.camera = this.createCamera(scene,canvas,target);
        this.setupKeyboardInput(canvas,engine);
        this.lockPointer(scene,engine)
      
    }


    createCamera(scene, canvas, target) {
        var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, -10), scene);
        
        camera.setTarget(target); // Utilisez cette méthode pour définir la cible de la caméra
    
        camera.inputs.clear();
        camera.inputs.addMouse();
        camera.attachControl(canvas, true);
        
        return camera;
    }
    
    
    createCamera2(scene, canvas,targetMesh) {
        var followCamera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 0, -10), scene,targetMesh);
        //camera.setTarget(BABYLON.Vector3.Zero());
        //followCamera.target = targetMesh; // Définissez la cible de la caméra
    
       /* camera.inputs.clear();
        camera.inputs.addMouse();*/
        /*
        followCamera.radius = 5; // Distance à la cible
        followCamera.heightOffset = 3; // Hauteur par rapport à la cible
        followCamera.rotationOffset = 0; // Angle initial de la caméra*/

        followCamera.attachControl(canvas, true);
        
        return followCamera;
    }
    createCamera3(scene, canvas, targetMesh) {
        var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 10, targetMesh, scene);
    
       
    
        camera.attachControl(canvas, true);
    
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