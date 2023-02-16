import * as THREE from "three";
import { BASE_LAYER } from "../config/config.js";
import { clamp } from "../util.js";
var OPACITY = 0.2;
var MAX_SIZE = 50.0;
var MIN_SIZE = 20.0;
var alpha = new THREE.TextureLoader().load('./static/images/alpha_noise.png');
var hazeImage = new THREE.TextureLoader().load('./static/images/feathered60.png');
var hazeSprite = new THREE.SpriteMaterial({ map: hazeImage, color: 0x0082ff, opacity: OPACITY, depthTest: false, depthWrite: false });
export function createHaze(position) {
    var haze = new THREE.Sprite(hazeSprite);
    haze.layers.set(BASE_LAYER);
    haze.position.copy(position);
    haze.scale.multiplyScalar(clamp(MAX_SIZE * Math.random(), MIN_SIZE, MAX_SIZE));
    return haze;
}
export function updateHazeScale(obj, dist) {
    obj.material.opacity = clamp(OPACITY * Math.pow(dist / 2.5, 2), 0, OPACITY);
}
//# sourceMappingURL=Haze.js.map