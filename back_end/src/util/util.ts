import { GalaxyParams } from "../config/GalaxyParams";
import {Vector3} from '@math.gl/core';

/**
 * Generate a random number in a gaussian distribution
 * @param mean 
 * @param stdev 
 * @returns 
 */
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

/**
 * Get a random item in a list
 * @param list 
 * @returns 
 */
export function getRandomItem(list : any[]) : any {
    return list[Math.floor(Math.random() * list.length)]
}


export function clamp(value : number, minimum : number, maximum : number) : number {
    return Math.min(maximum, Math.max(minimum, value))
}

// modify a Vector3 by some spiral factor
export function spiral(x : number, y : number,z : number,offset : number, params : GalaxyParams) : Vector3 {

    let r = Math.sqrt(x**2 + y**2) 

    let theta = offset 

    // calculate the angle
    theta += x > 0 ? Math.atan(y/x) : Math.atan(y/x) + Math.PI

    // add rotation based on distance
    theta += (r / params.armXDist) * params.spiral

    return new Vector3(r * Math.cos(theta), r * Math.sin(theta), z)

}