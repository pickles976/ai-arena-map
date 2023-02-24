import { gaussianRandom, spiral } from "./util";
// Generates the Star Data objects only
export function generateGalaxyFromObject(numStars, arms, params, generator) {
    var objects = [];
    // spiral (2/3 the stars total)
    for (var j = 0; j < arms; j++) {
        for (var i = 0; i < (numStars / 2) / arms; i++) {
            var pos = spiral(gaussianRandom(params.armXMean, params.armXDist), gaussianRandom(params.armYMean, params.armYDist), gaussianRandom(0, params.galaxyHeight), j * 2 * Math.PI / arms, params);
            objects.push(generator(pos));
        }
    }
    // outer core (1/3rd of the stars)
    for (var i = 0; i < numStars / 3; i++) {
        var pos = spiral(gaussianRandom(0, params.outerCoreXDist), gaussianRandom(0, params.outerCoreYDist), gaussianRandom(0, params.galaxyHeight), 0, params);
        objects.push(generator(pos));
    }
    // inner core (1/6th of the stars)
    for (var i = 0; i < numStars / 6; i++) {
        var pos = spiral(gaussianRandom(0, params.coreXDist), gaussianRandom(0, params.coreYDist), gaussianRandom(0, params.galaxyHeight), 0, params);
        objects.push(generator(pos));
    }
    return objects;
}
