//Got this sample code from class
class GameObject{ //This is the GameObject class
    constructor(x=0, y=0){ //Setting up empty transform
        this.x = x;
        this.y = y;
        this.components = []; //This is an array of components where we can add components to the game object
    }
    //This function adds a component to the game object
    addComponent(component){
        this.components.push(component);
        component.gameObject = this;
    }
    //This function is called inbetween frames
    update(deltaTime){ //deltaTime is the time between frames
        for(const component of this.components){
            component.update(deltaTime);
        }
    }
    draw(ctx){ //This function draws the components
        for(const component of this.components){
            component.draw(ctx);
        }
    }
    //This function returns the first instance of a component of the specified class e.g. getComponent(Transform)
    getComponent(componentClass){
        return this.components.find((component) => component instanceof componentClass);
    }
    //This function resets the game object
    /*reset(){

    }*/
}
export default GameObject; //This exports the GameObject class so it can be used in other files