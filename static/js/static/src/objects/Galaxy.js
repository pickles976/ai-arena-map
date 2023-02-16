import { createHaze, updateHazeScale } from "./Haze.js";
import { Star } from "./Star.js";
import { gaussianRandom } from "../util.js";
import * as THREE from "three";
var GalaxyParams = (function () {
    function GalaxyParams(numStars, galaxyHeight, coreXDist, coreYDist, outerCoreXDist, outerCoreYDist, armXDist, armYDist, armXMean, armYMean, spiral, arms, hazeRatio) {
        this.numStars = numStars;
        this.galaxyHeight = galaxyHeight;
        this.coreXDist = coreXDist;
        this.coreYDist = coreYDist;
        this.outerCoreXDist = outerCoreXDist;
        this.outerCoreYDist = outerCoreYDist;
        this.armXDist = armXDist;
        this.armYDist = armYDist;
        this.armXMean = armXMean;
        this.armYMean = armYMean;
        this.spiral = spiral;
        this.arms = arms;
        this.hazeRatio = hazeRatio;
    }
    return GalaxyParams;
}());
export { GalaxyParams };
var Galaxy = (function () {
    function Galaxy(params) {
        this.params = params;
        this.stars = this.generateStarData(this.params.numStars, this.params.arms, this.params);
    }
    Galaxy.prototype.generateStarData = function (numStars, arms, params) {
        var stars = [];
        for (var j = 0; j < arms; j++) {
            for (var i = 0; i < (numStars / 2) / arms; i++) {
                var pos = spiral(gaussianRandom(params.armXMean, params.armXDist), gaussianRandom(params.armYMean, params.armYDist), gaussianRandom(0, params.galaxyHeight), j * 2 * Math.PI / arms, params);
                stars.push(new Star(pos));
            }
        }
        for (var i = 0; i < numStars / 3; i++) {
            var pos = spiral(gaussianRandom(0, params.outerCoreXDist), gaussianRandom(0, params.outerCoreYDist), gaussianRandom(0, params.galaxyHeight), 0, params);
            stars.push(new Star(pos));
        }
        for (var i = 0; i < numStars / 6; i++) {
            var pos = spiral(gaussianRandom(0, params.coreXDist), gaussianRandom(0, params.coreYDist), gaussianRandom(0, params.galaxyHeight), 0, params);
            stars.push(new Star(pos));
        }
        return stars;
    };
    return Galaxy;
}());
export { Galaxy };
var Galaxy3D = (function () {
    function Galaxy3D(scene, galaxy) {
        this.scene = scene;
        this.params = galaxy.params;
        this.stars = galaxy.stars;
        this.haze = [];
        this.generate3D();
    }
    Galaxy3D.prototype.generate3D = function () {
        this.haze = this.generateHaze(this.params.numStars * this.params.hazeRatio, this.params.arms, this.params);
        this.generateStars3D();
    };
    Galaxy3D.prototype.generateHaze = function (numStars, arms, params) {
        var _this = this;
        var hazeArray = [];
        for (var j = 0; j < arms; j++) {
            for (var i = 0; i < (numStars / 2) / arms; i++) {
                var pos = spiral(gaussianRandom(params.armXMean, params.armXDist), gaussianRandom(params.armYMean, params.armYDist), gaussianRandom(0, params.galaxyHeight), j * 2 * Math.PI / arms, params);
                hazeArray.push(createHaze(pos));
            }
        }
        for (var i = 0; i < numStars / 3; i++) {
            var pos = spiral(gaussianRandom(0, params.outerCoreXDist), gaussianRandom(0, params.outerCoreYDist), gaussianRandom(0, params.galaxyHeight), 0, params);
            hazeArray.push(createHaze(pos));
        }
        for (var i = 0; i < numStars / 6; i++) {
            var pos = spiral(gaussianRandom(0, params.coreXDist), gaussianRandom(0, params.coreYDist), gaussianRandom(0, params.galaxyHeight), 0, params);
            hazeArray.push(createHaze(pos));
        }
        hazeArray.forEach(function (h) {
            _this.scene.add(h);
        });
        return hazeArray;
    };
    Galaxy3D.prototype.generateStars3D = function () {
        var _this = this;
        this.stars.forEach(function (star) {
            _this.scene.add(star.toThreeObject());
        });
    };
    Galaxy3D.prototype.updateFromZoom = function (camera) {
        camera.updateMatrixWorld();
        var frustum = new THREE.Frustum();
        frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
        this.stars.forEach(function (star) {
            star.updateScale(camera, frustum);
        });
        this.haze.forEach(function (haze) {
            var dist = haze.position.distanceTo(camera.position) / 250;
            updateHazeScale(haze, dist);
            haze.material.needsUpdate = true;
        });
    };
    return Galaxy3D;
}());
export { Galaxy3D };
function spiral(x, y, z, offset, params) {
    var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var theta = offset;
    theta += x > 0 ? Math.atan(y / x) : Math.atan(y / x) + Math.PI;
    theta += (r / params.armXDist) * params.spiral;
    return new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), z);
}
//# sourceMappingURL=Galaxy.js.map