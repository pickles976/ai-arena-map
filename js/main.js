var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as THREE from 'three';
// Data and visualization
import { Galaxy3D, Galaxy, User, Universe, CompositionShader } from './js/index.js';
import { BASE_LAYER, BLOOM_LAYER, BLOOM_PARAMS, GALAXY_PARAMS, OVERLAY_LAYER } from "./js/index.js";
// Rendering
import { MapControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
var canvas, renderer, camera, scene, orbit, baseComposer, bloomComposer, overlayComposer, galaxy, galaxy3D, skybox;
function initThree() {
    // grab canvas
    canvas = document.querySelector('#canvas');
    // scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xEBE2DB, 0.00003);
    // camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 5000000);
    camera.position.set(0, 500, 500);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    // map orbit
    orbit = new MapControls(camera, canvas);
    orbit.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    orbit.dampingFactor = 0.05;
    orbit.screenSpacePanning = false;
    orbit.minDistance = 1;
    orbit.maxDistance = 16384;
    orbit.maxPolarAngle = (Math.PI / 2) - (Math.PI / 360);
    initRenderPipeline();
}
function initRenderPipeline() {
    // Assign Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas,
        logarithmicDepthBuffer: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    // General-use rendering pass for chaining
    var renderScene = new RenderPass(scene, camera);
    // Rendering pass for bloom
    var bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = BLOOM_PARAMS.bloomThreshold;
    bloomPass.strength = BLOOM_PARAMS.bloomStrength;
    bloomPass.radius = BLOOM_PARAMS.bloomRadius;
    // bloom composer
    bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);
    // overlay composer
    overlayComposer = new EffectComposer(renderer);
    overlayComposer.renderToScreen = false;
    overlayComposer.addPass(renderScene);
    // Shader pass to combine base layer, bloom, and overlay layers
    var finalPass = new ShaderPass(new THREE.ShaderMaterial({
        uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: bloomComposer.renderTarget2.texture },
            overlayTexture: { value: overlayComposer.renderTarget2.texture }
        },
        vertexShader: CompositionShader.vertex,
        fragmentShader: CompositionShader.fragment,
        defines: {}
    }), 'baseTexture');
    finalPass.needsSwap = true;
    // base layer composer
    baseComposer = new EffectComposer(renderer);
    baseComposer.addPass(renderScene);
    baseComposer.addPass(finalPass);
}
function resizeRendererToDisplaySize(renderer) {
    var canvas = renderer.domElement;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    var needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}
function render() {
    return __awaiter(this, void 0, void 0, function () {
        var canvas_1, canvas;
        return __generator(this, function (_a) {
            orbit.update();
            // fix buffer size
            if (resizeRendererToDisplaySize(renderer)) {
                canvas_1 = renderer.domElement;
                camera.aspect = canvas_1.clientWidth / canvas_1.clientHeight;
                camera.updateProjectionMatrix();
            }
            canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            // Update galaxy scale/opacity and whatnot from zoom
            galaxy3D.updateFromZoom(camera);
            // Run each pass of the render pipeline
            renderPipeline();
            requestAnimationFrame(render);
            return [2 /*return*/];
        });
    });
}
function renderPipeline() {
    // Render bloom
    camera.layers.set(BLOOM_LAYER);
    bloomComposer.render();
    // Render overlays
    camera.layers.set(OVERLAY_LAYER);
    overlayComposer.render();
    // Render normal
    camera.layers.set(BASE_LAYER);
    baseComposer.render();
}
function initSkybox() {
    // Add Sky
    skybox = new Universe();
    skybox.layers.set(BASE_LAYER);
    skybox.scale.setScalar(2000000);
    scene.add(skybox);
}
initThree();
initSkybox();
galaxy = new Galaxy(GALAXY_PARAMS);
galaxy.setUsers([
    new User("0", "Dave", "#FFFFFF"),
    new User("1", "Bob", "#FFFF00"),
    new User("2", "Joe", "#00FF00"),
    new User("3", "Alice", "#0000FF")
]);
galaxy3D = new Galaxy3D(scene, galaxy);
requestAnimationFrame(render);
