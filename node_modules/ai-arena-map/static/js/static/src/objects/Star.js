import * as THREE from "three";
import { postfixes, prefixes, starTypes } from "../config/distributions.js";
import { getRandomItem, uuid } from "../util.js";
import { words } from "../config/words.js";
import { BLOOM_LAYER, BUBBLE_MAX, BUBBLE_MIN, FAR_TEXT_PLANE, NEAR_TEXT_PLANE, OVERLAY_LAYER, STAR_MAX, STAR_MIN } from "../config/config.js";
import { createText, updateText } from "./Text.js";
var map = new THREE.TextureLoader().load('./static/images/sprite120.png');
var materials = starTypes.color.map(function (color) { return new THREE.SpriteMaterial({ map: map, color: color }); });
var bubbleMat = new THREE.SpriteMaterial({ map: map, color: 0x00FF00, depthTest: false });
var BUBBLE_SIZE = 20.0;
var Star = (function () {
    function Star(position) {
        this.position = position;
        this.uuid = uuid();
        this.name = this.generateName();
        this.starType = this.generateStarType();
        this.obj = null;
        this.bubble = null;
        this.owner = null;
        this.nameObj = null;
    }
    Star.prototype.generateStarType = function () {
        var num = Math.random() * 100.0;
        var pct = starTypes.percentage;
        for (var i = 0; i < pct.length; i++) {
            num -= pct[i];
            if (num < 0) {
                return i;
            }
        }
        return 0;
    };
    Star.prototype.generateName = function () {
        var name = "";
        if (Math.random() < 0.2) {
            name += getRandomItem(prefixes);
        }
        name += getRandomItem(words);
        if (Math.random() < 0.15) {
            name += getRandomItem(postfixes);
        }
        return name;
    };
    Star.prototype.updateScale = function (camera, frustum) {
        var _a;
        var dist = this.position.distanceTo(camera.position) / 250;
        var starSize = dist * starTypes.size[this.starType];
        starSize = Math.min(Math.max(STAR_MIN, starSize), STAR_MAX);
        (_a = this.obj) === null || _a === void 0 ? void 0 : _a.scale.copy(new THREE.Vector3(starSize, starSize, starSize));
        if (this.bubble) {
            var bubbleSize = dist * BUBBLE_SIZE;
            bubbleSize = Math.min(Math.max(BUBBLE_MIN, bubbleSize), BUBBLE_MAX);
            this.bubble.scale.copy(new THREE.Vector3(bubbleSize, bubbleSize, bubbleSize));
        }
        if (dist < FAR_TEXT_PLANE && dist > NEAR_TEXT_PLANE) {
            if (this.nameObj == null) {
                this.nameObj = createText(this.name);
            }
            updateText(this.nameObj, dist, this.position, camera, frustum);
        }
        else {
            if (this.nameObj != null) {
                this.nameObj.remove();
                this.nameObj = null;
            }
        }
    };
    Star.prototype.toThreeObject = function () {
        var star = new THREE.Sprite(materials[this.starType]);
        star.layers.set(BLOOM_LAYER);
        star.scale.multiplyScalar(starTypes.size[this.starType]);
        star.position.copy(this.position);
        star.name = this.name;
        this.obj = star;
        return star;
    };
    Star.prototype.addBubble = function () {
        var bubble = new THREE.Sprite(bubbleMat);
        bubble.layers.set(OVERLAY_LAYER);
        bubble.scale.multiplyScalar(BUBBLE_SIZE);
        bubble.position.copy(this.position);
        this.bubble = bubble;
        return bubble;
    };
    return Star;
}());
export { Star };
//# sourceMappingURL=Star.js.map