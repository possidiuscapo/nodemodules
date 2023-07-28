/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_BOOTSTRAP_LISTENER, ApplicationRef, inject, InjectionToken, makeStateKey, TransferState, ɵENABLED_SSR_FEATURES as ENABLED_SSR_FEATURES } from '@angular/core';
import { of } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { HttpHeaders } from './headers';
import { HTTP_ROOT_INTERCEPTOR_FNS } from './interceptor';
import { HttpResponse } from './response';
const CACHE_STATE = new InjectionToken(ngDevMode ? 'HTTP_TRANSFER_STATE_CACHE_STATE' : '');
/**
 * A list of allowed HTTP methods to cache.
 */
const ALLOWED_METHODS = ['GET', 'HEAD'];
export function transferCacheInterceptorFn(req, next) {
    const { isCacheActive } = inject(CACHE_STATE);
    // Stop using the cache if the application has stabilized, indicating initial rendering
    // is complete.
    if (!isCacheActive || !ALLOWED_METHODS.includes(req.method)) {
        // Cache is no longer active or method is not HEAD or GET.
        // Pass the request through.
        return next(req);
    }
    const transferState = inject(TransferState);
    const storeKey = makeCacheKey(req);
    const response = transferState.get(storeKey, null);
    if (response) {
        // Request found in cache. Respond using it.
        let body = response.body;
        switch (response.responseType) {
            case 'arraybuffer':
                body = new TextEncoder().encode(response.body).buffer;
                break;
            case 'blob':
                body = new Blob([response.body]);
                break;
        }
        return of(new HttpResponse({
            body,
            headers: new HttpHeaders(response.headers),
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        }));
    }
    // Request not found in cache. Make the request and cache it.
    return next(req).pipe(tap((event) => {
        if (event instanceof HttpResponse) {
            transferState.set(storeKey, {
                body: event.body,
                headers: getHeadersMap(event.headers),
                status: event.status,
                statusText: event.statusText,
                url: event.url || '',
                responseType: req.responseType,
            });
        }
    }));
}
function getHeadersMap(headers) {
    const headersMap = {};
    for (const key of headers.keys()) {
        const values = headers.getAll(key);
        if (values !== null) {
            headersMap[key] = values;
        }
    }
    return headersMap;
}
function makeCacheKey(request) {
    // make the params encoded same as a url so it's easy to identify
    const { params, method, responseType, url } = request;
    const encodedParams = params.keys().sort().map((k) => `${k}=${params.getAll(k)}`).join('&');
    const key = method + '.' + responseType + '.' + url + '?' + encodedParams;
    const hash = generateHash(key);
    return makeStateKey(hash);
}
/**
 * A method that returns a hash representation of a string using a variant of DJB2 hash
 * algorithm.
 *
 * This is the same hashing logic that is used to generate component ids.
 */
function generateHash(value) {
    let hash = 0;
    for (const char of value) {
        hash = Math.imul(31, hash) + char.charCodeAt(0) << 0;
    }
    // Force positive number hash.
    // 2147483647 = equivalent of Integer.MAX_VALUE.
    hash += 2147483647 + 1;
    return hash.toString();
}
/**
 * Returns the DI providers needed to enable HTTP transfer cache.
 *
 * By default, when using server rendering, requests are performed twice: once on the server and
 * other one on the browser.
 *
 * When these providers are added, requests performed on the server are cached and reused during the
 * bootstrapping of the application in the browser thus avoiding duplicate requests and reducing
 * load time.
 *
 */
export function withHttpTransferCache() {
    return [
        {
            provide: CACHE_STATE,
            useFactory: () => {
                inject(ENABLED_SSR_FEATURES).add('httpcache');
                return { isCacheActive: true };
            }
        },
        {
            provide: HTTP_ROOT_INTERCEPTOR_FNS,
            useValue: transferCacheInterceptorFn,
            multi: true,
            deps: [TransferState, CACHE_STATE]
        },
        {
            provide: APP_BOOTSTRAP_LISTENER,
            multi: true,
            useFactory: () => {
                const appRef = inject(ApplicationRef);
                const cacheState = inject(CACHE_STATE);
                return () => {
                    appRef.isStable.pipe(first((isStable) => isStable)).toPromise().then(() => {
                        cacheState.isCacheActive = false;
                    });
                };
            }
        }
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vaHR0cC9zcmMvdHJhbnNmZXJfY2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHNCQUFzQixFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBc0IsYUFBYSxFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdMLE9BQU8sRUFBYSxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBQyx5QkFBeUIsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFZLFlBQVksRUFBQyxNQUFNLFlBQVksQ0FBQztBQVduRCxNQUFNLFdBQVcsR0FBRyxJQUFJLGNBQWMsQ0FDbEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFeEQ7O0dBRUc7QUFDSCxNQUFNLGVBQWUsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUV4QyxNQUFNLFVBQVUsMEJBQTBCLENBQ3RDLEdBQXlCLEVBQUUsSUFBbUI7SUFDaEQsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUU1Qyx1RkFBdUY7SUFDdkYsZUFBZTtJQUNmLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUMzRCwwREFBMEQ7UUFDMUQsNEJBQTRCO1FBQzVCLE9B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LEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUV2QyxPQUFPLEdBQUcsRUFBRTtvQkFDVixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDeEUsVUFBVSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7b0JBQ25DLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQztZQUNKLENBQUM7U0FDRjtLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QVBQX0JPT1RTVFJBUF9MSVNURU5FUiwgQXBwbGljYXRpb25SZWYsIGluamVjdCwgSW5qZWN0aW9uVG9rZW4sIG1ha2VTdGF0ZUtleSwgUHJvdmlkZXIsIFN0YXRlS2V5LCBUcmFuc2ZlclN0YXRlLCDJtUVOQUJMRURfU1NSX0ZFQVRVUkVTIGFzIEVOQUJMRURfU1NSX0ZFQVRVUkVTfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaXJzdCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7SHR0cEhlYWRlcnN9IGZyb20gJy4vaGVhZGVycyc7XG5pbXBvcnQge0hUVFBfUk9PVF9JTlRFUkNFUFRPUl9GTlMsIEh0dHBIYW5kbGVyRm59IGZyb20gJy4vaW50ZXJjZXB0b3InO1xuaW1wb3J0IHtIdHRwUmVxdWVzdH0gZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7SHR0cEV2ZW50LCBIdHRwUmVzcG9uc2V9IGZyb20gJy4vcmVzcG9uc2UnO1xuXG5pbnRlcmZhY2UgVHJhbnNmZXJIdHRwUmVzcG9uc2Uge1xuICBib2R5OiBhbnk7XG4gIGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPjtcbiAgc3RhdHVzPzogbnVtYmVyO1xuICBzdGF0dXNUZXh0Pzogc3RyaW5nO1xuICB1cmw/OiBzdHJpbmc7XG4gIHJlc3BvbnNlVHlwZT86IEh0dHBSZXF1ZXN0PHVua25vd24+WydyZXNwb25zZVR5cGUnXTtcbn1cblxuY29uc3QgQ0FDSEVfU1RBVEUgPSBuZXcgSW5qZWN0aW9uVG9rZW48e2lzQ2FjaGVBY3RpdmU6IGJvb2xlYW59PihcbiAgICBuZ0Rldk1vZGUgPyAnSFRUUF9UUkFOU0ZFUl9TVEFURV9DQUNIRV9TVEFURScgOiAnJyk7XG5cbi8qKlxuICogQSBsaXN0IG9mIGFsbG93ZWQgSFRUUCBtZXRob2RzIHRvIGNhY2hlLlxuICovXG5jb25zdCBBTExPV0VEX01FVEhPRFMgPSBbJ0dFVCcsICdIRUFEJ107XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2ZlckNhY2hlSW50ZXJjZXB0b3JGbihcbiAgICByZXE6IEh0dHBSZXF1ZXN0PHVua25vd24+LCBuZXh0OiBIdHRwSGFuZGxlckZuKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8dW5rbm93bj4+IHtcbiAgY29uc3Qge2lzQ2FjaGVBY3RpdmV9ID0gaW5qZWN0KENBQ0hFX1NUQVRFKTtcblxuICAvLyBTdG9wIHVzaW5nIHRoZSBjYWNoZSBpZiB0aGUgYXBwbGljYXRpb24gaGFzIHN0YWJpbGl6ZWQsIGluZGljYXRpbmcgaW5pdGlhbCByZW5kZXJpbmdcbiAgLy8gaXMgY29tcGxldGUuXG4gIGlmICghaXNDYWNoZUFjdGl2ZSB8fCAhQUxMT1dFRF9NRVRIT0RTLmluY2x1ZGVzKHJlcS5tZXRob2QpKSB7XG4gICAgLy8gQ2FjaGUgaXMgbm8gbG9uZ2VyIGFjdGl2ZSBvciBtZXRob2QgaXMgbm90IEhFQUQgb3IgR0VULlxuICAgIC8vIFBhc3MgdGhlIHJlcXVlc3QgdGhyb3VnaC5cbiAgICByZXR1cm4gbmV4dChyZXEpO1xuICB9XG5cbiAgY29uc3QgdHJhbnNmZXJTdGF0ZSA9IGluamVjdChUcmFuc2ZlclN0YXRlKTtcbiAgY29uc3Qgc3RvcmVLZXkgPSBtYWtlQ2FjaGVLZXkocmVxKTtcbiAgY29uc3QgcmVzcG9uc2UgPSB0cmFuc2ZlclN0YXRlLmdldChzdG9yZUtleSwgbnVsbCk7XG5cbiAgaWYgKHJlc3BvbnNlKSB7XG4gICAgLy8gUmVxdWVzdCBmb3VuZCBpbiBjYWNoZS4gUmVzcG9uZCB1c2luZyBpdC5cbiAgICBsZXQgYm9keTogQXJyYXlCdWZmZXJ8QmxvYnxzdHJpbmd8dW5kZWZpbmVkID0gcmVzcG9uc2UuYm9keTtcblxuICAgIHN3aXRjaCAocmVzcG9uc2UucmVzcG9uc2VUeXBlKSB7XG4gICAgICBjYXNlICdhcnJheWJ1ZmZlcic6XG4gICAgICAgIGJvZHkgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUocmVzcG9uc2UuYm9keSkuYnVmZmVyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Jsb2InOlxuICAgICAgICBib2R5ID0gbmV3IEJsb2IoW3Jlc3BvbnNlLmJvZHldKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mKFxuICAgICAgICBuZXcgSHR0cFJlc3BvbnNlKHtcbiAgICAgICAgICBib2R5LFxuICAgICAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyhyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgICAgIHVybDogcmVzcG9uc2UudXJsLFxuICAgICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgLy8gUmVxdWVzdCBub3QgZm91bmQgaW4gY2FjaGUuIE1ha2UgdGhlIHJlcXVlc3QgYW5kIGNhY2hlIGl0LlxuICByZXR1cm4gbmV4dChyZXEpLnBpcGUoXG4gICAgICB0YXAoKGV2ZW50OiBIdHRwRXZlbnQ8dW5rbm93bj4pID0+IHtcbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgdHJhbnNmZXJTdGF0ZS5zZXQ8VHJhbnNmZXJIdHRwUmVzcG9uc2U+KHN0b3JlS2V5LCB7XG4gICAgICAgICAgICBib2R5OiBldmVudC5ib2R5LFxuICAgICAgICAgICAgaGVhZGVyczogZ2V0SGVhZGVyc01hcChldmVudC5oZWFkZXJzKSxcbiAgICAgICAgICAgIHN0YXR1czogZXZlbnQuc3RhdHVzLFxuICAgICAgICAgICAgc3RhdHVzVGV4dDogZXZlbnQuc3RhdHVzVGV4dCxcbiAgICAgICAgICAgIHVybDogZXZlbnQudXJsIHx8ICcnLFxuICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiByZXEucmVzcG9uc2VUeXBlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0SGVhZGVyc01hcChoZWFkZXJzOiBIdHRwSGVhZGVycyk6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiB7XG4gIGNvbnN0IGhlYWRlcnNNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHt9O1xuXG4gIGZvciAoY29uc3Qga2V5IG9mIGhlYWRlcnMua2V5cygpKSB7XG4gICAgY29uc3QgdmFsdWVzID0gaGVhZGVycy5nZXRBbGwoa2V5KTtcbiAgICBpZiAodmFsdWVzICE9PSBudWxsKSB7XG4gICAgICBoZWFkZXJzTWFwW2tleV0gPSB2YWx1ZXM7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhlYWRlcnNNYXA7XG59XG5cbmZ1bmN0aW9uIG1ha2VDYWNoZUtleShyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogU3RhdGVLZXk8VHJhbnNmZXJIdHRwUmVzcG9uc2U+IHtcbiAgLy8gbWFrZSB0aGUgcGFyYW1zIGVuY29kZWQgc2FtZSBhcyBhIHVybCBzbyBpdCdzIGVhc3kgdG8gaWRlbnRpZnlcbiAgY29uc3Qge3BhcmFtcywgbWV0aG9kLCByZXNwb25zZVR5cGUsIHVybH0gPSByZXF1ZXN0O1xuICBjb25zdCBlbmNvZGVkUGFyYW1zID0gcGFyYW1zLmtleXMoKS5zb3J0KCkubWFwKChrKSA9PiBgJHtrfT0ke3BhcmFtcy5nZXRBbGwoayl9YCkuam9pbignJicpO1xuICBjb25zdCBrZXkgPSBtZXRob2QgKyAnLicgKyByZXNwb25zZVR5cGUgKyAnLicgKyB1cmwgKyAnPycgKyBlbmNvZGVkUGFyYW1zO1xuXG4gIGNvbnN0IGhhc2ggPSBnZW5lcmF0ZUhhc2goa2V5KTtcblxuICByZXR1cm4gbWFrZVN0YXRlS2V5KGhhc2gpO1xufVxuXG4vKipcbiAqIEEgbWV0aG9kIHRoYXQgcmV0dXJucyBhIGhhc2ggcmVwcmVzZW50YXRpb24gb2YgYSBzdHJpbmcgdXNpbmcgYSB2YXJpYW50IG9mIERKQjIgaGFzaFxuICogYWxnb3JpdGhtLlxuICpcbiAqIFRoaXMgaXMgdGhlIHNhbWUgaGFzaGluZyBsb2dpYyB0aGF0IGlzIHVzZWQgdG8gZ2VuZXJhdGUgY29tcG9uZW50IGlkcy5cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVIYXNoKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBsZXQgaGFzaCA9IDA7XG5cbiAgZm9yIChjb25zdCBjaGFyIG9mIHZhbHVlKSB7XG4gICAgaGFzaCA9IE1hdGguaW11bCgzMSwgaGFzaCkgKyBjaGFyLmNoYXJDb2RlQXQoMCkgPDwgMDtcbiAgfVxuXG4gIC8vIEZvcmNlIHBvc2l0aXZlIG51bWJlciBoYXNoLlxuICAvLyAyMTQ3NDgzNjQ3ID0gZXF1aXZhbGVudCBvZiBJbnRlZ2VyLk1BWF9WQUxVRS5cbiAgaGFzaCArPSAyMTQ3NDgzNjQ3ICsgMTtcblxuICByZXR1cm4gaGFzaC50b1N0cmluZygpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIERJIHByb3ZpZGVycyBuZWVkZWQgdG8gZW5hYmxlIEhUVFAgdHJhbnNmZXIgY2FjaGUuXG4gKlxuICogQnkgZGVmYXVsdCwgd2hlbiB1c2luZyBzZXJ2ZXIgcmVuZGVyaW5nLCByZXF1ZXN0cyBhcmUgcGVyZm9ybWVkIHR3aWNlOiBvbmNlIG9uIHRoZSBzZXJ2ZXIgYW5kXG4gKiBvdGhlciBvbmUgb24gdGhlIGJyb3dzZXIuXG4gKlxuICogV2hlbiB0aGVzZSBwcm92aWRlcnMgYXJlIGFkZGVkLCByZXF1ZXN0cyBwZXJmb3JtZWQgb24gdGhlIHNlcnZlciBhcmUgY2FjaGVkIGFuZCByZXVzZWQgZHVyaW5nIHRoZVxuICogYm9vdHN0cmFwcGluZyBvZiB0aGUgYXBwbGljYXRpb24gaW4gdGhlIGJyb3dzZXIgdGh1cyBhdm9pZGluZyBkdXBsaWNhdGUgcmVxdWVzdHMgYW5kIHJlZHVjaW5nXG4gKiBsb2FkIHRpbWUuXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aEh0dHBUcmFuc2ZlckNhY2hlKCk6IFByb3ZpZGVyW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IENBQ0hFX1NUQVRFLFxuICAgICAgdXNlRmFjdG9yeTogKCkgPT4ge1xuICAgICAgICBpbmplY3QoRU5BQkxFRF9TU1JfRkVBVFVSRVMpLmFkZCgnaHR0cGNhY2hlJyk7XG4gICAgICAgIHJldHVybiB7aXNDYWNoZUFjdGl2ZTogdHJ1ZX07XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBIVFRQX1JPT1RfSU5URVJDRVBUT1JfRk5TLFxuICAgICAgdXNlVmFsdWU6IHRyYW5zZmVyQ2FjaGVJbnRlcmNlcHRvckZuLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbVHJhbnNmZXJTdGF0ZSwgQ0FDSEVfU1RBVEVdXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBBUFBfQk9PVFNUUkFQX0xJU1RFTkVSLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICB1c2VGYWN0b3J5OiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFwcFJlZiA9IGluamVjdChBcHBsaWNhdGlvblJlZik7XG4gICAgICAgIGNvbnN0IGNhY2hlU3RhdGUgPSBpbmplY3QoQ0FDSEVfU1RBVEUpO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgYXBwUmVmLmlzU3RhYmxlLnBpcGUoZmlyc3QoKGlzU3RhYmxlKSA9PiBpc1N0YWJsZSkpLnRvUHJvbWlzZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY2FjaGVTdGF0ZS5pc0NhY2hlQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICBdO1xufVxuIl19