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
import { Images } from '../components/resources.js';

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
    audioManager.setVolume(0.5); 

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
      //4th Section
      
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    // Create a player object and add it to the game
    const player = new Player(1250, this.canvas.height - 500);
    this.addGameObject(player);

    // Set the game's camera target to the player
    this.camera.target = player;

    // Create enemies and add them to the game
    this.addGameObject(new Enemy(platformWidth + gap + 50, 300, 5));
    this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, 300, 5));
    this.addGameObject(new Enemy(3 * (platformWidth + gap) + 50, 300, 3));

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(450, 400, 20, 20));
    this.addGameObject(new Collectible(650, 400, 20, 20));
    this.addGameObject(new Collectible(850, 400, 20, 20));
    
    // Add finish point
    this.addGameObject(new FinishPoint(1500, 87, 30, 30, "blue"));

    const gameManager = new GameManager(0, 0); // Create a new game manager object
    this.addGameObject(gameManager); // Add the game manager to the game
  }
  
}

// Export the Level class as the default export of this module
export default Level;
