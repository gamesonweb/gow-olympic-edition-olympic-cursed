class CharacterController2 {
    constructor(canvas, engine, character1, inputLeft, inputRight) {
        this.setupKeyboardInputPlayer(canvas, engine, character1, inputLeft, inputRight);
    }

    setupKeyboardInputPlayer(canvas, engine, character, input1, inputJump) {
        this.keys = {};
        let isKeyPressed = false;
        let isKeyPressed2 = false;
        // Écoute l'événement "keydown" (touche enfoncée) sur le canvas.
        canvas.addEventListener('keydown', (event) => {
            if (!this.keys[event.key]) {
                this.keys[event.key] = true;

                /*
                // Vérifie si la touche est celle que vous souhaitez traiter
                if (event.key === input1 && !isKeyPressed) {
                    isKeyPressed = true;
                    //console.log("Touche enfoncée, action effectuée");
                 
                }
                if (event.key === inputJump && !isKeyPressed2) {
                    isKeyPressed2 = true;
                    console.log("Touche enfoncée, action effectuée jump");
              
                }*/
            }
        });

        // Écoute l'événement "keyup" (touche relâchée) sur le canvas.
        canvas.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
            /*
            // Ensuite, planifiez la mise à false après une seconde
            if (event.key === inputJump ) {
                isKeyPressed2 = false;
                console.log("Touche relâchée jump");
                // Ajoutez ici la logique pour arrêter le saut du personnage si nécessaire
            }

            // Vérifie si la touche est celle que vous souhaitez traiter
            if (event.key === input1) {
                isKeyPressed = false;
                //console.log("Touche relâchée");
            }*/
        });

        // Démarre la boucle de rendu du moteur Babylon.js.
        engine.runRenderLoop(() => {
          

            if (this.keys[input1]) {
                console.log('Touche Q enfoncée');
                character.applyForce(new BABYLON.Vector3(5, 0, 0), new BABYLON.Vector3(0, 0, 0));
                character.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
          
            }

            if (this.keys[inputJump]) {
                console.log('Touche D enfoncée');
                character.applyForce(new BABYLON.Vector3(-5, 0, 0), new BABYLON.Vector3(0, 0, 0));
                character.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
     
            }

            character.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
        });
    }

    
}

export default CharacterController2;
