import * as THREE from 'three';
import { PrototypeChain } from './PrototypeChain'

export default class Program{
    // Only rendering shall start when the application has been created
    constructor() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#app')
        })
    }

    // For each scene, this function must be called once
    // So each scene must have a scene object and a camera to render
    init = (scene, camera) => {
        if (!scene instanceof THREE.Scene) {
            throw Error('expected object of type THREE.Scene for scene')
        }

        if (!camera instanceof THREE.Camera) {
            throw Error('expected object of type THREE.Camera for camera')
        }

        this.currentScene = scene;
        PrototypeChain.scene = scene
        this.mainCam = camera;

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;
        this.mainCam.position.setZ(5)

        window.addEventListener( 'resize', this.onWindowResize );

        this.renderer.render(this.currentScene, this.mainCam);
        this.gameLoop();
    }

    // making system responsive
    onWindowResize = () => {
        this.mainCam.aspect = window.innerWidth / window.innerHeight;
        this.mainCam.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    gameLoop = () => {
        this.renderer.render(this.currentScene, this.mainCam);
        requestAnimationFrame(this.gameLoop);

        PrototypeChain.gameObjects.forEach(element => {
            if(typeof(element.update) === 'function'){
                element.update();
            }
        });
    }
}