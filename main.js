import * as THREE from 'three'
import { MapControls } from 'https://unpkg.com/three@0.146.0/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'https://unpkg.com/three@0.146.0/examples/jsm/libs/lil-gui.module.min.js'
import { generateGalaxy } from './galaxy.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { uuid } from './util.js';

const params = {
    exposure: 1,
    bloomStrength: 1.5,
    bloomThreshold: 0,
    bloomRadius: 0
};

let canvas, renderer, camera, scene, orbit, composer, mixer

function initThree() {

    // grab canvas
    canvas = document.querySelector('#canvas');

    // renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas,
        logarithmicDepthBuffer: true,
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;

    // scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xEBE2DB, 0.00003);

    // camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 5, 2000000 );
    camera.position.set(0, 500, 500);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    // map orbit
    orbit = new MapControls(camera, canvas)
    orbit.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    orbit.dampingFactor = 0.05;
    orbit.screenSpacePanning = false;
    orbit.minDistance = 1;
    orbit.maxDistance = 16384;
    orbit.maxPolarAngle = (Math.PI / 2) - (Math.PI / 360)

    // lighting
    const color = 0xFFFFFF;
    const intensity = 0.6;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    const ambient = new THREE.AmbientLight(color, 0.3);
    scene.add(ambient);

    const axesHelper = new THREE.AxesHelper( 10 );
    axesHelper.position.set(0, 0, 0.003)
    scene.add( axesHelper );

    // Grid Helper
    const size = 64
    const gridHelper = new THREE.GridHelper( size, size / 4, 0x444444, 0x999999);
    gridHelper.rotateX(Math.PI / 2)
    gridHelper.position.set(0, 0, 0.001)
    // scene.add( gridHelper );

    // post-processing
    const renderScene = new RenderPass( scene, camera );

    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    composer = new EffectComposer( renderer );
    composer.addPass( renderScene );
    composer.addPass( bloomPass );

}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
}

async function render() {

    orbit.update()

    // fix buffer size
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    // fix aspect ratio
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
   

    // renderer.render(scene, camera);

    composer.render()
    requestAnimationFrame(render)

}

initThree()
generateGalaxy(scene, 10000)
requestAnimationFrame(render)