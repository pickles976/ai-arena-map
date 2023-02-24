import { GalaxyParams } from "../config/GalaxyParams"
import { gaussianRandom, spiral } from "./util"

// Generates the Star Data objects only
export function generateGalaxyFromObject(numStars: number, arms: number, params: GalaxyParams, generator: Function) {
        let objects = []
    
        // spiral (2/3 the stars total)
        for (let j = 0; j < arms; j++) {
            for (let i = 0; i < (numStars / 2) / arms; i++) {
                let pos = spiral(gaussianRandom(params.armXMean,params.armXDist), gaussianRandom(params.armYMean,params.armYDist), gaussianRandom(0,params.galaxyHeight), j * 2 * Math.PI / arms, params)
                objects.push(generator(pos))
            }
        }
    
        // outer core (1/3rd of the stars)
        for (let i = 0; i < numStars / 3; i++) {
            let pos = spiral(gaussianRandom(0,params.outerCoreXDist), gaussianRandom(0,params.outerCoreYDist), gaussianRandom(0,params.galaxyHeight), 0, params)
            objects.push(generator(pos))
        }
    
        // inner core (1/6th of the stars)
        for (let i = 0; i < numStars / 6; i++) {
            let pos = spiral(gaussianRandom(0,params.coreXDist), gaussianRandom(0,params.coreYDist), gaussianRandom(0,params.galaxyHeight), 0, params)
            objects.push(generator(pos))
        }

        return objects
    }