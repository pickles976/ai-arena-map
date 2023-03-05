import { createHaze, updateHazeScale } from "./Haze";
import { Star } from "./Star";
import * as THREE from "three";
import { generateGalaxyFromObject } from "ai-arena-map-headless";
import { HAZE_RATIO } from "../config/config";
export class Galaxy3D {
    constructor(scene, galaxy) {
        this.scene = scene;
        this.params = galaxy.params;
        this.stars = galaxy.stars.map((data) => new Star(data));
        this.starDict = {};
        this.stars.forEach((star) => this.starDict[star.uuid] = star);
        this.haze = [];
        this.generate3D();
    }
    // Create 3D representation from data
    generate3D() {
        this.haze = this.generateHaze(this.params.numStars * this.params.hazeRatio, this.params.arms, this.params);
        this.generateStars3D();
    }
    generateHaze(numStars, arms, params) {
        let hazeArray = generateGalaxyFromObject(numStars / HAZE_RATIO, arms, params, (pos) => createHaze(pos));
        hazeArray.forEach((h) => {
            // add haze
            this.scene.add(h);
        });
        return hazeArray;
    }
    generateStars3D() {
        this.stars.forEach((star) => {
            // add star
            star.toThreeObject(this.scene);
            // update the bubble for this star
            star.updateBubble(this.scene);
        });
    }
    // Update a star with some data
    updateStar(id, owner) {
        let star = this.starDict[id];
        star.updateOwner(owner);
        star.updateBubble(this.scene);
    }
    // Update the galaxy based on camera zoom
    updateFromZoom(camera) {
        // necessary for frustum-culling text
        // we do this here so we can only do it once
        camera.updateMatrixWorld();
        let frustum = new THREE.Frustum();
        frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
        // update star scale based on distance to camera
        this.stars.forEach((star) => {
            star.updateScale(camera, frustum);
        });
        this.haze.forEach((haze) => {
            let dist = haze.position.distanceTo(camera.position) / 250;
            updateHazeScale(haze, dist);
            haze.material.needsUpdate = true;
        });
    }
    toggleBubbles(val) {
        this.stars.forEach((star) => {
            if (star.bubble) {
                star.bubble.visible = val;
            }
        });
    }
}
