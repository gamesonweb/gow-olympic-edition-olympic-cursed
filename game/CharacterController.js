class CharacterController {
    constructor(canvas , engine, character,forward,backward,left,right) {
        this.setupKeyboardInput(canvas, engine, character,forward,backward,left,right);
    }

    setupKeyboardInput(canvas, engine, character,forwardI,backward,left,right) {
        this.keys = {};

        // Écoute l'événement "keydown" (touche enfoncée) sur le canvas.
        canvas.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });

        // Écoute l'événement "keyup" (touche relâchée) sur le canvas.
        canvas.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });

        // Démarre la boucle de rendu du moteur Babylon.js.
        engine.runRenderLoop(() => {
            // Vérifie l'état des touches dans l'objet "keys" et effectue des actions en conséquence.

            if (this.keys[forwardI]) {
                //console.log('Touche Z enfoncée');
                
                let forward = character.transformNode.forward.scale(-5);
                console.log(forward);

                character.applyForce(forward , character.transformNode.position);
                character.setAngularVelocity(BABYLON.Vector3.ZeroReadOnly);
          
            }

            if (this.keys[backward]) {
                //console.log('Touche S enfoncée');
                character.applyForce(new BABYLON.Vector3(0, 0, 5), new BABYLON.Vector3(0, 0, 0));
                character.setAngularVelocity(BABYLON.Vector3.ZeroReadOnly);
                //character.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
                //charater.position.z += 0.1; // Déplace le personnage vers l'avant (positif sur l'axe z).
            }

            if (this.keys[left]) {
                //console.log('Touche Q enfoncée');
                character.applyForce(new BABYLON.Vector3(5, 0, 0), new BABYLON.Vector3(0, 0, 0));
                character.setAngularVelocity(new BABYLON.Vector3(0, -0.5, 0));
                //character.setAngularVelocity(BABYLON.Vector3.ZeroReadOnly);
                //character.position.x += 0.1; // Déplace le personnage vers la gauche (positif sur l'axe x).
            }

            if (this.keys[right]) {
                //console.log('Touche D enfoncée');
                character.applyForce(new BABYLON.Vector3(-5, 0, 0), new BABYLON.Vector3(0, 0, 0));
                character.setAngularVelocity(new BABYLON.Vector3(0, 0.5, 0));
                //character.position.x -= 0.1; // Déplace le personnage vers la droite (négatif sur l'axe x).
            }
        });
    }
}

export default CharacterController;
