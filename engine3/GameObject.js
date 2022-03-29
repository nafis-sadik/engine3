import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class GameObject{
    // Instantiate a loader
    static dracoLoader = new DRACOLoader();
    static gltfLoader = new GLTFLoader();

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
        if (typeof (url) !== 'string') {
            throw Error('expected type string for url');
        }
        let urlSplit = url.split('.');
        let extension = urlSplit[urlSplit.length-1].toLowerCase();
        if(extension === 'drc'){
            this.dracoLoad(url);
        }
        else if(extension === 'gltf' || extension === 'glb'){
            this.gltfLoader(url);
        }
        else{
            console.log('Extension ' + extension + ' is not supported');
        }
    }

    gltfLoader = (url) => {
        GameObject.gltfLoader.load(
            // resource URL
            url,
            // called when the resource is loaded
            (gltf) => {
                this.mesh = gltf.scene;
                this.scene.add(gltf.scene);
                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
                this.loaded = true;
            },
            // called while loading is progressing
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            (error) => {
                console.log('An error happened');
                console.log(error);
            }
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
}