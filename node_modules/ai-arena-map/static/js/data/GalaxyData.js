import { generateGalaxyFromObject } from "../objects/GalaxyGenerator.js";
import { Star } from "../objects/Star.js";
export class Galaxy {
    constructor(params) {
        this.params = params;
        this.stars = generateGalaxyFromObject(this.params.numStars, this.params.arms, this.params, (pos) => new Star(pos));
    }
}
