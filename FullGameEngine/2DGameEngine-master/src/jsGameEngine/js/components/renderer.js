import Component from '../base/component.js';

// The Renderer class extends Component and handles the visual representation of a game object.
class Renderer extends Component {
  // The constructor initializes the renderer component with optional color, width, height, and image.
  constructor(color = 'white', width = 50, height = 50, image = null, shape = 'rectangle') {
    super(); // Call the parent constructor.
    this.color = color; // Initialize the color.
    this.width = width; // Initialize the width.
    this.height = height; // Initialize the height.
    this.image = image; // Initialize the image.
    this.shape = shape; // Initialize the shape.
  }

  // The draw method handles rendering the game object on the canvas.
  draw(ctx) {
    // If an image is provided and it has finished loading, draw the image.
    if (this.image && this.image.complete) {
      // Get the position and dimensions of the game object.
      const x = this.gameObject.x;
      const y = this.gameObject.y;
      const w = this.width;
      const h = this.height;
      // Check if the image should be flipped horizontally based on the direction of the game object.
      const flipX = this.gameObject.direction === -1;
      if (!flipX) {
        // If the image should not be flipped, draw it as is.
        ctx.drawImage(this.image, x, y, w, h);
      } else {
        // If the image should be flipped, save the current drawing state,
        // translate and scale the drawing context to flip the image,
        // draw the image, and then restore the drawing state.
        ctx.save();
        ctx.translate(x + w, y);
        ctx.scale(-1, 1);
        ctx.drawImage(this.image, 0, 0, w, h);
        ctx.restore();
      } // Co pilot helped make this else if statement
    } else if (this.shape === 'circle') { // Check if the shape is a circle.
      // If the shape is a circle, draw a circle with the specified color.
      ctx.fillStyle = this.color; // Set the fill color.
      const x = this.gameObject.x + this.width / 2; // Get the x coordinate of the center of the circle.
      const y = this.gameObject.y + this.height / 2; // Get the y coordinate of the center of the circle.
      const radius = Math.min(this.width, this.height) / 2; // The radius is half the width or height, whichever is smaller.
      ctx.beginPath(); // Begin drawing the circle.
      ctx.arc(x, y, radius, 0, 2 * Math.PI); // Define the circle.
      ctx.closePath(); // End drawing the circle.
      ctx.fill(); // Fill the circle with the specified color.
    } else {
      // If no image is provided or it has not finished loading, draw a rectangle with the specified color.
      ctx.fillStyle = this.color;
      ctx.fillRect(this.gameObject.x, this.gameObject.y, this.width, this.height);
    }
  }
}

// The Renderer class is then exported as the default export of this module.
export default Renderer;