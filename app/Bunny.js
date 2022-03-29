import {PrototypeChain} from "../engine3/PrototypeChain";

const Bunny = PrototypeChain.createScript('Bunny');
Bunny.loadModel('https://static.radulescu.me/codepen/fridge/scene.gltf');
// Bunny.loadModel('./../assets/bunny.drc');

Bunny.start = () => {
    alert('Chari dike khali wow');
}
let i = 0;
Bunny.update = () => {
    i += 0.01;
    Bunny.mesh.position.set(5 * Math.sin(i), 0, 0);
    let scaleY = Math.sin(i);
    if(scaleY < 0) { scaleY = -1 * scaleY; }
    Bunny.mesh.scale.set(5 * Math.sin(i), 5 * scaleY, 5 * Math.sin(i));
    Bunny.mesh.rotateY(0.1);
}