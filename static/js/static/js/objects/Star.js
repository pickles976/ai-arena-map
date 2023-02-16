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
exports.Star = void 0;
var THREE = __importStar(require("three"));
var distributions_js_1 = require("../config/distributions.js");
var util_js_1 = require("../util.js");
var words_js_1 = require("../config/words.js");
var config_js_1 = require("../config/config.js");
var Text_js_1 = require("./Text.js");
var map = new THREE.TextureLoader().load('./static/images/sprite120.png');
var materials = distributions_js_1.starTypes.color.map(function (color) { return new THREE.SpriteMaterial({ map: map, color: color }); });
var bubbleMat = new THREE.SpriteMaterial({ map: map, color: 0x00FF00, depthTest: false });
var BUBBLE_SIZE = 20.0;
var Star = (function () {
    function Star(position) {
        this.position = position;
        this.uuid = (0, util_js_1.uuid)();
        this.name = this.generateName();
        this.starType = this.generateStarType();
        this.obj = null;
        this.bubble = null;
        this.owner = null;
        this.nameObj = null;
    }
    Star.prototype.generateStarType = function () {
        var num = Math.random() * 100.0;
        var pct = distributions_js_1.starTypes.percentage;
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
            name += (0, util_js_1.getRandomItem)(distributions_js_1.prefixes);
        }
        name += (0, util_js_1.getRandomItem)(words_js_1.words);
        if (Math.random() < 0.15) {
            name += (0, util_js_1.getRandomItem)(distributions_js_1.postfixes);
        }
        return name;
    };
    Star.prototype.updateScale = function (camera, frustum) {
        var _a;
        var dist = this.position.distanceTo(camera.position) / 250;
        var starSize = dist * distributions_js_1.starTypes.size[this.starType];
        starSize = Math.min(Math.max(config_js_1.STAR_MIN, starSize), config_js_1.STAR_MAX);
        (_a = this.obj) === null || _a === void 0 ? void 0 : _a.scale.copy(new THREE.Vector3(starSize, starSize, starSize));
        if (this.bubble) {
            var bubbleSize = dist * BUBBLE_SIZE;
            bubbleSize = Math.min(Math.max(config_js_1.BUBBLE_MIN, bubbleSize), config_js_1.BUBBLE_MAX);
            this.bubble.scale.copy(new THREE.Vector3(bubbleSize, bubbleSize, bubbleSize));
        }
        if (dist < config_js_1.FAR_TEXT_PLANE && dist > config_js_1.NEAR_TEXT_PLANE) {
            if (this.nameObj == null) {
                this.nameObj = (0, Text_js_1.createText)(this.name);
            }
            (0, Text_js_1.updateText)(this.nameObj, dist, this.position, camera, frustum);
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
        star.layers.set(config_js_1.BLOOM_LAYER);
        star.scale.multiplyScalar(distributions_js_1.starTypes.size[this.starType]);
        star.position.copy(this.position);
        star.name = this.name;
        this.obj = star;
        return star;
    };
    Star.prototype.addBubble = function () {
        var bubble = new THREE.Sprite(bubbleMat);
        bubble.layers.set(config_js_1.OVERLAY_LAYER);
        bubble.scale.multiplyScalar(BUBBLE_SIZE);
        bubble.position.copy(this.position);
        this.bubble = bubble;
        return bubble;
    };
    return Star;
}());
exports.Star = Star;
//# sourceMappingURL=Star.js.map