/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import '../../util/ng_dev_mode';
import '../../util/ng_i18n_closure_mode';
import { assertDefined } from '../../util/assert';
import { bindingUpdated } from '../bindings';
import { applyCreateOpCodes, applyI18n, setMaskBit } from '../i18n/i18n_apply';
import { i18nAttributesFirstPass, i18nStartFirstCreatePass } from '../i18n/i18n_parse';
import { i18nPostprocess } from '../i18n/i18n_postprocess';
import { DECLARATION_COMPONENT_VIEW, FLAGS, HEADER_OFFSET, T_HOST } from '../interfaces/view';
import { getClosestRElement } from '../node_manipulation';
import { getCurrentParentTNode, getLView, getTView, nextBindingIndex, setInI18nBlock } from '../state';
import { getConstant } from '../util/view_utils';
/**
 * Marks a block of text as translatable.
 *
 * The instructions `i18nStart` and `i18nEnd` mark the translation block in the template.
 * The translation `message` is the value which is locale specific. The translation string may
 * contain placeholders which associate inner elements and sub-templates within the translation.
 *
 * The translation `message` placeholders are:
 * - `�{index}(:{block})�`: *Binding Placeholder*: Marks a location where an expression will be
 *   interpolated into. The placeholder `index` points to the expression binding index. An optional
 *   `block` that matches the sub-template in which it was declared.
 * - `�#{index}(:{block})�`/`�/#{index}(:{block})�`: *Element Placeholder*:  Marks the beginning
 *   and end of DOM element that were embedded in the original translation block. The placeholder
 *   `index` points to the element index in the template instructions set. An optional `block` that
 *   matches the sub-template in which it was declared.
 * - `�*{index}:{block}�`/`�/*{index}:{block}�`: *Sub-template Placeholder*: Sub-templates must be
 *   split up and translated separately in each angular template function. The `index` points to the
 *   `template` instruction index. A `block` that matches the sub-template in which it was declared.
 *
 * @param index A unique index of the translation in the static block.
 * @param messageIndex An index of the translation message from the `def.consts` array.
 * @param subTemplateIndex Optional sub-template index in the `message`.
 *
 * @codeGenApi
 */
export function ɵɵi18nStart(index, messageIndex, subTemplateIndex = -1) {
    const tView = getTView();
    const lView = getLView();
    const adjustedIndex = HEADER_OFFSET + index;
    ngDevMode && assertDefined(tView, `tView should be defined`);
    const message = getConstant(tView.consts, messageIndex);
    const parentTNode = getCurrentParentTNode();
    if (tView.firstCreatePass) {
        i18nStartFirstCreatePass(tView, parentTNode === null ? 0 : parentTNode.index, lView, adjustedIndex, message, subTemplateIndex);
    }
    // Set a flag that this LView has i18n blocks.
    // The flag is later used to determine whether this component should
    // be hydrated (currently hydration is not supported for i18n blocks).
    if (tView.type === 2 /* TViewType.Embedded */) {
        // Annotate host component's LView (not embedded view's LView),
        // since hydration can be skipped on per-component basis only.
        const componentLView = lView[DECLARATION_COMPONENT_VIEW];
        componentLView[FLAGS] |= 32 /* LViewFlags.HasI18n */;
    }
    else {
        lView[FLAGS] |= 32 /* LViewFlags.HasI18n */;
    }
    const tI18n = tView.data[adjustedIndex];
    const sameViewParentTNode = parentTNode === lView[T_HOST] ? null : parentTNode;
    const parentRNode = getClosestRElement(tView, sameViewParentTNode, lView);
    // If `parentTNode` is an `ElementContainer` than it has `<!--ng-container--->`.
    // When we do inserts we have to make sure to insert in front of `<!--ng-container--->`.
    const insertInFrontOf = parentTNode && (parentTNode.type & 8 /* TNodeType.ElementContainer */) ?
        lView[parentTNode.index] :
        null;
    applyCreateOpCodes(lView, tI18n.create, parentRNode, insertInFrontOf);
    setInI18nBlock(true);
}
/**
 * Translates a translation block marked by `i18nStart` and `i18nEnd`. It inserts the text/ICU nodes
 * into the render tree, moves the placeholder nodes and removes the deleted nodes.
 *
 * @codeGenApi
 */
export function ɵɵi18nEnd() {
    setInI18nBlock(false);
}
/**
 *
 * Use this instruction to create a translation block that doesn't contain any placeholder.
 * It calls both {@link i18nStart} and {@link i18nEnd} in one instruction.
 *
 * The translation `message` is the value which is locale specific. The translation string may
 * contain placeholders which associate inner elements and sub-templates within the translation.
 *
 * The translation `message` placeholders are:
 * - `�{index}(:{block})�`: *Binding Placeholder*: Marks a location where an expression will be
 *   interpolated into. The placeholder `index` points to the expression binding index. An optional
 *   `block` that matches the sub-template in which it was declared.
 * - `�#{index}(:{block})�`/`�/#{index}(:{block})�`: *Element Placeholder*:  Marks the beginning
 *   and end of DOM element that were embedded in the original translation block. The placeholder
 *   `index` points to the element index in the template instructions set. An optional `block` that
 *   matches the sub-template in which it was declared.
 * - `�*{index}:{block}�`/`�/*{index}:{block}�`: *Sub-template Placeholder*: Sub-templates must be
 *   split up and translated separately in each angular template function. The `index` points to the
 *   `template` instruction index. A `block` that matches the sub-template in which it was declared.
 *
 * @param index A unique index of the translation in the static block.
 * @param messageIndex An index of the translation message from the `def.consts` array.
 * @param subTemplateIndex Optional sub-template index in the `message`.
 *
 * @codeGenApi
 */
export function ɵɵi18n(index, messageIndex, subTemplateIndex) {
    ɵɵi18nStart(index, messageIndex, subTemplateIndex);
    ɵɵi18nEnd();
}
/**
 * Marks a list of attributes as translatable.
 *
 * @param index A unique index in the static block
 * @param values
 *
 * @codeGenApi
 */
export function ɵɵi18nAttributes(index, attrsIndex) {
    const tView = getTView();
    ngDevMode && assertDefined(tView, `tView should be defined`);
    const attrs = getConstant(tView.consts, attrsIndex);
    i18nAttributesFirstPass(tView, index + HEADER_OFFSET, attrs);
}
/**
 * Stores the values of the bindings during each update cycle in order to determine if we need to
 * update the translated nodes.
 *
 * @param value The binding's value
 * @returns This function returns itself so that it may be chained
 * (e.g. `i18nExp(ctx.name)(ctx.title)`)
 *
 * @codeGenApi
 */
export function ɵɵi18nExp(value) {
    const lView = getLView();
    setMaskBit(bindingUpdated(lView, nextBindingIndex(), value));
    return ɵɵi18nExp;
}
/**
 * Updates a translation block or an i18n attribute when the bindings have changed.
 *
 * @param index Index of either {@link i18nStart} (translation block) or {@link i18nAttributes}
 * (i18n attribute) on which it should update the content.
 *
 * @codeGenApi
 */
export function ɵɵi18nApply(index) {
    applyI18n(getTView(), getLView(), index + HEADER_OFFSET);
}
/**
 * Handles message string post-processing for internationalization.
 *
 * Handles message string post-processing by transforming it from intermediate
 * format (that might contain some markers that we need to replace) to the final
 * form, consumable by i18nStart instruction. Post processing steps include:
 *
 * 1. Resolve all multi-value cases (like [�*1:1��#2:1�|�#4:1�|�5�])
 * 2. Replace all ICU vars (like "VAR_PLURAL")
 * 3. Replace all placeholders used inside ICUs in a form of {PLACEHOLDER}
 * 4. Replace all ICU references with corresponding values (like �ICU_EXP_ICU_1�)
 *    in case multiple ICUs have the same placeholder name
 *
 * @param message Raw translation string for post processing
 * @param replacements Set of replacements that should be applied
 *
 * @returns Transformed string that can be consumed by i18nStart instruction
 *
 * @codeGenApi
 */
export function ɵɵi18nPostprocess(message, replacements = {}) {
    return i18nPostprocess(message, replacements);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW5zdHJ1Y3Rpb25zL2kxOG4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLGlDQUFpQyxDQUFDO0FBRXpDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDN0UsT0FBTyxFQUFDLHVCQUF1QixFQUFFLHdCQUF3QixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDckYsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBR3pELE9BQU8sRUFBQywwQkFBMEIsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFjLE1BQU0sRUFBWSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ILE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNyRyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQ3ZCLEtBQWEsRUFBRSxZQUFvQixFQUFFLG1CQUEyQixDQUFDLENBQUM7SUFDcEUsTUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDekIsTUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDekIsTUFBTSxhQUFhLEdB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QzdELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxLQUFhO0lBQ3ZDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUM3QixPQUFlLEVBQUUsZUFBbUQsRUFBRTtJQUN4RSxPQUFPLGVBQWUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDaEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICcuLi8uLi91dGlsL25nX2Rldl9tb2RlJztcbmltcG9ydCAnLi4vLi4vdXRpbC9uZ19pMThuX2Nsb3N1cmVfbW9kZSc7XG5cbmltcG9ydCB7YXNzZXJ0RGVmaW5lZH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHtiaW5kaW5nVXBkYXRlZH0gZnJvbSAnLi4vYmluZGluZ3MnO1xuaW1wb3J0IHthcHBseUNyZWF0ZU9wQ29kZXMsIGFwcGx5STE4biwgc2V0TWFza0JpdH0gZnJvbSAnLi4vaTE4bi9pMThuX2FwcGx5JztcbmltcG9ydCB7aTE4bkF0dHJpYnV0ZXNGaXJzdFBhc3MsIGkxOG5TdGFydEZpcnN0Q3JlYXRlUGFzc30gZnJvbSAnLi4vaTE4bi9pMThuX3BhcnNlJztcbmltcG9ydCB7aTE4blBvc3Rwcm9jZXNzfSBmcm9tICcuLi9pMThuL2kxOG5fcG9zdHByb2Nlc3MnO1xuaW1wb3J0IHtUSTE4bn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pMThuJztcbmltcG9ydCB7VEVsZW1lbnROb2RlLCBUTm9kZVR5cGV9IGZyb20gJy4uL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXLCBGTEFHUywgSEVBREVSX09GRlNFVCwgTFZpZXdGbGFncywgVF9IT1NULCBUVmlld1R5cGV9IGZyb20gJy4uL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge2dldENsb3Nlc3RSRWxlbWVudH0gZnJvbSAnLi4vbm9kZV9tYW5pcHVsYXRpb24nO1xuaW1wb3J0IHtnZXRDdXJyZW50UGFyZW50VE5vZGUsIGdldExWaWV3LCBnZXRUVmlldywgbmV4dEJpbmRpbmdJbmRleCwgc2V0SW5JMThuQmxvY2t9IGZyb20gJy4uL3N0YXRlJztcbmltcG9ydCB7Z2V0Q29uc3RhbnR9IGZyb20gJy4uL3V0aWwvdmlld191dGlscyc7XG5cbi8qKlxuICogTWFya3MgYSBibG9jayBvZiB0ZXh0IGFzIHRyYW5zbGF0YWJsZS5cbiAqXG4gKiBUaGUgaW5zdHJ1Y3Rpb25zIGBpMThuU3RhcnRgIGFuZCBgaTE4bkVuZGAgbWFyayB0aGUgdHJhbnNsYXRpb24gYmxvY2sgaW4gdGhlIHRlbXBsYXRlLlxuICogVGhlIHRyYW5zbGF0aW9uIGBtZXNzYWdlYCBpcyB0aGUgdmFsdWUgd2hpY2ggaXMgbG9jYWxlIHNwZWNpZmljLiBUaGUgdHJhbnNsYXRpb24gc3RyaW5nIG1heVxuICogY29udGFpbiBwbGFjZWhvbGRlcnMgd2hpY2ggYXNzb2NpYXRlIGlubmVyIGVsZW1lbnRzIGFuZCBzdWItdGVtcGxhdGVzIHdpdGhpbiB0aGUgdHJhbnNsYXRpb24uXG4gKlxuICogVGhlIHRyYW5zbGF0aW9uIGBtZXNzYWdlYCBwbGFjZWhvbGRlcnMgYXJlOlxuICogLSBg77+9e2luZGV4fSg6e2Jsb2NrfSnvv71gOiAqQmluZGluZyBQbGFjZWhvbGRlcio6IE1hcmtzIGEgbG9jYXRpb24gd2hlcmUgYW4gZXhwcmVzc2lvbiB3aWxsIGJlXG4gKiAgIGludGVycG9sYXRlZCBpbnRvLiBUaGUgcGxhY2Vob2xkZXIgYGluZGV4YCBwb2ludHMgdG8gdGhlIGV4cHJlc3Npb24gYmluZGluZyBpbmRleC4gQW4gb3B0aW9uYWxcbiAqICAgYGJsb2NrYCB0aGF0IG1hdGNoZXMgdGhlIHN1Yi10ZW1wbGF0ZSBpbiB3aGljaCBpdCB3YXMgZGVjbGFyZWQuXG4gKiAtIGDvv70je2luZGV4fSg6e2Jsb2NrfSnvv71gL2Dvv70vI3tpbmRleH0oOntibG9ja30p77+9YDogKkVsZW1lbnQgUGxhY2Vob2xkZXIqOiAgTWFya3MgdGhlIGJlZ2lubmluZ1xuICogICBhbmQgZW5kIG9mIERPTSBlbGVtZW50IHRoYXQgd2VyZSBlbWJlZGRlZCBpbiB0aGUgb3JpZ2luYWwgdHJhbnNsYXRpb24gYmxvY2suIFRoZSBwbGFjZWhvbGRlclxuICogICBgaW5kZXhgIHBvaW50cyB0byB0aGUgZWxlbWVudCBpbmRleCBpbiB0aGUgdGVtcGxhdGUgaW5zdHJ1Y3Rpb25zIHNldC4gQW4gb3B0aW9uYWwgYGJsb2NrYCB0aGF0XG4gKiAgIG1hdGNoZXMgdGhlIHN1Yi10ZW1wbGF0ZSBpbiB3aGljaCBpdCB3YXMgZGVjbGFyZWQuXG4gKiAtIGDvv70qe2luZGV4fTp7YmxvY2t977+9YC9g77+9Lyp7aW5kZXh9OntibG9ja33vv71gOiAqU3ViLXRlbXBsYXRlIFBsYWNlaG9sZGVyKjogU3ViLXRlbXBsYXRlcyBtdXN0IGJlXG4gKiAgIHNwbGl0IHVwIGFuZCB0cmFuc2xhdGVkIHNlcGFyYXRlbHkgaW4gZWFjaCBhbmd1bGFyIHRlbXBsYXRlIGZ1bmN0aW9uLiBUaGUgYGluZGV4YCBwb2ludHMgdG8gdGhlXG4gKiAgIGB0ZW1wbGF0ZWAgaW5zdHJ1Y3Rpb24gaW5kZXguIEEgYGJsb2NrYCB0aGF0IG1hdGNoZXMgdGhlIHN1Yi10ZW1wbGF0ZSBpbiB3aGljaCBpdCB3YXMgZGVjbGFyZWQuXG4gKlxuICogQHBhcmFtIGluZGV4IEEgdW5pcXVlIGluZGV4IG9mIHRoZSB0cmFuc2xhdGlvbiBpbiB0aGUgc3RhdGljIGJsb2NrLlxuICogQHBhcmFtIG1lc3NhZ2VJbmRleCBBbiBpbmRleCBvZiB0aGUgdHJhbnNsYXRpb24gbWVzc2FnZSBmcm9tIHRoZSBgZGVmLmNvbnN0c2AgYXJyYXkuXG4gKiBAcGFyYW0gc3ViVGVtcGxhdGVJbmRleCBPcHRpb25hbCBzdWItdGVtcGxhdGUgaW5kZXggaW4gdGhlIGBtZXNzYWdlYC5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWkxOG5TdGFydChcbiAgICBpbmRleDogbnVtYmVyLCBtZXNzYWdlSW5kZXg6IG51bWJlciwgc3ViVGVtcGxhdGVJbmRleDogbnVtYmVyID0gLTEpOiB2b2lkIHtcbiAgY29uc3QgdFZpZXcgPSBnZXRUVmlldygpO1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IGFkanVzdGVkSW5kZXggPSBIRUFERVJfT0ZGU0VUICsgaW5kZXg7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHRWaWV3LCBgdFZpZXcgc2hvdWxkIGJlIGRlZmluZWRgKTtcbiAgY29uc3QgbWVzc2FnZSA9IGdldENvbnN0YW50PHN0cmluZz4odFZpZXcuY29uc3RzLCBtZXNzYWdlSW5kZXgpITtcbiAgY29uc3QgcGFyZW50VE5vZGUgPSBnZXRDdXJyZW50UGFyZW50VE5vZGUoKSBhcyBURWxlbWVudE5vZGUgfCBudWxsO1xuICBpZiAodFZpZXcuZmlyc3RDcmVhdGVQYXNzKSB7XG4gICAgaTE4blN0YXJ0Rmlyc3RDcmVhdGVQYXNzKFxuICAgICAgICB0VmlldywgcGFyZW50VE5vZGUgPT09IG51bGwgPyAwIDogcGFyZW50VE5vZGUuaW5kZXgsIGxWaWV3LCBhZGp1c3RlZEluZGV4LCBtZXNzYWdlLFxuICAgICAgICBzdWJUZW1wbGF0ZUluZGV4KTtcbiAgfVxuXG4gIC8vIFNldCBhIGZsYWcgdGhhdCB0aGlzIExWaWV3IGhhcyBpMThuIGJsb2Nrcy5cbiAgLy8gVGhlIGZsYWcgaXMgbGF0ZXIgdXNlZCB0byBkZXRlcm1pbmUgd2hldGhlciB0aGlzIGNvbXBvbmVudCBzaG91bGRcbiAgLy8gYmUgaHlkcmF0ZWQgKGN1cnJlbnRseSBoeWRyYXRpb24gaXMgbm90IHN1cHBvcnRlZCBmb3IgaTE4biBibG9ja3MpLlxuICBpZiAodFZpZXcudHlwZSA9PT0gVFZpZXdUeXBlLkVtYmVkZGVkKSB7XG4gICAgLy8gQW5ub3RhdGUgaG9zdCBjb21wb25lbnQncyBMVmlldyAobm90IGVtYmVkZGVkIHZpZXcncyBMVmlldyksXG4gICAgLy8gc2luY2UgaHlkcmF0aW9uIGNhbiBiZSBza2lwcGVkIG9uIHBlci1jb21wb25lbnQgYmFzaXMgb25seS5cbiAgICBjb25zdCBjb21wb25lbnRMVmlldyA9IGxWaWV3W0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXXTtcbiAgICBjb21wb25lbnRMVmlld1tGTEFHU10gfD0gTFZpZXdGbGFncy5IYXNJMThuO1xuICB9IGVsc2Uge1xuICAgIGxWaWV3W0ZMQUdTXSB8PSBMVmlld0ZsYWdzLkhhc0kxOG47XG4gIH1cblxuICBjb25zdCB0STE4biA9IHRWaWV3LmRhdGFbYWRqdXN0ZWRJbmRleF0gYXMgVEkxOG47XG4gIGNvbnN0IHNhbWVWaWV3UGFyZW50VE5vZGUgPSBwYXJlbnRUTm9kZSA9PT0gbFZpZXdbVF9IT1NUXSA/IG51bGwgOiBwYXJlbnRUTm9kZTtcbiAgY29uc3QgcGFyZW50Uk5vZGUgPSBnZXRDbG9zZXN0UkVsZW1lbnQodFZpZXcsIHNhbWVWaWV3UGFyZW50VE5vZGUsIGxWaWV3KTtcbiAgLy8gSWYgYHBhcmVudFROb2RlYCBpcyBhbiBgRWxlbWVudENvbnRhaW5lcmAgdGhhbiBpdCBoYXMgYDwhLS1uZy1jb250YWluZXItLS0+YC5cbiAgLy8gV2hlbiB3ZSBkbyBpbnNlcnRzIHdlIGhhdmUgdG8gbWFrZSBzdXJlIHRvIGluc2VydCBpbiBmcm9udCBvZiBgPCEtLW5nLWNvbnRhaW5lci0tLT5gLlxuICBjb25zdCBpbnNlcnRJbkZyb250T2YgPSBwYXJlbnRUTm9kZSAmJiAocGFyZW50VE5vZGUudHlwZSAmIFROb2RlVHlwZS5FbGVtZW50Q29udGFpbmVyKSA/XG4gICAgICBsVmlld1twYXJlbnRUTm9kZS5pbmRleF0gOlxuICAgICAgbnVsbDtcbiAgYXBwbHlDcmVhdGVPcENvZGVzKGxWaWV3LCB0STE4bi5jcmVhdGUsIHBhcmVudFJOb2RlLCBpbnNlcnRJbkZyb250T2YpO1xuICBzZXRJbkkxOG5CbG9jayh0cnVlKTtcbn1cblxuXG5cbi8qKlxuICogVHJhbnNsYXRlcyBhIHRyYW5zbGF0aW9uIGJsb2NrIG1hcmtlZCBieSBgaTE4blN0YXJ0YCBhbmQgYGkxOG5FbmRgLiBJdCBpbnNlcnRzIHRoZSB0ZXh0L0lDVSBub2Rlc1xuICogaW50byB0aGUgcmVuZGVyIHRyZWUsIG1vdmVzIHRoZSBwbGFjZWhvbGRlciBub2RlcyBhbmQgcmVtb3ZlcyB0aGUgZGVsZXRlZCBub2Rlcy5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWkxOG5FbmQoKTogdm9pZCB7XG4gIHNldEluSTE4bkJsb2NrKGZhbHNlKTtcbn1cblxuLyoqXG4gKlxuICogVXNlIHRoaXMgaW5zdHJ1Y3Rpb24gdG8gY3JlYXRlIGEgdHJhbnNsYXRpb24gYmxvY2sgdGhhdCBkb2Vzbid0IGNvbnRhaW4gYW55IHBsYWNlaG9sZGVyLlxuICogSXQgY2FsbHMgYm90aCB7QGxpbmsgaTE4blN0YXJ0fSBhbmQge0BsaW5rIGkxOG5FbmR9IGluIG9uZSBpbnN0cnVjdGlvbi5cbiAqXG4gKiBUaGUgdHJhbnNsYXRpb24gYG1lc3NhZ2VgIGlzIHRoZSB2YWx1ZSB3aGljaCBpcyBsb2NhbGUgc3BlY2lmaWMuIFRoZSB0cmFuc2xhdGlvbiBzdHJpbmcgbWF5XG4gKiBjb250YWluIHBsYWNlaG9sZGVycyB3aGljaCBhc3NvY2lhdGUgaW5uZXIgZWxlbWVudHMgYW5kIHN1Yi10ZW1wbGF0ZXMgd2l0aGluIHRoZSB0cmFuc2xhdGlvbi5cbiAqXG4gKiBUaGUgdHJhbnNsYXRpb24gYG1lc3NhZ2VgIHBsYWNlaG9sZGVycyBhcmU6XG4gKiAtIGDvv717aW5kZXh9KDp7YmxvY2t9Ke+/vWA6ICpCaW5kaW5nIFBsYWNlaG9sZGVyKjogTWFya3MgYSBsb2NhdGlvbiB3aGVyZSBhbiBleHByZXNzaW9uIHdpbGwgYmVcbiAqICAgaW50ZXJwb2xhdGVkIGludG8uIFRoZSBwbGFjZWhvbGRlciBgaW5kZXhgIHBvaW50cyB0byB0aGUgZXhwcmVzc2lvbiBiaW5kaW5nIGluZGV4LiBBbiBvcHRpb25hbFxuICogICBgYmxvY2tgIHRoYXQgbWF0Y2hlcyB0aGUgc3ViLXRlbXBsYXRlIGluIHdoaWNoIGl0IHdhcyBkZWNsYXJlZC5cbiAqIC0gYO+/vSN7aW5kZXh9KDp7YmxvY2t9Ke+/vWAvYO+/vS8je2luZGV4fSg6e2Jsb2NrfSnvv71gOiAqRWxlbWVudCBQbGFjZWhvbGRlcio6ICBNYXJrcyB0aGUgYmVnaW5uaW5nXG4gKiAgIGFuZCBlbmQgb2YgRE9NIGVsZW1lbnQgdGhhdCB3ZXJlIGVtYmVkZGVkIGluIHRoZSBvcmlnaW5hbCB0cmFuc2xhdGlvbiBibG9jay4gVGhlIHBsYWNlaG9sZGVyXG4gKiAgIGBpbmRleGAgcG9pbnRzIHRvIHRoZSBlbGVtZW50IGluZGV4IGluIHRoZSB0ZW1wbGF0ZSBpbnN0cnVjdGlvbnMgc2V0LiBBbiBvcHRpb25hbCBgYmxvY2tgIHRoYXRcbiAqICAgbWF0Y2hlcyB0aGUgc3ViLXRlbXBsYXRlIGluIHdoaWNoIGl0IHdhcyBkZWNsYXJlZC5cbiAqIC0gYO+/vSp7aW5kZXh9OntibG9ja33vv71gL2Dvv70vKntpbmRleH06e2Jsb2Nrfe+/vWA6ICpTdWItdGVtcGxhdGUgUGxhY2Vob2xkZXIqOiBTdWItdGVtcGxhdGVzIG11c3QgYmVcbiAqICAgc3BsaXQgdXAgYW5kIHRyYW5zbGF0ZWQgc2VwYXJhdGVseSBpbiBlYWNoIGFuZ3VsYXIgdGVtcGxhdGUgZnVuY3Rpb24uIFRoZSBgaW5kZXhgIHBvaW50cyB0byB0aGVcbiAqICAgYHRlbXBsYXRlYCBpbnN0cnVjdGlvbiBpbmRleC4gQSBgYmxvY2tgIHRoYXQgbWF0Y2hlcyB0aGUgc3ViLXRlbXBsYXRlIGluIHdoaWNoIGl0IHdhcyBkZWNsYXJlZC5cbiAqXG4gKiBAcGFyYW0gaW5kZXggQSB1bmlxdWUgaW5kZXggb2YgdGhlIHRyYW5zbGF0aW9uIGluIHRoZSBzdGF0aWMgYmxvY2suXG4gKiBAcGFyYW0gbWVzc2FnZUluZGV4IEFuIGluZGV4IG9mIHRoZSB0cmFuc2xhdGlvbiBtZXNzYWdlIGZyb20gdGhlIGBkZWYuY29uc3RzYCBhcnJheS5cbiAqIEBwYXJhbSBzdWJUZW1wbGF0ZUluZGV4IE9wdGlvbmFsIHN1Yi10ZW1wbGF0ZSBpbmRleCBpbiB0aGUgYG1lc3NhZ2VgLlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1aTE4bihpbmRleDogbnVtYmVyLCBtZXNzYWdlSW5kZXg6IG51bWJlciwgc3ViVGVtcGxhdGVJbmRleD86IG51bWJlcik6IHZvaWQge1xuICDJtcm1aTE4blN0YXJ0KGluZGV4LCBtZXNzYWdlSW5kZXgsIHN1YlRlbXBsYXRlSW5kZXgpO1xuICDJtcm1aTE4bkVuZCgpO1xufVxuXG4vKipcbiAqIE1hcmtzIGEgbGlzdCBvZiBhdHRyaWJ1dGVzIGFzIHRyYW5zbGF0YWJsZS5cbiAqXG4gKiBAcGFyYW0gaW5kZXggQSB1bmlxdWUgaW5kZXggaW4gdGhlIHN0YXRpYyBibG9ja1xuICogQHBhcmFtIHZhbHVlc1xuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1aTE4bkF0dHJpYnV0ZXMoaW5kZXg6IG51bWJlciwgYXR0cnNJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IHRWaWV3ID0gZ2V0VFZpZXcoKTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQodFZpZXcsIGB0VmlldyBzaG91bGQgYmUgZGVmaW5lZGApO1xuICBjb25zdCBhdHRycyA9IGdldENvbnN0YW50PHN0cmluZ1tdPih0Vmlldy5jb25zdHMsIGF0dHJzSW5kZXgpITtcbiAgaTE4bkF0dHJpYnV0ZXNGaXJzdFBhc3ModFZpZXcsIGluZGV4ICsgSEVBREVSX09GRlNFVCwgYXR0cnMpO1xufVxuXG5cbi8qKlxuICogU3RvcmVzIHRoZSB2YWx1ZXMgb2YgdGhlIGJpbmRpbmdzIGR1cmluZyBlYWNoIHVwZGF0ZSBjeWNsZSBpbiBvcmRlciB0byBkZXRlcm1pbmUgaWYgd2UgbmVlZCB0b1xuICogdXBkYXRlIHRoZSB0cmFuc2xhdGVkIG5vZGVzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgYmluZGluZydzIHZhbHVlXG4gKiBAcmV0dXJucyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgaXRzZWxmIHNvIHRoYXQgaXQgbWF5IGJlIGNoYWluZWRcbiAqIChlLmcuIGBpMThuRXhwKGN0eC5uYW1lKShjdHgudGl0bGUpYClcbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWkxOG5FeHA8VD4odmFsdWU6IFQpOiB0eXBlb2YgybXJtWkxOG5FeHAge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIHNldE1hc2tCaXQoYmluZGluZ1VwZGF0ZWQobFZpZXcsIG5leHRCaW5kaW5nSW5kZXgoKSwgdmFsdWUpKTtcbiAgcmV0dXJuIMm1ybVpMThuRXhwO1xufVxuXG4vKipcbiAqIFVwZGF0ZXMgYSB0cmFuc2xhdGlvbiBibG9jayBvciBhbiBpMThuIGF0dHJpYnV0ZSB3aGVuIHRoZSBiaW5kaW5ncyBoYXZlIGNoYW5nZWQuXG4gKlxuICogQHBhcmFtIGluZGV4IEluZGV4IG9mIGVpdGhlciB7QGxpbmsgaTE4blN0YXJ0fSAodHJhbnNsYXRpb24gYmxvY2spIG9yIHtAbGluayBpMThuQXR0cmlidXRlc31cbiAqIChpMThuIGF0dHJpYnV0ZSkgb24gd2hpY2ggaXQgc2hvdWxkIHVwZGF0ZSB0aGUgY29udGVudC5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWkxOG5BcHBseShpbmRleDogbnVtYmVyKSB7XG4gIGFwcGx5STE4bihnZXRUVmlldygpLCBnZXRMVmlldygpLCBpbmRleCArIEhFQURFUl9PRkZTRVQpO1xufVxuXG4vKipcbiAqIEhhbmRsZXMgbWVzc2FnZSBzdHJpbmcgcG9zdC1wcm9jZXNzaW5nIGZvciBpbnRlcm5hdGlvbmFsaXphdGlvbi5cbiAqXG4gKiBIYW5kbGVzIG1lc3NhZ2Ugc3RyaW5nIHBvc3QtcHJvY2Vzc2luZyBieSB0cmFuc2Zvcm1pbmcgaXQgZnJvbSBpbnRlcm1lZGlhdGVcbiAqIGZvcm1hdCAodGhhdCBtaWdodCBjb250YWluIHNvbWUgbWFya2VycyB0aGF0IHdlIG5lZWQgdG8gcmVwbGFjZSkgdG8gdGhlIGZpbmFsXG4gKiBmb3JtLCBjb25zdW1hYmxlIGJ5IGkxOG5TdGFydCBpbnN0cnVjdGlvbi4gUG9zdCBwcm9jZXNzaW5nIHN0ZXBzIGluY2x1ZGU6XG4gKlxuICogMS4gUmVzb2x2ZSBhbGwgbXVsdGktdmFsdWUgY2FzZXMgKGxpa2UgW++/vSoxOjHvv73vv70jMjox77+9fO+/vSM0OjHvv71877+9Ne+/vV0pXG4gKiAyLiBSZXBsYWNlIGFsbCBJQ1UgdmFycyAobGlrZSBcIlZBUl9QTFVSQUxcIilcbiAqIDMuIFJlcGxhY2UgYWxsIHBsYWNlaG9sZGVycyB1c2VkIGluc2lkZSBJQ1VzIGluIGEgZm9ybSBvZiB7UExBQ0VIT0xERVJ9XG4gKiA0LiBSZXBsYWNlIGFsbCBJQ1UgcmVmZXJlbmNlcyB3aXRoIGNvcnJlc3BvbmRpbmcgdmFsdWVzIChsaWtlIO+/vUlDVV9FWFBfSUNVXzHvv70pXG4gKiAgICBpbiBjYXNlIG11bHRpcGxlIElDVXMgaGF2ZSB0aGUgc2FtZSBwbGFjZWhvbGRlciBuYW1lXG4gKlxuICogQHBhcmFtIG1lc3NhZ2UgUmF3IHRyYW5zbGF0aW9uIHN0cmluZyBmb3IgcG9zdCBwcm9jZXNzaW5nXG4gKiBAcGFyYW0gcmVwbGFjZW1lbnRzIFNldCBvZiByZXBsYWNlbWVudHMgdGhhdCBzaG91bGQgYmUgYXBwbGllZFxuICpcbiAqIEByZXR1cm5zIFRyYW5zZm9ybWVkIHN0cmluZyB0aGF0IGNhbiBiZSBjb25zdW1lZCBieSBpMThuU3RhcnQgaW5zdHJ1Y3Rpb25cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWkxOG5Qb3N0cHJvY2VzcyhcbiAgICBtZXNzYWdlOiBzdHJpbmcsIHJlcGxhY2VtZW50czoge1trZXk6IHN0cmluZ106IChzdHJpbmd8c3RyaW5nW10pfSA9IHt9KTogc3RyaW5nIHtcbiAgcmV0dXJuIGkxOG5Qb3N0cHJvY2VzcyhtZXNzYWdlLCByZXBsYWNlbWVudHMpO1xufVxuIl19