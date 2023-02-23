import {
	BackSide,
	BoxGeometry,
	Mesh,
	ShaderMaterial,
	UniformsUtils,
	Vector3
} from 'three';
import { fragment, vertex } from '../shaders/UniverseShader.js';

/** Universe "Skybox" */
class Universe extends Mesh {

	constructor() {

		const material = new ShaderMaterial( {
			name: 'CosmosShader',
			fragmentShader: fragment,
			vertexShader: vertex,
			side: BackSide,
			depthWrite: false
		} );

		super( new BoxGeometry( 1, 1, 1 ), material );

	}

}

export { Universe };
