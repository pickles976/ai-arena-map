import { generateGalaxyFromObject } from "../objects/GalaxyGenerator.js";
import { Star } from "../objects/Star.js";
import { getRandomItem } from "../util.js";
export class Galaxy {
    constructor(params) {
        this.params = params;
        this.stars = generateGalaxyFromObject(this.params.numStars, this.params.arms, this.params, (pos) => new Star(pos));
        this.users = [];
    }
    setUsers(users) {
        this.users = users;
        this.users.forEach((user) => {
            let star = getRandomItem(this.stars);
            // loop until we find a star with no owner
            while (!!(star === null || star === void 0 ? void 0 : star.owner)) {
                star = getRandomItem(this.stars);
            }
            star.owner = user;
        });
    }
    getStarsInRange() {
    }
    updateStars() {
    }
}
