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
export const FAR_TEXT_PLANE = 0.115

export const GALAXY_PARAMS = {
    numStars: 5000,
    galaxyHeight : 5, // how tall the galaxy disk is
    coreXDist: 33, // standard deviation of the core
    coreYDist: 33,
    outerCoreXDist: 100, // standard deviation of the outer core
    outerCoreYDist: 100,
    armXDist: 100, // standard deviation of the arm gaussians
    armYDist: 50,
    armXMean: 200, // mean/offset of the arm gaussians
    armYMean: 100,
    spiral: 3, // spiral intensity. 0 -> inf
    arms: 2, // number of arms
    hazeRatio: 1.0, // ratio of haze particles to stars
}

export const BLOOM_PARAMS = {
    exposure: 1,
    bloomStrength: 1.5,
    bloomThreshold: 0.4,
    bloomRadius: 0
};
