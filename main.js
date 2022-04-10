import './style.css';
import * as THREE from 'three';
import Program from './engine3/Program';

// Start the program
let program = new Program();

// Create the camera and the scene
let currentScene = new THREE.Scene();
let defaultCam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// Load the scene
program.init(currentScene, defaultCam, [
    'https://raw.githubusercontent.com/codypearce/some-skyboxes/master/skyboxes/flame/flame_ft.jpg',
    'https://raw.githubusercontent.com/codypearce/some-skyboxes/master/skyboxes/flame/flame_bk.jpg',
    'https://raw.githubusercontent.com/codypearce/some-skyboxes/master/skyboxes/flame/flame_up.jpg',
    'https://raw.githubusercontent.com/codypearce/some-skyboxes/master/skyboxes/flame/flame_dn.jpg',
    'https://raw.githubusercontent.com/codypearce/some-skyboxes/master/skyboxes/flame/flame_rt.jpg',
    'https://raw.githubusercontent.com/codypearce/some-skyboxes/master/skyboxes/flame/flame_lf.jpg'
], false);
