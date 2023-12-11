import Camera from "./camera.js"; //This imports the Camera class from the camera.js file
//Code from class
class Game{ //This class should be called main bc that's what we've been doing until now
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId); //This gets the canvas element from the html file
        this.ctx = this.canvas.getContext("2d"); //This gets the context of the canvas
        this.gameObjects = []; //This is an array of game objects where we can add game objects to the game
        this.gameObjectsToRemove = []; //This is an array of game objects to remove
        this.lastFrameTime = 0; //This is the time of the last frame
        this.deltaTime = 0;
        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas()); //This resizes the canvas when the window is resized
        this.camera = new Camera(null, this.canvas.width, this.canvas.height); //This creates a new camera
    }
    resizeCanvas(){ //This function resizes the canvas
        this.canvas.width = window.innerWidth -50; //This sets the width of the canvas to the width of the window, minus 50
        this.canvas.height = window.innerHeight -50; //This sets the height of the canvas to the height of the window, minus 50
    }
    start(){ //This function starts the game loop
        this.isRunning = true;
        requestAnimationFrame((timestamp)=> this.gameLoop(timestamp)); //requestAnimationFrame calls the gameLoop function whenever timestamp is true
    }
    gameLoop(currentFrameTime){ //This function is called every frame
        this.deltaTime = (currentFrameTime - this.lastFrameTime) / 1000; //This calculates the time between frames, helps with smoothing e.g. animations
        this.lastFrameTime = currentFrameTime; //This sets the last frame time to the current frame time
        this.update(); //This calls the update function
        this.draw(); //This calls the draw function
        this.camera.update(); //This updates the camera
        requestAnimationFrame((timestamp)=> this.gameLoop(timestamp)); //This calls the gameLoop function again
    }

    update(){ 
        for(const gameObject of this.gameObjects){ //This loops through the game objects
            gameObject.update(this.deltaTime); //This calls the update function for each game object
        }
        this.gameObjects.filter(obj => !this.gameObjectsToRemove.includes(obj)); //This filters out the game objects that will be removed by checking if they are in the gameObjectsToRemove array
        this.gameObjectsToRemove = []; //This is an array of game objects that will be removed later
    }
    draw(){ //This function draws all the game objects in the scene
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //This clears the canvas
        this.ctx.save(); //This saves the canvas state
        this.ctx.translate(-camera.x, -camera.y); //This translates the canvas by the camera position
        for(const gameObject of this.gameObjects){ //This loops through the game objects
            gameObject.draw(this.ctx); //This calls the draw function for each game object
        }
        this.ctx.restore(); //This restores the canvas state to before we do camera translation
    }
    addGameObject(gameObject){ //This function adds a game object to the game
        gameObjects.game = this;
        this.gameObjects.push(gameObject); //This adds the game object to the gameObjects array
    }
    removeGameObject(gameObject){ //This function removes a game object from the game
        this.gameObjectsToRemove.push(gameObject); //This adds the game object to the gameObjectsToRemove array
    }
    /*reset(){ //This function resets the game
        this.isRunning = false; //This stops the game loop
        for(const gameObject of this.gameObjects){ //This loops through the game objects
            if(gameObject.reset){
                gameObject.reset(); //If this game object has a reset function, call the reset function
            }
        }
        this.start(); //This starts the game loop again
    }*/
}
export default Game; //This exports the Game class so it can be used in other files
