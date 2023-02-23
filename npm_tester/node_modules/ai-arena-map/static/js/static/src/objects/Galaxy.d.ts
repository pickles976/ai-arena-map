import { Star } from "./Star.js";
import * as THREE from "three";
export declare class GalaxyParams {
    numStars: number;
    galaxyHeight: number;
    coreXDist: number;
    coreYDist: number;
    outerCoreXDist: number;
    outerCoreYDist: number;
    armXDist: number;
    armYDist: number;
    armXMean: number;
    armYMean: number;
    spiral: number;
    arms: number;
    hazeRatio: number;
    constructor(numStars: any, galaxyHeight: any, coreXDist: any, coreYDist: any, outerCoreXDist: any, outerCoreYDist: any, armXDist: any, armYDist: any, armXMean: any, armYMean: any, spiral: any, arms: any, hazeRatio: any);
}
export declare class Galaxy {
    params: GalaxyParams;
    stars: Star[];
    constructor(params: GalaxyParams);
    generateStarData(numStars: number, arms: number, params: GalaxyParams): Star[];
}
export declare class Galaxy3D {
    scene: THREE.Scene;
    params: GalaxyParams;
    stars: Star[];
    haze: THREE.Sprite[];
    constructor(scene: THREE.Scene, galaxy: Galaxy);
    generate3D(): void;
    generateHaze(numStars: number, arms: number, params: GalaxyParams): THREE.Sprite[];
    generateStars3D(): void;
    updateFromZoom(camera: THREE.Camera): void;
}
