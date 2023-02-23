import * as THREE from "three";
import { postfixes, prefixes, starTypes } from "../config/distributions.js";
import { getRandomItem, uuid } from "../util.js";
import { words } from "../config/words.js";
import { BLOOM_LAYER, BUBBLE_MAX, BUBBLE_MIN, ENERGY_MULTIPLIER, FAR_TEXT_PLANE, NEAR_TEXT_PLANE, OVERLAY_LAYER, STAR_MAX, STAR_MIN } from "../config/config.js";
import { createText, updateText } from "./Text.js";
// Sprites
var map = new THREE.TextureLoader().load('./static/images/sprite120.png');
var materials = starTypes.color.map(function (color) { return new THREE.SpriteMaterial({ map: map, color: color }); });
// bubble mat
var bubbleMat = new THREE.SpriteMaterial({ map: map, color: 0x00FF00, depthTest: false });
var BUBBLE_SIZE = 20.0;
var Star = /** @class */ (function () {
    function Star(position) {
        this.position = position;
        this.uuid = uuid();
        this.name = this.generateName();
        this.starType = this.generateStarType();
        this.obj = null;
        this.bubble = null;
        this.owner = null;
        this.nameObj = null;
        this.ownerObj = null;
        this.energy = 0;
    }
    // Select the star type
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
    // Randomly generate a name
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
    // Update the scale of the star and associiated objects
    Star.prototype.updateScale = function (camera, frustum) {
        var _a;
        var dist = this.position.distanceTo(camera.position) / 250;
        // update star size
        var starSize = dist * starTypes.size[this.starType];
        starSize = Math.min(Math.max(STAR_MIN, starSize), STAR_MAX);
        (_a = this.obj) === null || _a === void 0 ? void 0 : _a.scale.copy(new THREE.Vector3(starSize, starSize, starSize));
        // update size of sphere of influence
        if (this.bubble) {
            var bubbleSize = dist * BUBBLE_SIZE;
            bubbleSize = Math.min(Math.max(BUBBLE_MIN, bubbleSize), BUBBLE_MAX);
            this.bubble.scale.copy(new THREE.Vector3(bubbleSize, bubbleSize, bubbleSize));
        }
        // update text label if necessary
        if (dist < FAR_TEXT_PLANE && dist > NEAR_TEXT_PLANE) {
            if (this.nameObj == null) {
                // Create text
                this.nameObj = createText(this.name);
            }
            updateText(this.nameObj, dist, this.position, camera, frustum, -1);
            if (this.owner != null) {
                if (this.ownerObj == null) {
                    this.ownerObj = createText("Owner: ".concat(this.owner.name));
                }
                updateText(this.ownerObj, dist, this.position, camera, frustum, 1);
            }
        }
        else {
            if (this.nameObj != null) {
                // remove text
                this.nameObj.remove();
                this.nameObj = null;
            }
            if (this.ownerObj != null) {
                // remove text
                this.ownerObj.remove();
                this.ownerObj = null;
            }
        }
    };
    // convert a star class into a three object
    Star.prototype.toThreeObject = function (scene) {
        // actual star object
        var star = new THREE.Sprite(materials[this.starType]);
        // set to bloom layer
        star.layers.set(BLOOM_LAYER);
        star.scale.multiplyScalar(starTypes.size[this.starType]);
        star.position.copy(this.position);
        star.name = this.name;
        // store a reference to the 3D object in this object
        this.obj = star;
        scene.add(star);
    };
    Star.prototype.updateOwner = function (user) {
        this.owner = user;
    };
    Star.prototype.updateBubble = function (scene) {
        if (this.owner) {
            if (this.bubble == null) {
                var tempMat = new THREE.SpriteMaterial({ map: map, color: 0x00FF00, depthTest: false });
                //@ts-ignore
                tempMat.color.setStyle(this.owner.color);
                // create Sphere of influence object
                var bubble = new THREE.Sprite(tempMat);
                bubble.layers.set(OVERLAY_LAYER);
                bubble.scale.multiplyScalar(BUBBLE_SIZE);
                bubble.position.copy(this.position);
                this.bubble = bubble;
                scene.add(bubble);
            }
            else {
                this.bubble.material.color.setStyle(this.owner.color.toString());
            }
        }
    };
    Star.prototype.update = function () {
        this.energy += starTypes.size[this.starType] * ENERGY_MULTIPLIER;
    };
    return Star;
}());
export { Star };
