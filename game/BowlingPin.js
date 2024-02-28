
export class BowlingPin {

    constructor(scene,x,y,z) {
       
        this.scene = scene;
       
        this.x = x;
        this.y = y;
        this.z = z;


    
     
    }
    
    createBowlingPin(){

        BABYLON.SceneLoader.ImportMesh("", "./models/", "Bowling Pin.glb", this.scene, (meshes) => {

            const shape = new BABYLON.PhysicsShapeCapsule(
                new BABYLON.Vector3(0,0,0), // center of the sphere in local space
                10, // radius of the sphere
                this.scene // containing scene
            );

            const shapeBox1 = new BABYLON.PhysicsShapeBox(
                new BABYLON.Vector3(0, 0, 0),        // center of the box
                new BABYLON.Quaternion(0, 0, 0, 1),  // rotation of the box
                new BABYLON.Vector3(0.5, 1.2, 0.5),      // dimensions of the box
                this.scene                                // scene of the shape
            );
            console.log("Chargement réussi Pin", meshes);
        
            let mesh = meshes[0];
            mesh.scaling._z =  mesh.scaling._z *-1;
            mesh.name ="Pin"
            /*
            let mesh2 = meshes[1];
            mesh2.name ="UnderPin"
            console.log(mesh);*/
        
    
            mesh.position = new BABYLON.Vector3(this.x, this.y, this.z); // Positionne l'objet
            
            var Aggregate =new BABYLON.PhysicsAggregate(mesh, shapeBox1, { mass: 1 }, this.scene);
            //var Aggregate2 =new BABYLON.PhysicsAggregate(mesh, shapeBox1, { mass: 0 }, this.scene);
            
            //Aggregate2.shape.isTrigger = true;
                     
            //var Aggregate =new BABYLON.PhysicsAggregate(mesh2, shape, { mass: 0 }, this.scene);
        
        }, undefined, undefined, ".glb");

    }
  
    
    
 
   
    disableThisObject(){
        
       
    }
    

    





}
export default BowlingPin;