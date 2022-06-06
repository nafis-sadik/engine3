import * as THREE from 'three';
import { ObjectFactory } from './ObjectFactory'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {InputManager} from "./InputManager";

export default class Program{
    // FPS Counter
    static FPSCounter = 0;
    timeCounter = 0;

    // Only rendering shall start when the application has been created
    constructor() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#app'),
            antialias: true
        });
    }

    // For each scene, this function must be called once
    // So each scene must have a scene object and a camera to render
    init = (scene, camera, skyboxUrls, useOrbitControls = false) => {
        if (!scene instanceof THREE.Scene) {
            throw Error('expected object of type THREE.Scene for scene')
        }

        if (!camera instanceof THREE.Camera) {
            throw Error('expected object of type THREE.Camera for camera')
        }

        this.currentScene = scene;
        this.objectFactory = new ObjectFactory(scene);
        this.mainCam = camera;

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;
        this.mainCam.position.setX(500);
        this.mainCam.position.setY(500);
        this.mainCam.position.setZ(500);
        this.clock = new THREE.Clock();

        if(skyboxUrls !== undefined){
            const textureCube = new THREE.CubeTextureLoader().load( skyboxUrls );
            textureCube.encoding = THREE.sRGBEncoding;
            this.currentScene.background = textureCube;
            console.log('Skybox reference project : https://codepen.io/codypearce/pen/oNXQyOb');
        }

        if(useOrbitControls){
            const controls = new OrbitControls(this.mainCam, this.renderer.domElement);
            controls.update() // must be called after any manual changes to the camera's transform
        }

        const light1 = new THREE.DirectionalLight(0xefefff, 3);
        light1.position.set(1, 1, 1).normalize();
        scene.add(light1);
        const light2 = new THREE.DirectionalLight(0xffefef, 3);
        light2.position.set(-1, -1, -1).normalize();
        scene.add(light2);

        window.addEventListener('resize', this.onWindowResize);

        this.renderer.render(scene, camera);

        this.gameLoop(camera);
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
        let deltaTime = this.clock.getDelta();

        // FPS Counting
        Program.FPSCounter++;
        this.timeCounter += deltaTime;
        if(this.timeCounter >= 1){
            console.log('FPS : ', Program.FPSCounter);
            this.timeCounter = 0;
            Program.FPSCounter = 0;
        }

        InputManager.InputCollection.forEach(element => {
            if(typeof(element.update) === 'function'){
                element.update();
            }
        });
        
        ObjectFactory.gameObjects.forEach(element => {
            if(element.loaded === true){
                if(typeof(element.update) === 'function'){
                    element.update(deltaTime);
                }

                if(typeof(element.animate) === 'function'){
                    element.animate(deltaTime);
                }
            }
        });
    }
}