import { GalaxyParams } from "../config/GalaxyParams.js"
import { generateGalaxyFromObject } from "../objects/GalaxyGenerator.js"
import { Star } from "../objects/Star.js"

export class Galaxy {

    params: GalaxyParams
    stars: Star[]

    constructor(params : GalaxyParams) {
        this.params = params
        this.stars = generateGalaxyFromObject(this.params.numStars, this.params.arms, this.params, (pos : THREE.Vector3) => new Star(pos))
    }
}