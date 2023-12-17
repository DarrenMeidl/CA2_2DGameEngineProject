// Import the GameObject class from the 'engine' directory
import GameObject from '../base/gameobject.js';

// Import the Renderer class from the 'engine' directory
import Renderer from '../components/renderer.js';

// Import the Physics class from the 'engine' directory
import Physics from '../components/physics.js';

// Import the Images object from the 'engine' directory. This object contains all the game's image resources
import {Images} from '../components/resources.js';

// Import the Player, Platform, Bullet, ParticleSystem classes from the current directory
import Player from './player.js';
import Platform from './platform.js';
import Bullet from './bullet.js';
import ParticleSystem from '../gameobjects/particleSystem.js';
import Animation from '../components/animation.js';

// Define a new class, Enemy, which extends (i.e., inherits from) GameObject
class Enemy extends GameObject {

  // Define the constructor for this class, which takes two arguments for the x and y coordinates
  constructor(x, y, lives) {
    // Call the constructor of the superclass (GameObject) with the x and y coordinates
    super(x, y);

    this.lives = lives; // Set the number of lives of this enemy
    // Add a Renderer component to this enemy, responsible for rendering it in the game.
    // The renderer uses the color 'green', dimensions 50x50, and an enemy image from the Images object
    this.addComponent(new Renderer('green', 50, 50, Images.enemy));
    
    // Add a Physics component to this enemy, responsible for managing its physical interactions
    // Sets the initial velocity and acceleration
    this.addComponent(new Physics({ x: 50, y: 0 }, { x: 0, y: 0 }));
    
    // Initialize variables related to enemy's movement
    this.movementDistance = 0;
    this.movementLimit = 100;
    this.movingRight = true;


    //WALK ANIMATION
    this.walkFrames = []; // Array to store walk frames
    this.walkFrames.push(Images.enemy_walk_0);
    this.walkFrames.push(Images.enemy_walk_1);
    this.walkFrames.push(Images.enemy_walk_2);
    this.walkFrames.push(Images.enemy_walk_3);
    this.walkFrames.push(Images.enemy_walk_4);
    this.walkFrames.push(Images.enemy_walk_5);
    this.walkAnimation = new Animation(this.walkFrames, 10); // Create an instance of Animation for walk animation
    this.addComponent(this.walkAnimation); // Add the walk animation to the player
    
  }

  // Define an update method that will run every frame of the game. It takes deltaTime as an argument
  // which represents the time passed since the last frame
  update(deltaTime) {
    this.handleCollisions();
    this.handleMovement(deltaTime);
    this.handleEnemyState();
    this.handleAnimations();
    // Call the update method of the superclass (GameObject), passing along deltaTime
    super.update(deltaTime);
  }

  //This function handles all animations
  handleAnimations(){
    this.handleWalkAnimation(); // Handle walk animation
  }

  handleWalkAnimation() { // Handle movement animation
    const physics = this.getComponent(Physics); // Get physics component
    const walkAnimation = this.getComponent(Animation); // Get walk animation component

    //Handle Walk Animation
    if (physics.velocity.x === 0) { // If the enemy is not moving, play walk animation
      this.getComponent(Renderer).image = walkAnimation.stop();
      this.getComponent(Renderer).image = Images.enemy; // Renders image by setting the enemy's image to the default image
    } 
    else if (physics.velocity.x !== 0) { // If the enemy is moving, play walk animation
      walkAnimation.play();
      this.getComponent(Renderer).image = walkAnimation.getCurrentFrame(); // Renders image by setting the enemy's image to the current frame of the walk animation
    }
  }

  handleEnemyState(){
    if (this.lives <= 0) {
      this.emitDeathParticles(this); // Emit particles on the enemy's position
      this.game.removeGameObject(this); // Remove the enemy from the game
    }
  }
  handleMovement(deltaTime){
    // Get the Physics component of this enemy
    const physics = this.getComponent(Physics);
    // Check if the enemy is moving to the right
    if (this.movingRight) {
      // If it hasn't reached its movement limit, make it move right
      if (this.movementDistance < this.movementLimit) {
        physics.velocity.x = 50;
        this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
        this.getComponent(Renderer).gameObject.direction = 1;
      } else {
        // If it reached the limit, make it move left
        this.movingRight = false;
        this.movementDistance = 0;
      }
    } else {
      // If it hasn't reached its movement limit, make it move left
      if (this.movementDistance < this.movementLimit) {
        physics.velocity.x = -50;
        this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
        this.getComponent(Renderer).gameObject.direction = -1;
      } else {
        // If it reached the limit, make it move right
        this.movingRight = true;
        this.movementDistance = 0;
      }
    }
  }

  handleCollisions(){
    this.handleBulletCollisions();
    this.handlePlayerCollisions();
    this.handlePlatformCollisions();
  }

  handleBulletCollisions(){
    const physics = this.getComponent(Physics); // Get physics component
    // Handle collisions with collectibles
    const bullets = this.game.gameObjects.filter(obj => obj instanceof Bullet); // Find the bullet
    for (const bullet of bullets) {
      if (physics.isColliding(bullet.getComponent(Physics))) {
        this.emitBulletParticles(this); // Emit particles on the enemy's position
        this.game.removeGameObject(bullet); // Remove the bullet from the game
        this.lives--; // Decrease the enemy's lives
      }
    }
  }

  handlePlayerCollisions(){
    // Get the Physics component of this enemy
    const physics = this.getComponent(Physics);
    // Check if the enemy is colliding with the player
    const player = this.game.gameObjects.find(obj => obj instanceof Player); // Find the player
    if (physics.isColliding(player.getComponent(Physics))) { // Check if the enemy is colliding with the player
      player.collidedWithEnemy(); // Call the collidedWithEnemy method of the player
    }
  }

  handlePlatformCollisions(){
    // Get the Physics component of this enemy
    const physics = this.getComponent(Physics);
    // Check if the enemy is colliding with any platforms
    const platforms = this.game.gameObjects.filter(obj => obj instanceof Platform);
    this.isOnPlatform = false;
    for (const platform of platforms) {
      if (physics.isColliding(platform.getComponent(Physics))) {
        // If it is, stop its vertical movement and position it on top of the platform
        physics.velocity.y = 0;
        physics.acceleration.y = 0;
        this.y = platform.y - this.getComponent(Renderer).height;
        this.isOnPlatform = true;
      }
    }
  }

  emitBulletParticles() {
    // Create a particle system at the enemy's position and add it to the game
    const particleSystem = new ParticleSystem(this.x, this.y, 'purple', 20, 0.5, 0.5);
    this.game.addGameObject(particleSystem);
  }

  emitDeathParticles() {
    // Create a particle system at the enemy's position and add it to the game
    const particleSystem = new ParticleSystem(this.x, this.y, 'purple', 12, 0.5, 0.5, 20);
    this.game.addGameObject(particleSystem);
  }
}

// Export the Enemy class as the default export of this module
export default Enemy;
