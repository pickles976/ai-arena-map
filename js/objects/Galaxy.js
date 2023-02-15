import { createHaze } from "./Haze.js";
import { Star } from "./Star.js";
import { gaussianRandom } from "../../util.js";
import * as THREE from "three"

// control the parameters of the galaxy generation
let params = {
    galaxyHeight : 5, // how tall the galaxy disk is
    coreXDist: 33, // standard deviation of the core
    coreYDist: 33,
    outerCoreXDist: 100, // standard deviation of the outer core
    outerCoreYDist: 100,
    armXDist: 100, // standard deviation of the arm gaussians
    armYDist: 50,
    armXMean: 200, // mean/offset of the arm gaussians
    armYMean: 100,
    spiral: 3, // spiral intensity. 0 -> inf
    arms: 2, // number of arms
    hazeRatio: 1.0, // ratio of haze particles to stars
}

const zDist = 5
const xyDist = 100

// Create a star cluster
export function generateGalaxy(scene, numStars) {

    let stars = generateStars(scene, numStars, params.arms)
    let haze = generateHaze(scene, numStars * params.hazeRatio, params.arms)

    return { 'stars': stars, 'haze': haze }
}

function generateHaze(scene, numStars, arms) {

    let hazeArray = []

    // spiral (2/3 the stars total)
    for (let j = 0; j < arms; j++) {
        for (let i = 0; i < (numStars / 2) / arms; i++) {
            let pos = spiral(gaussianRandom(params.armXMean,params.armXDist), gaussianRandom(params.armYMean,params.armYDist), gaussianRandom(0,params.galaxyHeight), j * 2 * Math.PI / arms)
            hazeArray.push(createHaze(pos))
        }
    }

    // outer core (1/3rd of the stars)
    for (let i = 0; i < numStars / 3; i++) {
        let pos = spiral(gaussianRandom(0,params.outerCoreXDist), gaussianRandom(0,params.outerCoreYDist), gaussianRandom(0,params.galaxyHeight), 0)
        hazeArray.push(createHaze(pos))
    }

    // inner core (1/6th of the stars)
    for (let i = 0; i < numStars / 6; i++) {
        let pos = spiral(gaussianRandom(0,params.coreXDist), gaussianRandom(0,params.coreYDist), gaussianRandom(0,params.galaxyHeight), 0)
        hazeArray.push(createHaze(pos))
    }

    hazeArray.forEach((h) => {
        // add star
        scene.add(h)
    })

    return hazeArray
}

function generateStars(scene, numStars, arms) {
    let stars = []

    // spiral (2/3 the stars total)
    for (let j = 0; j < arms; j++) {
        for (let i = 0; i < (numStars / 2) / arms; i++) {
            let pos = spiral(gaussianRandom(params.armXMean,params.armXDist), gaussianRandom(params.armYMean,params.armYDist), gaussianRandom(0,params.galaxyHeight), j * 2 * Math.PI / arms)
            // createStar(scene, pos)
            stars.push(new Star(pos))
        }
    }

    // outer core (1/3rd of the stars)
    for (let i = 0; i < numStars / 3; i++) {
        let pos = spiral(gaussianRandom(0,params.outerCoreXDist), gaussianRandom(0,params.outerCoreYDist), gaussianRandom(0,params.galaxyHeight), 0)
        stars.push(new Star(pos))
    }

    // inner core (1/6th of the stars)
    for (let i = 0; i < numStars / 6; i++) {
        let pos = spiral(gaussianRandom(0,params.coreXDist), gaussianRandom(0,params.coreYDist), gaussianRandom(0,params.galaxyHeight), 0)
        stars.push(new Star(pos))
    }

    stars.forEach((star) => {

        // add star
        scene.add(star.toThreeObject())

        // if (Math.random() < 0.05) {
        //     scene.add(star.addBubble())
        // }
    })

    return stars
}

// modify a Vector3 by some spiral factor
function spiral(x,y,z,offset) {

    let r = Math.sqrt(x**2 + y**2) 

    let theta = offset 

    // calculate the angle
    theta += x > 0 ? Math.atan(y/x) : Math.atan(y/x) + Math.PI

    // add rotation based on distance
    theta += (r / xyDist) * params.spiral

    return new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), z)

}