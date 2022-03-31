import {PrototypeChain} from "../engine3/PrototypeChain";

const Bunny = PrototypeChain.createScript('Bunny');
// Bunny.loadModel('./../assets/bunny.drc');
Bunny.loadModel('https://raw.githubusercontent.com/baronwatts/models/master/robber.glb');
// const mixer = new THREE.AnimationMixer(Bunny.mesh);

Bunny.start = () => {
    Bunny.mesh.scale.set(.35,.35,.35);
    document.body.addEventListener("click", () => {
        Bunny.stopAnimation(true);
        Bunny.playAnimation(Bunny.animations[Math.floor(Math.random() * Bunny.animations.length)], true);
    });
    
    // console.log(mixer.clipAction(Bunny.animations[1]));
    // console.log(Bunny.animations[1]);
    // mixer.clipAction(Bunny.animations[1]).play();
}

let i = 0;
Bunny.update = (deltaTime) => {
    i += 0.01;
    // Bunny.mesh.position.set(5 * Math.sin(i), 0, 0);
    let scaleY = Math.sin(i);
    if(scaleY < 0) { scaleY = -1 * scaleY; }
    // Bunny.mesh.scale.set(5 * Math.sin(i), 5 * scaleY, 5 * Math.sin(i));
    // Bunny.mesh.rotateY(0.1);
}