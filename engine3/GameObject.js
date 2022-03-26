import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export class GameObject{
    // Instantiate a loader
    static loader = new DRACOLoader();

    constructor(name, layer = 'default') {
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

        // Specify path to a folder containing WASM/JS decoding libraries.
        GameObject.loader.setDecoderPath('/engine3/dracodecoder/');
        GameObject.loader.setDecoderConfig( { type: 'js' } );

        // Optional: Pre-fetch Draco WASM/JS module.
        GameObject.loader.preload();
    }

    loadModel = (url, scene) => {
        this.mesh = undefined;
        if (typeof (url) !== 'string') {
            throw Error('expected type string for url');
        }
        // Load a Draco geometry
        GameObject.loader.load(
            // resource URL
            url,
            // called when the resource is loaded
            (geometry) => {
                const material = new THREE.MeshBasicMaterial({ color: 0x48C9B0, wireframe: true });
                // const material = new THREE.MeshStandardMaterial({ color: 0x606060 });
                scene.add(new THREE.Mesh(geometry, material));
                console.log('loaded : ', {
                    Layer : this.layer,
                    ObjectName : this.gameObjectName
                })

                // Release decoder resources.
                GameObject.loader.dispose();
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