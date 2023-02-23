"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOOM_PARAMS = exports.GALAXY_PARAMS = exports.FAR_TEXT_PLANE = exports.NEAR_TEXT_PLANE = exports.OVERLAY_LAYER = exports.BLOOM_LAYER = exports.BASE_LAYER = exports.BUBBLE_MAX = exports.BUBBLE_MIN = exports.STAR_MAX = exports.STAR_MIN = void 0;
var Galaxy_1 = require("../objects/Galaxy");
exports.STAR_MIN = 0.25;
exports.STAR_MAX = 5.0;
exports.BUBBLE_MIN = 6.5;
exports.BUBBLE_MAX = 30.0;
exports.BASE_LAYER = 0;
exports.BLOOM_LAYER = 1;
exports.OVERLAY_LAYER = 2;
exports.NEAR_TEXT_PLANE = 0.015;
exports.FAR_TEXT_PLANE = 0.115;
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
exports.GALAXY_PARAMS = new Galaxy_1.GalaxyParams(NUM_STARS, GALAXY_HEIGHT, CORE_X_DIST, CORE_Y_DIST, OUTER_CORE_X_DIST, OUTER_CORE_Y_DIST, ARM_X_DIST, ARM_Y_DIST, ARM_X_MEAN, ARM_Y_MEAN, SPIRAL, ARMS, HAZE_RATIO);
exports.BLOOM_PARAMS = {
    exposure: 1,
    bloomStrength: 1.5,
    bloomThreshold: 0.4,
    bloomRadius: 0
};
//# sourceMappingURL=config.js.map