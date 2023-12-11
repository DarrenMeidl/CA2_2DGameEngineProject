//Got this code from github co pilot
class Animation { //This class is used to create animations
    //This is the constructor of the Animation class
    constructor(spriteSheet, frameWidth, frameHeight, frameDuration, loop = true) {
        this.spriteSheet = spriteSheet;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameDuration = frameDuration;
        this.loop = loop;
        this.frames = []; //This is an array of frames
        this.currentFrame = 0;
        this.elapsedTime = 0;

        this.loadFrames(); //This loads the frames of the animation
    }

    loadFrames() { //This function loads the frames of the animation
        const spriteSheetWidth = this.spriteSheet.width; //This gets the width of the sprite sheet
        const spriteSheetHeight = this.spriteSheet.height; //This gets the height of the sprite sheet
        const numFrames = Math.floor(spriteSheetWidth / this.frameWidth); //This gets the number of frames in the sprite sheet

        for (let i = 0; i < numFrames; i++) { //This loops through the frames
            const frameX = i * this.frameWidth; //This gets the x position of the frame
            const frameY = 0; //This gets the y position of the frame
            const frame = this.spriteSheet.getSubImage(frameX, frameY, this.frameWidth, this.frameHeight); //This gets the frame from the sprite sheet
            this.frames.push(frame); //This adds the frame to the frames array
        }
    }

    update(deltaTime) { //This function updates the animation inbetween frames
        this.elapsedTime += deltaTime; //This adds the delta time to the elapsed time

        if (this.elapsedTime >= this.frameDuration) { //This checks if the elapsed time is greater than or equal to the frame duration
            this.currentFrame++; //This increases the current frame

            if (this.currentFrame >= this.frames.length) { //This checks if the current frame is greater than or equal to the number of frames
                if (this.loop) { //This checks if the animation should loop, if it should current frame is set to 0
                    this.currentFrame = 0;
                } else { //If the animation shouldn't loop, set the current frame to the last frame
                    this.currentFrame = this.frames.length - 1;
                }
            }

            this.elapsedTime = 0; //This resets the elapsed time
        }
    }

    getCurrentFrame() { //This function gets the current frame of the animation
        return this.frames[this.currentFrame];
    }
}
export default Animation; //This exports the Animation class
