/**
 * Shader used for combining the multiple render passes
 *
 * Basically we set render target screen to false for our effects passes, so they render to a texture. Then for each pixel
 * we blend the layers together.
 */
var CompositionShader = /** @class */ (function () {
    function CompositionShader() {
    }
    CompositionShader.fragment = "\n\nuniform sampler2D baseTexture;\nuniform sampler2D bloomTexture;\nuniform sampler2D overlayTexture;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n    // Baselayer + bloomlayer + 0.2(overlay)\n    gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) + vec4(0.3) * texture2D(overlayTexture, vUv) );\n\n}\n\n";
    CompositionShader.vertex = "\nvarying vec2 vUv;\n\nvoid main() {\n\n    vUv = uv;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n}\n";
    return CompositionShader;
}());
export { CompositionShader };
