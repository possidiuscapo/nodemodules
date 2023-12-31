/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TransplantedType, Type } from '@angular/compiler';
import ts from 'typescript';
import { Reference, ReferenceEmitter } from '../../imports';
import { ClassDeclaration, ReflectionHost } from '../../reflection';
import { ImportManager } from '../../translator';
import { TypeCheckableDirectiveMeta, TypeCheckingConfig } from '../api';
import { ReferenceEmitEnvironment } from './tcb_util';
/**
 * A context which hosts one or more Type Check Blocks (TCBs).
 *
 * An `Environment` supports the generation of TCBs by tracking necessary imports, declarations of
 * type constructors, and other statements beyond the type-checking code within the TCB itself.
 * Through method calls on `Environment`, the TCB generator can request `ts.Expression`s which
 * reference declarations in the `Environment` for these artifacts`.
 *
 * `Environment` can be used in a standalone fashion, or can be extended to support more specialized
 * usage.
 */
export declare class Environment implements ReferenceEmitEnvironment {
    readonly config: TypeCheckingConfig;
    protected importManager: ImportManager;
    private refEmitter;
    readonly reflector: ReflectionHost;
    protected contextFile: ts.SourceFile;
    private nextIds;
    private typeCtors;
    protected typeCtorStatements: ts.Statement[];
    private pipeInsts;
    protected pipeInstStatements: ts.Statement[];
    constructor(config: TypeCheckingConfig, importManager: ImportManager, refEmitter: ReferenceEmitter, reflector: ReflectionHost, contextFile: ts.SourceFile);
    /**
     * Get an expression referring to a type constructor for the given directive.
     *
     * Depending on the shape of the directive itself, this could be either a reference to a declared
     * type constructor, or to an inline type constructor.
     */
    typeCtorFor(dir: TypeCheckableDirectiveMeta): ts.Expression;
    pipeInst(ref: Reference<ClassDeclaration<ts.ClassDeclaration>>): ts.Expression;
    /**
     * Generate a `ts.Expression` that references the given node.
     *
     * This may involve importing the node into the file if it's not declared there already.
     */
    reference(ref: Reference<ClassDeclaration<ts.ClassDeclaration>>): ts.Expression;
    canReferenceType(ref: Reference): boolean;
    /**
     * Generate a `ts.TypeNode` that references the given node as a type.
     *
     * This may involve importing the node into the file if it's not declared there already.
     */
    referenceType(ref: Reference): ts.TypeNode;
    private emitTypeParameters;
    /**
     * Generate a `ts.TypeNode` that references a given type from the provided module.
     *
     * This will involve importing the type into the file, and will also add type parameters if
     * provided.
     */
    referenceExternalType(moduleName: string, name: string, typeParams?: Type[]): ts.TypeNode;
    /**
     * Generates a `ts.TypeNode` representing a type that is being referenced from a different place
     * in the program. Any type references inside the transplanted type will be rewritten so that
     * they can be imported in the context fiel.
     */
    referenceTransplantedType(type: TransplantedType<ts.TypeNode>): ts.TypeNode;
    getPreludeStatements(): ts.Statement[];
}
