import './style.css';
import * as THREE from 'three';
import Program from './engine3/Program';
import { PrototypeChain } from "./engine3/PrototypeChain";

// Start the program
let program = new Program();

// Create the camera and the scene
let currentScene = new THREE.Scene();
let defaultCam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// Load the scene
program.init(currentScene, defaultCam);
