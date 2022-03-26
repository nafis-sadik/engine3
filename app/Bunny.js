import {PrototypeChain} from "../engine3/PrototypeChain";
import * as THREE from "three";

const Bunny = PrototypeChain.createScript('Bunny');
Bunny.loadModel('./../assets/bunny.drc', PrototypeChain.scene);

// Lights
const hemiLight = new THREE.HemisphereLight( 0x443333, 0x111122 );
PrototypeChain.scene.add( hemiLight );

const spotLight = new THREE.SpotLight();
spotLight.angle = Math.PI / 16;
spotLight.penumbra = 0.5;
spotLight.castShadow = true;
spotLight.position.set( - 1, 1, 1 );
PrototypeChain.scene.add( spotLight );
