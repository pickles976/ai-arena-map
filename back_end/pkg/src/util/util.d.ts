import { GalaxyParams } from "../config/GalaxyParams";
import { Vector3 } from '@math.gl/core';
/**
 * Generate a random number in a gaussian distribution
 * @param mean
 * @param stdev
 * @returns
 */
export declare function gaussianRandom(mean?: number, stdev?: number): number;
export declare function uuid(): string;
/**
 * Get a random item in a list
 * @param list
 * @returns
 */
export declare function getRandomItem(list: any[]): any;
export declare function clamp(value: number, minimum: number, maximum: number): number;
export declare function spiral(x: number, y: number, z: number, offset: number, params: GalaxyParams): Vector3;
