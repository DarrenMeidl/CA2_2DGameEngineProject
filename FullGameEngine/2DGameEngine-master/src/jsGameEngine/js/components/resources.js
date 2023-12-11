// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  enemy: new Image(), // The Image instance for the enemy.
  idle_0: new Image(), ////////NEW
  idle_1: new Image(), ////////NEW
  idle_2: new Image(), ////////NEW
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
Images.idle_0.src = './resources/images/player/idle_0.png'; ////////NEW
Images.idle_1.src = './resources/images/player/idle_1.png'; ////////NEW
Images.idle_2.src = './resources/images/player/idle_2.png'; ////////NEW

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
