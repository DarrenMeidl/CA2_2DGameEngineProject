import Renderer from "./renderer.js"; //This imports the Renderer class from the renderer.js file	
//Sample code from class
class Camera{ //This is the Camera class
    constructor(target, width, height){ //This sets the default values for the camera
        this.target = target;
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
    }
    update(){ //This function updates the camera
        if(this.target){ //If the camera has a target
            this.x = this.target.x+this.target.getComponent(Renderer).width/2 - this.width/2; //This sets the x position of the camera to the x position of the target
            this.y = this.target.y+this.target.getComponent(Renderer).height/2 - this.height/2; //This sets the y position of the camera to the y position of the target
        }
    }
}
export default Camera; //This exports the Camera class so it can be used in other files