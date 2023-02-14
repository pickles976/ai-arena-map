import * as THREE from "three"
import { postfixes, prefixes, starTypes } from "./distributions.js"
import { getRandomItem, uuid } from "./util.js";
import {words} from "./words.js"

// Sprites
const map = new THREE.TextureLoader().load( './static/images/sprite120.png' );
const materials = starTypes.color.map((color) => new THREE.SpriteMaterial( { map: map, color: color } ))

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
    }

    toThreeObject() {

        // actual star object

        let star = new THREE.Sprite( materials[this.starType] );


        star.layers.set(1)
        star.scale.multiplyScalar(starTypes.size[this.starType])
        star.position.copy(this.position)
        star.name = this.name

        // store a reference to the 3D object in this object
        this.obj = star
        // this.shader = shader

        return star
    }

}