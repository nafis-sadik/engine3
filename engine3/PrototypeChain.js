import { GameObject } from "./GameObject";

export class PrototypeChain {
    static gameObjects = []

    constructor(currentScene) {
        PrototypeChain.scene = currentScene;
    }

    static createScript = (objectName) => {
        if(typeof(objectName) !== 'string'){
            new Error('string data expected');
        }

        let entity = new GameObject(objectName);
        PrototypeChain.gameObjects.push(entity);
        return entity;
    }
}