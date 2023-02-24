import { GALAXY_PARAMS, GalaxyData } from "ai-arena-map-headless";
import * as THREE from 'three';
import { Galaxy3D } from "./src/src/objects/Galaxy3D";
test("Galaxy can be rendered without crashing", () => {
    let scene = new THREE.Scene();
    let galaxy = new GalaxyData(GALAXY_PARAMS);
    let galaxy3D = new Galaxy3D(scene, galaxy);
});
