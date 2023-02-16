"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Universe = void 0;
var three_1 = require("three");
var UniverseShader_1 = require("../shaders/UniverseShader");
var CompositionShader_1 = require("../shaders/CompositionShader");
var Universe = (function (_super) {
    __extends(Universe, _super);
    function Universe() {
        var material = new three_1.ShaderMaterial({
            name: 'CosmosShader',
            fragmentShader: UniverseShader_1.fragment,
            vertexShader: CompositionShader_1.vertex,
            side: three_1.BackSide,
            depthWrite: false
        });
        return _super.call(this, new three_1.BoxGeometry(1, 1, 1), material) || this;
    }
    return Universe;
}(three_1.Mesh));
exports.Universe = Universe;
//# sourceMappingURL=Universe.js.map