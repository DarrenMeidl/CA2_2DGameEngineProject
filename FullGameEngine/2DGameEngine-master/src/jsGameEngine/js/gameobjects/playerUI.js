import GameObject from '../base/gameobject.js';
import UI from '../components/ui.js';
import Player from './player.js';

// The PlayerUI class extends GameObject.
class PlayerUI extends GameObject {
  constructor(x, y) {
    super(x, y); // Call the constructor of the GameObject class.

    // Create a new UI component with initial text and add it to this object's components.
    this.uiComponent = new UI('Lives: 3 Score: 0', x, y);
    this.addComponent(this.uiComponent);
  }

  // The update method is called every frame.
  update(deltaTime) {
    // Find the player object in the game's gameObjects array.
    const player = this.game.gameObjects.find((obj) => obj instanceof Player);

    // Update the text of the UI component to reflect the player's current lives and score.
    this.uiComponent.setText(`Hearts: ${player.lives} Score: ${player.score}`);
    //ADDED SET COLOUR AND FONT
    this.uiComponent.setColour('white'); // Set the colour of the UI component.
    this.uiComponent.setFont('20px Cambria'); // Set the font of the UI component.
    this.uiComponent.setTextAlign('left'); // Set the text alignment of the UI component.
    this.uiComponent.setPos(540, 10); // Set the position of the UI component.
  }

  reset(){
    this.uiComponent.setText(`Hearts: 3 Score: 0`);
    //ADDED SET COLOUR AND FONT
    this.uiComponent.setColour('white'); // Set the colour of the UI component.
    this.uiComponent.setFont('20px Cambria'); // Set the font of the UI component.
    this.uiComponent.setTextAlign('left'); // Set the text alignment of the UI component.
    this.uiComponent.setPos(540, 10); // Set the position of the UI component.
  }
}

export default PlayerUI; // Export the PlayerUI class for use in other modules.
