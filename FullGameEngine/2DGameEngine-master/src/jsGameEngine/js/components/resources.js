// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  enemy: new Image(), // The Image instance for the enemy.
  coin: new Image(), // The Image instance for the coin.

  // Walk images
  walk_0: new Image(),
  walk_1: new Image(),
  walk_2: new Image(),
  walk_3: new Image(),
  walk_4: new Image(),
  walk_5: new Image(),

  // Enemy walk images
  enemy_walk_0: new Image(),
  enemy_walk_1: new Image(),
  enemy_walk_2: new Image(),
  enemy_walk_3: new Image(),
  enemy_walk_4: new Image(),
  enemy_walk_5: new Image(),
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: './resources/audio/jump1.wav', // The file path of the jump sound.
  collect: './resources/audio/coin_collect.wav', // The file path of the collect sound.
  backgroundMusic: './resources/audio/background_music1.mp3', // The file path of the background music.
  death: './resources/audio/death.wav', // The file path of the death sound. 
  shoot: './resources/audio/shoot.wav', // The file path of the shoot sound.
};

// Set the source of the player image.
Images.player.src = './resources/images/player/player.png'; // Update the image path

// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/enemy.png'; // Update the image path

// Set the source of the coin image.
Images.coin.src = './resources/images/collectibles/coin.png'; // Update the image path
// Set the source of the walk_x images
Images.walk_0.src = './resources/images/player/walk_0.png';
Images.walk_1.src = './resources/images/player/walk_1.png';
Images.walk_2.src = './resources/images/player/walk_2.png';
Images.walk_3.src = './resources/images/player/walk_3.png';
Images.walk_4.src = './resources/images/player/walk_4.png';
Images.walk_5.src = './resources/images/player/walk_5.png';

// Set the source of the enemy_walk_x images
Images.enemy_walk_0.src = './resources/images/enemy/walk_0.png';
Images.enemy_walk_1.src = './resources/images/enemy/walk_1.png';
Images.enemy_walk_2.src = './resources/images/enemy/walk_2.png';
Images.enemy_walk_3.src = './resources/images/enemy/walk_3.png';
Images.enemy_walk_4.src = './resources/images/enemy/walk_4.png';
Images.enemy_walk_5.src = './resources/images/enemy/walk_5.png';

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
