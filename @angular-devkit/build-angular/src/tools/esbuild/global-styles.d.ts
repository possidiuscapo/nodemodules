/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import type { BuildOptions } from 'esbuild';
import { NormalizedBrowserOptions } from '../../builders/browser-esbuild/options';
import { LoadResultCache } from './load-result-cache';
export declare function createGlobalStylesBundleOptions(options: NormalizedBrowserOptions, target: string[], browsers: string[], initial: boolean, cache?: LoadResultCache): BuildOptions | undefined;
