import GameObject from '../base/gameobject.js';
import Player from './player.js';
import Input from '../components/input.js';

class GameManager extends GameObject{
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
    }

    update(deltaTime){
        const input = this.getComponent(Input); // Get input component
        if (input.isKeyDown('ArrowUp')){
            this.resetGame();
        }
        
        super.update(deltaTime);
    }

    resetGame() {
        const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
        // Reset the game state, which includes the player's state
        player.lives = 3;
        player.score = 0;
        player.resetPlayerState();
      }
}