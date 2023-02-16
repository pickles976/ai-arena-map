import { GalaxyParams } from "../objects/Galaxy";
export declare const STAR_MIN = 0.25;
export declare const STAR_MAX = 5;
export declare const BUBBLE_MIN = 6.5;
export declare const BUBBLE_MAX = 30;
export declare const BASE_LAYER = 0;
export declare const BLOOM_LAYER = 1;
export declare const OVERLAY_LAYER = 2;
export declare const NEAR_TEXT_PLANE = 0.015;
export declare const FAR_TEXT_PLANE = 0.115;
export declare const GALAXY_PARAMS: GalaxyParams;
export declare const BLOOM_PARAMS: {
    exposure: number;
    bloomStrength: number;
    bloomThreshold: number;
    bloomRadius: number;
};
