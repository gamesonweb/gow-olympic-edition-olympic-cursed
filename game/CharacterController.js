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
                console.log('Touche Z enfoncée');
                
                
                //character.applyForce(new BABYLON.Vector3(forward._x, forward._y, forward._z), new BABYLON.Vector3(0, 0, 0));
                character.applyForce(new BABYLON.Vector3(0, 0, -5), new BABYLON.Vector3(0, 0, 0));
                character.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
          
            }

            if (this.keys['s']) {
                console.log('Touche S enfoncée');
                character.applyForce(new BABYLON.Vector3(0, 0, 10), new BABYLON.Vector3(0, 0, 0));
                
                character.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
                //character.position.z += 0.1; // Déplace le personnage vers l'avant (positif sur l'axe z).
            }

            if (this.keys['q']) {
                console.log('Touche Q enfoncée');
                character.applyForce(new BABYLON.Vector3(8, 0, 0), new BABYLON.Vector3(0, 0, 0));
                character.setAngularVelocity(new BABYLON.Vector3(0, -1, 0));
                //character.position.x += 0.1; // Déplace le personnage vers la gauche (positif sur l'axe x).
            }

            if (this.keys['d']) {
                console.log('Touche D enfoncée');
                character.applyForce(new BABYLON.Vector3(-8, 0, 0), new BABYLON.Vector3(0, 0, 0));
                character.setAngularVelocity(new BABYLON.Vector3(0, 1, 0));
                //character.position.x -= 0.1; // Déplace le personnage vers la droite (négatif sur l'axe x).
            }
        });
    }
}

export default CharacterController;
