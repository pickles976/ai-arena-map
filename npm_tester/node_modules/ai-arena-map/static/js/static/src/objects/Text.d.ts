import * as THREE from 'three';
export declare function createText(data: string): HTMLDivElement;
export declare function updateText(textObj: HTMLDivElement, dist: number, position: THREE.Vector3, camera: THREE.Camera, frustum: THREE.Frustum): void;
