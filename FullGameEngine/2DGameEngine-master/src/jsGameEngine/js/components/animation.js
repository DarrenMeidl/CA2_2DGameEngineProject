import Component from '../base/component.js';
class Animation extends Component{
  constructor(frames, frameRate) {
    super();
    this.frames = frames; // Array of image frames
    this.frameRate = frameRate; // Frame rate in frames per second
    this.currentFrame = 0; // Current frame index
    this.isPlaying = false; // Flag to indicate if animation is playing
    this.intervalId = null; // Interval ID for animation loop
  }

  play() { // Start animation
    if (this.isPlaying) return; // Animation is already playing

    this.currentFrame = 0; // Reset frame index
    this.isPlaying = true;
    this.intervalId = setInterval(() => { // Start animation loop
      this.currentFrame = (this.currentFrame + 1) % this.frames.length; // Increment frame index
        console.log(`Current frame: ${this.currentFrame}`);
    }, 1000 / this.frameRate); // Interval is in milliseconds
  }

  stop() { // Stop animation
    if (!this.isPlaying) return; // Animation is not playing

    this.isPlaying = false;
    clearInterval(this.intervalId); // Stop animation loop
    this.currentFrame = 0; // Reset frame index
    console.log('Animation stopped');
  }

  getCurrentFrame() { // Get the current frame
    return this.frames[this.currentFrame]; // Return the current frame
  }
}

export default Animation;
