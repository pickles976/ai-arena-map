import {
	BackSide,
	BoxGeometry,
	Mesh,
	ShaderMaterial,
	UniformsUtils,
	Vector3
} from 'three';

import * as THREE from 'three'

/** Universe "Skybox" */
class Universe extends Mesh {

	constructor() {

		const shader = Universe.CosmosShader;

		const material = new ShaderMaterial( {
			name: 'CosmosShader',
			fragmentShader: shader.fragmentShader,
			vertexShader: shader.vertexShader,
			uniforms: UniformsUtils.clone( shader.uniforms ),
			side: BackSide,
			depthWrite: false
		} );

        // const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: BackSide})

		super( new BoxGeometry( 1, 1, 1 ), material );

		this.isSky = true;

	}

}

/**
 * Shamelessly stolen from:
 * https://www.shadertoy.com/view/XlfGRj
 */
Universe.CosmosShader = {

	uniforms: {
		'turbidity': { value: 2 },
		'rayleigh': { value: 1 },
		'mieCoefficient': { value: 0.005 },
		'mieDirectionalG': { value: 0.8 },
		'sunPosition': { value: new Vector3() },
		'up': { value: new Vector3( 0, 1, 0 ) }
	},

	vertexShader: /* glsl */`
        varying vec2 vUv;

		void main() {
            vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

	fragmentShader: /* glsl */`

        varying vec2 vUv;
		
        #define iterations 17
        #define formuparam 0.53

        #define volsteps 20
        #define stepsize 0.1

        #define zoom   0.8
        #define tile   0.9
        #define speed  0.010 

        #define brightness 0.0015
        #define darkmatter 0.300
        #define distfading 0.730
        #define saturation 0.850

		void main() {

            //get coords and direction
            vec2 uv = vUv;
            vec3 dir=vec3(uv*zoom,1.);

            // orientation
            vec3 from=vec3(1.,.5,0.5);
            
            //volumetric rendering
            float s=0.1,fade=1.;
            vec3 v=vec3(0.);
            for (int r=0; r<volsteps; r++) {
                vec3 p=from+s*dir*.5;
                p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold
                float pa,a=pa=0.;
                for (int i=0; i<iterations; i++) { 
                    p=abs(p)/dot(p,p)-formuparam; // the magic formula
                    a+=abs(length(p)-pa); // absolute sum of average change
                    pa=length(p);
                }
                float dm=max(0.,darkmatter-a*a*.001); //dark matter
                a*=a*a; // add contrast
                if (r>6) fade*=1.-dm; // dark matter, don't render near
                //v+=vec3(dm,dm*.5,0.);
                v+=fade;
                v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; // coloring based on distance
                fade*=distfading; // distance fading
                s+=stepsize;
            }
            v=mix(vec3(length(v)),v,saturation); //color adjust

            // Clamp max value to minimize star popping
            gl_FragColor = vec4(min(v*.00035, 0.3),1.0);	
		}`

};

export { Universe };
