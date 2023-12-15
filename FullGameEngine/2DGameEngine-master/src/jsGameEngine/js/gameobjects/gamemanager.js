import GameObject from '../base/gameobject.js';
import Player from './player.js';
import Input from '../components/input.js';

class GameManager extends GameObject{
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.addComponent(new Input()); // Add input for handling user input
    }

    update(deltaTime){
        const input = this.getComponent(Input); // Get the input component
        if (input.isKeyDown('Escape')){
            console.log('P pressed');
            this.resetGame();
        }
        super.update(deltaTime);
    }

    resetGame() {
        const player = this.game.gameObjects.find(obj => obj instanceof Player); // Find the player
        // Reset the game state, which includes the player's state
        player.lives = 3;
        player.score = 0;
        player.resetPlayerState();
    }
}
export default GameManager;