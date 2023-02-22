import { GalaxyParams } from "./GalaxyParams.js"

// minimum and maximum star sizes
export const STAR_MIN = 0.25
export const STAR_MAX = 5.0

// minimum and maximum sphere of influence sizes
export const BUBBLE_MIN = 6.5
export const BUBBLE_MAX = 30.0

export const BASE_LAYER = 0
export const BLOOM_LAYER = 1
export const OVERLAY_LAYER = 2

// near and far clipping planes for text rendering
export const NEAR_TEXT_PLANE = 0.015
export const FAR_TEXT_PLANE = 0.12

// Energy is based on star size * this multiplier
export const ENERGY_MULTIPLIER = 4.0


// Galaxy stuff
const NUM_STARS = 5000
const GALAXY_HEIGHT = 5
const CORE_X_DIST = 33
const CORE_Y_DIST = 33
const OUTER_CORE_X_DIST = 100
const OUTER_CORE_Y_DIST = 100
const ARM_X_DIST = 100
const ARM_Y_DIST = 50
const ARM_X_MEAN = 200
const ARM_Y_MEAN = 100
const SPIRAL = 3.0
const ARMS = 2 
const HAZE_RATIO = 1.0

export const GALAXY_PARAMS = new GalaxyParams(
    NUM_STARS, 
    GALAXY_HEIGHT, 
    CORE_X_DIST, 
    CORE_Y_DIST, 
    OUTER_CORE_X_DIST, 
    OUTER_CORE_Y_DIST, 
    ARM_X_DIST, 
    ARM_Y_DIST, 
    ARM_X_MEAN, 
    ARM_Y_MEAN, 
    SPIRAL, 
    ARMS, 
    HAZE_RATIO
)

export const BLOOM_PARAMS = {
    exposure: 1,
    bloomStrength: 1.5,
    bloomThreshold: 0.4,
    bloomRadius: 0
};
