import './style.css';
import * as THREE from 'three';

class Program{
  constructor(scene, camera){
    if(!scene instanceof THREE.Scene){
      throw Error('scene is expected to be an object of THREE.Scene')
    }
    if(!camera instanceof THREE.Camera){
      throw Error('camera is expected to be an object of THREE.PerspectiveCamera')
    }
    this.currentScene = scene;
    this.mainCam = camera;
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#app')
    })
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mainCam.position.setZ(30);

    this.renderer.render(this.scene, this.mainCam);
  }
}
// reference https://youtu.be/Q7AOvWpIVHU
new Program(new THREE.Scene(),
 new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
)