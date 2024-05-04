import type { ExternalTexture } from "../../../Materials/Textures/externalTexture";
import type { Nullable } from "../../../types";
declare module "../../../Materials/effect" {
    interface Effect {
        /**
         * Sets an external texture on the engine to be used in the shader.
         * @param name Name of the external texture variable.
         * @param texture Texture to set.
         */
        setExternalTexture(name: string, texture: Nullable<ExternalTexture>): void;
    }
}
declare module "../../webgpuEngine" {
    interface WebGPUEngine {
        /**
         * Creates an external texture
         * @param video video element
         * @returns the external texture, or null if external textures are not supported by the engine
         */
        createExternalTexture(video: HTMLVideoElement): Nullable<ExternalTexture>;
        /**
         * Sets an internal texture to the according uniform.
         * @param name The name of the uniform in the effect
         * @param texture The texture to apply
         */
        setExternalTexture(name: string, texture: Nullable<ExternalTexture>): void;
    }
}
