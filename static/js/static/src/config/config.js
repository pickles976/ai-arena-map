import { GalaxyParams } from "../objects/Galaxy";
export var STAR_MIN = 0.25;
export var STAR_MAX = 5.0;
export var BUBBLE_MIN = 6.5;
export var BUBBLE_MAX = 30.0;
export var BASE_LAYER = 0;
export var BLOOM_LAYER = 1;
export var OVERLAY_LAYER = 2;
export var NEAR_TEXT_PLANE = 0.015;
export var FAR_TEXT_PLANE = 0.115;
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
export var BLOOM_PARAMS = {
    exposure: 1,
    bloomStrength: 1.5,
    bloomThreshold: 0.4,
    bloomRadius: 0
};
//# sourceMappingURL=config.js.map