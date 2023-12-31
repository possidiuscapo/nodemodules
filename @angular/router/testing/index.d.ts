/**
 * @license Angular v16.1.6
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */


import { ChildrenOutletContexts } from '@angular/router';
import { Compiler } from '@angular/core';
import { DebugElement } from '@angular/core';
import { ExtraOptions } from '@angular/router';
import * as i0 from '@angular/core';
import * as i1 from '@angular/router';
import { Injector } from '@angular/core';
import { Location as Location_2 } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';
import { Routes } from '@angular/router';
import { TitleStrategy } from '@angular/router';
import { Type } from '@angular/core';
import { UrlHandlingStrategy } from '@angular/router';
import { UrlSerializer } from '@angular/router';

/**
 * A testing harness for the `Router` to reduce the boilerplate needed to test routes and routed
 * components.
 *
 * @publicApi
 */
export declare class RouterTestingHarness {
    private readonly fixture;
    /**
     * Creates a `RouterTestingHarness` instance.
     *
     * The `RouterTestingHarness` also creates its own root component with a `RouterOutlet` for the
     * purposes of rendering route components.
     *
     * Throws an error if an instance has already been created.
     * Use of this harness also requires `destroyAfterEach: true` in the `ModuleTeardownOptions`
     *
     * @param initialUrl The target of navigation to trigger before returning the harness.
     */
    static create(initialUrl?: string): Promise<RouterTestingHarness>;
    /** Instructs the root fixture to run change detection. */
    detectChanges(): void;
    /** The `DebugElement` of the `RouterOutlet` component. `null` if the outlet is not activated. */
    get routeDebugElement(): DebugElement | null;
    /** The native element of the `RouterOutlet` component. `null` if the outlet is not activated. */
    get routeNativeElement(): HTMLElement | null;
    /**
     * Triggers a `Router` navigation and waits for it to complete.
     *
     * The root component with a `RouterOutlet` created for the harness is used to render `Route`
     * components. The root component is reused within the same test in subsequent calls to
     * `navigateForTest`.
     *
     * When testing `Routes` with a guards that reject the navigation, the `RouterOutlet` might not be
     * activated and the `activatedComponent` may be `null`.
     *
     * {@example router/testing/test/router_testing_harness_examples.spec.ts region='Guard'}
     *
     * @param url The target of the navigation. Passed to `Router.navigateByUrl`.
     * @returns The activated component instance of the `RouterOutlet` after navigation completes
     *     (`null` if the outlet does not get activated).
     */
    navigateByUrl(url: string): Promise<null | {}>;
    /**
     * Triggers a router navigation and waits for it to complete.
     *
     * The root component with a `RouterOutlet` created for the harness is used to render `Route`
     * components.
     *
     * {@example router/testing/test/router_testing_harness_examples.spec.ts region='RoutedComponent'}
     *
     * The root component is reused within the same test in subsequent calls to `navigateByUrl`.
     *
     * This function also makes it easier to test components that depend on `ActivatedRoute` data.
     *
     * {@example router/testing/test/router_testing_harness_examples.spec.ts region='ActivatedRoute'}
     *
     * @param url The target of the navigation. Passed to `Router.navigateByUrl`.
     * @param requiredRoutedComponentType After navigation completes, the required type for the
     *     activated component of the `RouterOutlet`. If the outlet is not activated or a different
     *     component is activated, this function will throw an error.
     * @returns The activated component instance of the `RouterOutlet` after navigation completes.
     */
    navigateByUrl<T>(url: string, requiredRoutedComponentType: Type<T>): Promise<T>;
}

/**
 * @description
 *
 * Sets up the router to be used for testing.
 *
 * The modules sets up the router to be used for testing.
 * It provides spy implementations of `Location` and `LocationStrategy`.
 *
 * @usageNotes
 * ### Example
 *
 * ```
 * beforeEach(() => {
 *   TestBed.configureTestingModule({
 *     imports: [
 *       RouterModule.forRoot(
 *         [{path: '', component: BlankCmp}, {path: 'simple', component: SimpleCmp}]
 *       )
 *     ]
 *   });
 * });
 * ```
 *
 * @publicApi
 */
export declare class RouterTestingModule {
    static withRoutes(routes: Routes, config?: ExtraOptions): ModuleWithProviders<RouterTestingModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RouterTestingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RouterTestingModule, never, never, [typeof i1.RouterModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RouterTestingModule>;
}

/**
 * Router setup factory function used for testing.
 *
 * @publicApi
 * @deprecated Use `provideRouter` or `RouterModule` instead.
 */
export declare function setupTestingRouter(urlSerializer: UrlSerializer, contexts: ChildrenOutletContexts, location: Location_2, compiler: Compiler, injector: Injector, routes: Route[][], opts?: ExtraOptions | UrlHandlingStrategy | null, urlHandlingStrategy?: UrlHandlingStrategy, routeReuseStrategy?: RouteReuseStrategy, titleStrategy?: TitleStrategy): Router;

export { }
