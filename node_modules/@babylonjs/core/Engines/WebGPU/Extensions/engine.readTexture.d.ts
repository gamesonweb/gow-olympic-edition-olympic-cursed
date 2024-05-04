import type { InternalTexture } from "../../../Materials/Textures/internalTexture";
import type { Nullable } from "../../../types";
declare module "../../webgpuEngine" {
    interface WebGPUEngine {
        /** @internal */
        _readTexturePixels(texture: InternalTexture, width: number, height: number, faceIndex?: number, level?: number, buffer?: Nullable<ArrayBufferView>, flushRenderer?: boolean, noDataConversion?: boolean, x?: number, y?: number): Promise<ArrayBufferView>;
        /** @internal */
        _readTexturePixelsSync(texture: InternalTexture, width: number, height: number, faceIndex?: number, level?: number, buffer?: Nullable<ArrayBufferView>, flushRenderer?: boolean, noDataConversion?: boolean, x?: number, y?: number): ArrayBufferView;
    }
}
