import Component from "./component.js"; //This imports the Component base class from the component.js file
import Renderer from "./renderer.js"; //This imports the Renderer class from the renderer.js file
//Got this sample code from naoise's class
class Physics extends Component{ //This is the Physics class
    //This is the constructor of the Physics class
    constructor(velocity = {x:0, y:0}, acceleration = {x:0, y:0}, gravity = {x:0, y:300}){ 
        super();
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.gravity = gravity;
    }

    update(deltaTime){
        this.velocity.x += this.acceleration.x * deltaTime; //This adds the acceleration to the velocity
        this.velocity.y += this.acceleration.y * deltaTime; //This adds the acceleration to the velocity
        this.gameObject.x += this.velocity.x * deltaTime; //This adds the velocity to the x position of the game object
        this.gameObject.y += this.velocity.y * deltaTime; //This adds the velocity to the y position of the game object
    }
    //This function checks if the game object is colliding with another game object
    isColliding(otherPhysics){
        const[left,right,top,bottom] = this.getBoundingBox(); //This gets the bounding box of the game object
        const[otherLeft,otherRight,otherTop,otherBottom] = otherPhysics.getBoundingBox(); //This gets the bounding box of the other game object

        return left<otherRight && right>otherLeft && top<otherBottom && bottom>otherTop; //This returns true if the game object is colliding with the other game object, false if not
    }
    //This function gets the bounding box of the game object
    getBoundingBox(){
        const renderer = this.gameObject.getComponent(Renderer); //This gets the renderer of the game object
        const left = this.gameObject.x; //This gets the x position of the game object
        const right = this.gameObject.x + renderer.width; //This gets the x position of the game object + the width of the renderer
        const top = this.gameObject.y; //This gets the y position of the game object
        const bottom = this.gameObject.y + renderer.height; //This gets the y position of the game object + the height of the renderer
        
        return [x, x+w, y, y+h]; //This returns the bounding box
    }
}