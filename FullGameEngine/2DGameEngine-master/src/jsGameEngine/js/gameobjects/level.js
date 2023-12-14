// Import necessary classes and resources
import Game from '../base/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import AudioManager from './audiomanager.js'; ////////NEW
import FinishPoint from './finish.js';
// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);
    
    // Create a player object and add it to the game
    //const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    //this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Add the audio manager object to the game
    const audioManager = new AudioManager(10, 10); ////////NEW
    audioManager.playBackgroundMusic(); ////////NEW
    audioManager.setVolume(0); ////////NEW

    // Set the game's camera target to the player
    //this.camera.target = player;

    // Define the platform's width and the gap between platforms
    const platformWidth = 200;
    const gap = 100;

    // Create platforms and add them to the game
    const platforms = [
      //Starting platforms
      new Platform(platformWidth + gap, this.canvas.height, platformWidth, 20),
      new Platform(2 * (platformWidth + gap), this.canvas.height, platformWidth, 20),
      new Platform(3 * (platformWidth + gap), this.canvas.height, platformWidth, 20),
      //Stair platforms
      new Platform(4 * (platformWidth + gap), this.canvas.height - 100, platformWidth/2, 20, "blue"),
      new Platform(3 * (platformWidth + 150), this.canvas.height - 250, platformWidth/2, 20, "blue"),
      new Platform(4 * (platformWidth + gap), this.canvas.height - 400, platformWidth/2, 20, "blue"),
      //3rd Section
      new Platform(1400, this.canvas.height - 400, 700, 20, "yellow"),
      new Platform(1400, this.canvas.height - 700, 700, 20, "yellow"),
      //4th Section
      
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }


    const player = new Player(1250, this.canvas.height - 400);
    this.addGameObject(player);

    this.camera.target = player;

    // Create enemies and add them to the game
    this.addGameObject(new Enemy(platformWidth + gap + 50, this.canvas.height - 90));
    this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, this.canvas.height - 90));
    this.addGameObject(new Enemy(3 * (platformWidth + gap) + 50, this.canvas.height - 90));

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(450, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(650, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(850, this.canvas.height - 100, 20, 20));
    
    // Add finish point
    this.addGameObject(new FinishPoint(950, this.canvas.height - 100, 30, 30, "blue"));
  }
  
}

// Export the Level class as the default export of this module
export default Level;
