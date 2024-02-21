class CharacterController {
    constructor(canvas, scene, engine, character) {
        this.setupKeyboardInput(canvas, engine, character);
    }

    setupKeyboardInput(canvas, engine, character,forward,contactPoint) {
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

            if (this.keys['w']) {
                //console.log('Touche Z enfoncée');
                
                let forward = character.transformNode.forward.scale(5);
                console.log(forward);

                character.applyForce(forward, character.transformNode.position);
                character.setAngularVelocity(BABYLON.Vector3.ZeroReadOnly);
          
            }

            if (this.keys['s']) {
                //console.log('Touche S enfoncée');
                character.applyForce(new BABYLON.Vector3(0, 0, 10), new BABYLON.Vector3(0, 0, 0));
                
                character.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
                //charater.position.z += 0.1; // Déplace le personnage vers l'avant (positif sur l'axe z).
            }

            if (this.keys['q']) {
                //console.log('Touche Q enfoncée');
                character.applyForce(new BABYLON.Vector3(15, 0, -2), new BABYLON.Vector3(0, 0, 0));
                character.setAngularVelocity(new BABYLON.Vector3(0, -0.5, 0));
                //character.position.x += 0.1; // Déplace le personnage vers la gauche (positif sur l'axe x).
            }

            if (this.keys['d']) {
                //console.log('Touche D enfoncée');
                character.applyForce(new BABYLON.Vector3(-15, 0, -2), new BABYLON.Vector3(0, 0, 0));
                character.setAngularVelocity(new BABYLON.Vector3(0, 0.5, 0));
                //character.position.x -= 0.1; // Déplace le personnage vers la droite (négatif sur l'axe x).
            }
        });
    }
}

export default CharacterController;
