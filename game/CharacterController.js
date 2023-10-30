class CharacterController{

    constructor(canvas, scene,engine,target) {
        
        this.setupKeyboardInput(canvas,engine,target);
        
      
    }

    setupKeyboardInput(canvas,engine,character) {
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
                character.position.z -= 0.1;
                //console.log(character.position)
            }
            if (this.keys['s']) {
                console.log('Touche S enfoncée');
                character.position.z += 0.1;
            }
            if (this.keys['q']) {
                console.log('Touche Q enfoncée');
                character.position.x += 0.1;
            }
            if (this.keys['d']) {
                console.log('Touche D enfoncée');
                character.position.x -= 0.1;
            }
        });
    }

}
export default CharacterController;