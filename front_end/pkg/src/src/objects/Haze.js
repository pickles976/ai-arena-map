import * as THREE from "three";
import { BASE_LAYER } from "../config/config.js";
import { clamp } from "../util.js";
const OPACITY = 0.2;
const MAX_SIZE = 50.0;
const MIN_SIZE = 20.0;
const hazeImage = new THREE.TextureLoader().load('./static/images/feathered60.png');
const hazeSprite = new THREE.SpriteMaterial({ map: hazeImage, color: 0x0082ff, opacity: OPACITY, depthTest: false, depthWrite: false });
export function createHaze(position) {
    // Shader object
    let haze = new THREE.Sprite(hazeSprite);
    haze.layers.set(BASE_LAYER);
    haze.position.copy(position);
    haze.scale.multiplyScalar(clamp(MAX_SIZE * Math.random(), MIN_SIZE, MAX_SIZE));
    return haze;
}
export function updateHazeScale(obj, dist) {
    obj.material.opacity = clamp(OPACITY * Math.pow(dist / 2.5, 2), 0, OPACITY);
}
