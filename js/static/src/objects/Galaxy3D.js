import { createHaze, updateHazeScale } from "./Haze.js";
import * as THREE from "three";
import { generateGalaxyFromObject } from "./GalaxyGenerator.js";
var Galaxy3D = /** @class */ (function () {
    function Galaxy3D(scene, galaxy) {
        this.scene = scene;
        this.params = galaxy.params;
        this.stars = galaxy.stars;
        this.starDict = galaxy.starDict;
        this.haze = [];
        this.generate3D();
    }
    // Create 3D representation from data
    Galaxy3D.prototype.generate3D = function () {
        this.haze = this.generateHaze(this.params.numStars * this.params.hazeRatio, this.params.arms, this.params);
        this.generateStars3D();
    };
    Galaxy3D.prototype.generateHaze = function (numStars, arms, params) {
        var _this = this;
        var hazeArray = generateGalaxyFromObject(numStars, arms, params, function (pos) { return createHaze(pos); });
        hazeArray.forEach(function (h) {
            // add haze
            _this.scene.add(h);
        });
        return hazeArray;
    };
    Galaxy3D.prototype.generateStars3D = function () {
        var _this = this;
        this.stars.forEach(function (star) {
            // add star
            star.toThreeObject(_this.scene);
            // update the bubble for this star
            star.updateBubble(_this.scene);
        });
    };
    // Update a star with some data
    Galaxy3D.prototype.updateStar = function (id, owner) {
        var star = this.starDict[id];
        star.updateOwner(owner);
        star.updateBubble(this.scene);
    };
    // Update the galaxy based on camera zoom
    Galaxy3D.prototype.updateFromZoom = function (camera) {
        // necessary for frustum-culling text
        // we do this here so we can only do it once
        camera.updateMatrixWorld();
        var frustum = new THREE.Frustum();
        frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
        // update star scale based on distance to camera
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
