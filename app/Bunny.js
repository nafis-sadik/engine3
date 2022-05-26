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
    Bunny.horizontal = new InputManager('horizontal', 'a', 'd', 0.01);
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

    let rotationSpeed = 0.01;
    // Bunny.mesh.rotation.y += rotationSpeed;
    console.log(Bunny.mesh.rotation.y);
    // console.log(new THREE.Vector3(0, Bunny.horizontal.value * rotationSpeed * deltaTime, 0));
    // Bunny.mesh.rotation.set(new THREE.Vector3( 0, Bunny.horizontal.value *  rotationSpeed * deltaTime, 0));
    // Bunny.mesh.rotation.set(new THREE.Vector3( 0, 0, Math.PI / 2));
    // console.log(Bunny.mesh.rotation);
    // Bunny.rotate(new THREE.Vector3(0, Bunny.horizontal.value * rotationSpeed * deltaTime, 0));
}