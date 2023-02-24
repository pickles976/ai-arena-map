import { GalaxyParams } from "./GalaxyParams";
// Energy is based on star size * this multiplier
export const ENERGY_MULTIPLIER = 4.0;
// Galaxy stuff
const NUM_STARS = 5000;
const GALAXY_HEIGHT = 5;
const CORE_X_DIST = 33;
const CORE_Y_DIST = 33;
const OUTER_CORE_X_DIST = 100;
const OUTER_CORE_Y_DIST = 100;
const ARM_X_DIST = 100;
const ARM_Y_DIST = 50;
const ARM_X_MEAN = 200;
const ARM_Y_MEAN = 100;
const SPIRAL = 3.0;
const ARMS = 2;
const HAZE_RATIO = 1.0;
export const GALAXY_PARAMS = new GalaxyParams(NUM_STARS, GALAXY_HEIGHT, CORE_X_DIST, CORE_Y_DIST, OUTER_CORE_X_DIST, OUTER_CORE_Y_DIST, ARM_X_DIST, ARM_Y_DIST, ARM_X_MEAN, ARM_Y_MEAN, SPIRAL, ARMS, HAZE_RATIO);
