# 🔫 2D Game Engine Project

A 2D side-scrolling shooter prototype built on a custom JavaScript game engine. The engine is made of base classes, reusable components, and game objects, and I built it with some help from GitHub Copilot. Your goal is to reach the end of the level, collect coins, and take out as many enemies as you can.

## 📦 Technologies

- `JavaScript (ES Modules)`
- `HTML5 Canvas`
- `HTML`
- `CSS`
- `Gamepad API`
- `GitHub Copilot`

## ⚙️ Features

Here's what you can do in the game:

- **Run and Jump**: Walk left and right across the platforms. Jump, then press jump again in mid-air for a double jump.

- **Shoot Enemies**: Fire a quick bullet, or a slower big bullet that deals three times the damage. Enemies have 3 or 5 lives, so pick your shots.

- **Collect Coins**: Pick up animated coins to raise your score. Each coin also gives you an extra life.

- **Watch Your Lives**: You start with 3 lives. Touching an enemy or falling off the map costs a life, and you get a short window of invulnerability after being hit.

- **Fight Patrolling Enemies**: Enemies walk back and forth along their platforms, so you need to time your jumps and shots.

- **Follow Camera**: The camera follows the player through the level.

- **Sound and Particles**: Sound effects for jumping, shooting, collecting, and dying, plus background music and particle effects for hits and pickups.

- **Gamepad Support**: Move with the left stick and jump with the first button on a connected gamepad.

- **Reset Anytime**: Messed up a run? Reset the game and start again.

### 🎮 Controls:

- **Walk Left / Right**: A / D
- **Jump**: Space
- **Double Jump**: Space (again, in the air)
- **Shoot Bullet**: L
- **Shoot Big Bullet**: P (slower shot speed, more damage)
- **Reset Game**: R

## 🔨 The Process

I started with a first attempt at the project: a basic `index.html`, a stylesheet, a main script, and some player and enemy images. I then scrapped that folder structure and started again with a cleaner setup built around the engine.

I wrote the foundation from scratch: the `GameObject` and `Component` base classes, the `Game` class, then the `Renderer`, `Camera`, `Input`, `Physics`, and `Animation` components. After that, I reorganised the project folders, brought in the rest of the sample scripts, and added a `GameManager`, which gave me the structure I built the game on.

The next step was getting the player to feel right. I wrote a `handleAnimations` function and a one-shot animation for the player, but the animations gave me trouble. I tried to fix them, then removed the jump animation for now and cleaned up the player script so I could move on. I also added a finish checkpoint to mark the end of the level.

Most of the gameplay came together after that. I started with bullets (shooting, movement, and a cooldown), then made them collide with enemies and destroy themselves, and made enemies die when hit. After that I added death particles, bullets that fire in the player's facing direction, and a working game manager with a restart key and reset functions on each object.

Then I added more depth: circular bullets, enemy lives, and sizes for particles. Circular bullets deal 3x more damage, which made the big bullet a real tradeoff. I added walk animations for the player and enemies, death and shoot sounds, and textures for the platforms. Finally, I changed the player controls, expanded the level with more enemies and coins, fixed the spawn position, and set the background music volume to 40%.

To finish, I wrote this README and marked in the code where I used GitHub Copilot. I used it to speed up repetitive code, like the walk animation and resetting the level, and I reviewed and tested what it produced so that I understood how it fit into the engine.

## 📚 What I Learned

During this project, I learned how a game engine is structured and how the pieces work together.

### 🧱 Engine Architecture:

- **Base Classes**: Designing `Game`, `GameObject`, and `Component` showed me how to keep game code organised and reusable.
- **Component-Based Design**: Splitting behaviour into components made it much easier to add new features without rewriting existing code.

### 🔁 The Game Loop:

- **Frame Updates**: I learned how a game updates and redraws every frame, and how to use delta time so movement stays consistent.

### 🧮 Physics and Collisions:

- **Gravity and Jumping**: I worked with velocity, acceleration, and gravity to build jumping and double jumping that feel right.
- **Collision Checks**: I wrote collision handling between the player, enemies, platforms, bullets, and collectibles.

### 🎮 Input and Audio:

- **Multiple Inputs**: I added keyboard and gamepad support through the same input component.
- **Cooldowns and Sound**: I used cooldowns to control shooting and added sound effects and music.

### 🤖 Working with AI Tools:

- **Copilot as a Helper**: GitHub Copilot sped up repetitive code, but I learned that I still need to read, test, and understand every suggestion.

### 📈 Overall Growth:

This project was more than just making a game. It taught me how to build the tools a game runs on, break a big idea into small parts, and keep my code organised as it grew.

## ✔️ How can it be improved?

- Add a win screen and show a game over screen instead of resetting straight away.
- Add more levels and a level select.
- Add more enemy types with different behaviours, like chasing or shooting.
- Load levels from a data file instead of placing every object in code.
- Improve collision performance by only checking nearby objects.
- Add a mute button and volume controls.
- Add power-ups and different weapons.

## 🚚 Running the Project

To run the project in your local environment, follow these steps:

1. Clone the repository to your local machine.
2. Open the `FullGameEngine/2DGameEngine-master/src/jsGameEngine` folder in your code editor (like VS Code).
3. Start a local web server in that folder, for example with the Live Server extension or `python -m http.server`. A server is needed because the game uses ES modules.
4. Open the address shown in your console (for example [http://127.0.0.1:5500](http://127.0.0.1:5500) or [http://localhost:8000](http://localhost:8000)) in your web browser to play.

## 🙏 Credits

- Player and enemy images: [Nuclear Leak Character Asset Pack](https://dani-maccari.itch.io/nuclear-leak-character-asset-pack?download) by Dani Maccari
- Background images: [Free Horizontal Game Backgrounds](https://free-game-assets.itch.io/free-horizontal-game-backgrounds)
- Coin images: [Rotating Coin Sprite Sheet](https://arcade-smasher.itch.io/rotating-coin-sprite-sheet)
- Platform images: [Eden Platforms](https://zipix.itch.io/eden-platforms)

## 📽️ Video

Add your gameplay video link here.
