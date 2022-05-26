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
    })
}

Bunny.update = (deltaTime) => {
    let idleAnimationWeight = 1 - Bunny.vertical.value;
    if(idleAnimationWeight > 1){
        idleAnimationWeight = 1;
    }
    Bunny.animations[0].weight = idleAnimationWeight;
    Bunny.animations[1].weight = Bunny.vertical.value;
    console.log(Bunny.vertical.value);

    let rotationSpeed = 2;
    Bunny.mesh.rotation.y += rotationSpeed * Math.ceil(Bunny.horizontal.value) * deltaTime;
}