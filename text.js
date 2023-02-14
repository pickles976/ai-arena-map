import * as THREE from 'three'
import { FontLoader } from 'https://unpkg.com/three@0.146.0/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'https://unpkg.com/three@0.146.0/examples/jsm/geometries/TextGeometry.js'

const TEXT_SIZE = 25

const loader = new FontLoader();

let meshes = []

const meshMaterial = new THREE.MeshStandardMaterial ({
    color: 0xffffff,
    flatShading: true,
    roughness: 0,
    metalness: 0,
    // emissive: 0xffffff,
    // emissiveIntensity: 5.0,
})

export function CreateText(text, position, scene) {

    meshes.forEach((mesh) => scene.remove(mesh))
    meshes = []

    _DrawText({
        text,
        scene,
        position: position,
        size: TEXT_SIZE,
        height:  0,
    })

}

export function UpdateText(position){
    meshes.forEach((mesh) => mesh.lookAt(position))
}

function _DrawText(params){

    loader
        .setPath('./static/fonts/')
        .load('helvetiker_regular.typeface.json', (font) => {
            const geometry = new TextGeometry(params.text ?? "ERROR: TEXT NOT FOUND", 
                {
                    font: font,
                    size: params.size ?? 3,  // ui: size
                    height: params.height ?? 0.2,  // ui: height
                    curveSegments: params.curveSegments ?? 12,  // ui: curveSegments
                    bevelEnabled: params.bevelEnabled ?? false,  // ui: bevelEnabled
                    bevelThickness: params.bevelThickness ?? 0.15,  // ui: bevelThickness
                    bevelSize: params.bevelSize ?? 0.3,  // ui: bevelSize
                    bevelSegments: params.bevelSegments ?? 5,  // ui: bevelSegments
                })

            // geometry.rotateY(-Math.PI / 2)
            // geometry.rotateZ(Math.PI)
            // geometry.rotateZ(Math.PI)
            geometry.center()

            let temp = new THREE.Mesh(geometry, meshMaterial)
            temp.position.set(...params.position)
            meshes.push(temp)
            params.scene.add(temp)
        }
      )
}