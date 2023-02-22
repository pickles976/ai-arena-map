export class GalaxyParams {

    numStars : number
    galaxyHeight : number
    coreXDist : number
    coreYDist : number
    outerCoreXDist : number
    outerCoreYDist : number
    armXDist : number
    armYDist : number
    armXMean : number
    armYMean : number
    spiral : number
    arms : number
    hazeRatio : number

    // @ts-ignore
    constructor(numStars, galaxyHeight, coreXDist, coreYDist, outerCoreXDist, outerCoreYDist, armXDist, armYDist, armXMean, armYMean, spiral, arms, hazeRatio) {
        this.numStars = numStars
        this.galaxyHeight = galaxyHeight 
        this.coreXDist = coreXDist 
        this.coreYDist = coreYDist
        this.outerCoreXDist = outerCoreXDist 
        this.outerCoreYDist = outerCoreYDist
        this.armXDist = armXDist
        this.armYDist = armYDist
        this.armXMean = armXMean
        this.armYMean = armYMean
        this.spiral = spiral
        this.arms = arms
        this.hazeRatio = hazeRatio 
    }
}