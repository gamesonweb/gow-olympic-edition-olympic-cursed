import { NodeMaterialBlockConnectionPointTypes } from "./Enums/nodeMaterialBlockConnectionPointTypes";
import { NodeMaterialBlockTargets } from "./Enums/nodeMaterialBlockTargets";
import type { NodeMaterialBuildStateSharedData } from "./nodeMaterialBuildStateSharedData";
import { ShaderLanguage } from "../shaderLanguage";
import { type NodeMaterialConnectionPoint } from "./nodeMaterialBlockConnectionPoint";
/**
 * Class used to store node based material build state
 */
export declare class NodeMaterialBuildState {
    /** Gets or sets a boolean indicating if the current state can emit uniform buffers */
    supportUniformBuffers: boolean;
    /**
     * Gets the list of emitted attributes
     */
    attributes: string[];
    /**
     * Gets the list of emitted uniforms
     */
    uniforms: string[];
    /**
     * Gets the list of emitted constants
     */
    constants: string[];
    /**
     * Gets the list of emitted samplers
     */
    samplers: string[];
    /**
     * Gets the list of emitted functions
     */
    functions: {
        [key: string]: string;
    };
    /**
     * Gets the list of emitted extensions
     */
    extensions: {
        [key: string]: string;
    };
    /**
     * Gets the list of emitted prePass outputs - if using the prepass
     */
    prePassOutput: {
        [key: string]: string;
    };
    /**
     * Gets the target of the compilation state
     */
    target: NodeMaterialBlockTargets;
    /**
     * Gets the list of emitted counters
     */
    counters: {
        [key: string]: number;
    };
    /**
     * Shared data between multiple NodeMaterialBuildState instances
     */
    sharedData: NodeMaterialBuildStateSharedData;
    /** @internal */
    _vertexState: NodeMaterialBuildState;
    /** @internal */
    _attributeDeclaration: string;
    /** @internal */
    _uniformDeclaration: string;
    /** @internal */
    _constantDeclaration: string;
    /** @internal */
    _samplerDeclaration: string;
    /** @internal */
    _varyingTransfer: string;
    /** @internal */
    _injectAtEnd: string;
    private _repeatableContentAnchorIndex;
    /** @internal */
    _builtCompilationString: string;
    /**
     * Gets the emitted compilation strings
     */
    compilationString: string;
    /**
     * Gets the current shader language to use
     */
    get shaderLanguage(): ShaderLanguage;
    /**
     * Finalize the compilation strings
     * @param state defines the current compilation state
     */
    finalize(state: NodeMaterialBuildState): void;
    /** @internal */
    get _repeatableContentAnchor(): string;
    /**
     * @internal
     */
    _getFreeVariableName(prefix: string): string;
    /**
     * @internal
     */
    _getFreeDefineName(prefix: string): string;
    /**
     * @internal
     */
    _excludeVariableName(name: string): void;
    /**
     * @internal
     */
    _emit2DSampler(name: string, textureName?: string): void;
    /**
     * @internal
     */
    _emit2DArraySampler(name: string): void;
    /**
     * @internal
     */
    _getGLType(type: NodeMaterialBlockConnectionPointTypes): string;
    /**
     * @internal
     */
    _getShaderType(type: NodeMaterialBlockConnectionPointTypes): "" | "f32" | "float" | "i32" | "int" | "vec2<f32>" | "vec2" | "vec3<f32>" | "vec3" | "vec4<f32>" | "vec4" | "mat4x4<f32>" | "mat4";
    /**
     * @internal
     */
    _emitExtension(name: string, extension: string, define?: string): void;
    /**
     * @internal
     */
    _emitFunction(name: string, code: string, comments: string): void;
    /**
     * @internal
     */
    _emitCodeFromInclude(includeName: string, comments: string, options?: {
        replaceStrings?: {
            search: RegExp;
            replace: string;
        }[];
        repeatKey?: string;
        substitutionVars?: string;
    }): string;
    /**
     * @internal
     */
    _emitFunctionFromInclude(includeName: string, comments: string, options?: {
        repeatKey?: string;
        substitutionVars?: string;
        removeAttributes?: boolean;
        removeUniforms?: boolean;
        removeVaryings?: boolean;
        removeIfDef?: boolean;
        replaceStrings?: {
            search: RegExp;
            replace: string;
        }[];
    }, storeKey?: string): void;
    /**
     * @internal
     */
    _registerTempVariable(name: string): boolean;
    /**
     * @internal
     */
    _emitVaryingFromString(name: string, type: NodeMaterialBlockConnectionPointTypes, define?: string, notDefine?: boolean): boolean;
    /**
     * @internal
     */
    _getVaryingName(name: string): string;
    /**
     * @internal
     */
    _emitUniformFromString(name: string, type: NodeMaterialBlockConnectionPointTypes, define?: string, notDefine?: boolean): void;
    /**
     * @internal
     */
    _generateTertiary(trueStatement: string, falseStatement: string, condition: string): string;
    /**
     * @internal
     */
    _emitFloat(value: number): string;
    /**
     * @internal
     */
    _declareOutput(output: NodeMaterialConnectionPoint): string;
    /**
     * @internal
     */
    _declareLocalVar(name: string, type: NodeMaterialBlockConnectionPointTypes): string;
    private _convertVariableDeclarationToWGSL;
    private _convertVariableConstructorsToWGSL;
    private _convertOutParametersToWGSL;
    private _convertFunctionsToWGSL;
    _babylonSLtoWGSL(code: string): string;
    _babylonSLtoGLSL(code: string): string;
}
