class CharacterController2 {
    constructor(canvas, engine, character1, inputLeft, inputRight,inputJump,inputLaunch) {
        this.destroyed = false;
        this.action = false;
        this.setupKeyboardInputPlayer(canvas, engine, character1, inputLeft, inputRight,inputJump,inputLaunch);
    }

    setupKeyboardInputPlayer(canvas, engine, character, input1,input2, inputJump,inputLaunch) {
        this.keys = {};
        let isKeyPressed = false;
        let isKeyPressed2 = false;
        // Écoute l'événement "keydown" (touche enfoncée) sur le canvas.
        canvas.addEventListener('keydown', (event) => {
            if (!this.keys[event.key]) {
                this.keys[event.key] = true;

             
            }
        });

        // Écoute l'événement "keyup" (touche relâchée) sur le canvas.
        canvas.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
            
        });

        // Démarre la boucle de rendu du moteur Babylon.js.
        engine.runRenderLoop(() => {
          
            if(!this.destroyed){
                if (this.keys[input1]) {
                    console.log('Touche gauche enfoncée');
                    character.applyForce(new BABYLON.Vector3(5*2, 0, 0), new BABYLON.Vector3(0, 0, 0));
                    character.setAngularVelocity(BABYLON.Vector3.ZeroReadOnly);
            
                }

                if (this.keys[input2]) {
                    console.log('Touche Droite enfoncée');
                    character.applyForce(new BABYLON.Vector3(-5*2, 0, 0), new BABYLON.Vector3(0, 0, 0));
                    character.setAngularVelocity(BABYLON.Vector3.ZeroReadOnly);
        
                }

                
                if (this.keys[inputJump] && !this.action) {
                    console.log('Touche JUMP enfoncée');
                    character.applyForce(new BABYLON.Vector3(0, 30, 0), new BABYLON.Vector3(0, 0, 0));
                    character.setAngularVelocity(BABYLON.Vector3.ZeroReadOnly);
        
                }
                if (this.keys[inputLaunch] && !this.action) {
                    console.log('Touche LAUNCH enfoncée');
                    this.action = true;
                    character.applyForce(new BABYLON.Vector3(0, 0, 700*4), new BABYLON.Vector3(0, 0, 0));
                    //character.setAngularVelocity(BABYLON.Vector3.ZeroReadOnly);
        
                }

                //character.setAngularVelocity(BABYLON.Vector3.ZeroReadOnly);
            }
        });

       
    }


    destroy() {
     
        this.destroyed = true;

        // Libérez les références aux objets
        this.canvas = null;
        this.engine = null;

        //this.character1.dispose();
        this.character1 = null;
        this.inputLeft = null;
        this.inputRight = null;
        this.inputJump = null;
        this.inputLaunch = null;

        // Réinitialisez ou supprimez d'autres ressources si nécessaire
    }

    
}

export default CharacterController2;
