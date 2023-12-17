// Import necessary classes and resources
import Game from '../base/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import AudioManager from './audiomanager.js';
import FinishPoint from './finish.js';
import GameManager from './gamemanager.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Add the audio manager object to the game, play background music and set the volume
    const audioManager = new AudioManager(10, 10); 
    audioManager.playBackgroundMusic(); 
    audioManager.setVolume(0); 

    // Define the platform's width and the gap between platforms
    const platformWidth = 200;
    const gap = 100;

    // Create platforms and add them to the game
    const platforms = [
      //Starting platforms
      new Platform(platformWidth + gap, this.canvas.height, platformWidth, 71),
      new Platform(2 * (platformWidth + gap), this.canvas.height, platformWidth, 71),
      new Platform(3 * (platformWidth + gap), this.canvas.height, platformWidth, 71),
      //Stair platforms
      new Platform(4 * (platformWidth + gap), this.canvas.height - 100, platformWidth/2, 71/2),
      new Platform(3 * (platformWidth + 150), this.canvas.height - 250, platformWidth/2, 71/2),
      new Platform(4 * (platformWidth + gap), this.canvas.height - 400, platformWidth/2, 71/2),
      //3rd Section
      new Platform(1400, this.canvas.height - 400, platformWidth/2, 71/2),
      new Platform(1600, this.canvas.height - 300, platformWidth/2, 71/2),
      new Platform(1800, this.canvas.height - 350, platformWidth/2, 71/2),
      new Platform(2050, this.canvas.height - 350, platformWidth, 71),
      new Platform(2150, this.canvas.height - 350, platformWidth, 71),
      new Platform(2250, this.canvas.height - 350, platformWidth, 71),
      //4th Section
      new Platform(2600, this.canvas.height - 200, platformWidth/2, 71/2),
      new Platform(2800, this.canvas.height - 300, platformWidth/2, 71/2),
      new Platform(3000, this.canvas.height - 400, platformWidth/2, 71/2),
      new Platform(3200, this.canvas.height - 500, platformWidth, 71),
      new Platform(3500, this.canvas.height - 500, platformWidth, 71),
      new Platform(3800, this.canvas.height - 500, platformWidth, 71),
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    // Create a player object and add it to the game
    const player = new Player(300, this.canvas.height - 500);
    this.addGameObject(player);

    // Set the game's camera target to the player
    this.camera.target = player;

    // Create enemies and add them to the game
    this.addGameObject(new Enemy(1400, this.canvas.height - 400, 3));
    this.addGameObject(new Enemy(2050, this.canvas.height - 350, 3));
    this.addGameObject(new Enemy(2150, this.canvas.height - 350, 3));
    this.addGameObject(new Enemy(2250, this.canvas.height - 350, 3));
    this.addGameObject(new Enemy(3200, this.canvas.height - 550, 5));
    this.addGameObject(new Enemy(3500, this.canvas.height - 550, 5));

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(450, 400, 20, 20));
    this.addGameObject(new Collectible(650, 400, 20, 20));
    this.addGameObject(new Collectible(850, 400, 20, 20));
    this.addGameObject(new Collectible(2650, this.canvas.height - 220, 20, 20));
    this.addGameObject(new Collectible(2850, this.canvas.height - 320, 20, 20));
    this.addGameObject(new Collectible(3050, this.canvas.height - 420, 20, 20));
    this.addGameObject(new Collectible(3450, this.canvas.height - 620, 20, 20));
    this.addGameObject(new Collectible(3750, this.canvas.height - 620, 20, 20));
    
    // Add finish point
    this.addGameObject(new FinishPoint(3900, this.canvas.height - 530, 30, 30, "blue"));

    const gameManager = new GameManager(0, 0); // Create a new game manager object
    this.addGameObject(gameManager); // Add the game manager to the game
  }
  
}

// Export the Level class as the default export of this module
export default Level;
