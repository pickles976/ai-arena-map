import * as THREE from "three"
import { postfixes, prefixes, starTypes } from "./distributions.js"
import { getRandomItem, uuid } from "./util.js";
import {words} from "./words.js"
import { BLOOM_LAYER, BUBBLE_MAX, BUBBLE_MIN, OVERLAY_LAYER, STAR_MAX, STAR_MIN } from "./config.js";

// Sprites
const map = new THREE.TextureLoader().load( './static/images/sprite120.png' );
const materials = starTypes.color.map((color) => new THREE.SpriteMaterial( { map: map, color: color } ))

// bubble mat
const bubbleMat = new THREE.SpriteMaterial( { map: map, color: 0x00FF00, depthTest: false } )

const BUBBLE_SIZE = 20.0

export class Star {

    owner = null
    resources = null
    bubble = null

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

        let starSize = dist * starTypes.size[this.starType]
        starSize = Math.min(Math.max(STAR_MIN, starSize), STAR_MAX)

        this.obj.scale.copy(new THREE.Vector3(starSize,starSize,starSize))

        if (this.bubble) 
        {
            let bubbleSize = dist * BUBBLE_SIZE
            bubbleSize = Math.min(Math.max(BUBBLE_MIN, bubbleSize), BUBBLE_MAX)
            this.bubble.scale.copy(new THREE.Vector3(bubbleSize,bubbleSize,bubbleSize)) 
        }
    }

    toThreeObject() {

        // actual star object

        let star = new THREE.Sprite( materials[this.starType] );

        // set to bloom layer
        star.layers.set(BLOOM_LAYER)
        star.scale.multiplyScalar(starTypes.size[this.starType])
        star.position.copy(this.position)
        star.name = this.name

        // store a reference to the 3D object in this object
        this.obj = star

        return star
    }

    addBubble() {

        // create Sphere of influence object
        let bubble = new THREE.Sprite(bubbleMat)
        bubble.layers.set(OVERLAY_LAYER)
        bubble.scale.multiplyScalar(BUBBLE_SIZE)
        bubble.position.copy(this.position)

        this.bubble = bubble
        return bubble
    }

}