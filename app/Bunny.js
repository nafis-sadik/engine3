import {PrototypeChain} from "../engine3/PrototypeChain";
import {color} from "three/examples/jsm/nodes/ShaderNode";

const Bunny = PrototypeChain.createScript('Bunny');
// Bunny.loadModel('./../assets/bunny.drc');
// Bunny.loadModel('https://raw.githubusercontent.com/baronwatts/models/master/robber.glb');
Bunny.loadModel('./../assets/Soldier.glb');

class InputManager {
    constructor() {
        document.addEventListener('keypress', (event) => {
            if(event.key === 'w'){
                console.log('w')
            }
        })
    }
}

Bunny.start = () => {
    Bunny.mesh.scale.set(1, 1, 1);
    Bunny.animations[0].weight = 1;
    new InputManager()
    // Bind animations with keys
    // document.body.addEventListener("keypress", (e) => {
    //     if(Bunny.animations.length <= 0){
    //         console.log('%cNo animations found', 'background: #ff0000; color: #000000; font-weight: 800');
    //         return;
    //     }
    //     console.log(e)
    //     Bunny.animations[1].weight = 1;
    //     Bunny.mesh.position.normalize();
    //
    // }, true);
    //
    // document.body.addEventListener('click', (e) => {
    //     console.log('right click');
    //     Bunny.animations[1].crossFadeTo(Bunny.animations[2], 1, true);
    //     Bunny.mesh.position.normalize();
    // }, true);
}

let i = 0;
Bunny.update = (deltaTime) => {
    i += 0.01;
    // Bunny.mesh.position.set(5 * Math.sin(i), 0, 0);
    let scaleY = Math.sin(i);
    if(scaleY < 0) { scaleY = -1 * scaleY; }
    Bunny.mesh.rotation.y = Bunny.mesh.rotation.y + (2 * deltaTime);
    // Bunny.mesh.position.z = Bunny.mesh.position.z + (-2 * deltaTime);
    // Bunny.mesh.scale.set(5 * Math.sin(i), 5 * scaleY, 5 * Math.sin(i));
    // Bunny.mesh.rotateY(0.1);
    // console.log(Bunny.action)
}