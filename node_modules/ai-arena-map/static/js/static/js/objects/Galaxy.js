"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Galaxy3D = exports.Galaxy = exports.GalaxyParams = void 0;
var Haze_js_1 = require("./Haze.js");
var Star_js_1 = require("./Star.js");
var util_js_1 = require("../util.js");
var THREE = __importStar(require("three"));
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
exports.GalaxyParams = GalaxyParams;
var Galaxy = (function () {
    function Galaxy(params) {
        this.params = params;
        this.stars = this.generateStarData(this.params.numStars, this.params.arms, this.params);
    }
    Galaxy.prototype.generateStarData = function (numStars, arms, params) {
        var stars = [];
        for (var j = 0; j < arms; j++) {
            for (var i = 0; i < (numStars / 2) / arms; i++) {
                var pos = spiral((0, util_js_1.gaussianRandom)(params.armXMean, params.armXDist), (0, util_js_1.gaussianRandom)(params.armYMean, params.armYDist), (0, util_js_1.gaussianRandom)(0, params.galaxyHeight), j * 2 * Math.PI / arms, params);
                stars.push(new Star_js_1.Star(pos));
            }
        }
        for (var i = 0; i < numStars / 3; i++) {
            var pos = spiral((0, util_js_1.gaussianRandom)(0, params.outerCoreXDist), (0, util_js_1.gaussianRandom)(0, params.outerCoreYDist), (0, util_js_1.gaussianRandom)(0, params.galaxyHeight), 0, params);
            stars.push(new Star_js_1.Star(pos));
        }
        for (var i = 0; i < numStars / 6; i++) {
            var pos = spiral((0, util_js_1.gaussianRandom)(0, params.coreXDist), (0, util_js_1.gaussianRandom)(0, params.coreYDist), (0, util_js_1.gaussianRandom)(0, params.galaxyHeight), 0, params);
            stars.push(new Star_js_1.Star(pos));
        }
        return stars;
    };
    return Galaxy;
}());
exports.Galaxy = Galaxy;
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
                var pos = spiral((0, util_js_1.gaussianRandom)(params.armXMean, params.armXDist), (0, util_js_1.gaussianRandom)(params.armYMean, params.armYDist), (0, util_js_1.gaussianRandom)(0, params.galaxyHeight), j * 2 * Math.PI / arms, params);
                hazeArray.push((0, Haze_js_1.createHaze)(pos));
            }
        }
        for (var i = 0; i < numStars / 3; i++) {
            var pos = spiral((0, util_js_1.gaussianRandom)(0, params.outerCoreXDist), (0, util_js_1.gaussianRandom)(0, params.outerCoreYDist), (0, util_js_1.gaussianRandom)(0, params.galaxyHeight), 0, params);
            hazeArray.push((0, Haze_js_1.createHaze)(pos));
        }
        for (var i = 0; i < numStars / 6; i++) {
            var pos = spiral((0, util_js_1.gaussianRandom)(0, params.coreXDist), (0, util_js_1.gaussianRandom)(0, params.coreYDist), (0, util_js_1.gaussianRandom)(0, params.galaxyHeight), 0, params);
            hazeArray.push((0, Haze_js_1.createHaze)(pos));
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
            (0, Haze_js_1.updateHazeScale)(haze, dist);
            haze.material.needsUpdate = true;
        });
    };
    return Galaxy3D;
}());
exports.Galaxy3D = Galaxy3D;
function spiral(x, y, z, offset, params) {
    var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var theta = offset;
    theta += x > 0 ? Math.atan(y / x) : Math.atan(y / x) + Math.PI;
    theta += (r / params.armXDist) * params.spiral;
    return new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), z);
}
//# sourceMappingURL=Galaxy.js.map