import * as THREE from 'three';
import { PrototypeChain } from './PrototypeChain'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Program{
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
        PrototypeChain.scene = scene;
        this.mainCam = camera;

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;
        this.mainCam.position.setZ(5)

        if(skyboxUrls != undefined){
            const textureCube = new THREE.CubeTextureLoader().load( skyboxUrls );
            this.currentScene.background = textureCube;
            console.log('Reference : https://codepen.io/codypearce/pen/oNXQyOb?editors=0010');
        }

        if(useOrbitControls){
            const controls = new OrbitControls(this.mainCam, this.renderer.domElement);

            // controls.update() must be called after any manual changes to the camera's transform
            // camera.position.set( 0, 20, 100 );
            controls.update();
        }

        const light1 = new THREE.DirectionalLight(0xefefff, 3);
        light1.position.set(1, 1, 1).normalize();
        scene.add(light1);
        const light2 = new THREE.DirectionalLight(0xffefef, 3);
        light2.position.set(-1, -1, -1).normalize();
        scene.add(light2);

        window.addEventListener('resize', this.onWindowResize);

        this.renderer.render(scene, camera);

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
            if(typeof(element.update) === 'function' && element.loaded == true){
                element.update();
            }
        });
    }
}