import { GameObject } from "./GameObject";

export class ObjectFactory {
    static gameObjects;

    constructor(currentScene) {
        ObjectFactory.scene = currentScene;
        ObjectFactory.gameObjects = [];
    }

    static createScript = (objectName) => {
        if(typeof(objectName) !== 'string'){
            new Error('string data expected');
        }
        
        let entity = new GameObject(objectName, ObjectFactory.scene);
        ObjectFactory.gameObjects.push(entity);
        return entity;
    }
}