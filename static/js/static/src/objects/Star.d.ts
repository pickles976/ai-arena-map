import * as THREE from "three";
export declare class Star {
    owner: string | null;
    bubble: THREE.Sprite | null;
    nameObj: HTMLDivElement | null;
    obj: THREE.Sprite | null;
    position: THREE.Vector3;
    uuid: string;
    starType: number;
    name: string;
    constructor(position: THREE.Vector3);
    generateStarType(): number;
    generateName(): string;
    updateScale(camera: THREE.Camera, frustum: THREE.Frustum): void;
    toThreeObject(): THREE.Sprite;
    addBubble(): THREE.Sprite;
}
