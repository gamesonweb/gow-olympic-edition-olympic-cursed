class CharacterController{

    constructor(canvas, scene,engine,target) {
        this.camera = this.createCamera2(scene,canvas,target);
        this.setupKeyboardInput(canvas,engine);
        
      
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