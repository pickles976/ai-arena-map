import { generateGalaxyFromObject } from "../util/GalaxyGenerator";
import { StarData } from "./StarData";
import { getRandomItem } from "../util/util";
var GalaxyData = /** @class */ (function () {
    function GalaxyData(numStars, params) {
        var _this = this;
        this.numStars = numStars;
        this.params = params;
        this.stars = generateGalaxyFromObject(this.numStars, this.params.arms, this.params, function (pos, id) { return new StarData(pos, id); });
        this.stars.sort(function (a, b) { return a.position.x - b.position.x; });
        this.starDict = {};
        this.stars.forEach(function (star) { return _this.starDict[star.uuid] = star; });
        this.users = [];
    }
    GalaxyData.prototype.setUsers = function (users) {
        this.users = users;
        // Get the furthest 1/4th of stars
        var tempStars = this.stars;
        tempStars.sort(function (a, b) { return b.position.magnitude() - a.position.magnitude(); });
        tempStars = tempStars.slice(0, Math.floor(tempStars.length / 4));
        this.users.forEach(function (user) {
            // get a random item
            var star = getRandomItem(tempStars);
            // loop until we find a star with no owner
            while (!!(star === null || star === void 0 ? void 0 : star.owner)) {
                star = getRandomItem(tempStars);
            }
            // Set the star owner
            star.updateOwner(user);
        });
    };
    // Get stars that can be reached from the given star considering distance and energy
    GalaxyData.prototype.getStarsInRange = function (starID) {
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
        return possible.filter(function (temp) { return temp.position.distance(pos) < star.energy; });
    };
    GalaxyData.prototype.getEnemyStarsInRange = function (starID) {
        var star = this.starDict[starID];
        if (star && star.owner) {
            var stars = this.getStarsInRange(starID);
            stars = stars.filter(function (otherStar) { return otherStar.owner; }); // get stars with owners
            // @ts-ignore
            return stars.filter(function (otherStar) { return otherStar.owner.uuid != star.owner.uuid; });
        }
    };
    GalaxyData.prototype.getUnownedStarsInRange = function (starID) {
        var stars = this.getStarsInRange(starID);
        return stars.filter(function (star) { return !star.owner; });
    };
    return GalaxyData;
}());
export { GalaxyData };
//# sourceMappingURL=GalaxyData.js.map