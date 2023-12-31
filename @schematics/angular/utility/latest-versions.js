"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.latestVersions = void 0;
exports.latestVersions = {
    // We could have used TypeScripts' `resolveJsonModule` to make the `latestVersion` object typesafe,
    // but ts_library doesn't support JSON inputs.
    ...require('./latest-versions/package.json')['dependencies'],
    // As Angular CLI works with same minor versions of Angular Framework, a tilde match for the current
    Angular: '^16.1.0',
    // Since @angular-devkit/build-angular and @schematics/angular are always
    // published together from the same monorepo, and they are both
    // non-experimental, they will always have the same version.
    DevkitBuildAngular: '^' + require('../package.json')['version'],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF0ZXN0LXZlcnNpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL3V0aWxpdHkvbGF0ZXN0LXZlcnNpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7OztBQUVVLFFBQUEsY0FBYyxHQUd2QjtJQUNGLG1HQUFtRztJQUNuRyw4Q0FBOEM7SUFDOUMsR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxjQUFjLENBQUM7SUFFNUQsb0dBQW9HO0lBQ3BHLE9BQU8sRUFBRSxTQUFTO0lBRWxCLHlFQUF5RTtJQUN6RSwrREFBK0Q7SUFDL0QsNERBQTREO0lBQzVELGtCQUFrQixFQUFFLEdBQUcsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLENBQUM7Q0FDaEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5leHBvcnQgY29uc3QgbGF0ZXN0VmVyc2lvbnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gJiB7XG4gIEFuZ3VsYXI6IHN0cmluZztcbiAgRGV2a2l0QnVpbGRBbmd1bGFyOiBzdHJpbmc7XG59ID0ge1xuICAvLyBXZSBjb3VsZCBoYXZlIHVzZWQgVHlwZVNjcmlwdHMnIGByZXNvbHZlSnNvbk1vZHVsZWAgdG8gbWFrZSB0aGUgYGxhdGVzdFZlcnNpb25gIG9iamVjdCB0eXBlc2FmZSxcbiAgLy8gYnV0IHRzX2xpYnJhcnkgZG9lc24ndCBzdXBwb3J0IEpTT04gaW5wdXRzLlxuICAuLi5yZXF1aXJlKCcuL2xhdGVzdC12ZXJzaW9ucy9wYWNrYWdlLmpzb24nKVsnZGVwZW5kZW5jaWVzJ10sXG5cbiAgLy8gQXMgQW5ndWxhciBDTEkgd29ya3Mgd2l0aCBzYW1lIG1pbm9yIHZlcnNpb25zIG9mIEFuZ3VsYXIgRnJhbWV3b3JrLCBhIHRpbGRlIG1hdGNoIGZvciB0aGUgY3VycmVudFxuICBBbmd1bGFyOiAnXjE2LjEuMCcsXG5cbiAgLy8gU2luY2UgQGFuZ3VsYXItZGV2a2l0L2J1aWxkLWFuZ3VsYXIgYW5kIEBzY2hlbWF0aWNzL2FuZ3VsYXIgYXJlIGFsd2F5c1xuICAvLyBwdWJsaXNoZWQgdG9nZXRoZXIgZnJvbSB0aGUgc2FtZSBtb25vcmVwbywgYW5kIHRoZXkgYXJlIGJvdGhcbiAgLy8gbm9uLWV4cGVyaW1lbnRhbCwgdGhleSB3aWxsIGFsd2F5cyBoYXZlIHRoZSBzYW1lIHZlcnNpb24uXG4gIERldmtpdEJ1aWxkQW5ndWxhcjogJ14nICsgcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJylbJ3ZlcnNpb24nXSxcbn07XG4iXX0=