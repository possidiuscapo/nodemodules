/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Transforms a value (typically a string) to a boolean.
 * Intended to be used as a transform function of an input.
 * @param value Value to be transformed.
 *
 * @publicApi
 */
export function booleanAttribute(value) {
    return typeof value === 'boolean' ? value : (value != null && value !== 'false');
}
/**
 * Transforms a value (typically a string) to a number.
 * Intended to be used as a transform function of an input.
 * @param value Value to be transformed.
 * @param fallbackValue Value to use if the provided value can't be parsed as a number.
 *
 * @publicApi
 */
export function numberAttribute(value, fallbackValue = NaN) {
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    const isNumberValue = !isNaN(parseFloat(value)) && !isNaN(Number(value));
    return isNumberValue ? Number(value) : fallbackValue;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29lcmNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy91dGlsL2NvZXJjaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVIOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxLQUFjO0lBQzdDLE9BQU8sT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssT0FBTyxDQUFDLENBQUM7QUFDbkYsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFDLEtBQWMsRUFBRSxhQUFhLEdBQUcsR0FBRztJQUNqRSxpR0FBaUc7SUFDakcsNEZBQTRGO0lBQzVGLG9GQUFvRjtJQUNwRixNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoRixPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7QUFDdkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYSB2YWx1ZSAodHlwaWNhbGx5IGEgc3RyaW5nKSB0byBhIGJvb2xlYW4uXG4gKiBJbnRlbmRlZCB0byBiZSB1c2VkIGFzIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIG9mIGFuIGlucHV0LlxuICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIGJlIHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJvb2xlYW5BdHRyaWJ1dGUodmFsdWU6IHVua25vd24pOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nID8gdmFsdWUgOiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gJ2ZhbHNlJyk7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhIHZhbHVlICh0eXBpY2FsbHkgYSBzdHJpbmcpIHRvIGEgbnVtYmVyLlxuICogSW50ZW5kZWQgdG8gYmUgdXNlZCBhcyBhIHRyYW5zZm9ybSBmdW5jdGlvbiBvZiBhbiBpbnB1dC5cbiAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSB0byBiZSB0cmFuc2Zvcm1lZC5cbiAqIEBwYXJhbSBmYWxsYmFja1ZhbHVlIFZhbHVlIHRvIHVzZSBpZiB0aGUgcHJvdmlkZWQgdmFsdWUgY2FuJ3QgYmUgcGFyc2VkIGFzIGEgbnVtYmVyLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG51bWJlckF0dHJpYnV0ZSh2YWx1ZTogdW5rbm93biwgZmFsbGJhY2tWYWx1ZSA9IE5hTik6IG51bWJlciB7XG4gIC8vIHBhcnNlRmxvYXQodmFsdWUpIGhhbmRsZXMgbW9zdCBvZiB0aGUgY2FzZXMgd2UncmUgaW50ZXJlc3RlZCBpbiAoaXQgdHJlYXRzIG51bGwsIGVtcHR5IHN0cmluZyxcbiAgLy8gYW5kIG90aGVyIG5vbi1udW1iZXIgdmFsdWVzIGFzIE5hTiwgd2hlcmUgTnVtYmVyIGp1c3QgdXNlcyAwKSBidXQgaXQgY29uc2lkZXJzIHRoZSBzdHJpbmdcbiAgLy8gJzEyM2hlbGxvJyB0byBiZSBhIHZhbGlkIG51bWJlci4gVGhlcmVmb3JlIHdlIGFsc28gY2hlY2sgaWYgTnVtYmVyKHZhbHVlKSBpcyBOYU4uXG4gIGNvbnN0IGlzTnVtYmVyVmFsdWUgPSAhaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSBhcyBhbnkpKSAmJiAhaXNOYU4oTnVtYmVyKHZhbHVlKSk7XG4gIHJldHVybiBpc051bWJlclZhbHVlID8gTnVtYmVyKHZhbHVlKSA6IGZhbGxiYWNrVmFsdWU7XG59XG4iXX0=