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
import FinishPoint from './finish.js'; ////////NEW
import Bullet from './bullet.js'; ////////NEW
import GameManager from './gamemanager.js'; ////////NEW

// Defining a class Player that extends GameObject
class Player extends GameObject {
  // Constructor initializes the game object and add necessary components
  constructor(x, y) {
    super(x, y); // Call parent's constructor
    this.renderer = new Renderer('blue', 50, 50, Images.player); // Add renderer
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

    //WALK ANIMATION
    this.walkFrames = []; // Array to store walk frames
    this.walkFrames.push(Images.walk_0);
    this.walkFrames.push(Images.walk_1);
    this.walkFrames.push(Images.walk_2);
    this.walkFrames.push(Images.walk_3);
    this.walkFrames.push(Images.walk_4);
    this.walkFrames.push(Images.walk_5);
    this.walkAnimation = new Animation(this.walkFrames, 10); // Create an instance of Animation for walk animation
    this.addComponent(this.walkAnimation); // Add the walk animation to the player

    //SHOOTING
    this.isShooting = false;
    this.bullets = [];
  }


  
  // The update function runs every frame and contains game logic
  update(deltaTime) {
    const input = this.getComponent(Input); // Get the input component
    this.handleGamepadInput(input); // Handle gamepad input
    this.handlePlayerMovement(deltaTime); // Handle movement
    this.handleAnimations(); // Handle animations
    this.handleCollisions(); // Handle collisions
    this.handleShoot(); // Handle shoot
    this.handlePlayerStates(); // Handle player states

    super.update(deltaTime); // Call parent's update method
  }

  handlePlayerStates(){
    // Check if player has fallen off the bottom of the screen
    if (this.y > this.game.canvas.height) {
      this.lives--;
      const deathSound = new Audio(AudioFiles.death);
      deathSound.play(); //Play death sound
    }
    // Check if player has no lives left
    if (this.lives <= 0) {
      const gameManager = this.game.gameObjects.find(obj => obj instanceof GameManager); // Find the game manager
      gameManager.resetGame();
    }
    // Check if player has collected all collectibles
    if (this.score >= 3) {
      console.log('You win!');
      const gameManager = this.game.gameObjects.find(obj => obj instanceof GameManager); // Find the game manager
      gameManager.resetGame();
    }
  }


  handleCollisions(){
    this.handleEnemyCollisions();
    this.handleCollectibleCollisions();
    this.handlePlatformCollisions();
    this.handleFinishPointCollision();
  }

  handleFinishPointCollision(){
    const physics = this.getComponent(Physics); // Get physics component
    // Handle collisions with collectibles
    const finishpoints = this.game.gameObjects.filter((obj) => obj instanceof FinishPoint);
    for (const finishpoint of finishpoints) {
      if (physics.isColliding(finishpoint.getComponent(Physics))) {
        const gameManager = this.game.gameObjects.find(obj => obj instanceof GameManager); // Find the game manager
        gameManager.resetGame();
      }
    }
  }

  handleEnemyCollisions(){
    const physics = this.getComponent(Physics); // Get physics component
    // Handle collisions with enemies
    const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy);
    for (const enemy of enemies) {
      if (physics.isColliding(enemy.getComponent(Physics))) {
        this.collidedWithEnemy();
      }
    }
  }

  handleCollectibleCollisions(){
    const physics = this.getComponent(Physics); // Get physics component
    // Handle collisions with collectibles
    const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    for (const collectible of collectibles) {
      if (physics.isColliding(collectible.getComponent(Physics))) {
        this.collect(collectible);
        this.game.removeGameObject(collectible);
      }
    }
  }

  handlePlatformCollisions(){
    const physics = this.getComponent(Physics); // Get physics component
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
  }



  handlePlayerMovement(deltaTime){
    this.handleWalk();
    this.handleJump(deltaTime);
  }

  handleJump(deltaTime){
    const input = this.getComponent(Input); // Get input component
    // Handle player jumping
    if (!this.isGamepadJump && input.isKeyDown('ArrowUp')) {
      this.startJump();
    }
    if (this.isJumping || this.isDoubleJumping) {
      this.updateJump(deltaTime);
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

  handleWalk(){
    const input = this.getComponent(Input); // Get input component
    const physics = this.getComponent(Physics); //Get physics component
    // Handle player movement
    if (!this.isGamepadMovement && input.isKeyDown('ArrowRight')) {
      physics.velocity.x = 100;
      this.direction = 1;
    } else if (!this.isGamepadMovement && input.isKeyDown('ArrowLeft')) {
      physics.velocity.x = -100;
      this.direction = -1;
    } else if (!this.isGamepadMovement) {
      physics.velocity.x = 0;
    }
  }



  //This function handles all animations
  handleAnimations(){
    this.handleWalkAnimation(); // Handle walk animation
  }

  handleWalkAnimation() { // Handle movement animation
    const physics = this.getComponent(Physics); // Get physics component
    const walkAnimation = this.getComponent(Animation); // Get walk animation component

    //Handle Walk Animation
    if (physics.velocity.x === 0) { // If the player is not moving, play walk animation
      this.getComponent(Renderer).image = walkAnimation.stop();
      this.getComponent(Renderer).image = Images.player; // Renders image by setting the player's image to the default image
    } 
    else if (physics.velocity.x !== 0) { // If the player is moving, play walk animation
      walkAnimation.play();
      this.getComponent(Renderer).image = walkAnimation.getCurrentFrame(); // Renders image by setting the player's image to the current frame of the walk animation
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
    const collectSound = new Audio(AudioFiles.collect);
    collectSound.play(); //Play collect sound
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



  handleShoot(){
    const input = this.getComponent(Input); // Get input component
    
    // Handle player shoot with cooldown
    if (input.isKeyDown('Escape') && !this.isCoolingDown) { 
      console.log("Calling shoot"); 
      this.shoot(); // Shoot a bullet
      this.isCoolingDown = true; // Set the cooldown flag to true
      setTimeout(() => { // Set a timeout to set the cooldown flag to false after 250 milliseconds
        this.isCoolingDown = false;
      }, 250); // Cooldown for a quarter of a second (250 milliseconds)
    }
    // Handle player big shoot with cooldown
    else if (input.isKeyDown('KeyJ') && !this.isCoolingDown) {
      console.log("Calling bigshoot");
      this.shootBigBullet(); // Shoot a big bullet
      this.isCoolingDown = true; // Set the cooldown flag to true
      setTimeout(() => {  // Set a timeout to set the cooldown flag to false after 1000 milliseconds
        this.isCoolingDown = false;
      }, 1000); // Cooldown for a second (1000 milliseconds)
    }
  }

  shoot(){
    const bulletDirection = this.direction; // Get the player's direction
    const bullet = new Bullet(this.x, this.y + 25, 5, 5, bulletDirection); // Create a new bullet
    this.bullets.push(bullet); // Add the bullet to the bullets array
    this.game.addGameObject(bullet); // Add the bullet to the game
    const shootSound = new Audio(AudioFiles.shoot);
    shootSound.play(); //Play shoot sound
    console.log("Called Shoot"); // Log to the console
  }

  shootBigBullet(){
    const bulletDirection = this.direction; // Get the player's direction
    const bullet = new Bullet(this.x, this.y + 25, 10, 10, bulletDirection, 'green', null, 'circle'); // Create a new bullet
    this.bullets.push(bullet); // Add the bullet to the bullets array
    this.game.addGameObject(bullet); // Add the bullet to the game
    const shootSound = new Audio(AudioFiles.shoot);
    shootSound.play(); //Play shoot sound
    console.log("Called BigShoot"); // Log to the console
  }



  reset() {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = 1250;
    this.y = -100;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.lives = 3;
    this.score = 0;
    this.direction = 1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
    this.isInvulnerable = false;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;
    this.isShooting = false;
    this.bullets = [];
  }
}

export default Player; // Export the Player class as the default export of this module