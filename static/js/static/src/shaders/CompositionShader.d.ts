export declare const fragment = "\n\nuniform sampler2D baseTexture;\nuniform sampler2D bloomTexture;\nuniform sampler2D overlayTexture;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n    // Baselayer + bloomlayer + 0.2(overlay)\n    gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) + vec4(0.2) * texture2D(overlayTexture, vUv) );\n\n}\n\n";
export declare const vertex = "\nvarying vec2 vUv;\n\nvoid main() {\n\n    vUv = uv;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n}\n";
