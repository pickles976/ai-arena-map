import { generateGalaxyFromObject } from "../util/GalaxyGenerator";
import { StarData } from "./StarData";
import { getRandomItem } from "../util/util";
export class GalaxyData {
    constructor(params) {
        this.params = params;
        this.stars = generateGalaxyFromObject(this.params.numStars, this.params.arms, this.params, (pos) => new StarData(pos));
        this.stars.sort((a, b) => a.position.x - b.position.x);
        this.starDict = {};
        this.stars.forEach((star) => this.starDict[star.uuid] = star);
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
            // Set the star owner
            star.updateOwner(user);
        });
    }
    // Get stars that can be reached from the given star considering distance and energy
    getStarsInRange(starID) {
        let star = this.starDict[starID];
        let pos = star.position;
        let index = this.stars.indexOf(star);
        // Remove duplicates with set
        let possibleStars = new Set();
        // Stars with larger x values
        for (let i = index + 1; i < this.stars.length; i++) {
            if (this.stars[i].position.x < pos.x + star.energy) {
                possibleStars.add(this.stars[i].uuid);
            }
            else {
                break;
            }
        }
        // Stars with smaller x values
        for (let i = index - 1; i > 0; i--) {
            if (this.stars[i].position.x > pos.x - star.energy) {
                possibleStars.add(this.stars[i].uuid);
            }
            else {
                break;
            }
        }
        // Convert Set of ids into array of stars
        // @ts-ignore
        let possible = Array.from(possibleStars).map((id) => this.starDict[id]);
        // Return actual collisions
        return possible.filter((temp) => temp.position.distanceTo(pos) < star.energy);
    }
}
