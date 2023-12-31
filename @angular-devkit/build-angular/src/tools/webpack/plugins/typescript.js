"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIvyPlugin = void 0;
const webpack_1 = require("@ngtools/webpack");
const typescript_1 = require("typescript");
function createIvyPlugin(wco, aot, tsconfig) {
    const { buildOptions, tsConfig } = wco;
    const optimize = buildOptions.optimization.scripts;
    const compilerOptions = {
        sourceMap: buildOptions.sourceMap.scripts,
        declaration: false,
        declarationMap: false,
    };
    if (tsConfig.options.target === undefined || tsConfig.options.target < typescript_1.ScriptTarget.ES2022) {
        compilerOptions.target = typescript_1.ScriptTarget.ES2022;
        // If 'useDefineForClassFields' is already defined in the users project leave the value as is.
        // Otherwise fallback to false due to https://github.com/microsoft/TypeScript/issues/45995
        // which breaks the deprecated `@Effects` NGRX decorator and potentially other existing code as well.
        compilerOptions.useDefineForClassFields ?? (compilerOptions.useDefineForClassFields = false);
        wco.logger.warn('TypeScript compiler options "target" and "useDefineForClassFields" are set to "ES2022" and ' +
            '"false" respectively by the Angular CLI. To control ECMA version and features use the Browerslist configuration. ' +
            'For more information, see https://angular.io/guide/build#configuring-browser-compatibility\n' +
            `NOTE: You can set the "target" to "ES2022" in the project's tsconfig to remove this warning.`);
    }
    if (buildOptions.preserveSymlinks !== undefined) {
        compilerOptions.preserveSymlinks = buildOptions.preserveSymlinks;
    }
    const fileReplacements = {};
    if (buildOptions.fileReplacements) {
        for (const replacement of buildOptions.fileReplacements) {
            fileReplacements[replacement.replace] = replacement.with;
        }
    }
    return new webpack_1.AngularWebpackPlugin({
        tsconfig,
        compilerOptions,
        fileReplacements,
        jitMode: !aot,
        emitNgModuleScope: !optimize,
        inlineStyleFileExtension: buildOptions.inlineStyleLanguage ?? 'css',
    });
}
exports.createIvyPlugin = createIvyPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXNjcmlwdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX2FuZ3VsYXIvc3JjL3Rvb2xzL3dlYnBhY2svcGx1Z2lucy90eXBlc2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7OztBQUdILDhDQUF3RDtBQUN4RCwyQ0FBMEM7QUFHMUMsU0FBZ0IsZUFBZSxDQUM3QixHQUF5QixFQUN6QixHQUFZLEVBQ1osUUFBZ0I7SUFFaEIsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDdkMsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7SUFFbkQsTUFBTSxlQUFlLEdBQW9CO1FBQ3ZDLFNBQVMsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU87UUFDekMsV0FBVyxFQUFFLEtBQUs7UUFDbEIsY0FBYyxFQUFFLEtBQUs7S0FDdEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLHlCQUFZLENBQUMsTUFBTSxFQUFFO1FBQzFGLGVBQWUsQ0FBQyxNQUFNLEdBQUcseUJBQVksQ0FBQyxNQUFNLENBQUM7UUFDN0MsOEZBQThGO1FBQzlGLDBGQUEwRjtRQUMxRixxR0FBcUc7UUFDckcsZUFBZSxDQUFDLHVCQUF1QixLQUF2QyxlQUFlLENBQUMsdUJBQXVCLEdBQUssS0FBSyxFQUFDO1FBRWxELEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNiLDZGQUE2RjtZQUMzRixtSEFBbUg7WUFDbkgsOEZBQThGO1lBQzlGLDhGQUE4RixDQUNqRyxDQUFDO0tBQ0g7SUFFRCxJQUFJLFlBQVksQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLEVBQUU7UUFDL0MsZUFBZSxDQUFDLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztLQUNsRTtJQUVELE1BQU0sZ0JBQWdCLEdBQTJCLEVBQUUsQ0FBQztJQUNwRCxJQUFJLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRTtRQUNqQyxLQUFLLE1BQU0sV0FBVyxJQUFJLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2RCxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztTQUMxRDtLQUNGO0lBRUQsT0FBTyxJQUFJLDhCQUFvQixDQUFDO1FBQzlCLFFBQVE7UUFDUixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLE9BQU8sRUFBRSxDQUFDLEdBQUc7UUFDYixpQkFBaUIsRUFBRSxDQUFDLFFBQVE7UUFDNUIsd0JBQXdCLEVBQUUsWUFBWSxDQUFDLG1CQUFtQixJQUFJLEtBQUs7S0FDcEUsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWhERCwwQ0FnREMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBDb21waWxlck9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGknO1xuaW1wb3J0IHsgQW5ndWxhcldlYnBhY2tQbHVnaW4gfSBmcm9tICdAbmd0b29scy93ZWJwYWNrJztcbmltcG9ydCB7IFNjcmlwdFRhcmdldCB9IGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgV2VicGFja0NvbmZpZ09wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi91dGlscy9idWlsZC1vcHRpb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUl2eVBsdWdpbihcbiAgd2NvOiBXZWJwYWNrQ29uZmlnT3B0aW9ucyxcbiAgYW90OiBib29sZWFuLFxuICB0c2NvbmZpZzogc3RyaW5nLFxuKTogQW5ndWxhcldlYnBhY2tQbHVnaW4ge1xuICBjb25zdCB7IGJ1aWxkT3B0aW9ucywgdHNDb25maWcgfSA9IHdjbztcbiAgY29uc3Qgb3B0aW1pemUgPSBidWlsZE9wdGlvbnMub3B0aW1pemF0aW9uLnNjcmlwdHM7XG5cbiAgY29uc3QgY29tcGlsZXJPcHRpb25zOiBDb21waWxlck9wdGlvbnMgPSB7XG4gICAgc291cmNlTWFwOiBidWlsZE9wdGlvbnMuc291cmNlTWFwLnNjcmlwdHMsXG4gICAgZGVjbGFyYXRpb246IGZhbHNlLFxuICAgIGRlY2xhcmF0aW9uTWFwOiBmYWxzZSxcbiAgfTtcblxuICBpZiAodHNDb25maWcub3B0aW9ucy50YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0c0NvbmZpZy5vcHRpb25zLnRhcmdldCA8IFNjcmlwdFRhcmdldC5FUzIwMjIpIHtcbiAgICBjb21waWxlck9wdGlvbnMudGFyZ2V0ID0gU2NyaXB0VGFyZ2V0LkVTMjAyMjtcbiAgICAvLyBJZiAndXNlRGVmaW5lRm9yQ2xhc3NGaWVsZHMnIGlzIGFscmVhZHkgZGVmaW5lZCBpbiB0aGUgdXNlcnMgcHJvamVjdCBsZWF2ZSB0aGUgdmFsdWUgYXMgaXMuXG4gICAgLy8gT3RoZXJ3aXNlIGZhbGxiYWNrIHRvIGZhbHNlIGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzQ1OTk1XG4gICAgLy8gd2hpY2ggYnJlYWtzIHRoZSBkZXByZWNhdGVkIGBARWZmZWN0c2AgTkdSWCBkZWNvcmF0b3IgYW5kIHBvdGVudGlhbGx5IG90aGVyIGV4aXN0aW5nIGNvZGUgYXMgd2VsbC5cbiAgICBjb21waWxlck9wdGlvbnMudXNlRGVmaW5lRm9yQ2xhc3NGaWVsZHMgPz89IGZhbHNlO1xuXG4gICAgd2NvLmxvZ2dlci53YXJuKFxuICAgICAgJ1R5cGVTY3JpcHQgY29tcGlsZXIgb3B0aW9ucyBcInRhcmdldFwiIGFuZCBcInVzZURlZmluZUZvckNsYXNzRmllbGRzXCIgYXJlIHNldCB0byBcIkVTMjAyMlwiIGFuZCAnICtcbiAgICAgICAgJ1wiZmFsc2VcIiByZXNwZWN0aXZlbHkgYnkgdGhlIEFuZ3VsYXIgQ0xJLiBUbyBjb250cm9sIEVDTUEgdmVyc2lvbiBhbmQgZmVhdHVyZXMgdXNlIHRoZSBCcm93ZXJzbGlzdCBjb25maWd1cmF0aW9uLiAnICtcbiAgICAgICAgJ0ZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2J1aWxkI2NvbmZpZ3VyaW5nLWJyb3dzZXItY29tcGF0aWJpbGl0eVxcbicgK1xuICAgICAgICBgTk9URTogWW91IGNhbiBzZXQgdGhlIFwidGFyZ2V0XCIgdG8gXCJFUzIwMjJcIiBpbiB0aGUgcHJvamVjdCdzIHRzY29uZmlnIHRvIHJlbW92ZSB0aGlzIHdhcm5pbmcuYCxcbiAgICApO1xuICB9XG5cbiAgaWYgKGJ1aWxkT3B0aW9ucy5wcmVzZXJ2ZVN5bWxpbmtzICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb21waWxlck9wdGlvbnMucHJlc2VydmVTeW1saW5rcyA9IGJ1aWxkT3B0aW9ucy5wcmVzZXJ2ZVN5bWxpbmtzO1xuICB9XG5cbiAgY29uc3QgZmlsZVJlcGxhY2VtZW50czogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICBpZiAoYnVpbGRPcHRpb25zLmZpbGVSZXBsYWNlbWVudHMpIHtcbiAgICBmb3IgKGNvbnN0IHJlcGxhY2VtZW50IG9mIGJ1aWxkT3B0aW9ucy5maWxlUmVwbGFjZW1lbnRzKSB7XG4gICAgICBmaWxlUmVwbGFjZW1lbnRzW3JlcGxhY2VtZW50LnJlcGxhY2VdID0gcmVwbGFjZW1lbnQud2l0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IEFuZ3VsYXJXZWJwYWNrUGx1Z2luKHtcbiAgICB0c2NvbmZpZyxcbiAgICBjb21waWxlck9wdGlvbnMsXG4gICAgZmlsZVJlcGxhY2VtZW50cyxcbiAgICBqaXRNb2RlOiAhYW90LFxuICAgIGVtaXROZ01vZHVsZVNjb3BlOiAhb3B0aW1pemUsXG4gICAgaW5saW5lU3R5bGVGaWxlRXh0ZW5zaW9uOiBidWlsZE9wdGlvbnMuaW5saW5lU3R5bGVMYW5ndWFnZSA/PyAnY3NzJyxcbiAgfSk7XG59XG4iXX0=