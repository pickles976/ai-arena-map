import { GalaxyParams } from "./GalaxyParams";
// Energy is based on star size * this multiplier
export var ENERGY_MULTIPLIER = 8.0;
// Galaxy stuff
var NUM_STARS = 5000;
var GALAXY_HEIGHT = 5;
var CORE_X_DIST = 33;
var CORE_Y_DIST = 33;
var OUTER_CORE_X_DIST = 100;
var OUTER_CORE_Y_DIST = 100;
var ARM_X_DIST = 100;
var ARM_Y_DIST = 50;
var ARM_X_MEAN = 200;
var ARM_Y_MEAN = 100;
var SPIRAL = 3.0;
var ARMS = 2;
var HAZE_RATIO = 1.0;
export var GALAXY_PARAMS = new GalaxyParams(NUM_STARS, GALAXY_HEIGHT, CORE_X_DIST, CORE_Y_DIST, OUTER_CORE_X_DIST, OUTER_CORE_Y_DIST, ARM_X_DIST, ARM_Y_DIST, ARM_X_MEAN, ARM_Y_MEAN, SPIRAL, ARMS, HAZE_RATIO);
//# sourceMappingURL=config.js.map