// Import the GameObject class from the 'engine' directory
import GameObject from '../base/gameobject.js';

// Import the Renderer class from the 'engine' directory
import Renderer from '../components/renderer.js';

// Import the Physics class from the 'engine' directory
import Physics from '../components/physics.js';

class Bullet extends GameObject {
    constructor(x, y, width, height, direction, color = 'white', image, shape) {   
        // Call the constructor of the superclass (GameObject) with the x and y coordinates
        super(x, y);
        // Add a new Renderer component to this bullet. The renderer is responsible for drawing the bullet.
        // It uses the provided color, width, and height.
        this.addComponent(new Renderer(color, width, height, image, shape));   
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
        this.image = image;
        this.shape = shape;
    }

    update(deltaTime){ // Update the bullet, calls the move and handleBulletState functions
        this.move();
        this.handleBulletState();
        super.update(deltaTime);
    }

    move(){ // Move the bullet, depending on the direction it is facing
        if(this.direction == -1){
            this.x = this.x - 5;
        }
        else {
            this.x = this.x + 5;
        }
    }

    handleBulletState(){
        if (this.x > 5000 || this.x < -2000){ // If the bullet is out of bounds
            this.isCoolingDown = true; // Set the cooldown flag to true
            setTimeout(() => {  // Set a timeout to set the cooldown flag to false after 3000 milliseconds
                this.isCoolingDown = false;
            }, 3000); // Cooldown for 3 seconds (3000 milliseconds)
            console.log('Bullet out of bounds'); // Log a message to the console
            this.game.removeGameObject(this); // Remove the bullet from the game
        }
    }
}
export default Bullet;