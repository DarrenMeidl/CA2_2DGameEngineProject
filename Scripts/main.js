const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const gameArea = document.getElementById("game-container");

const playerWidth = player.offsetWidth;
const playerHeight = player.offsetHeight;
const gameWidth = gameArea.offsetWidth;
const gameHeight = gameArea.offsetHeight;

let gameOver = false;
let keys = {};
//Game Loop function that will run forever
function gameLoop(){
    //If the game isn't over, keep calling the game loop
    if(!gameOver){
        requestAnimationFrame(gameLoop); //Move the game forward 1 frame & call the gameLoop function
    }else{
        endGame();
    }
    requestAnimationFrame(gameLoop); //Move the game forward 1 frame & call the gameLoop function
}

//Ends the game
function endGame(){
    alert("Game Over");
    resetGame(); //Calls the resetGame function
}
//Resets the game
function resetGame(){
    //Sets a new position for the player
    let playerX = 0;
    let playerY = 75;
    //Sets a new random position for the enemy
    let enemyX = Math.random() * (gameWidth - playerWidth);
    let enemyY = Math.random() * (gameHeight - playerHeight);
    let keys = {};
    player.style.opacity = 1;
    gameOver = false; //Game is no longer over
    requestAnimationFrame(gameLoop); //Start the next frame & call the gameLoop function

}
requestAnimationFrame(gameLoop); //Move the game forward 1 frame & call the gameLoop function