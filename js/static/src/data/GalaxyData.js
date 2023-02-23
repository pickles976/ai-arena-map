import { generateGalaxyFromObject } from "../objects/GalaxyGenerator.js";
import { Star } from "../objects/Star.js";
import { getRandomItem } from "../util.js";
var Galaxy = /** @class */ (function () {
    function Galaxy(params) {
        var _this = this;
        this.params = params;
        this.stars = generateGalaxyFromObject(this.params.numStars, this.params.arms, this.params, function (pos) { return new Star(pos); });
        this.stars.sort(function (a, b) { return a.position.x - b.position.x; });
        this.starDict = {};
        this.stars.forEach(function (star) { return _this.starDict[star.uuid] = star; });
        this.users = [];
    }
    Galaxy.prototype.setUsers = function (users) {
        var _this = this;
        this.users = users;
        this.users.forEach(function (user) {
            var star = getRandomItem(_this.stars);
            // loop until we find a star with no owner
            while (!!(star === null || star === void 0 ? void 0 : star.owner)) {
                star = getRandomItem(_this.stars);
            }
            // Set the star owner
            star.updateOwner(user);
        });
    };
    // Get stars that can be reached from the given star considering distance and energy
    Galaxy.prototype.getStarsInRange = function (starID) {
        var _this = this;
        var star = this.starDict[starID];
        var pos = star.position;
        var index = this.stars.indexOf(star);
        // Remove duplicates with set
        var possibleStars = new Set();
        // Stars with larger x values
        for (var i = index + 1; i < this.stars.length; i++) {
            if (this.stars[i].position.x < pos.x + star.energy) {
                possibleStars.add(this.stars[i].uuid);
            }
            else {
                break;
            }
        }
        // Stars with smaller x values
        for (var i = index - 1; i > 0; i--) {
            if (this.stars[i].position.x > pos.x - star.energy) {
                possibleStars.add(this.stars[i].uuid);
            }
            else {
                break;
            }
        }
        // Convert Set of ids into array of stars
        // @ts-ignore
        var possible = Array.from(possibleStars).map(function (id) { return _this.starDict[id]; });
        // Return actual collisions
        return possible.filter(function (temp) { return temp.position.distanceTo(pos) < star.energy; });
    };
    return Galaxy;
}());
export { Galaxy };
