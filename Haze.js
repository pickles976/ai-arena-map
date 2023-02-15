import * as THREE from "three"
import { BASE_LAYER } from "./config.js";

const OPACITY = 0.2
const MAX_SIZE = 50.0
const MIN_SIZE = 20.0
const alpha = new THREE.TextureLoader().load( './static/images/alpha_noise.png' );
const hazeImage = new THREE.TextureLoader().load( './static/images/feathered60.png' );
const hazeSprite = new THREE.SpriteMaterial( { map: hazeImage, color: 0x0082ff, opacity: OPACITY, depthTest: false, depthWrite: false } )

export function createHaze(position) {
    // Shader object
    let haze = new THREE.Sprite( hazeSprite )
    haze.layers.set(BASE_LAYER)
    haze.position.copy(position)
    haze.scale.multiplyScalar(Math.min(MAX_SIZE, Math.max(MIN_SIZE, 50.0 * Math.random())))
    return haze
}

export function updateHazeScale(obj, dist) {
    obj.material.opacity = OPACITY * Math.pow(dist / 2.5, 2)
}