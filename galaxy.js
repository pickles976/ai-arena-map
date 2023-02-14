import { Star } from "./Star.js";
import { gaussianRandom } from "./util.js";
import * as THREE from 'three'

const zDist = 15
const xyDist = 100

// Create a star cluster
export function generateGalaxy(scene, numStars) {

    let arms = 6
    let stars = []

    // spiral (1/2 the stars total)
    for (let j = 0; j < arms; j++) {
        for (let i = 0; i < (numStars / 2) / arms; i++) {
            let pos = spiral(gaussianRandom(200,xyDist), gaussianRandom(100,xyDist / 4), gaussianRandom(0,zDist), j * 2 * Math.PI / arms)
            // createStar(scene, pos)
            stars.push(new Star(pos))
        }
    }

    // outer core (1/3rd of the stars)
    for (let i = 0; i < numStars / 3; i++) {
        let pos = spiral(gaussianRandom(0,xyDist), gaussianRandom(0,xyDist), gaussianRandom(0,zDist), 0)
        stars.push(new Star(pos))
    }

    // inner core (1/6th of the stars)
    for (let i = 0; i < numStars / 6; i++) {
        let pos = spiral(gaussianRandom(0,xyDist / 3), gaussianRandom(0,xyDist / 3), gaussianRandom(0,zDist), 0)
        stars.push(new Star(pos))
    }

    stars.forEach((star) => {
        // add star
        scene.add(star.toThreeObject())
    })
}

// modify a Vector3 by some spiral factor
function spiral(x,y,z,offset) {

    let r = Math.sqrt(x**2 + y**2) 

    let theta = offset
    theta += x > 0 ? Math.atan(y/x) : Math.atan(y/x) + Math.PI
    theta += (r / xyDist)

    return new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), z)

}