export const __esModule: boolean;
export class GalaxyParams {
    constructor(numStars: any, galaxyHeight: any, coreXDist: any, coreYDist: any, outerCoreXDist: any, outerCoreYDist: any, armXDist: any, armYDist: any, armXMean: any, armYMean: any, spiral: any, arms: any, hazeRatio: any);
    numStars: any;
    galaxyHeight: any;
    coreXDist: any;
    coreYDist: any;
    outerCoreXDist: any;
    outerCoreYDist: any;
    armXDist: any;
    armYDist: any;
    armXMean: any;
    armYMean: any;
    spiral: any;
    arms: any;
    hazeRatio: any;
}
export class Galaxy {
    constructor(params: any);
    params: any;
    stars: Star_js_1.Star[];
    generateStarData(numStars: any, arms: any, params: any): Star_js_1.Star[];
}
export class Galaxy3D {
    constructor(scene: any, galaxy: any);
    scene: any;
    params: any;
    stars: any;
    haze: any[];
    generate3D(): void;
    generateHaze(numStars: any, arms: any, params: any): any[];
    generateStars3D(): void;
    updateFromZoom(camera: any): void;
}
import Star_js_1 = require("./Star.js");
