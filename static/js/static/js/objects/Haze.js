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
exports.updateHazeScale = exports.createHaze = void 0;
var THREE = __importStar(require("three"));
var config_js_1 = require("../config/config.js");
var util_js_1 = require("../util.js");
var OPACITY = 0.2;
var MAX_SIZE = 50.0;
var MIN_SIZE = 20.0;
var alpha = new THREE.TextureLoader().load('./static/images/alpha_noise.png');
var hazeImage = new THREE.TextureLoader().load('./static/images/feathered60.png');
var hazeSprite = new THREE.SpriteMaterial({ map: hazeImage, color: 0x0082ff, opacity: OPACITY, depthTest: false, depthWrite: false });
function createHaze(position) {
    var haze = new THREE.Sprite(hazeSprite);
    haze.layers.set(config_js_1.BASE_LAYER);
    haze.position.copy(position);
    haze.scale.multiplyScalar((0, util_js_1.clamp)(MAX_SIZE * Math.random(), MIN_SIZE, MAX_SIZE));
    return haze;
}
exports.createHaze = createHaze;
function updateHazeScale(obj, dist) {
    obj.material.opacity = (0, util_js_1.clamp)(OPACITY * Math.pow(dist / 2.5, 2), 0, OPACITY);
}
exports.updateHazeScale = updateHazeScale;
//# sourceMappingURL=Haze.js.map