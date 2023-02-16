import { createHaze, updateHazeScale } from "./Haze.js";
import { Star } from "./Star.js";
import { gaussianRandom } from "../../util.js";
import * as THREE from "three"

export class Galaxy {

    constructor(params) {
        this.params = params
        this.initStarData()
    }

    // Create stars (data only)
    initStarData() {
        this.stars = this.generateStarData(this.params.numStars, this.params.arms, this.params)
    }

    // Generates the Star Data objects only
    generateStarData(numStars, arms, params) {
        let stars = []
    
        // spiral (2/3 the stars total)
        for (let j = 0; j < arms; j++) {
            for (let i = 0; i < (numStars / 2) / arms; i++) {
                let pos = spiral(gaussianRandom(params.armXMean,params.armXDist), gaussianRandom(params.armYMean,params.armYDist), gaussianRandom(0,params.galaxyHeight), j * 2 * Math.PI / arms, params)
                stars.push(new Star(pos))
            }
        }
    
        // outer core (1/3rd of the stars)
        for (let i = 0; i < numStars / 3; i++) {
            let pos = spiral(gaussianRandom(0,params.outerCoreXDist), gaussianRandom(0,params.outerCoreYDist), gaussianRandom(0,params.galaxyHeight), 0, params)
            stars.push(new Star(pos))
        }
    
        // inner core (1/6th of the stars)
        for (let i = 0; i < numStars / 6; i++) {
            let pos = spiral(gaussianRandom(0,params.coreXDist), gaussianRandom(0,params.coreYDist), gaussianRandom(0,params.galaxyHeight), 0, params)
            stars.push(new Star(pos))
        }

        return stars
    }


}

export class Galaxy3D {
    constructor (scene, galaxy) {
        this.scene = scene
        this.params = galaxy.params
        this.stars = galaxy.stars
        this.generate3D()
    }

    // Create 3D representation from data
    generate3D() {
        this.haze = this.generateHaze(this.params.numStars * this.params.hazeRatio, this.params.arms, this.params)
        this.generateStars3D() 
    }

    generateHaze(numStars, arms, params) {

        let hazeArray = []
    
        // spiral (2/3 the stars total)
        for (let j = 0; j < arms; j++) {
            for (let i = 0; i < (numStars / 2) / arms; i++) {
                let pos = spiral(gaussianRandom(params.armXMean,params.armXDist), gaussianRandom(params.armYMean,params.armYDist), gaussianRandom(0,params.galaxyHeight), j * 2 * Math.PI / arms, params)
                hazeArray.push(createHaze(pos))
            }
        }
    
        // outer core (1/3rd of the stars)
        for (let i = 0; i < numStars / 3; i++) {
            let pos = spiral(gaussianRandom(0,params.outerCoreXDist), gaussianRandom(0,params.outerCoreYDist), gaussianRandom(0,params.galaxyHeight), 0, params)
            hazeArray.push(createHaze(pos))
        }
    
        // inner core (1/6th of the stars)
        for (let i = 0; i < numStars / 6; i++) {
            let pos = spiral(gaussianRandom(0,params.coreXDist), gaussianRandom(0,params.coreYDist), gaussianRandom(0,params.galaxyHeight), 0, params)
            hazeArray.push(createHaze(pos))
        }
    
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
    
            // if (Math.random() < 0.05) {
            //     scene.add(star.addBubble())
            // }
        })
    
    }

    // Update the galaxy based on camera zoom
    updateFromZoom(camera) {

        // necessary for frustum-culling text
        // we do this here so we can only do it once
        camera.updateMatrixWorld()
        let frustum = new THREE.Frustum();
        frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse))
    
        // update star scale based on distance to camera
        this.stars.forEach((star) => {
            // let dist = star.obj.position.distanceTo(camera.position) / 250
            star.updateScale(camera, frustum)
        })
    
    
        this.haze.forEach((haze) => {
            let dist = haze.position.distanceTo(camera.position) / 250
            updateHazeScale(haze, dist)
            haze.material.needsUpdate = true
        })

    }
}

// modify a Vector3 by some spiral factor
function spiral(x,y,z,offset, params) {

    let r = Math.sqrt(x**2 + y**2) 

    let theta = offset 

    // calculate the angle
    theta += x > 0 ? Math.atan(y/x) : Math.atan(y/x) + Math.PI

    // add rotation based on distance
    theta += (r / params.armXDist) * params.spiral

    return new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), z)

}