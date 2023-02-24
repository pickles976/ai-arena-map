import { BackSide, BoxGeometry, Mesh, ShaderMaterial } from 'three';
import { fragment, vertex } from '../shaders/UniverseShader';
/** Universe "Skybox" */
class Universe extends Mesh {
    constructor() {
        const material = new ShaderMaterial({
            name: 'CosmosShader',
            fragmentShader: fragment,
            vertexShader: vertex,
            side: BackSide,
            depthWrite: false
        });
        super(new BoxGeometry(1, 1, 1), material);
    }
}
export { Universe };
