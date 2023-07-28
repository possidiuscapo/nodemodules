/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The name of an attribute that can be added to the hydration boundary node
 * (component host node) to disable hydration for the content within that boundary.
 */
export const SKIP_HYDRATION_ATTR_NAME = 'ngSkipHydration';
/**
 * Helper function to check if a given TNode has the 'ngSkipHydration' attribute.
 */
export function hasSkipHydrationAttrOnTNode(tNode) {
    const SKIP_HYDRATION_ATTR_NAME_LOWER_CASE = SKIP_HYDRATION_ATTR_NAME.toLowerCase();
    const attrs = tNode.mergedAttrs;
    if (attrs === null)
        return false;
    // only ever look at the attribute name and skip the values
    for (let i = 0; i < attrs.length; i += 2) {
        const value = attrs[i];
        // This is a marker, which means that the static attributes section is over,
        // so we can exit early.
        if (typeof value === 'number')
            return false;
        if (typeof value === 'string' && value.toLowerCase() === SKIP_HYDRATION_ATTR_NAME_LOWER_CASE) {
            return true;
        }
    }
    return false;
}
/**
 * Helper function to check if a given RElement has the 'ngSkipHydration' attribute.
 */
export function hasSkipHydrationAttrOnRElement(rNode) {
    return rNode.hasAttribute(SKIP_HYDRATION_ATTR_NAME);
}
/**
 * Checks whether a TNode has a flag to indicate that it's a part of
 * a skip hydration block.
 */
export function hasInSkipHydrationBlockFlag(tNode) {
    return (tNode.flags & 128 /* TNodeFlags.inSkipHydrationBlock */) === 128 /* TNodeFlags.inSkipHydrationBlock */;
}
/**
 * Helper function that determines if a given node is within a skip hydration block
 * by navigating up the TNode tree to see if any parent nodes have skip hydration
 * attribute.
 *
 * TODO(akushnir): this function should contain the logic of `hasInSkipHydrationBlockFlag`,
 * there is no need to traverse parent nodes when we have a TNode flag (which would also
 * make this lookup O(1)).
 */
export function isInSkipHydrationBlock(tNode) {
    let currentTNode = tNode.parent;
    while (currentTNode) {
        if (hasSkipHydrationAttrOnTNode(currentTNode)) {
            return true;
        }
        currentTNode = currentTNode.parent;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpcF9oeWRyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9oeWRyYXRpb24vc2tpcF9oeWRyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBS0g7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUcsaUJBQWlCLENBQUM7QUFFMUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsMkJBQTJCLENBQUMsS0FBWTtJQUN0RCxNQUFNLG1DQUFtQyxHQUFHLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRW5GLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFDaEMsSUFBSSxLQUFLLEtBQUssSUFBSTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ2pDLDJEQUEyRDtJQUMzRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2Qiw0RUFBNEU7UUFDNUUsd0JBQXdCO1FBQ3hCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzVDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxtQ0FBbUMsRUFBRTtZQUM1RixPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSw4QkFBOEIsQ0FBQyxLQUFlO0lBQzVELE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3RELENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsMkJBQTJCLENBQUMsS0FBWTtJQUN0RCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssNENBQWtDLENBQUMsOENBQW9DLENBQUM7QUFDN0YsQ0FBQztBQUVEOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxVQUFVLHNCQUFzQixDQUFDLEtBQVk7SUFDakQsSUFBSSxZQUFZLEdBQWUsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUM1QyxPQUFPLFlBQVksRUFBRTtRQUNuQixJQUFJLDJCQUEyQixDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzdDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztLQUNwQztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1ROb2RlLCBUTm9kZUZsYWdzfSBmcm9tICcuLi9yZW5kZXIzL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge1JFbGVtZW50fSBmcm9tICcuLi9yZW5kZXIzL2ludGVyZmFjZXMvcmVuZGVyZXJfZG9tJztcblxuLyoqXG4gKiBUaGUgbmFtZSBvZiBhbiBhdHRyaWJ1dGUgdGhhdCBjYW4gYmUgYWRkZWQgdG8gdGhlIGh5ZHJhdGlvbiBib3VuZGFyeSBub2RlXG4gKiAoY29tcG9uZW50IGhvc3Qgbm9kZSkgdG8gZGlzYWJsZSBoeWRyYXRpb24gZm9yIHRoZSBjb250ZW50IHdpdGhpbiB0aGF0IGJvdW5kYXJ5LlxuICovXG5leHBvcnQgY29uc3QgU0tJUF9IWURSQVRJT05fQVRUUl9OQU1FID0gJ25nU2tpcEh5ZHJhdGlvbic7XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIGEgZ2l2ZW4gVE5vZGUgaGFzIHRoZSAnbmdTa2lwSHlkcmF0aW9uJyBhdHRyaWJ1dGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNTa2lwSHlkcmF0aW9uQXR0ck9uVE5vZGUodE5vZGU6IFROb2RlKTogYm9vbGVhbiB7XG4gIGNvbnN0IFNLSVBfSFlEUkFUSU9OX0FUVFJfTkFNRV9MT1dFUl9DQVNFID0gU0tJUF9IWURSQVRJT05fQVRUUl9OQU1FLnRvTG93ZXJDYXNlKCk7XG5cbiAgY29uc3QgYXR0cnMgPSB0Tm9kZS5tZXJnZWRBdHRycztcbiAgaWYgKGF0dHJzID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gIC8vIG9ubHkgZXZlciBsb29rIGF0IHRoZSBhdHRyaWJ1dGUgbmFtZSBhbmQgc2tpcCB0aGUgdmFsdWVzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cnMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGF0dHJzW2ldO1xuICAgIC8vIFRoaXMgaXMgYSBtYXJrZXIsIHdoaWNoIG1lYW5zIHRoYXQgdGhlIHN0YXRpYyBhdHRyaWJ1dGVzIHNlY3Rpb24gaXMgb3ZlcixcbiAgICAvLyBzbyB3ZSBjYW4gZXhpdCBlYXJseS5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IFNLSVBfSFlEUkFUSU9OX0FUVFJfTkFNRV9MT1dFUl9DQVNFKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjaGVjayBpZiBhIGdpdmVuIFJFbGVtZW50IGhhcyB0aGUgJ25nU2tpcEh5ZHJhdGlvbicgYXR0cmlidXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzU2tpcEh5ZHJhdGlvbkF0dHJPblJFbGVtZW50KHJOb2RlOiBSRWxlbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gck5vZGUuaGFzQXR0cmlidXRlKFNLSVBfSFlEUkFUSU9OX0FUVFJfTkFNRSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgYSBUTm9kZSBoYXMgYSBmbGFnIHRvIGluZGljYXRlIHRoYXQgaXQncyBhIHBhcnQgb2ZcbiAqIGEgc2tpcCBoeWRyYXRpb24gYmxvY2suXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNJblNraXBIeWRyYXRpb25CbG9ja0ZsYWcodE5vZGU6IFROb2RlKTogYm9vbGVhbiB7XG4gIHJldHVybiAodE5vZGUuZmxhZ3MgJiBUTm9kZUZsYWdzLmluU2tpcEh5ZHJhdGlvbkJsb2NrKSA9PT0gVE5vZGVGbGFncy5pblNraXBIeWRyYXRpb25CbG9jaztcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIGlmIGEgZ2l2ZW4gbm9kZSBpcyB3aXRoaW4gYSBza2lwIGh5ZHJhdGlvbiBibG9ja1xuICogYnkgbmF2aWdhdGluZyB1cCB0aGUgVE5vZGUgdHJlZSB0byBzZWUgaWYgYW55IHBhcmVudCBub2RlcyBoYXZlIHNraXAgaHlkcmF0aW9uXG4gKiBhdHRyaWJ1dGUuXG4gKlxuICogVE9ETyhha3VzaG5pcik6IHRoaXMgZnVuY3Rpb24gc2hvdWxkIGNvbnRhaW4gdGhlIGxvZ2ljIG9mIGBoYXNJblNraXBIeWRyYXRpb25CbG9ja0ZsYWdgLFxuICogdGhlcmUgaXMgbm8gbmVlZCB0byB0cmF2ZXJzZSBwYXJlbnQgbm9kZXMgd2hlbiB3ZSBoYXZlIGEgVE5vZGUgZmxhZyAod2hpY2ggd291bGQgYWxzb1xuICogbWFrZSB0aGlzIGxvb2t1cCBPKDEpKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW5Ta2lwSHlkcmF0aW9uQmxvY2sodE5vZGU6IFROb2RlKTogYm9vbGVhbiB7XG4gIGxldCBjdXJyZW50VE5vZGU6IFROb2RlfG51bGwgPSB0Tm9kZS5wYXJlbnQ7XG4gIHdoaWxlIChjdXJyZW50VE5vZGUpIHtcbiAgICBpZiAoaGFzU2tpcEh5ZHJhdGlvbkF0dHJPblROb2RlKGN1cnJlbnRUTm9kZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjdXJyZW50VE5vZGUgPSBjdXJyZW50VE5vZGUucGFyZW50O1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==