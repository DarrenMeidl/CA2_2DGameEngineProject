import GameObject from '../base/gameobject.js';
import { AudioFiles } from '../components/resources.js';

class AudioManager extends GameObject { ////////NEW
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
    }
    //This function plays the background music
    playBackgroundMusic() {
        this.backgroundMusic = new Audio(AudioFiles.backgroundMusic);
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();
    }

    //This function sets the volume
    setVolume(volume) {
        this.backgroundMusic.volume = volume;
    }
}

export default AudioManager; 