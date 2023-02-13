import { gaussianRandom } from "./util.js";
import * as THREE from 'three'

const zDist = 1.5
const xyDist = 10

// Create a star cluster
export function createCluster(scene, size) {

    const geometry = new THREE.SphereGeometry( 0.05, 12, 8 );
    const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF, emissive: 0xFFFFFF } );

    let arms = 6

    // spiral
    for (let j = 0; j < arms; j++) {
        for (let i = 0; i < (size / 2) / arms; i++) {
            let pos = spiral(gaussianRandom(20,xyDist), gaussianRandom(10,xyDist / 4), gaussianRandom(0,zDist), j * 2 * Math.PI / arms)
            let star = new THREE.Mesh( geometry, material )
            star.position.copy(pos)
            scene.add(star)
        }
    }

    // outer core
    for (let i = 0; i < size / 3; i++) {
        let pos = spiral(gaussianRandom(0,xyDist), gaussianRandom(0,xyDist), gaussianRandom(0,zDist), 0)
        let star = new THREE.Mesh( geometry, material )
        star.position.copy(pos)
        scene.add(star)
    }

    // inner core
    for (let i = 0; i < size / 6; i++) {
        let pos = spiral(gaussianRandom(0,xyDist / 3), gaussianRandom(0,xyDist / 3), gaussianRandom(0,zDist), 0)
        let star = new THREE.Mesh( geometry, material )
        star.position.copy(pos)
        scene.add(star)
    }
}

// modify a Vector3 by some spiral factor
function spiral(x,y,z,offset) {

    let r = Math.sqrt(x**2 + y**2) 

    let theta = offset
    theta += x > 0 ? Math.atan(y/x) : Math.atan(y/x) + Math.PI
    theta += (r / xyDist)

    return new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), z)

}