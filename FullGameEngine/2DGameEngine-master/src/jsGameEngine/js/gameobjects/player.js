// Importing necessary components and resources
import GameObject from '../base/gameobject.js';
import Renderer from '../components/renderer.js';
import Physics from '../components/physics.js';
import Input from '../components/input.js';
import { Images } from '../components/resources.js';
import Enemy from './enemy.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import ParticleSystem from '../gameobjects/particleSystem.js';
import { AudioFiles } from '../components/resources.js'; ////////NEW
import Animation from '../components/animation.js'; ////////NEW

// Defining a class Player that extends GameObject
class Player extends GameObject {
  // Constructor initializes the game object and add necessary components
  constructor(x, y) {
    super(x, y); // Call parent's constructor
    this.renderer = new Renderer('blue', 50, 50, Images.idle_0); // Add renderer
    this.addComponent(this.renderer);
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add physics
    this.addComponent(new Input()); // Add input for handling user input
    // Initialize all the player specific properties
    this.direction = 1;
    this.lives = 3;
    this.score = 0;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.isDoubleJumping = false; // Flag to check if player is double jumping
    this.jumpForce = 400;
    this.jumpTime = 0.3;
    this.jumpTimer = 0;
    this.isInvulnerable = false;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;

    //IDLE ANIMATION
    this.idleFrames = []; // Array to store idle frames
    this.idleFrames.push(Images.idle_0);
    this.idleFrames.push(Images.idle_1);
    this.idleFrames.push(Images.idle_2);
    this.idleAnimation = new Animation(this.idleFrames, 3); // Create an instance of Animation for idle animation
    this.addComponent(this.idleAnimation); // Add the idle animation to the player
  }


  
  // The update function runs every frame and contains game logic
  update(deltaTime) {
    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component

    
    this.handleGamepadInput(input);
    
    // Handle player movement
    if (!this.isGamepadMovement && input.isKeyDown('ArrowRight')) {
      physics.velocity.x = 100;
      this.direction = -1;
    } else if (!this.isGamepadMovement && input.isKeyDown('ArrowLeft')) {
      physics.velocity.x = -100;
      this.direction = 1;
    } else if (!this.isGamepadMovement) {
      physics.velocity.x = 0;
    }

    // Handle player jumping
    if (!this.isGamepadJump && input.isKeyDown('ArrowUp')) {
      this.startJump();
    }
    if (this.isJumping || this.isDoubleJumping) {
      this.updateJump(deltaTime);
    }

    this.handleAnimations(); // Handle animations

    

    // Handle collisions with collectibles
    const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    for (const collectible of collectibles) {
      if (physics.isColliding(collectible.getComponent(Physics))) {
        this.collect(collectible);
        this.game.removeGameObject(collectible);
      }
    }
  
    // Handle collisions with enemies
    const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy);
    for (const enemy of enemies) {
      if (physics.isColliding(enemy.getComponent(Physics))) {
        this.collidedWithEnemy();
      }
    }
  
    // Handle collisions with platforms
    this.isOnPlatform = false;  // Reset this before checking collisions with platforms
    const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform); // Get all platforms
    for (const platform of platforms) { // Loop through all platforms
      if (physics.isColliding(platform.getComponent(Physics))) { // Check if player is colliding with platform
        if (!this.isJumping) { // If player is not jumping, stop vertical movement and position it on top of platform
          physics.velocity.y = 0;
          physics.acceleration.y = 0;
          this.y = platform.y - this.renderer.height;
          this.isOnPlatform = true;
        }
      }
    }
  
    // Check if player has fallen off the bottom of the screen
    if (this.y > this.game.canvas.height) {
      this.resetPlayerState();
    }

    // Check if player has no lives left
    if (this.lives <= 0) {
      location.reload();
    }

    // Check if player has collected all collectibles
    if (this.score >= 3) {
      console.log('You win!');
      location.reload();
    }

    super.update(deltaTime);
  }

  //This function handles all animations
  handleAnimations(){
    this.handleIdleAnimation(); // Handle idle animation
  }

  handleIdleAnimation() { // Handle idle animation
    const physics = this.getComponent(Physics); // Get physics component
    const idleAnimation = this.getComponent(Animation); // Get idle animation component
    //Handle Idle Animation
    if (physics.velocity.x === 0) { // If the player is not moving, play idle animation
      idleAnimation.play();
      this.getComponent(Renderer).image = idleAnimation.getCurrentFrame(); // Renders image by setting the player's image to the current frame of the idle animation
    } 
    else if (physics.velocity.x !== 0) { // If the player is moving, stop idle animation, set player image to default image
      this.getComponent(Renderer).image = idleAnimation.stop();
      this.getComponent(Renderer).image = Images.player;
    }
  }

  handleGamepadInput(input){
    const gamepad = input.getGamepad(); // Get the gamepad input
    const physics = this.getComponent(Physics); // Get physics component
    if (gamepad) {
      // Reset the gamepad flags
      this.isGamepadMovement = false;
      this.isGamepadJump = false;

      // Handle movement
      const horizontalAxis = gamepad.axes[0];
      // Move right
      if (horizontalAxis > 0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = 100;
        this.direction = -1;
      } 
      // Move left
      else if (horizontalAxis < -0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = -100;
        this.direction = 1;
      } 
      // Stop
      else {
        physics.velocity.x = 0;
      }
      
      // Handle jump, using gamepad button 0 (typically the 'A' button on most gamepads)
      if (input.isGamepadButtonDown(0) && this.isOnPlatform) {
        this.isGamepadJump = true;
        this.startJump();
      }
    }
  }

  startJump() {
    // Initiate a jump if the player is on a platform
    if (this.isOnPlatform) { 
      this.isJumping = true;
      this.isDoubleJumping = false;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce; // Set the vertical velocity to the jump force
      this.isOnPlatform = false;
      //Play jump sound
      const jumpSound = new Audio(AudioFiles.jump); ////////NEW
      jumpSound.play();

    }
    // Initiate a double jump if the player is not on a platform and is not already double jumping and when the jump timer is 0
    if (!this.isOnPlatform && !this.isDoubleJumping && this.jumpTimer <= 0) { 
      this.isDoubleJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce; // Set the vertical velocity to the jump force
      this.isOnPlatform = false;
      //Play jump sound
      const jumpSound = new Audio(AudioFiles.jump); ////////NEW
      jumpSound.play();

    }
  }
  
  
  updateJump(deltaTime) {
    // Updates the jump progress over time
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
      this.isJumping = false;
    }
  }

  collidedWithEnemy() {
    // Checks collision with an enemy and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
    }
  }

  collect(collectible) {
    // Handle collectible pickup
    this.score += collectible.value;
    this.lives += collectible.value; //Picking up a collectible also gives the player an extra life
    console.log(`Score: ${this.score}`);
    this.emitCollectParticles(collectible); // Emit particles when a collectible is collected
  }

  emitCollectParticles() {
    // Create a particle system at the player's position when a collectible is collected
    const particleSystem = new ParticleSystem(this.x, this.y, 'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  resetPlayerState() {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = this.game.canvas.width / 2;
    this.y = this.game.canvas.height / 2;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = 1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
  }

  resetGame() {
    // Reset the game state, which includes the player's state
    this.lives = 3;
    this.score = 0;
    this.resetPlayerState();
  }
}

export default Player; // Export the Player class as the default export of this module