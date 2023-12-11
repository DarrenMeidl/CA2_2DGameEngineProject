import Component from "./component.js"; //This imports the Component base class from the component.js file
//Got sample code from class
class Input extends Component{ //This is the Input class
    constructor(){
        super(); //This calls the constructor of the Component class, this object will inherit from the component class
        this.keys = {}; //This is an OBJECT (NOT ARRAY) of keys where we can add keys to the object
        this.gamepadIndex = null; //This is the index of the gamepad
        this.gameObject = null; //This is the game object

        document.addEventListener("keydown", (event) => (this.keys[event.code] = true)); //This adds a key to the keys object when a key is pressed
        document.addEventListener("keyup", (event) => (this.keys[event.code] = false)); //This removes a key from the keys object when a key is released
        //This function is called when a gamepad is connected
        window.addEventListener("gamepadconnected", (event) => { 
            console.log("Gamepad connected", event.gamepad); //This logs the gamepad that was connected
            this.gamepadIndex = event.gamepad.index; //This sets the gamepad index to the index of the gamepad
        });
        //This function is called when a gamepad is disconnected
        window.addEventListener("gamepaddisconnected", (event) => { 
            console.log("Gamepad disconnected", event.gamepad); //This logs the gamepad that was disconnected
            this.gamepadIndex = null; //This sets the gamepad index to null
        });
    }
    //This function checks if a key is pressed
    isKeyDown(key){
        return this.keys[key] || false; //This returns true if the key is pressed, false if not i.e. all keys are false by default
    }
    //This function gets the gamepad
    getGamepad(){
        if(this.gamepadIndex !== null){ //If a gamepad is connected
            const gamepads = navigator.getGamepads(); //This gets the gamepads
            return gamepads[this.gamepadIndex]; //This returns the gamepad
        }
        return null;
    }
    //This function checks if a gamepad button is pressed
    isGamepadButtonDown(buttonIndex){
        const gamepad = this.getGamepad(); //Gets the gamepad
        if (gamepad && gamepad.buttons[buttonIndex]){ //If the gamepad & buttons exist
            return gamepad.buttons[buttonIndex].pressed; //This returns true if the button is pressed, false if not i.e. all buttons are false by default
        }
        return false;
    }
}
export default Input; //This exports the Input class so it can be used in other files