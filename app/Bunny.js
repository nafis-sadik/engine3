import { ObjectFactory } from "../engine3/ObjectFactory";
import { InputManager } from "../engine3/InputManager";
import * as THREE from "three";

const Bunny = ObjectFactory.createScript('Bunny');
// Bunny.loadModel('./../assets/bunny.drc');
// Bunny.loadModel('https://raw.githubusercontent.com/baronwatts/models/master/robber.glb');
Bunny.loadModel('./../assets/Soldier.glb');

Bunny.start = () => {
    Bunny.mesh.scale.set(1, 1, 1);
    Bunny.animations[0].weight = 1;
    Bunny.horizontal = new InputManager('horizontal', 'a', 'd', 1);
    Bunny.vertical = new InputManager('vertical', 'w', 's', 0.01);

    document.addEventListener('keypress', (event) => {
        if(event.key === 'f'){
            Bunny.mesh.rotation.set(new THREE.Euler( 0, 1, 1.57, 'XYZ'));
            console.log(Bunny.mesh.rotation);
        }
    });

    console.log('Bunny UUID: ', Bunny.mesh.uuid);
}

let rotationSpeed = 2;
let movementSpeed = 50;
Bunny.update = (deltaTime) => {
    let idleAnimationWeight = 1 - Bunny.vertical.value;
    if(idleAnimationWeight > 1){
        idleAnimationWeight = 1;
    }
    Bunny.animations[0].weight = idleAnimationWeight;
    Bunny.animations[1].weight = Bunny.vertical.value;

    // Bunny.mesh.rotation.y += rotationSpeed * Math.ceil(Bunny.vertical.value) * deltaTime;
    
    let positionZ = Bunny.mesh.position.x + movementSpeed * Bunny.vertical.value * deltaTime;
    // Bunny.mesh.position.set(o, 0, movementSpeed * positionZ);
    Bunny.mesh.translateZ(positionZ);
    console.log('Current Position: ', Bunny.mesh.position)
}