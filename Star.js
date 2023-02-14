import { postfixes, prefixes, starTypes } from "./distributions.js"
import * as THREE from 'three'
import { getRandomItem, uuid } from "./util.js";
import {words} from "./words.js"

const geometry = new THREE.SphereGeometry( 0.5, 12, 8 );
const materials = starTypes.color.map((color) => new THREE.MeshStandardMaterial( { color: color, emissive: color } ))

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

    toThreeObject() {
        let star = new THREE.Mesh( geometry, materials[this.starType] )
        star.scale.multiplyScalar(starTypes.size[this.starType])
        star.position.copy(this.position)
        return star
    }

}