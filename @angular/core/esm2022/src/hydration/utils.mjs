/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getDocument } from '../render3/interfaces/document';
import { isLContainer, isRootView } from '../render3/interfaces/type_checks';
import { HEADER_OFFSET, HOST, TVIEW } from '../render3/interfaces/view';
import { makeStateKey, TransferState } from '../transfer_state';
import { assertDefined } from '../util/assert';
import { CONTAINERS, DISCONNECTED_NODES, ELEMENT_CONTAINERS, MULTIPLIER, NUM_ROOT_NODES } from './interfaces';
/**
 * The name of the key used in the TransferState collection,
 * where hydration information is located.
 */
const TRANSFER_STATE_TOKEN_ID = '__ɵnghData__';
/**
 * Lookup key used to reference DOM hydration data (ngh) in `TransferState`.
 */
export const NGH_DATA_KEY = makeStateKey(TRANSFER_STATE_TOKEN_ID);
/**
 * The name of the attribute that would be added to host component
 * nodes and contain a reference to a particular slot in transferred
 * state that contains the necessary hydration info for this component.
 */
export const NGH_ATTR_NAME = 'ngh';
/**
 * Reference to a function that reads `ngh` attribute value from a given RNode
 * and retrieves hydration information from the TransferState using that value
 * as an index. Returns `null` by default, when hydration is not enabled.
 *
 * @param rNode Component's host element.
 * @param injector Injector that this component has access to.
 */
let _retrieveHydrationInfoImpl = (rNode, injector) => null;
export function retrieveHydrationInfoImpl(rNode, injector) {
    const nghAttrValue = rNode.getAttribute(NGH_ATTR_NAME);
    if (nghAttrValue == null)
        return null;
    let data = {};
    // An element might have an empty `ngh` attribute value (e.g. `<comp ngh="" />`),
    // which means that no special annotations are required. Do not attempt to read
    // from the TransferState in this case.
    if (nghAttrValue !== '') {
        const transferState = injector.get(TransferState, null, { optional: true });
        if (transferState !== null) {
            const nghData = transferState.get(NGH_DATA_KEY, []);
            // The nghAttrValue is always a number referencing an index
            // in the hydration TransferState data.
            data = nghData[Number(nghAttrValue)];
            // If the `ngh` attribute exists and has a non-empty value,
            // the hydration info *must* be present in the TransferState.
            // If there is no data for some reasons, this is an error.
            ngDevMode && assertDefined(data, 'Unable to retrieve hydration info from the TransferState.');
        }
    }
    const dehydratedView = {
        data,
        firstChild: rNode.firstChild ?? null,
    };
    // The `ngh` attribute is cleared from the DOM node now
    // that the data has been retrieved.
    rNode.removeAttribute(NGH_ATTR_NAME);
    // Note: don't check whether this node was claimed for hydration,
    // because this node might've been previously claimed while processing
    // template instructions.
    ngDevMode && markRNodeAsClaimedByHydration(rNode, /* checkIfAlreadyClaimed */ false);
    ngDevMode && ngDevMode.hydratedComponents++;
    return dehydratedView;
}
/**
 * Sets the implementation for the `retrieveHydrationInfo` function.
 */
export function enableRetrieveHydrationInfoImpl() {
    _retrieveHydrationInfoImpl = retrieveHydrationInfoImpl;
}
/**
 * Retrieves hydration info by reading the value from the `ngh` attribute
 * and accessing a corresponding slot in TransferState storage.
 */
export function retrieveHydrationInfo(rNode, injector) {
    return _retrieveHydrationInfoImpl(rNode, injector);
}
/**
 * Retrieves an instance of a component LView from a given ViewRef.
 * Returns an instance of a component LView or `null` in case of an embedded view.
 */
export function getComponentLViewForHydration(viewRef) {
    // Reading an internal field from `ViewRef` instance.
    let lView = viewRef._lView;
    const tView = lView[TVIEW];
    // A registered ViewRef might represent an instance of an
    // embedded view, in which case we do not need to annotate it.
    if (tView.type === 2 /* TViewType.Embedded */) {
        return null;
    }
    // Check if it's a root view and if so, retrieve component's
    // LView from the first slot after the header.
    if (isRootView(lView)) {
        lView = lView[HEADER_OFFSET];
    }
    // If a `ViewContainerRef` was injected in a component class, this resulted
    // in an LContainer creation at that location. In this case, the component
    // LView is in the LContainer's `HOST` slot.
    if (isLContainer(lView)) {
        lView = lView[HOST];
    }
    return lView;
}
function getTextNodeContent(node) {
    return node.textContent?.replace(/\s/gm, '');
}
/**
 * Restores text nodes and separators into the DOM that were lost during SSR
 * serialization. The hydration process replaces empty text nodes and text
 * nodes that are immediately adjacent to other text nodes with comment nodes
 * that this method filters on to restore those missing nodes that the
 * hydration process is expecting to be present.
 *
 * @param node The app's root HTML Element
 */
export function processTextNodeMarkersBeforeHydration(node) {
    const doc = getDocument();
    const commentNodesIterator = doc.createNodeIterator(node, NodeFilter.SHOW_COMMENT, {
        acceptNode(node) {
            const content = getTextNodeContent(node);
            const isTextNodeMarker = content === "ngetn" /* TextNodeMarker.EmptyNode */ || content === "ngtns" /* TextNodeMarker.Separator */;
            return isTextNodeMarker ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });
    let currentNode;
    // We cannot modify the DOM while using the commentIterator,
    // because it throws off the iterator state.
    // So we collect all marker nodes first and then follow up with
    // applying the changes to the DOM: either inserting an empty node
    // or just removing the marker if it was used as a separator.
    const nodes = [];
    while (currentNode = commentNodesIterator.nextNode()) {
        nodes.push(currentNode);
    }
    for (const node of nodes) {
        if (node.textContent === "ngetn" /* TextNodeMarker.EmptyNode */) {
            node.replaceWith(doc.createTextNode(''));
        }
        else {
            node.remove();
        }
    }
}
/**
 * Marks a node as "claimed" by hydration process.
 * This is needed to make assessments in tests whether
 * the hydration process handled all nodes.
 */
export function markRNodeAsClaimedByHydration(node, checkIfAlreadyClaimed = true) {
    if (!ngDevMode) {
        throw new Error('Calling `markRNodeAsClaimedByHydration` in prod mode ' +
            'is not supported and likely a mistake.');
    }
    if (checkIfAlreadyClaimed && isRNodeClaimedForHydration(node)) {
        throw new Error('Trying to claim a node, which was claimed already.');
    }
    node.__claimed = true;
    ngDevMode.hydratedNodes++;
}
export function isRNodeClaimedForHydration(node) {
    return !!node.__claimed;
}
export function setSegmentHead(hydrationInfo, index, node) {
    hydrationInfo.segmentHeads ??= {};
    hydrationInfo.segmentHeads[index] = node;
}
export function getSegmentHead(hydrationInfo, index) {
    return hydrationInfo.segmentHeads?.[index] ?? null;
}
/**
 * Returns the size of an <ng-container>, using either the information
 * serialized in `ELEMENT_CONTAINERS` (element container size) or by
 * computing the sum of root nodes in all dehydrated views in a given
 * container (in case this `<ng-container>` was also used as a view
 * container host node, e.g. <ng-container *ngIf>).
 */
export function getNgContainerSize(hydrationInfo, index) {
    const data = hydrationInfo.data;
    let size = data[ELEMENT_CONTAINERS]?.[index] ?? null;
    // If there is no serialized information available in the `ELEMENT_CONTAINERS` slot,
    // check if we have info about view containers at this location (e.g.
    // `<ng-container *ngIf>`) and use container size as a number of root nodes in this
    // element container.
    if (size === null && data[CONTAINERS]?.[index]) {
        size = calcSerializedContainerSize(hydrationInfo, index);
    }
    return size;
}
export function getSerializedContainerViews(hydrationInfo, index) {
    return hydrationInfo.data[CONTAINERS]?.[index] ?? null;
}
/**
 * Computes the size of a serialized container (the number of root nodes)
 * by calculating the sum of root nodes in all dehydrated views in this container.
 */
export function calcSerializedContainerSize(hydrationInfo, index) {
    const views = getSerializedContainerViews(hydrationInfo, index) ?? [];
    let numNodes = 0;
    for (let view of views) {
        numNodes += view[NUM_ROOT_NODES] * (view[MULTIPLIER] ?? 1);
    }
    return numNodes;
}
/**
 * Checks whether a node is annotated as "disconnected", i.e. not present
 * in the DOM at serialization time. We should not attempt hydration for
 * such nodes and instead, use a regular "creation mode".
 */
export function isDisconnectedNode(hydrationInfo, index) {
    // Check if we are processing disconnected info for the first time.
    if (typeof hydrationInfo.disconnectedNodes === 'undefined') {
        const nodeIds = hydrationInfo.data[DISCONNECTED_NODES];
        hydrationInfo.disconnectedNodes = nodeIds ? (new Set(nodeIds)) : null;
    }
    return !!hydrationInfo.disconnectedNodes?.has(index);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9oeWRyYXRpb24vdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7Ozs7OztHQU1HO0FBSUgsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBRTNELE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDM0UsT0FBTyxFQUFDLGFBQWEsRUFBRSxJQUFJLEVBQVMsS0FBSyxFQUFZLE1BQU0sNEJBQTRCLENBQUM7QUFDeEYsT0FBTyxFQUFDLFlBQVksRUFBRSxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFDLFVBQVUsRUFBa0Isa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBMEMsTUFBTSxjQUFjLENBQUM7QUFFcks7OztHQUdHO0FBQ0gsTUFBTSx1QkFBdUIsR0FBRyxjQUFjLENBQUM7QUFFL0M7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUF3Qix1QkFBdUIsQ0FBQyxDQUFDO0FBRXpGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBdUJuQzs7Ozs7OztHQU9HO0FBQ0gsSUFBSSwwQkFBMEIsR0FDMUIsQ0FBQyxLQUFlLEVBQUUsUUFBa0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDO0FBRWxELE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxLQUFlLEVBQUUsUUFBa0I7SUFFM0UsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RCxJQUFJLFlBQVksSUFBSSxJQUFJO1FBQUUsT0FBTyxJQUFJLENBQUM7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LENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsMkJBQTJCLENBQUMsYUFBNkIsRUFBRSxLQUFhO0lBQ3RGLE1BQU0sS0FBSyxHQUFHLDJCQUEyQixDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFO1FBQ3RCLFFBQVEsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDNUQ7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxhQUE2QixFQUFFLEtBQWE7SUFDN0UsbUVBQW1FO0lBQ25FLElBQUksT0FBTyxhQUFhLENBQUMsaUJBQWlCLEtBQUssV0FBVyxFQUFFO1FBQzFELE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN2RCxhQUFhLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUN2RTtJQUNELE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJy4uL2RpL2luamVjdG9yJztcbmltcG9ydCB7Vmlld1JlZn0gZnJvbSAnLi4vbGlua2VyL3ZpZXdfcmVmJztcbmltcG9ydCB7Z2V0RG9jdW1lbnR9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy9kb2N1bWVudCc7XG5pbXBvcnQge1JFbGVtZW50LCBSTm9kZX0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL3JlbmRlcmVyX2RvbSc7XG5pbXBvcnQge2lzTENvbnRhaW5lciwgaXNSb290Vmlld30gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL3R5cGVfY2hlY2tzJztcbmltcG9ydCB7SEVBREVSX09GRlNFVCwgSE9TVCwgTFZpZXcsIFRWSUVXLCBUVmlld1R5cGV9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7bWFrZVN0YXRlS2V5LCBUcmFuc2ZlclN0YXRlfSBmcm9tICcuLi90cmFuc2Zlcl9zdGF0ZSc7XG5pbXBvcnQge2Fzc2VydERlZmluZWR9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcblxuaW1wb3J0IHtDT05UQUlORVJTLCBEZWh5ZHJhdGVkVmlldywgRElTQ09OTkVDVEVEX05PREVTLCBFTEVNRU5UX0NPTlRBSU5FUlMsIE1VTFRJUExJRVIsIE5VTV9ST09UX05PREVTLCBTZXJpYWxpemVkQ29udGFpbmVyVmlldywgU2VyaWFsaXplZFZpZXd9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbi8qKlxuICogVGhlIG5hbWUgb2YgdGhlIGtleSB1c2VkIGluIHRoZSBUcmFuc2ZlclN0YXRlIGNvbGxlY3Rpb24sXG4gKiB3aGVyZSBoeWRyYXRpb24gaW5mb3JtYXRpb24gaXMgbG9jYXRlZC5cbiAqL1xuY29uc3QgVFJBTlNGRVJfU1RBVEVfVE9LRU5fSUQgPSAnX1/JtW5naERhdGFfXyc7XG5cbi8qKlxuICogTG9va3VwIGtleSB1c2VkIHRvIHJlZmVyZW5jZSBET00gaHlkcmF0aW9uIGRhdGEgKG5naCkgaW4gYFRyYW5zZmVyU3RhdGVgLlxuICovXG5leHBvcnQgY29uc3QgTkdIX0RBVEFfS0VZID0gbWFrZVN0YXRlS2V5PEFycmF5PFNlcmlhbGl6ZWRWaWV3Pj4oVFJBTlNGRVJfU1RBVEVfVE9LRU5fSUQpO1xuXG4vKipcbiAqIFRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdGhhdCB3b3VsZCBiZSBhZGRlZCB0byBob3N0IGNvbXBvbmVudFxuICogbm9kZXMgYW5kIGNvbnRhaW4gYSByZWZlcmVuY2UgdG8gYSBwYXJ0aWN1bGFyIHNsb3QgaW4gdHJhbnNmZXJyZWRcbiAqIHN0YXRlIHRoYXQgY29udGFpbnMgdGhlIG5lY2Vzc2FyeSBoeWRyYXRpb24gaW5mbyBmb3IgdGhpcyBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBOR0hfQVRUUl9OQU1FID0gJ25naCc7XG5cbmV4cG9ydCBjb25zdCBlbnVtIFRleHROb2RlTWFya2VyIHtcblxuICAvKipcbiAgICogVGhlIGNvbnRlbnRzIG9mIHRoZSB0ZXh0IGNvbW1lbnQgYWRkZWQgdG8gbm9kZXMgdGhhdCB3b3VsZCBvdGhlcndpc2UgYmVcbiAgICogZW1wdHkgd2hlbiBzZXJpYWxpemVkIGJ5IHRoZSBzZXJ2ZXIgYW5kIHBhc3NlZCB0byB0aGUgY2xpZW50LiBUaGUgZW1wdHlcbiAgICogbm9kZSBpcyBsb3N0IHdoZW4gdGhlIGJyb3dzZXIgcGFyc2VzIGl0IG90aGVyd2lzZS4gVGhpcyBjb21tZW50IG5vZGUgd2lsbFxuICAgKiBiZSByZXBsYWNlZCBkdXJpbmcgaHlkcmF0aW9uIGluIHRoZSBjbGllbnQgdG8gcmVzdG9yZSB0aGUgbG9zdCBlbXB0eSB0ZXh0XG4gICAqIG5vZGUuXG4gICAqL1xuICBFbXB0eU5vZGUgPSAnbmdldG4nLFxuXG4gIC8qKlxuICAgKiBUaGUgY29udGVudHMgb2YgdGhlIHRleHQgY29tbWVudCBhZGRlZCBpbiB0aGUgY2FzZSBvZiBhZGphY2VudCB0ZXh0IG5vZGVzLlxuICAgKiBXaGVuIGFkamFjZW50IHRleHQgbm9kZXMgYXJlIHNlcmlhbGl6ZWQgYnkgdGhlIHNlcnZlciBhbmQgc2VudCB0byB0aGVcbiAgICogY2xpZW50LCB0aGUgYnJvd3NlciBsb3NlcyByZWZlcmVuY2UgdG8gdGhlIGFtb3VudCBvZiBub2RlcyBhbmQgYXNzdW1lc1xuICAgKiBqdXN0IG9uZSB0ZXh0IG5vZGUuIFRoaXMgc2VwYXJhdG9yIGlzIHJlcGxhY2VkIGR1cmluZyBoeWRyYXRpb24gdG8gcmVzdG9yZVxuICAgKiB0aGUgcHJvcGVyIHNlcGFyYXRpb24gYW5kIGFtb3VudCBvZiB0ZXh0IG5vZGVzIHRoYXQgc2hvdWxkIGJlIHByZXNlbnQuXG4gICAqL1xuICBTZXBhcmF0b3IgPSAnbmd0bnMnLFxufVxuXG4vKipcbiAqIFJlZmVyZW5jZSB0byBhIGZ1bmN0aW9uIHRoYXQgcmVhZHMgYG5naGAgYXR0cmlidXRlIHZhbHVlIGZyb20gYSBnaXZlbiBSTm9kZVxuICogYW5kIHJldHJpZXZlcyBoeWRyYXRpb24gaW5mb3JtYXRpb24gZnJvbSB0aGUgVHJhbnNmZXJTdGF0ZSB1c2luZyB0aGF0IHZhbHVlXG4gKiBhcyBhbiBpbmRleC4gUmV0dXJucyBgbnVsbGAgYnkgZGVmYXVsdCwgd2hlbiBoeWRyYXRpb24gaXMgbm90IGVuYWJsZWQuXG4gKlxuICogQHBhcmFtIHJOb2RlIENvbXBvbmVudCdzIGhvc3QgZWxlbWVudC5cbiAqIEBwYXJhbSBpbmplY3RvciBJbmplY3RvciB0aGF0IHRoaXMgY29tcG9uZW50IGhhcyBhY2Nlc3MgdG8uXG4gKi9cbmxldCBfcmV0cmlldmVIeWRyYXRpb25JbmZvSW1wbDogdHlwZW9mIHJldHJpZXZlSHlkcmF0aW9uSW5mb0ltcGwgPVxuICAgIChyTm9kZTogUkVsZW1lbnQsIGluamVjdG9yOiBJbmplY3RvcikgPT4gbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIHJldHJpZXZlSHlkcmF0aW9uSW5mb0ltcGwock5vZGU6IFJFbGVtZW50LCBpbmplY3RvcjogSW5qZWN0b3IpOiBEZWh5ZHJhdGVkVmlld3xcbiAgICBudWxsIHtcbiAgY29uc3QgbmdoQXR0clZhbHVlID0gck5vZGUuZ2V0QXR0cmlidXRlKE5HSF9BVFRSX05BTUUpO1xuICBpZiAobmdoQXR0clZhbHVlID09IG51bGwpIHJldHVybiBudWxsO1xuXG4gIGxldCBkYXRhOiBTZXJpYWxpemVkVmlldyA9IHt9O1xuICAvLyBBbiBlbGVtZW50IG1pZ2h0IGhhdmUgYW4gZW1wdHkgYG5naGAgYXR0cmlidXRlIHZhbHVlIChlLmcuIGA8Y29tcCBuZ2g9XCJcIiAvPmApLFxuICAvLyB3aGljaCBtZWFucyB0aGF0IG5vIHNwZWNpYWwgYW5ub3RhdGlvbnMgYXJlIHJlcXVpcmVkLiBEbyBub3QgYXR0ZW1wdCB0byByZWFkXG4gIC8vIGZyb20gdGhlIFRyYW5zZmVyU3RhdGUgaW4gdGhpcyBjYXNlLlxuICBpZiAobmdoQXR0clZhbHVlICE9PSAnJykge1xuICAgIGNvbnN0IHRyYW5zZmVyU3RhdGUgPSBpbmplY3Rvci5nZXQoVHJhbnNmZXJTdGF0ZSwgbnVsbCwge29wdGlvbmFsOiB0cnVlfSk7XG4gICAgaWYgKHRyYW5zZmVyU3RhdGUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG5naERhdGEgPSB0cmFuc2ZlclN0YXRlLmdldChOR0hfREFUQV9LRVksIFtdKTtcblxuICAgICAgLy8gVGhlIG5naEF0dHJWYWx1ZSBpcyBhbHdheXMgYSBudW1iZXIgcmVmZXJlbmNpbmcgYW4gaW5kZXhcbiAgICAgIC8vIGluIHRoZSBoeWRyYXRpb24gVHJhbnNmZXJTdGF0ZSBkYXRhLlxuICAgICAgZGF0YSA9IG5naERhdGFbTnVtYmVyKG5naEF0dHJWYWx1ZSldO1xuXG4gICAgICAvLyBJZiB0aGUgYG5naGAgYXR0cmlidXRlIGV4aXN0cyBhbmQgaGFzIGEgbm9uLWVtcHR5IHZhbHVlLFxuICAgICAgLy8gdGhlIGh5ZHJhdGlvbiBpbmZvICptdXN0KiBiZSBwcmVzZW50IGluIHRoZSBUcmFuc2ZlclN0YXRlLlxuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gZGF0YSBmb3Igc29tZSByZWFzb25zLCB0aGlzIGlzIGFuIGVycm9yLlxuICAgICAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQoZGF0YSwgJ1VuYWJsZSB0byByZXRyaWV2ZSBoeWRyYXRpb24gaW5mbyBmcm9tIHRoZSBUcmFuc2ZlclN0YXRlLicpO1xuICAgIH1cbiAgfVxuICBjb25zdCBkZWh5ZHJhdGVkVmlldzogRGVoeWRyYXRlZFZpZXcgPSB7XG4gICAgZGF0YSxcbiAgICBmaXJzdENoaWxkOiByTm9kZS5maXJzdENoaWxkID8/IG51bGwsXG4gIH07XG4gIC8vIFRoZSBgbmdoYCBhdHRyaWJ1dGUgaXMgY2xlYXJlZCBmcm9tIHRoZSBET00gbm9kZSBub3dcbiAgLy8gdGhhdCB0aGUgZGF0YSBoYXMgYmVlbiByZXRyaWV2ZWQuXG4gIHJOb2RlLnJlbW92ZUF0dHJpYnV0ZShOR0hfQVRUUl9OQU1FKTtcblxuICAvLyBOb3RlOiBkb24ndCBjaGVjayB3aGV0aGVyIHRoaXMgbm9kZSB3YXMgY2xhaW1lZCBmb3IgaHlkcmF0aW9uLFxuICAvLyBiZWNhdXNlIHRoaXMgbm9kZSBtaWdodCd2ZSBiZWVuIHByZXZpb3VzbHkgY2xhaW1lZCB3aGlsZSBwcm9jZXNzaW5nXG4gIC8vIHRlbXBsYXRlIGluc3RydWN0aW9ucy5cbiAgbmdEZXZNb2RlICYmIG1hcmtSTm9kZUFzQ2xhaW1lZEJ5SHlkcmF0aW9uKHJOb2RlLCAvKiBjaGVja0lmQWxyZWFkeUNsYWltZWQgKi8gZmFsc2UpO1xuICBuZ0Rldk1vZGUgJiYgbmdEZXZNb2RlLmh5ZHJhdGVkQ29tcG9uZW50cysrO1xuXG4gIHJldHVybiBkZWh5ZHJhdGVkVmlldztcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIGByZXRyaWV2ZUh5ZHJhdGlvbkluZm9gIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlUmV0cmlldmVIeWRyYXRpb25JbmZvSW1wbCgpIHtcbiAgX3JldHJpZXZlSHlkcmF0aW9uSW5mb0ltcGwgPSByZXRyaWV2ZUh5ZHJhdGlvbkluZm9JbXBsO1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyBoeWRyYXRpb24gaW5mbyBieSByZWFkaW5nIHRoZSB2YWx1ZSBmcm9tIHRoZSBgbmdoYCBhdHRyaWJ1dGVcbiAqIGFuZCBhY2Nlc3NpbmcgYSBjb3JyZXNwb25kaW5nIHNsb3QgaW4gVHJhbnNmZXJTdGF0ZSBzdG9yYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmV0cmlldmVIeWRyYXRpb25JbmZvKHJOb2RlOiBSRWxlbWVudCwgaW5qZWN0b3I6IEluamVjdG9yKTogRGVoeWRyYXRlZFZpZXd8bnVsbCB7XG4gIHJldHVybiBfcmV0cmlldmVIeWRyYXRpb25JbmZvSW1wbChyTm9kZSwgaW5qZWN0b3IpO1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyBhbiBpbnN0YW5jZSBvZiBhIGNvbXBvbmVudCBMVmlldyBmcm9tIGEgZ2l2ZW4gVmlld1JlZi5cbiAqIFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgYSBjb21wb25lbnQgTFZpZXcgb3IgYG51bGxgIGluIGNhc2Ugb2YgYW4gZW1iZWRkZWQgdmlldy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudExWaWV3Rm9ySHlkcmF0aW9uKHZpZXdSZWY6IFZpZXdSZWYpOiBMVmlld3xudWxsIHtcbiAgLy8gUmVhZGluZyBhbiBpbnRlcm5hbCBmaWVsZCBmcm9tIGBWaWV3UmVmYCBpbnN0YW5jZS5cbiAgbGV0IGxWaWV3ID0gKHZpZXdSZWYgYXMgYW55KS5fbFZpZXcgYXMgTFZpZXc7XG4gIGNvbnN0IHRWaWV3ID0gbFZpZXdbVFZJRVddO1xuICAvLyBBIHJlZ2lzdGVyZWQgVmlld1JlZiBtaWdodCByZXByZXNlbnQgYW4gaW5zdGFuY2Ugb2YgYW5cbiAgLy8gZW1iZWRkZWQgdmlldywgaW4gd2hpY2ggY2FzZSB3ZSBkbyBub3QgbmVlZCB0byBhbm5vdGF0ZSBpdC5cbiAgaWYgKHRWaWV3LnR5cGUgPT09IFRWaWV3VHlwZS5FbWJlZGRlZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIENoZWNrIGlmIGl0J3MgYSByb290IHZpZXcgYW5kIGlmIHNvLCByZXRyaWV2ZSBjb21wb25lbnQnc1xuICAvLyBMVmlldyBmcm9tIHRoZSBmaXJzdCBzbG90IGFmdGVyIHRoZSBoZWFkZXIuXG4gIGlmIChpc1Jvb3RWaWV3KGxWaWV3KSkge1xuICAgIGxWaWV3ID0gbFZpZXdbSEVBREVSX09GRlNFVF07XG4gIH1cblxuICAvLyBJZiBhIGBWaWV3Q29udGFpbmVyUmVmYCB3YXMgaW5qZWN0ZWQgaW4gYSBjb21wb25lbnQgY2xhc3MsIHRoaXMgcmVzdWx0ZWRcbiAgLy8gaW4gYW4gTENvbnRhaW5lciBjcmVhdGlvbiBhdCB0aGF0IGxvY2F0aW9uLiBJbiB0aGlzIGNhc2UsIHRoZSBjb21wb25lbnRcbiAgLy8gTFZpZXcgaXMgaW4gdGhlIExDb250YWluZXIncyBgSE9TVGAgc2xvdC5cbiAgaWYgKGlzTENvbnRhaW5lcihsVmlldykpIHtcbiAgICBsVmlldyA9IGxWaWV3W0hPU1RdO1xuICB9XG4gIHJldHVybiBsVmlldztcbn1cblxuZnVuY3Rpb24gZ2V0VGV4dE5vZGVDb250ZW50KG5vZGU6IE5vZGUpOiBzdHJpbmd8dW5kZWZpbmVkIHtcbiAgcmV0dXJuIG5vZGUudGV4dENvbnRlbnQ/LnJlcGxhY2UoL1xccy9nbSwgJycpO1xufVxuXG4vKipcbiAqIFJlc3RvcmVzIHRleHQgbm9kZXMgYW5kIHNlcGFyYXRvcnMgaW50byB0aGUgRE9NIHRoYXQgd2VyZSBsb3N0IGR1cmluZyBTU1JcbiAqIHNlcmlhbGl6YXRpb24uIFRoZSBoeWRyYXRpb24gcHJvY2VzcyByZXBsYWNlcyBlbXB0eSB0ZXh0IG5vZGVzIGFuZCB0ZXh0XG4gKiBub2RlcyB0aGF0IGFyZSBpbW1lZGlhdGVseSBhZGphY2VudCB0byBvdGhlciB0ZXh0IG5vZGVzIHdpdGggY29tbWVudCBub2Rlc1xuICogdGhhdCB0aGlzIG1ldGhvZCBmaWx0ZXJzIG9uIHRvIHJlc3RvcmUgdGhvc2UgbWlzc2luZyBub2RlcyB0aGF0IHRoZVxuICogaHlkcmF0aW9uIHByb2Nlc3MgaXMgZXhwZWN0aW5nIHRvIGJlIHByZXNlbnQuXG4gKlxuICogQHBhcmFtIG5vZGUgVGhlIGFwcCdzIHJvb3QgSFRNTCBFbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzVGV4dE5vZGVNYXJrZXJzQmVmb3JlSHlkcmF0aW9uKG5vZGU6IEhUTUxFbGVtZW50KSB7XG4gIGNvbnN0IGRvYyA9IGdldERvY3VtZW50KCk7XG4gIGNvbnN0IGNvbW1lbnROb2Rlc0l0ZXJhdG9yID0gZG9jLmNyZWF0ZU5vZGVJdGVyYXRvcihub2RlLCBOb2RlRmlsdGVyLlNIT1dfQ09NTUVOVCwge1xuICAgIGFjY2VwdE5vZGUobm9kZSkge1xuICAgICAgY29uc3QgY29udGVudCA9IGdldFRleHROb2RlQ29udGVudChub2RlKTtcbiAgICAgIGNvbnN0IGlzVGV4dE5vZGVNYXJrZXIgPVxuICAgICAgICAgIGNvbnRlbnQgPT09IFRleHROb2RlTWFya2VyLkVtcHR5Tm9kZSB8fCBjb250ZW50ID09PSBUZXh0Tm9kZU1hcmtlci5TZXBhcmF0b3I7XG4gICAgICByZXR1cm4gaXNUZXh0Tm9kZU1hcmtlciA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX1JFSkVDVDtcbiAgICB9XG4gIH0pO1xuICBsZXQgY3VycmVudE5vZGU6IENvbW1lbnQ7XG4gIC8vIFdlIGNhbm5vdCBtb2RpZnkgdGhlIERPTSB3aGlsZSB1c2luZyB0aGUgY29tbWVudEl0ZXJhdG9yLFxuICAvLyBiZWNhdXNlIGl0IHRocm93cyBvZmYgdGhlIGl0ZXJhdG9yIHN0YXRlLlxuICAvLyBTbyB3ZSBjb2xsZWN0IGFsbCBtYXJrZXIgbm9kZXMgZmlyc3QgYW5kIHRoZW4gZm9sbG93IHVwIHdpdGhcbiAgLy8gYXBwbHlpbmcgdGhlIGNoYW5nZXMgdG8gdGhlIERPTTogZWl0aGVyIGluc2VydGluZyBhbiBlbXB0eSBub2RlXG4gIC8vIG9yIGp1c3QgcmVtb3ZpbmcgdGhlIG1hcmtlciBpZiBpdCB3YXMgdXNlZCBhcyBhIHNlcGFyYXRvci5cbiAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgd2hpbGUgKGN1cnJlbnROb2RlID0gY29tbWVudE5vZGVzSXRlcmF0b3IubmV4dE5vZGUoKSBhcyBDb21tZW50KSB7XG4gICAgbm9kZXMucHVzaChjdXJyZW50Tm9kZSk7XG4gIH1cbiAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgaWYgKG5vZGUudGV4dENvbnRlbnQgPT09IFRleHROb2RlTWFya2VyLkVtcHR5Tm9kZSkge1xuICAgICAgbm9kZS5yZXBsYWNlV2l0aChkb2MuY3JlYXRlVGV4dE5vZGUoJycpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBJbnRlcm5hbCB0eXBlIHRoYXQgcmVwcmVzZW50cyBhIGNsYWltZWQgbm9kZS5cbiAqIE9ubHkgdXNlZCBpbiBkZXYgbW9kZS5cbiAqL1xudHlwZSBDbGFpbWVkTm9kZSA9IHtcbiAgX19jbGFpbWVkPzogYm9vbGVhbjtcbn07XG5cbi8qKlxuICogTWFya3MgYSBub2RlIGFzIFwiY2xhaW1lZFwiIGJ5IGh5ZHJhdGlvbiBwcm9jZXNzLlxuICogVGhpcyBpcyBuZWVkZWQgdG8gbWFrZSBhc3Nlc3NtZW50cyBpbiB0ZXN0cyB3aGV0aGVyXG4gKiB0aGUgaHlkcmF0aW9uIHByb2Nlc3MgaGFuZGxlZCBhbGwgbm9kZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXJrUk5vZGVBc0NsYWltZWRCeUh5ZHJhdGlvbihub2RlOiBSTm9kZSwgY2hlY2tJZkFscmVhZHlDbGFpbWVkID0gdHJ1ZSkge1xuICBpZiAoIW5nRGV2TW9kZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0NhbGxpbmcgYG1hcmtSTm9kZUFzQ2xhaW1lZEJ5SHlkcmF0aW9uYCBpbiBwcm9kIG1vZGUgJyArXG4gICAgICAgICdpcyBub3Qgc3VwcG9ydGVkIGFuZCBsaWtlbHkgYSBtaXN0YWtlLicpO1xuICB9XG4gIGlmIChjaGVja0lmQWxyZWFkeUNsYWltZWQgJiYgaXNSTm9kZUNsYWltZWRGb3JIeWRyYXRpb24obm9kZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyeWluZyB0byBjbGFpbSBhIG5vZGUsIHdoaWNoIHdhcyBjbGFpbWVkIGFscmVhZHkuJyk7XG4gIH1cbiAgKG5vZGUgYXMgQ2xhaW1lZE5vZGUpLl9fY2xhaW1lZCA9IHRydWU7XG4gIG5nRGV2TW9kZS5oeWRyYXRlZE5vZGVzKys7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1JOb2RlQ2xhaW1lZEZvckh5ZHJhdGlvbihub2RlOiBSTm9kZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gISEobm9kZSBhcyBDbGFpbWVkTm9kZSkuX19jbGFpbWVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U2VnbWVudEhlYWQoXG4gICAgaHlkcmF0aW9uSW5mbzogRGVoeWRyYXRlZFZpZXcsIGluZGV4OiBudW1iZXIsIG5vZGU6IFJOb2RlfG51bGwpOiB2b2lkIHtcbiAgaHlkcmF0aW9uSW5mby5zZWdtZW50SGVhZHMgPz89IHt9O1xuICBoeWRyYXRpb25JbmZvLnNlZ21lbnRIZWFkc1tpbmRleF0gPSBub2RlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VnbWVudEhlYWQoaHlkcmF0aW9uSW5mbzogRGVoeWRyYXRlZFZpZXcsIGluZGV4OiBudW1iZXIpOiBSTm9kZXxudWxsIHtcbiAgcmV0dXJuIGh5ZHJhdGlvbkluZm8uc2VnbWVudEhlYWRzPy5baW5kZXhdID8/IG51bGw7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc2l6ZSBvZiBhbiA8bmctY29udGFpbmVyPiwgdXNpbmcgZWl0aGVyIHRoZSBpbmZvcm1hdGlvblxuICogc2VyaWFsaXplZCBpbiBgRUxFTUVOVF9DT05UQUlORVJTYCAoZWxlbWVudCBjb250YWluZXIgc2l6ZSkgb3IgYnlcbiAqIGNvbXB1dGluZyB0aGUgc3VtIG9mIHJvb3Qgbm9kZXMgaW4gYWxsIGRlaHlkcmF0ZWQgdmlld3MgaW4gYSBnaXZlblxuICogY29udGFpbmVyIChpbiBjYXNlIHRoaXMgYDxuZy1jb250YWluZXI+YCB3YXMgYWxzbyB1c2VkIGFzIGEgdmlld1xuICogY29udGFpbmVyIGhvc3Qgbm9kZSwgZS5nLiA8bmctY29udGFpbmVyICpuZ0lmPikuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROZ0NvbnRhaW5lclNpemUoaHlkcmF0aW9uSW5mbzogRGVoeWRyYXRlZFZpZXcsIGluZGV4OiBudW1iZXIpOiBudW1iZXJ8bnVsbCB7XG4gIGNvbnN0IGRhdGEgPSBoeWRyYXRpb25JbmZvLmRhdGE7XG4gIGxldCBzaXplID0gZGF0YVtFTEVNRU5UX0NPTlRBSU5FUlNdPy5baW5kZXhdID8/IG51bGw7XG4gIC8vIElmIHRoZXJlIGlzIG5vIHNlcmlhbGl6ZWQgaW5mb3JtYXRpb24gYXZhaWxhYmxlIGluIHRoZSBgRUxFTUVOVF9DT05UQUlORVJTYCBzbG90LFxuICAvLyBjaGVjayBpZiB3ZSBoYXZlIGluZm8gYWJvdXQgdmlldyBjb250YWluZXJzIGF0IHRoaXMgbG9jYXRpb24gKGUuZy5cbiAgLy8gYDxuZy1jb250YWluZXIgKm5nSWY+YCkgYW5kIHVzZSBjb250YWluZXIgc2l6ZSBhcyBhIG51bWJlciBvZiByb290IG5vZGVzIGluIHRoaXNcbiAgLy8gZWxlbWVudCBjb250YWluZXIuXG4gIGlmIChzaXplID09PSBudWxsICYmIGRhdGFbQ09OVEFJTkVSU10/LltpbmRleF0pIHtcbiAgICBzaXplID0gY2FsY1NlcmlhbGl6ZWRDb250YWluZXJTaXplKGh5ZHJhdGlvbkluZm8sIGluZGV4KTtcbiAgfVxuICByZXR1cm4gc2l6ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlcmlhbGl6ZWRDb250YWluZXJWaWV3cyhcbiAgICBoeWRyYXRpb25JbmZvOiBEZWh5ZHJhdGVkVmlldywgaW5kZXg6IG51bWJlcik6IFNlcmlhbGl6ZWRDb250YWluZXJWaWV3W118bnVsbCB7XG4gIHJldHVybiBoeWRyYXRpb25JbmZvLmRhdGFbQ09OVEFJTkVSU10/LltpbmRleF0gPz8gbnVsbDtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgc2l6ZSBvZiBhIHNlcmlhbGl6ZWQgY29udGFpbmVyICh0aGUgbnVtYmVyIG9mIHJvb3Qgbm9kZXMpXG4gKiBieSBjYWxjdWxhdGluZyB0aGUgc3VtIG9mIHJvb3Qgbm9kZXMgaW4gYWxsIGRlaHlkcmF0ZWQgdmlld3MgaW4gdGhpcyBjb250YWluZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjU2VyaWFsaXplZENvbnRhaW5lclNpemUoaHlkcmF0aW9uSW5mbzogRGVoeWRyYXRlZFZpZXcsIGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCB2aWV3cyA9IGdldFNlcmlhbGl6ZWRDb250YWluZXJWaWV3cyhoeWRyYXRpb25JbmZvLCBpbmRleCkgPz8gW107XG4gIGxldCBudW1Ob2RlcyA9IDA7XG4gIGZvciAobGV0IHZpZXcgb2Ygdmlld3MpIHtcbiAgICBudW1Ob2RlcyArPSB2aWV3W05VTV9ST09UX05PREVTXSAqICh2aWV3W01VTFRJUExJRVJdID8/IDEpO1xuICB9XG4gIHJldHVybiBudW1Ob2Rlcztcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciBhIG5vZGUgaXMgYW5ub3RhdGVkIGFzIFwiZGlzY29ubmVjdGVkXCIsIGkuZS4gbm90IHByZXNlbnRcbiAqIGluIHRoZSBET00gYXQgc2VyaWFsaXphdGlvbiB0aW1lLiBXZSBzaG91bGQgbm90IGF0dGVtcHQgaHlkcmF0aW9uIGZvclxuICogc3VjaCBub2RlcyBhbmQgaW5zdGVhZCwgdXNlIGEgcmVndWxhciBcImNyZWF0aW9uIG1vZGVcIi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGlzY29ubmVjdGVkTm9kZShoeWRyYXRpb25JbmZvOiBEZWh5ZHJhdGVkVmlldywgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAvLyBDaGVjayBpZiB3ZSBhcmUgcHJvY2Vzc2luZyBkaXNjb25uZWN0ZWQgaW5mbyBmb3IgdGhlIGZpcnN0IHRpbWUuXG4gIGlmICh0eXBlb2YgaHlkcmF0aW9uSW5mby5kaXNjb25uZWN0ZWROb2RlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb25zdCBub2RlSWRzID0gaHlkcmF0aW9uSW5mby5kYXRhW0RJU0NPTk5FQ1RFRF9OT0RFU107XG4gICAgaHlkcmF0aW9uSW5mby5kaXNjb25uZWN0ZWROb2RlcyA9IG5vZGVJZHMgPyAobmV3IFNldChub2RlSWRzKSkgOiBudWxsO1xuICB9XG4gIHJldHVybiAhIWh5ZHJhdGlvbkluZm8uZGlzY29ubmVjdGVkTm9kZXM/LmhhcyhpbmRleCk7XG59XG4iXX0=