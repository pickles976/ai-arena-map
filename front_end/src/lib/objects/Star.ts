import * as THREE from "three"
import { BLOOM_LAYER, BUBBLE_MAX, BUBBLE_MIN, FAR_TEXT_PLANE, NEAR_TEXT_PLANE, OVERLAY_LAYER, STAR_MAX, STAR_MIN } from "../config/config";
import { createText, updateText } from "./Text";
import { StarData, UserData, starTypes } from "ai-arena-map-headless";
import { mathGLtoTHREE } from "../util";

// Sprites
const map = new THREE.TextureLoader().load( '../../../resources/images/sprite120.png' );
const materials = starTypes.color.map((color) => new THREE.SpriteMaterial( { map: map, color: color } ))

// bubble mat
// const bubbleMat = new THREE.SpriteMaterial( { map: map, color: 0x00FF00, depthTest: false } )

const BUBBLE_SIZE = 20.0

export class Star {

    owner : UserData | null
    bubble : THREE.Sprite | null
    nameObj : HTMLDivElement | null
    // ownerObj : HTMLDivElement | null

    obj : THREE.Sprite | null
    
    position: THREE.Vector3
    uuid: string
    starType: number
    name: string

    constructor(starData : StarData) {

        this.position = mathGLtoTHREE(starData.position)

        this.uuid = starData.uuid
        this.name = starData.name
        this.starType = starData.starType

        this.owner = starData.owner

        // visualization objects
        this.obj = null
        this.bubble = null
        this.nameObj = null
        // this.ownerObj = null
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

            // if (this.owner != null) {

            //     if (this.ownerObj == null) {
            //         this.ownerObj = createText(`Owner: ${this.owner.name}`)
            //     }

            //     updateText(this.ownerObj, dist, this.position, camera, frustum, 1)
            // }

        } else {
            if (this.nameObj != null) {
                // remove text
                this.nameObj.remove()
                this.nameObj = null
            }

            // if (this.ownerObj != null) {
            //     // remove text
            //     this.ownerObj.remove()
            //     this.ownerObj = null
            // }
        }
    }

    // convert a star class into a three object
    toThreeObject(scene : THREE.Scene) {

        // actual star object

        let star = new THREE.Sprite( materials[this.starType] );

        // set to bloom layer
        star.layers.set(BLOOM_LAYER)
        star.scale.multiplyScalar(starTypes.size[this.starType])
        star.position.copy(this.position)
        star.name = this.name

        // store a reference to the 3D object in this object
        this.obj = star

        scene.add(star)
    }

    updateOwner(user : UserData) {
        this.owner = user
    }

    updateBubble(scene : THREE.Scene) {

        if (this.owner) {

            if (this.bubble == null) {

                let tempMat = new THREE.SpriteMaterial( { map: map, color: 0x00FF00, depthTest: false } )
                //@ts-ignore
                tempMat.color.setStyle(this.owner.color)

                // create Sphere of influence object
                let bubble = new THREE.Sprite(tempMat)
                bubble.layers.set(OVERLAY_LAYER)
                bubble.scale.multiplyScalar(BUBBLE_SIZE)
                bubble.position.copy(this.position)

                this.bubble = bubble
                scene.add(bubble)
                
            } else {
                this.bubble.material.color.setStyle(this.owner.color.toString())
            }
        }
    }

}