// Import the GameObject class from the 'engine' directory
import GameObject from '../base/gameobject.js';

// Import the Renderer class from the 'engine' directory
import Renderer from '../components/renderer.js';

// Import the Physics class from the 'engine' directory
import Physics from '../components/physics.js';

class Bullet extends GameObject {
    constructor(x, y, width, height, direction, color = 'purple') {   
        // Call the constructor of the superclass (GameObject) with the x and y coordinates
        super(x, y);
        // Add a new Renderer component to this bullet. The renderer is responsible for drawing the bullet.
        // It uses the provided color, width, and height.
        this.addComponent(new Renderer(color, width, height));   
        // Add a new Physics component to this bullet. The physics component is responsible for handling the physics
        // (like movement, collision detection, etc.). In this case, the bullet doesn't move,
        // so the initial velocity, acceleration, and friction are all set to zero.
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
    
        // Set the 'tag' property of this bullet. The tag is used to identify the type of GameObject
        // (useful when checking collisions, for example)
        this.tag = 'bullet';
    
        // Set the 'value' property of this bullet. This could be used to score points when the bullet is collected.
        this.value = 1;
        this.direction = direction;
    }

    move(){
        if(this.direction == 1){
            this.x = this.x - 5;
        }
        else {
            this.x = this.x + 5;
        }
    }
}
export default Bullet;