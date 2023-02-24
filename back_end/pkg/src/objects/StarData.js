import { postfixes, prefixes, starTypes } from "../config/distributions";
import { getRandomItem, uuid } from "../util/util";
import { words } from "../config/words";
import { ENERGY_MULTIPLIER } from "../config/config";
export class StarData {
    constructor(position) {
        this.position = position;
        this.uuid = uuid();
        this.name = this.generateName();
        this.starType = this.generateStarType();
        this.owner = null;
        this.energy = 0;
    }
    // Select the star type
    generateStarType() {
        let num = Math.random() * 100.0;
        let pct = starTypes.percentage;
        for (let i = 0; i < pct.length; i++) {
            num -= pct[i];
            if (num < 0) {
                return i;
            }
        }
        return 0;
    }
    // Randomly generate a name
    generateName() {
        let name = "";
        if (Math.random() < 0.2) {
            name += getRandomItem(prefixes);
        }
        name += getRandomItem(words);
        if (Math.random() < 0.15) {
            name += getRandomItem(postfixes);
        }
        return name;
    }
    updateOwner(user) {
        this.owner = user;
    }
    update() {
        this.energy += starTypes.size[this.starType] * ENERGY_MULTIPLIER;
    }
}
