/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { global } from './global';
export function ngDevModeResetPerfCounters() {
    const locationString = typeof location !== 'undefined' ? location.toString() : '';
    const newCounters = {
        namedConstructors: locationString.indexOf('ngDevMode=namedConstructors') != -1,
        firstCreatePass: 0,
        tNode: 0,
        tView: 0,
        rendererCreateTextNode: 0,
        rendererSetText: 0,
        rendererCreateElement: 0,
        rendererAddEventListener: 0,
        rendererSetAttribute: 0,
        rendererRemoveAttribute: 0,
        rendererSetProperty: 0,
        rendererSetClassName: 0,
        rendererAddClass: 0,
        rendererRemoveClass: 0,
        rendererSetStyle: 0,
        rendererRemoveStyle: 0,
        rendererDestroy: 0,
        rendererDestroyNode: 0,
        rendererMoveNode: 0,
        rendererRemoveNode: 0,
        rendererAppendChild: 0,
        rendererInsertBefore: 0,
        rendererCreateComment: 0,
        hydratedNodes: 0,
        hydratedComponents: 0,
        dehydratedViewsRemoved: 0,
        dehydratedViewsCleanupRuns: 0,
        componentsSkippedHydration: 0,
    };
    // Make sure to refer to ngDevMode as ['ngDevMode'] for closure.
    const allowNgDevModeTrue = locationString.indexOf('ngDevMode=false') === -1;
    global['ngDevMode'] = allowNgDevModeTrue && newCounters;
    return newCounters;
}
/**
 * This function checks to see if the `ngDevMode` has been set. If yes,
 * then we honor it, otherwise we default to dev mode with additional checks.
 *
 * The idea is that unless we are doing production build where we explicitly
 * set `ngDevMode == false` we should be helping the developer by providing
 * as much early warning and errors as possible.
 *
 * `ɵɵdefineComponent` is guaranteed to have been called before any component template functions
 * (and thus Ivy instructions), so a single initialization there is sufficient to ensure ngDevMode
 * is defined for the entire instruction set.
 *
 * When checking `ngDevMode` on toplevel, always init it before referencing it
 * (e.g. `((typeof ngDevMode === 'undefined' || ngDevMode) && initNgDevMode())`), otherwise you can
 *  get a `ReferenceError` like in https://github.com/angular/angular/issues/31595.
 *
 * Details on possible values for `ngDevMode` can be found on its docstring.
 *
 * NOTE:
 * - changes to the `ngDevMode` name must be synced with `compiler-cli/src/tooling.ts`.
 */
export function initNgDevMode() {
    // The below checks are to ensure that calling `initNgDevMode` multiple times does not
    // reset the counters.
    // If the `ngDevMode` is not an object, then it means we have not created the perf counters
    // yet.
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        if (typeof ngDevMode !== 'object') {
            ngDevModeResetPerfCounters();
        }
        return typeof ngDevMode !== 'undefined' && !!ngDevMode;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfZGV2X21vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy91dGlsL25nX2Rldl9tb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFtRGhDLE1BQU0sVUFBVSwwQkFBMEI7SUFDeEMsTUFBTSxjQUFjLEdBQUcsT0FBTyxRQUFRLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNsRixNQUFNLFdBQVcsR0FBMEI7UUFDekMsaUJBQWlCLEVBQUUsY0FBYyxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5RSxlQUFlLEVBQUUsQ0FBQztRQUNsQixLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssRUFBRSxDQUFDO1FBQ1Isc0JBQXNCLEVBQUUsQ0FBQztRQUN6QixlQUFlLEVBQUUsQ0FBQztRQUNsQixxQkFBcUIsRUFBRSxDQUFDO1FBQ3hCLHdCQUF3QixFQUFFLENBQUM7UUFDM0Isb0JBQW9CLEVBQUUsQ0FBQztRQUN2Qix1QkFBdUIsRUFBRSxDQUFDO1FBQzFCLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsb0JBQW9CLEVBQUUsQ0FBQztRQUN2QixnQkFBZ0IsRUFBRSxDQUFDO1FBQ25CLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQixtQkFBbUIsRUFBRSxDQUFDO1FBQ3RCLGVBQWUsRUFBRSxDQUFDO1FBQ2xCLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQixrQkFBa0IsRUFBRSxDQUFDO1FBQ3JCLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsb0JBQW9CLEVBQUUsQ0FBQztRQUN2QixxQkFBcUIsRUFBRSxDQUFDO1FBQ3hCLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLGtCQUFrQixFQUFFLENBQUM7UUFDckIsc0JBQXNCLEVBQUUsQ0FBQztRQUN6QiwwQkFBMEIsRUFBRSxDQUFDO1FBQzdCLDBCQUEwQixFQUFFLENBQUM7S0FDOUIsQ0FBQztJQUVGLGdFQUFnRTtJQUNoRSxNQUFNLGtCQUFrQixHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM1RSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsa0JBQWtCLElBQUksV0FBVyxDQUFDO0lBQ3hELE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLFVBQVUsYUFBYTtJQUMzQixzRkFBc0Y7SUFDdEYsc0JBQXNCO0lBQ3RCLDJGQUEyRjtJQUMzRixPQUFPO0lBQ1AsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxFQUFFO1FBQ2pELElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQ2pDLDBCQUEwQixFQUFFLENBQUM7U0FDOUI7UUFDRCxPQUFPLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO0tBQ3hEO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Z2xvYmFsfSBmcm9tICcuL2dsb2JhbCc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLyoqXG4gICAqIFZhbHVlcyBvZiBuZ0Rldk1vZGVcbiAgICogRGVwZW5kaW5nIG9uIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBhcHBsaWNhdGlvbiwgbmdEZXZNb2RlIG1heSBoYXZlIG9uZSBvZiBzZXZlcmFsIHZhbHVlcy5cbiAgICpcbiAgICogRm9yIGNvbnZlbmllbmNlLCB0aGUg4oCcdHJ1dGh54oCdIHZhbHVlIHdoaWNoIGVuYWJsZXMgZGV2IG1vZGUgaXMgYWxzbyBhbiBvYmplY3Qgd2hpY2ggY29udGFpbnNcbiAgICogQW5ndWxhcuKAmXMgcGVyZm9ybWFuY2UgY291bnRlcnMuIFRoaXMgaXMgbm90IG5lY2Vzc2FyeSwgYnV0IGN1dHMgZG93biBvbiBib2lsZXJwbGF0ZSBmb3IgdGhlXG4gICAqIHBlcmYgY291bnRlcnMuXG4gICAqXG4gICAqIG5nRGV2TW9kZSBtYXkgYWxzbyBiZSBzZXQgdG8gZmFsc2UuIFRoaXMgY2FuIGhhcHBlbiBpbiBvbmUgb2YgYSBmZXcgd2F5czpcbiAgICogLSBUaGUgdXNlciBleHBsaWNpdGx5IHNldHMgYHdpbmRvdy5uZ0Rldk1vZGUgPSBmYWxzZWAgc29tZXdoZXJlIGluIHRoZWlyIGFwcC5cbiAgICogLSBUaGUgdXNlciBjYWxscyBgZW5hYmxlUHJvZE1vZGUoKWAuXG4gICAqIC0gVGhlIFVSTCBjb250YWlucyBhIGBuZ0Rldk1vZGU9ZmFsc2VgIHRleHQuXG4gICAqIEZpbmFsbHksIG5nRGV2TW9kZSBtYXkgbm90IGhhdmUgYmVlbiBkZWZpbmVkIGF0IGFsbC5cbiAgICovXG4gIGNvbnN0IG5nRGV2TW9kZTogbnVsbHxOZ0Rldk1vZGVQZXJmQ291bnRlcnM7XG5cbiAgaW50ZXJmYWNlIE5nRGV2TW9kZVBlcmZDb3VudGVycyB7XG4gICAgbmFtZWRDb25zdHJ1Y3RvcnM6IGJvb2xlYW47XG4gICAgZmlyc3RDcmVhdGVQYXNzOiBudW1iZXI7XG4gICAgdE5vZGU6IG51bWJlcjtcbiAgICB0VmlldzogbnVtYmVyO1xuICAgIHJlbmRlcmVyQ3JlYXRlVGV4dE5vZGU6IG51bWJlcjtcbiAgICByZW5kZXJlclNldFRleHQ6IG51bWJlcjtcbiAgICByZW5kZXJlckNyZWF0ZUVsZW1lbnQ6IG51bWJlcjtcbiAgICByZW5kZXJlckFkZEV2ZW50TGlzdGVuZXI6IG51bWJlcjtcbiAgICByZW5kZXJlclNldEF0dHJpYnV0ZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyUmVtb3ZlQXR0cmlidXRlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJTZXRQcm9wZXJ0eTogbnVtYmVyO1xuICAgIHJlbmRlcmVyU2V0Q2xhc3NOYW1lOiBudW1iZXI7XG4gICAgcmVuZGVyZXJBZGRDbGFzczogbnVtYmVyO1xuICAgIHJlbmRlcmVyUmVtb3ZlQ2xhc3M6IG51bWJlcjtcbiAgICByZW5kZXJlclNldFN0eWxlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJSZW1vdmVTdHlsZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyRGVzdHJveTogbnVtYmVyO1xuICAgIHJlbmRlcmVyRGVzdHJveU5vZGU6IG51bWJlcjtcbiAgICByZW5kZXJlck1vdmVOb2RlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJSZW1vdmVOb2RlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJBcHBlbmRDaGlsZDogbnVtYmVyO1xuICAgIHJlbmRlcmVySW5zZXJ0QmVmb3JlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJDcmVhdGVDb21tZW50OiBudW1iZXI7XG4gICAgaHlkcmF0ZWROb2RlczogbnVtYmVyO1xuICAgIGh5ZHJhdGVkQ29tcG9uZW50czogbnVtYmVyO1xuICAgIGRlaHlkcmF0ZWRWaWV3c1JlbW92ZWQ6IG51bWJlcjtcbiAgICBkZWh5ZHJhdGVkVmlld3NDbGVhbnVwUnVuczogbnVtYmVyO1xuICAgIGNvbXBvbmVudHNTa2lwcGVkSHlkcmF0aW9uOiBudW1iZXI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5nRGV2TW9kZVJlc2V0UGVyZkNvdW50ZXJzKCk6IE5nRGV2TW9kZVBlcmZDb3VudGVycyB7XG4gIGNvbnN0IGxvY2F0aW9uU3RyaW5nID0gdHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJyA/IGxvY2F0aW9uLnRvU3RyaW5nKCkgOiAnJztcbiAgY29uc3QgbmV3Q291bnRlcnM6IE5nRGV2TW9kZVBlcmZDb3VudGVycyA9IHtcbiAgICBuYW1lZENvbnN0cnVjdG9yczogbG9jYXRpb25TdHJpbmcuaW5kZXhPZignbmdEZXZNb2RlPW5hbWVkQ29uc3RydWN0b3JzJykgIT0gLTEsXG4gICAgZmlyc3RDcmVhdGVQYXNzOiAwLFxuICAgIHROb2RlOiAwLFxuICAgIHRWaWV3OiAwLFxuICAgIHJlbmRlcmVyQ3JlYXRlVGV4dE5vZGU6IDAsXG4gICAgcmVuZGVyZXJTZXRUZXh0OiAwLFxuICAgIHJlbmRlcmVyQ3JlYXRlRWxlbWVudDogMCxcbiAgICByZW5kZXJlckFkZEV2ZW50TGlzdGVuZXI6IDAsXG4gICAgcmVuZGVyZXJTZXRBdHRyaWJ1dGU6IDAsXG4gICAgcmVuZGVyZXJSZW1vdmVBdHRyaWJ1dGU6IDAsXG4gICAgcmVuZGVyZXJTZXRQcm9wZXJ0eTogMCxcbiAgICByZW5kZXJlclNldENsYXNzTmFtZTogMCxcbiAgICByZW5kZXJlckFkZENsYXNzOiAwLFxuICAgIHJlbmRlcmVyUmVtb3ZlQ2xhc3M6IDAsXG4gICAgcmVuZGVyZXJTZXRTdHlsZTogMCxcbiAgICByZW5kZXJlclJlbW92ZVN0eWxlOiAwLFxuICAgIHJlbmRlcmVyRGVzdHJveTogMCxcbiAgICByZW5kZXJlckRlc3Ryb3lOb2RlOiAwLFxuICAgIHJlbmRlcmVyTW92ZU5vZGU6IDAsXG4gICAgcmVuZGVyZXJSZW1vdmVOb2RlOiAwLFxuICAgIHJlbmRlcmVyQXBwZW5kQ2hpbGQ6IDAsXG4gICAgcmVuZGVyZXJJbnNlcnRCZWZvcmU6IDAsXG4gICAgcmVuZGVyZXJDcmVhdGVDb21tZW50OiAwLFxuICAgIGh5ZHJhdGVkTm9kZXM6IDAsXG4gICAgaHlkcmF0ZWRDb21wb25lbnRzOiAwLFxuICAgIGRlaHlkcmF0ZWRWaWV3c1JlbW92ZWQ6IDAsXG4gICAgZGVoeWRyYXRlZFZpZXdzQ2xlYW51cFJ1bnM6IDAsXG4gICAgY29tcG9uZW50c1NraXBwZWRIeWRyYXRpb246IDAsXG4gIH07XG5cbiAgLy8gTWFrZSBzdXJlIHRvIHJlZmVyIHRvIG5nRGV2TW9kZSBhcyBbJ25nRGV2TW9kZSddIGZvciBjbG9zdXJlLlxuICBjb25zdCBhbGxvd05nRGV2TW9kZVRydWUgPSBsb2NhdGlvblN0cmluZy5pbmRleE9mKCduZ0Rldk1vZGU9ZmFsc2UnKSA9PT0gLTE7XG4gIGdsb2JhbFsnbmdEZXZNb2RlJ10gPSBhbGxvd05nRGV2TW9kZVRydWUgJiYgbmV3Q291bnRlcnM7XG4gIHJldHVybiBuZXdDb3VudGVycztcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyB0byBzZWUgaWYgdGhlIGBuZ0Rldk1vZGVgIGhhcyBiZWVuIHNldC4gSWYgeWVzLFxuICogdGhlbiB3ZSBob25vciBpdCwgb3RoZXJ3aXNlIHdlIGRlZmF1bHQgdG8gZGV2IG1vZGUgd2l0aCBhZGRpdGlvbmFsIGNoZWNrcy5cbiAqXG4gKiBUaGUgaWRlYSBpcyB0aGF0IHVubGVzcyB3ZSBhcmUgZG9pbmcgcHJvZHVjdGlvbiBidWlsZCB3aGVyZSB3ZSBleHBsaWNpdGx5XG4gKiBzZXQgYG5nRGV2TW9kZSA9PSBmYWxzZWAgd2Ugc2hvdWxkIGJlIGhlbHBpbmcgdGhlIGRldmVsb3BlciBieSBwcm92aWRpbmdcbiAqIGFzIG11Y2ggZWFybHkgd2FybmluZyBhbmQgZXJyb3JzIGFzIHBvc3NpYmxlLlxuICpcbiAqIGDJtcm1ZGVmaW5lQ29tcG9uZW50YCBpcyBndWFyYW50ZWVkIHRvIGhhdmUgYmVlbiBjYWxsZWQgYmVmb3JlIGFueSBjb21wb25lbnQgdGVtcGxhdGUgZnVuY3Rpb25zXG4gKiAoYW5kIHRodXMgSXZ5IGluc3RydWN0aW9ucyksIHNvIGEgc2luZ2xlIGluaXRpYWxpemF0aW9uIHRoZXJlIGlzIHN1ZmZpY2llbnQgdG8gZW5zdXJlIG5nRGV2TW9kZVxuICogaXMgZGVmaW5lZCBmb3IgdGhlIGVudGlyZSBpbnN0cnVjdGlvbiBzZXQuXG4gKlxuICogV2hlbiBjaGVja2luZyBgbmdEZXZNb2RlYCBvbiB0b3BsZXZlbCwgYWx3YXlzIGluaXQgaXQgYmVmb3JlIHJlZmVyZW5jaW5nIGl0XG4gKiAoZS5nLiBgKCh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpICYmIGluaXROZ0Rldk1vZGUoKSlgKSwgb3RoZXJ3aXNlIHlvdSBjYW5cbiAqICBnZXQgYSBgUmVmZXJlbmNlRXJyb3JgIGxpa2UgaW4gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMzE1OTUuXG4gKlxuICogRGV0YWlscyBvbiBwb3NzaWJsZSB2YWx1ZXMgZm9yIGBuZ0Rldk1vZGVgIGNhbiBiZSBmb3VuZCBvbiBpdHMgZG9jc3RyaW5nLlxuICpcbiAqIE5PVEU6XG4gKiAtIGNoYW5nZXMgdG8gdGhlIGBuZ0Rldk1vZGVgIG5hbWUgbXVzdCBiZSBzeW5jZWQgd2l0aCBgY29tcGlsZXItY2xpL3NyYy90b29saW5nLnRzYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXROZ0Rldk1vZGUoKTogYm9vbGVhbiB7XG4gIC8vIFRoZSBiZWxvdyBjaGVja3MgYXJlIHRvIGVuc3VyZSB0aGF0IGNhbGxpbmcgYGluaXROZ0Rldk1vZGVgIG11bHRpcGxlIHRpbWVzIGRvZXMgbm90XG4gIC8vIHJlc2V0IHRoZSBjb3VudGVycy5cbiAgLy8gSWYgdGhlIGBuZ0Rldk1vZGVgIGlzIG5vdCBhbiBvYmplY3QsIHRoZW4gaXQgbWVhbnMgd2UgaGF2ZSBub3QgY3JlYXRlZCB0aGUgcGVyZiBjb3VudGVyc1xuICAvLyB5ZXQuXG4gIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIG5nRGV2TW9kZVJlc2V0UGVyZkNvdW50ZXJzKCk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgbmdEZXZNb2RlICE9PSAndW5kZWZpbmVkJyAmJiAhIW5nRGV2TW9kZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=