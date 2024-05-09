

export class BowlingPin {

    constructor(scene,x,y,z) {
       
        this.scene = scene;
       
        this.x = x;
        this.y = y;
        this.z = z;

        this.mesh;
        this.Aggregate;
        this.meshIdPromise = this.createBowlingPin();
    }
    
    createBowlingPin(){

        return new Promise((resolve) => {

            BABYLON.SceneLoader.ImportMesh("", "./models/", "Bowling Pin.glb", this.scene, (meshes) => {

             

                const shapeBox1 = new BABYLON.PhysicsShapeBox(
                    new BABYLON.Vector3(0, 0, 0),        // center of the box
                    new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
                    new BABYLON.Vector3(0.5, 1.2, 0.5),      // dimensions of the box
                    this.scene                                // scene of the shape
                );
        

                let boxKid = BABYLON.MeshBuilder.CreateBox("Pintrigger");
                //boxKid.isVisible = false;

                //console.log("Chargement réussi Pin", meshes);
            
                let mesh = meshes[0];
                mesh.scaling._z =  mesh.scaling._z *-1;
                mesh.name ="Pin"

  
            
        
                mesh.position = new BABYLON.Vector3(this.x, this.y, this.z); // Positionne l'objet
            

            
                var Aggregate =new BABYLON.PhysicsAggregate(mesh, shapeBox1, { mass: 0.1 }, this.scene);
                Aggregate.body.setCollisionCallbackEnabled(true);
                this.Aggregate = Aggregate;
                this.mesh = mesh;
               
                const meshId = mesh.uniqueId;
                resolve(meshId);

            }, undefined, undefined, ".glb");
        })

    }
  
    
    async getMeshId(){
         return await this.meshIdPromise;
    }
 
   
    disableThisObject(){
        this.Aggregate.body.setCollisionCallbackEnabled(false);
        this.Aggregate.body.dispose();
        //this.mesh.dispose();
       
    }
    isPinUp() {
        // Récupérer la rotation de la quille
        const rotation = this.mesh.rotationQuaternion.toEulerAngles();

        // Définir un seuil pour la rotation, en dessous duquel la quille est considérée comme renversée
        const threshold = 0.1; // À ajuster selon vos besoins

        // Vérifier si la rotation autour de l'axe X (ou un autre axe selon votre modèle) dépasse le seuil
        const isUp = Math.abs(rotation.x) < threshold;

        return isUp;
    }
    

    





}
export default BowlingPin;