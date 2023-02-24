import * as THREE from "three"
import { GalaxyParams } from "ai-arena-map-headless";
import {Vector3 as Vector3M} from '@math.gl/core';

export function mathGLtoTHREE(vector: Vector3M) : THREE.Vector3 {
    return new THREE.Vector3(vector.x,vector.y,vector.z)
}

export function gaussianRandom(mean=0, stdev=1) {
    let u = 1 - Math.random(); //Converting [0,1) to (0,1)
    let v = Math.random();
    let z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

export function uuid() : string {
    let length = 18
    let id = ""
    for (let i = 0; i < length; i++) {
        let num = Math.floor(Math.random() * 36)
        id += num > 9 ? String.fromCharCode(num + 87) : `${num}` // 0->9 returns a number, 10 + returns a character. 97 is lowercase a, 87 comes from 97 - 10
    }
    return id
}

export function getRandomItem(list : any[]) : any {
    return list[Math.floor(Math.random() * list.length)]
}

export function clamp(value : number, minimum : number, maximum : number) : number {
    return Math.min(maximum, Math.max(minimum, value))
}

// modify a Vector3 by some spiral factor
export function spiral(x : number, y : number,z : number,offset : number, params : GalaxyParams) : THREE.Vector3 {

    let r = Math.sqrt(x**2 + y**2) 

    let theta = offset 

    // calculate the angle
    theta += x > 0 ? Math.atan(y/x) : Math.atan(y/x) + Math.PI

    // add rotation based on distance
    theta += (r / params.armXDist) * params.spiral

    return new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), z)

}