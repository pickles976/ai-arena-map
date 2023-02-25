import { postfixes, prefixes, starTypes } from "../config/distributions";
import { getRandomItem } from "../util/util";
import { words } from "../config/words";
import { ENERGY_MULTIPLIER } from "../config/config";
var StarData = /** @class */ (function () {
    function StarData(position, id) {
        this.position = position;
        this.uuid = id;
        this.name = this.generateName();
        this.starType = this.generateStarType();
        this.owner = null;
        this.energy = 0;
    }
    // Select the star type
    StarData.prototype.generateStarType = function () {
        var num = Math.random() * 100.0;
        var pct = starTypes.percentage;
        for (var i = 0; i < pct.length; i++) {
            num -= pct[i];
            if (num < 0) {
                return i;
            }
        }
        return 0;
    };
    // Randomly generate a name
    StarData.prototype.generateName = function () {
        var name = "";
        if (Math.random() < 0.2) {
            name += getRandomItem(prefixes);
        }
        name += getRandomItem(words);
        if (Math.random() < 0.15) {
            name += getRandomItem(postfixes);
        }
        return name;
    };
    StarData.prototype.updateOwner = function (user) {
        this.owner = user;
    };
    StarData.prototype.update = function () {
        this.energy += starTypes.size[this.starType] * ENERGY_MULTIPLIER;
    };
    return StarData;
}());
export { StarData };
//# sourceMappingURL=StarData.js.map