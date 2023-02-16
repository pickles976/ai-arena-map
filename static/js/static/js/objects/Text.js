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
exports.updateText = exports.createText = void 0;
var THREE = __importStar(require("three"));
var width = 100;
var height = 100;
var drawRadius = window.innerWidth / 3.5;
function createText(data) {
    var text = document.createElement('div');
    text.style.position = 'absolute';
    text.style.width = '100';
    text.style.height = '100';
    text.style.color = "white";
    text.innerHTML = data;
    text.style.top = 200 + 'px';
    text.style.left = 200 + 'px';
    text.style.fontFamily = "helvetica";
    text.style.pointerEvents = "none";
    document.body.appendChild(text);
    return text;
}
exports.createText = createText;
function updateText(textObj, dist, position, camera, frustum) {
    if (!frustum.containsPoint(position)) {
        textObj.style.display = "none";
        return;
    }
    var vec = toXYCoords(position, camera);
    var x = vec.x + width;
    var y = vec.y + height;
    var center = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
    var radius = center.distanceTo(vec);
    if (radius < drawRadius && x + width > 0 && x < window.innerWidth && y > 0 && y < window.innerHeight) {
        textObj.style.top = "".concat(vec.y, "px");
        textObj.style.left = "".concat(vec.x, "px");
        var scale = 0.1 / dist;
        textObj.style.transform = "scale(".concat(scale, ") translate(-").concat(50 / scale, "%, -").concat(50 + (100 * Math.sqrt(scale / 2)), "%)");
        textObj.style.display = "block";
    }
    else {
        textObj.style.display = "none";
    }
}
exports.updateText = updateText;
function toXYCoords(pos, camera) {
    var vector = pos.clone().project(camera);
    vector.x = (vector.x + 1) / 2 * window.innerWidth;
    vector.y = -(vector.y - 1) / 2 * window.innerHeight;
    return new THREE.Vector2(vector.x, vector.y);
}
//# sourceMappingURL=Text.js.map