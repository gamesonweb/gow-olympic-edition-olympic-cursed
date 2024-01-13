
class ColliderGestionner {

    constructor(scene) {
        this.scene = scene;
    }

    // Crée un modèle d'arbre 3D et le positionne aux coordonnées spécifiées (x, y, z)
    createBoudingBox(parent,x,y,z,sizeX,sizeY,sizeZ) {
 
        parent.position = new BABYLON.Vector3(x, y, z); // Positionne l'arbre aux 
    
        //BOITE DE COLLISION
        let boundingBox = BABYLON.MeshBuilder.CreateBox("boundingBox", { size: 1 }, this.scene);

        boundingBox.isVisible = false;
        
        
        boundingBox.position =  new BABYLON.Vector3(x, y, z);
        
        boundingBox.physicsImpostor = new BABYLON.PhysicsImpostor(
            boundingBox,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 1},
            this.scene
        
        );
        
        tronc.addChild(boundingBox);
        boundingBox.scaling = new BABYLON.Vector3(sizeX,sizeY,sizeZ);

        return boundingBox;

    }
    


}

export default ColliderGestionner;
