import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class GameObject{
    // Instantiate a loader
    static dracoLoader = new DRACOLoader();
    static gltfLoader = new GLTFLoader();
    start;
    update;

    constructor(name, scene, layer = 'default') {
        // Naming each game object to identify uniquely
        if (typeof (name) !== 'string') {
            throw Error('expected type string for name');
        }
        // Layering Game Objects for unique layer based features
        if (typeof (layer) !== 'string') {
            throw Error('expected type string for layer');
        }
        this.gameObjectName = name;
        this.layer = layer;
        this.scene = scene;
        this.loaded = false;

        // Specify path to a folder containing WASM/JS decoding libraries.
        GameObject.dracoLoader.setDecoderPath('/engine3/dracodecoder/');
        GameObject.dracoLoader.setDecoderConfig( { type: 'js' } );
        GameObject.gltfLoader.setDRACOLoader(GameObject.dracoLoader);

        // Optional: Pre-fetch Draco WASM/JS module.
        GameObject.dracoLoader.preload();
    }

    loadModel = (url) => {
        // If it's not string, it's not an url
        if (typeof (url) !== 'string') {
            throw Error('expected type string for url');
        }

        // Method for OnLoad event
        let onLoad = (gltf) => {
            // Make every part of the models cast shadows
            gltf.scene.traverse( function( node ) {
                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                    node.material.side = THREE.FrontSide;
                }
            });

            // Add the mesh to scene. The system shall expect the meshes to be under a scene object
            this.scene.add(gltf.scene);
            // gltf.scene is expected to be a THREE.Group. This is a type of Object 3d. Thus, shall be used for Transform properties by other scripts
            this.mesh = gltf.scene;
            // Array of THREE.AnimationClip that shall be used for playing and transitioning through different animations
            this.animations = [];
            // Creating mixer to create AnimationClip objects for each animation
            this.mixer = new THREE.AnimationMixer(this.mesh);
            gltf.animations.forEach((animation) => {{
                let clipAction = this.mixer.clipAction(animation);
                this.animations.push(clipAction);
                clipAction.play();
                clipAction.weight = 0;
            }});

            console.log('Animation reference project : https://codepen.io/b29/pen/MPmqLo');
            console.log('Animation reference project : https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html');

            this.loaded = true;

            // Ensures that the start function is called form other script file when the file has been loaded successfully
            if(typeof(this.start) === 'function'){
                this.start();
            }
        }

        // Method for onProgress event
        let onProgress = (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        }

        // Method for onError event
        let onError = (error) => {
            console.log('An error happened');
            console.log(error);
        }

        // seperate loader based on extenstion
        let urlSplit = url.split('.');
        let extension = urlSplit[urlSplit.length-1].toLowerCase();
        if(extension === 'drc'){
            this.dracoLoad(url);
        }
        else if(extension === 'gltf' || extension === 'glb'){
            this.gltfLoader(url, onLoad, onProgress, onError);
        }
        else{
            throw Error('Extension ' + extension + ' is not supported');
        }
    }

    gltfLoader = (url, onLoad, onProgress, onError) => {
        if(typeof(onLoad) !== 'function'){
            console.log('%cExpected function for onLoad event of model gltf loading', 'background: #ff0000; color: #000000; font-weight: 800');
            return ;
        }
        if(typeof(onProgress) !== 'function'){
            console.log('%cExpected function for onProgress event of model gltf loading', 'background: #ff0000; color: #000000; font-weight: 800');
            return ;
        }
        if(typeof(onError) !== 'function'){
            console.log('%cExpected function for onError event of model gltf loading', 'background: #ff0000; color: #000000; font-weight: 800');
            return ;
        }
        GameObject.gltfLoader.load(
            // resource URL
            url,
            // called when the resource is loaded
            onLoad,
            // called while loading is progressing
            onProgress,
            // called when loading has errors
            onError
        )
    }

    dracoLoad = (url) => {
        // Load a Draco geometry
        GameObject.dracoLoader.load(
            // resource URL
            url,
            // called when the resource is loaded
            (geometry) => {
                const material = new THREE.MeshStandardMaterial({ color: 0x606060 });
                this.mesh = new THREE.Mesh(geometry, material);
                this.scene.add(this.mesh);
                if(typeof(this.start) === 'function'){
                    this.start();
                }
                this.loaded = true;
                console.log('loaded : ', {
                    Layer : this.layer,
                    ObjectName : this.gameObjectName
                })

                // Release decoder resources.
                GameObject.dracoLoader.dispose();
            },
            // called as loading progresses
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            (error) => {
                console.log('An error happened');
                console.log(error)
            }
        );
    }

    animate = (deltaTime) => {
        this.mixer.update(deltaTime);
    }
}