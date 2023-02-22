import * as THREE from "three"
import { postfixes, prefixes, starTypes } from "../config/distributions.js"
import { getRandomItem, uuid } from "../util.js";
import {words} from "../config/words.js"
import { BLOOM_LAYER, BUBBLE_MAX, BUBBLE_MIN, FAR_TEXT_PLANE, NEAR_TEXT_PLANE, OVERLAY_LAYER, STAR_MAX, STAR_MIN } from "../config/config.js";
import { createText, updateText } from "./Text.js";

// Sprites
const map = new THREE.TextureLoader().load( './static/images/sprite120.png' );
const materials = starTypes.color.map((color) => new THREE.SpriteMaterial( { map: map, color: color } ))

// bubble mat
const bubbleMat = new THREE.SpriteMaterial( { map: map, color: 0x00FF00, depthTest: false } )

const BUBBLE_SIZE = 20.0

export class Star {

    owner : string | null
    bubble : THREE.Sprite | null
    nameObj : HTMLDivElement | null
    ownerObj : HTMLDivElement | null

    obj : THREE.Sprite | null
    
    position: THREE.Vector3
    uuid: string
    starType: number
    name: string

    energy: number

    constructor(position : THREE.Vector3) {

        this.position = position

        this.uuid = uuid()
        this.name = this.generateName()
        this.starType = this.generateStarType()

        this.obj = null
        this.bubble = null
        this.owner = null
        this.nameObj = null
        this.ownerObj = null

        this.energy = 0
    }

    // Select the star type
    generateStarType() : number {
        let num = Math.random() * 100.0
        let pct = starTypes.percentage
        for (let i = 0; i < pct.length; i++) {
            num -= pct[i]
            if (num < 0) {
                return i
            } 
        }
        return 0
    }

    // Randomly generate a name
    generateName() : string {
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

    // Update the scale of the star and associiated objects
    updateScale(camera : THREE.Camera, frustum : THREE.Frustum) {

        let dist = this.position.distanceTo(camera.position) / 250

        // update star size
        let starSize = dist * starTypes.size[this.starType]
        starSize = Math.min(Math.max(STAR_MIN, starSize), STAR_MAX)
        this.obj?.scale.copy(new THREE.Vector3(starSize,starSize,starSize))

        // update size of sphere of influence
        if (this.bubble) 
        {
            let bubbleSize = dist * BUBBLE_SIZE
            bubbleSize = Math.min(Math.max(BUBBLE_MIN, bubbleSize), BUBBLE_MAX)
            this.bubble.scale.copy(new THREE.Vector3(bubbleSize,bubbleSize,bubbleSize)) 
        }

        // update text label if necessary
        if (dist < FAR_TEXT_PLANE && dist > NEAR_TEXT_PLANE) {
            if (this.nameObj == null) {
                // Create text
                this.nameObj = createText(this.name)
            }
            updateText(this.nameObj, dist, this.position, camera, frustum, -1)

            if (this.owner != null) {

                if (this.ownerObj == null) {
                    this.ownerObj = createText(`Owner: ${this.owner}`)
                }

                updateText(this.ownerObj, dist, this.position, camera, frustum, 1)
            }

        } else {
            if (this.nameObj != null) {
                // remove text
                this.nameObj.remove()
                this.nameObj = null
            }

            if (this.ownerObj != null) {
                // remove text
                this.ownerObj.remove()
                this.ownerObj = null
            }
        }
    }

    // convert a star class into a three object
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

    update() {
        this.energy += starTypes.size[this.starType]
    }

}