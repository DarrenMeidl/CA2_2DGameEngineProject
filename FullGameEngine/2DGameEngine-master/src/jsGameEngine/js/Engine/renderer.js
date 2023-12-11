import Component from "./component.js"; //This imports the Component base class from the component.js file
//Got code from class
class Renderer extends Component{ //This is the Renderer class
    constructor(color = "white", width = 50, height = 50, image = null){ //This sets the default values for the renderer
        super(); //This calls the constructor of the Component class, this object will inherit from the component class
        this.color = color;
        this.width = width;
        this.height = height;
        this.image = image;
    }
    draw(ctx){ //This function draws the renderer
        if(this.image && this.image.complete){ //If the image exists and is loaded
            const x = this.gameObject.x; //This gets the x position of the game object
            const y = this.gameObject.y; //This gets the y position of the game object
            const w = this.width; //This gets the width of the renderer
            const h = this.height; //This gets the height of the renderer
            const flipX = this.gameObject.direction === -1; //This checks if the game object is flipped on the x axis
            if(!flipX){
                ctx.drawImage(this.image, x, y, w, h); //This draws the image
            } else{
                ctx.save(); //This saves the canvas state
                ctx.translate(x+w, y); //This translates the canvas to the game object position
                ctx.scale(-1, 1); //This flips the canvas on the x axis
                ctx.drawImage(this.image, -x, y, -w, h); //This draws the image
                ctx.restore(); //This restores the canvas state
            }
        } else{ //If the image doesn't exist or isn't loaded
            ctx.fillStyle = this.color; //This sets the fill style to the color of the renderer
            ctx.fillRect(this.gameObject.x, this.gameObject.y, this.width, this.height); //This draws a rectangle
        }
    }
}
export default Renderer; //This exports the Renderer class so it can be used in other files