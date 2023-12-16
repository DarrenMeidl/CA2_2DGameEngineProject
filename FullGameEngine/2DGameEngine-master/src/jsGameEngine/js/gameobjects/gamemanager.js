import GameObject from '../base/gameobject.js';
import Player from './player.js';
import Input from '../components/input.js';
import Enemy from './enemy.js';
import Collectible from './collectible.js';
import Level from './level.js';
import Bullet from './bullet.js';

class GameManager extends GameObject{
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.addComponent(new Input()); // Add input for handling user input
    }

    update(deltaTime){
        const input = this.getComponent(Input); // Get the input component
        if (input.isKeyDown('KeyR') && !this.isCoolingDown){
            console.log('R pressed');
            this.resetGame(); // Reset the game
            this.isCoolingDown = true; // Set the cooldown flag
            setTimeout(() => { // Set a timeout to reset the cooldown flag
                this.isCoolingDown = false; // Reset the cooldown flag
            }, 1000); // Cooldown for a second (1000 milliseconds)
        }
        super.update(deltaTime);
    }

    resetGame() {
        /*const player = this.game.gameObjects.find(obj => obj instanceof Player); // Find the player
        // Reset the game state, which includes the player's state
        player.reset();*/
        const platformWidth = 200;
        const gap = 100;

        const bullets = this.game.gameObjects.filter(obj => obj instanceof Bullet); // Find the bullet
        for (const bullet of bullets) { // Loop through the bullets
            this.game.removeGameObject(bullet); // Remove the bullet from the game
        }
        const enemies = this.game.gameObjects.filter(obj => obj instanceof Enemy); // Find the enemies
        for (const enemy of enemies) { // Loop through the enemies
            this.game.removeGameObject(enemy); // Remove the enemy from the game
        }
        const collectibles = this.game.gameObjects.filter(obj => obj instanceof Collectible); // Find the collectibles
        for (const collectible of collectibles) { // Loop through the collectibles
            this.game.removeGameObject(collectible); // Remove the collectible from the game
        }

        // Create enemies and add them to the game
        this.game.addGameObject(new Enemy(platformWidth + gap + 50, 300));
        this.game.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, 300));
        this.game.addGameObject(new Enemy(3 * (platformWidth + gap) + 50, 300));
        // Create collectibles and add them to the game
        this.game.addGameObject(new Collectible(450, 400, 20, 20));
        this.game.addGameObject(new Collectible(650, 400, 20, 20));
        this.game.addGameObject(new Collectible(850, 400, 20, 20));

        this.game.reset();
    }
}
export default GameManager;