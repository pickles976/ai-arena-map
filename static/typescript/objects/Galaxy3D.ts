import { createHaze, updateHazeScale } from "./Haze.js";
import { Star } from "./Star.js";
import * as THREE from "three"
import { GalaxyParams } from "../config/GalaxyParams.js";
import { generateGalaxyFromObject } from "./GalaxyGenerator.js";
import { Galaxy } from "../data/GalaxyData.js";

export class Galaxy3D {

    scene : THREE.Scene
    params : GalaxyParams
    stars : Star[]
    haze : THREE.Sprite[]

    constructor (scene : THREE.Scene, galaxy : Galaxy) {
        this.scene = scene
        this.params = galaxy.params
        this.stars = galaxy.stars
        this.haze = []
        this.generate3D()
    }

    // Create 3D representation from data
    generate3D() {
        this.haze = this.generateHaze(this.params.numStars * this.params.hazeRatio, this.params.arms, this.params)
        this.generateStars3D() 
    }

    generateHaze(numStars : number, arms : number, params : GalaxyParams) {

        let hazeArray = generateGalaxyFromObject(numStars, arms, params, (pos : THREE.Vector3) => createHaze(pos))

        hazeArray.forEach((h) => {
            // add star
            this.scene.add(h)
        })
    
        return hazeArray
    }
    
    generateStars3D() {
    
        this.stars.forEach((star) => {
    
            // add star
            this.scene.add(star.toThreeObject())

            // draw bubble if star is owned
            if (star.owner) {
                this.scene.add(star.addBubble())
            }
    
        })
    
    }

    // Update the galaxy based on camera zoom
    updateFromZoom(camera : THREE.Camera) {

        // necessary for frustum-culling text
        // we do this here so we can only do it once
        camera.updateMatrixWorld()
        let frustum = new THREE.Frustum();
        frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse))
    
        // update star scale based on distance to camera
        this.stars.forEach((star) => {
            star.updateScale(camera, frustum)
        })
    
    
        this.haze.forEach((haze) => {
            let dist = haze.position.distanceTo(camera.position) / 250
            updateHazeScale(haze, dist)
            haze.material.needsUpdate = true
        })

    }
}