/**
 * Full-screen textured quad shader
 */

const CopyShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'opacity': { value: 1.0 }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

        const float blue = 1.0;
        const float red = 0.60;
        const float green = 0.70;

        const float a = 60.0;
        const float b = 8.4;
        const float c = -0.1;

        // const float c = -0.3;
        // const float b = -1.6;
        // const float o = -1.1;
        // const float u = 0.6;

        const float e = 2.71828;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );
			// gl_FragColor.b *= opacity;

            float mag = (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) / 3.0;

            if (mag > 0.005) {

                mag = (-a * mag * mag) + b * mag + c;

                // gaussian
                // mag = (b / (o * sqrt(6.18))) * pow(e, -0.5 * pow(mag/c - u, 2.0) / o * o);

                mag = clamp(mag, 0.0, 1.0);

                gl_FragColor.r += red * mag;
                gl_FragColor.g += green * mag;
                gl_FragColor.b += blue * mag;
            }

		}`

};

export { CopyShader };