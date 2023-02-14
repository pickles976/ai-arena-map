import * as THREE from "three"
import { postfixes, prefixes, starTypes } from "./distributions.js"
import { getRandomItem, uuid } from "./util.js";
import {words} from "./words.js"

const OPACITY = 0.05

// const geometry = new THREE.SphereGeometry( 0.5, 12, 8 );
// const materials = starTypes.color.map((color) => new THREE.MeshStandardMaterial( { color: color, emissive: color } ))

// // Sprites
const alpha = new THREE.TextureLoader().load( './static/images/alpha.png' );
const map = new THREE.TextureLoader().load( './static/images/sprite120.png' );

const materials = starTypes.color.map((color) => new THREE.SpriteMaterial( { map: map, color: color } ))

const hazeImage = new THREE.TextureLoader().load( './static/images/feathered60.png' );
const haze = new THREE.SpriteMaterial( { map: hazeImage, color: 0x0082f0, opacity: OPACITY, depthTest: false, depthWrite: false } )

// Points
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [0,0,0], 1 ) );
// const materials = starTypes.color.map((color) => new THREE.PointsMaterial( { map: map, alphaMap: alpha, color: color, depthTest: false } ))

export class Star {

    owner = null
    resources = null

    constructor(position) {
        this.position = position

        this.uuid = uuid()
        this.name = this.generateName()
        this.starType = this.generateStarType()
    }

    // Select the star type
    generateStarType() {
        let num = Math.random() * 100.0
        let pct = starTypes.percentage
        for (let i = 0; i < pct.length; i++) {
            num -= pct[i]
            if (num < 0) {
                return i
            } 
        }
    }

    generateName() {
        let name = ""

        if (Math.random() < 0.2) {
            name += getRandomItem(prefixes)
        }

        name += getRandomItem(words)

        if (Math.random() < 0.15) {
            name += getRandomItem(postfixes)
        }

        return name
    }

    updateScale(dist) {
        this.obj.scale.copy(new THREE.Vector3(dist,dist,dist))
        this.shader.material.opacity = OPACITY * Math.sqrt(dist / 5)
    }

    toThreeObject() {

        // actual star object

        let star = new THREE.Sprite( materials[this.starType] );

        star.scale.multiplyScalar(starTypes.size[this.starType])
        star.position.copy(this.position)
        star.name = this.name

        // Shader object
        let shader = new THREE.Sprite( haze )
        shader.scale.multiplyScalar(20.0)
        star.add(shader)

        // store a reference to the 3D object in this object
        this.obj = star
        this.shader = shader

        return star
    }

}