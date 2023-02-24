import * as THREE from 'three';
let width = 100;
let height = 100;
let drawRadius = globalThis.innerWidth / 3.5;
// Create the text element object
export function createText(data) {
    let text = document.createElement('div');
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
// update text position in browser based on camera projection from three
export function updateText(textObj, dist, position, camera, frustum, sign) {
    if (!frustum.containsPoint(position)) {
        textObj.style.display = "none";
        return;
    }
    let vec = toXYCoords(position, camera);
    let x = vec.x + width;
    let y = vec.y + height;
    // dont draw text in the periphery. It's annoying.
    let center = new THREE.Vector2(globalThis.innerWidth / 2, globalThis.innerHeight / 2);
    let radius = center.distanceTo(vec);
    // Keep text within these bounds
    if (radius < drawRadius && x + width > 0 && x < globalThis.innerWidth && y > 0 && y < globalThis.innerHeight) {
        textObj.style.top = `${vec.y}px`;
        textObj.style.left = `${vec.x}px`;
        let scale = 0.1 / dist;
        textObj.style.transform = `scale(${scale}) translate(-${height / (2 * scale)}%, ${sign * height * (1 + Math.sqrt(scale / 2))}%)`;
        textObj.style.display = "block";
    }
    else {
        textObj.style.display = "none";
    }
}
// 3D position to screen space
function toXYCoords(pos, camera) {
    let vector = pos.clone().project(camera);
    vector.x = (vector.x + 1) / 2 * globalThis.innerWidth;
    vector.y = -(vector.y - 1) / 2 * globalThis.innerHeight;
    return new THREE.Vector2(vector.x, vector.y);
}
