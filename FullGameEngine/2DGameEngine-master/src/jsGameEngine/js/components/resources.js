// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  enemy: new Image(), // The Image instance for the enemy.
  // Idle images
  idle_0: new Image(),
  idle_1: new Image(), 
  idle_2: new Image(), 
  idle_3: new Image(), 

  // Walk images
  walk_0: new Image(),
  walk_1: new Image(),
  walk_2: new Image(),
  walk_3: new Image(),
  walk_4: new Image(),
  walk_5: new Image(),
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: './resources/audio/jump1.wav', // The file path of the jump sound.
  collect: './resources/audio/coin_collect.wav', // The file path of the collect sound.
  backgroundMusic: './resources/audio/background_music1.mp3', // The file path of the background music. ////////NEW
  // Add more audio file paths as needed
};

// Set the source of the player image.
Images.player.src = './resources/images/player/player.png'; // Update the image path

// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/enemy.png'; // Update the image path

// Set the source of the idle_x images
Images.idle_0.src = './resources/images/player/idle_0.png'; 
Images.idle_1.src = './resources/images/player/idle_1.png'; 
Images.idle_2.src = './resources/images/player/idle_2.png'; 
Images.idle_3.src = './resources/images/player/idle_3.png'; 

// Set the source of the walk_x images
Images.walk_0.src = './resources/images/player/walk_0.png';
Images.walk_1.src = './resources/images/player/walk_1.png';
Images.walk_2.src = './resources/images/player/walk_2.png';
Images.walk_3.src = './resources/images/player/walk_3.png';
Images.walk_4.src = './resources/images/player/walk_4.png';
Images.walk_5.src = './resources/images/player/walk_5.png';

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
