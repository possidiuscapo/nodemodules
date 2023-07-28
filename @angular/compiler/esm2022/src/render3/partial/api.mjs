export var FactoryTarget;
(function (FactoryTarget) {
    FactoryTarget[FactoryTarget["Directive"] = 0] = "Directive";
    FactoryTarget[FactoryTarget["Component"] = 1] = "Component";
    FactoryTarget[FactoryTarget["Injectable"] = 2] = "Injectable";
    FactoryTarget[FactoryTarget["Pipe"] = 3] = "Pipe";
    FactoryTarget[FactoryTarget["NgModule"] = 4] = "NgModule";
})(FactoryTarget || (FactoryTarget = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL3JlbmRlcjMvcGFydGlhbC9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc2FBLE1BQU0sQ0FBTixJQUFZLGFBTVg7QUFORCxXQUFZLGFBQWE7SUFDdkIsMkRBQWEsQ0FBQTtJQUNiLDJEQUFhLENBQUE7SUFDYiw2REFBYyxDQUFBO0lBQ2QsaURBQVEsQ0FBQTtJQUNSLHlEQUFZLENBQUE7QUFDZCxDQUFDLEVBTlcsYUFBYSxLQUFiLGFBQWEsUUFNeEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICcuLi8uLi9jb3JlJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFIzUGFydGlhbERlY2xhcmF0aW9uIHtcbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIHZlcnNpb24gb2YgdGhlIGNvbXBpbGVyIHRoYXQgY2FuIHByb2Nlc3MgdGhpcyBwYXJ0aWFsIGRlY2xhcmF0aW9uLlxuICAgKi9cbiAgbWluVmVyc2lvbjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBWZXJzaW9uIG51bWJlciBvZiB0aGUgQW5ndWxhciBjb21waWxlciB0aGF0IHdhcyB1c2VkIHRvIGNvbXBpbGUgdGhpcyBkZWNsYXJhdGlvbi4gVGhlIGxpbmtlclxuICAgKiB3aWxsIGJlIGFibGUgdG8gZGV0ZWN0IHdoaWNoIHZlcnNpb24gYSBsaWJyYXJ5IGlzIHVzaW5nIGFuZCBpbnRlcnByZXQgaXRzIG1ldGFkYXRhIGFjY29yZGluZ2x5LlxuICAgKi9cbiAgdmVyc2lvbjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgYEBhbmd1bGFyL2NvcmVgIEVTIG1vZHVsZSwgd2hpY2ggYWxsb3dzIGFjY2Vzc1xuICAgKiB0byBhbGwgQW5ndWxhciBleHBvcnRzLCBpbmNsdWRpbmcgSXZ5IGluc3RydWN0aW9ucy5cbiAgICovXG4gIG5nSW1wb3J0OiBvLkV4cHJlc3Npb247XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgZGVjb3JhdGVkIGNsYXNzLCB3aGljaCBpcyBzdWJqZWN0IHRvIHRoaXMgcGFydGlhbCBkZWNsYXJhdGlvbi5cbiAgICovXG4gIHR5cGU6IG8uRXhwcmVzc2lvbjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIHNoYXBlIG9mIHRoZSBvYmplY3QgdGhhdCB0aGUgYMm1ybVuZ0RlY2xhcmVEaXJlY3RpdmUoKWAgZnVuY3Rpb24gYWNjZXB0cy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSM0RlY2xhcmVEaXJlY3RpdmVNZXRhZGF0YSBleHRlbmRzIFIzUGFydGlhbERlY2xhcmF0aW9uIHtcbiAgLyoqXG4gICAqIFVucGFyc2VkIHNlbGVjdG9yIG9mIHRoZSBkaXJlY3RpdmUuXG4gICAqL1xuICBzZWxlY3Rvcj86IHN0cmluZztcblxuICAvKipcbiAgICogQSBtYXBwaW5nIG9mIGlucHV0cyBmcm9tIGNsYXNzIHByb3BlcnR5IG5hbWVzIHRvIGJpbmRpbmcgcHJvcGVydHkgbmFtZXMsIG9yIHRvIGEgdHVwbGUgb2ZcbiAgICogYmluZGluZyBwcm9wZXJ0eSBuYW1lIGFuZCBjbGFzcyBwcm9wZXJ0eSBuYW1lIGlmIHRoZSBuYW1lcyBhcmUgZGlmZmVyZW50LlxuICAgKi9cbiAgaW5wdXRzPzoge1xuICAgIFtjbGFzc1Byb3BlcnR5TmFtZTogc3RyaW5nXTogc3RyaW5nfFxuICAgIFtiaW5kaW5nUHJvcGVydHlOYW1lOiBzdHJpbmcsIGNsYXNzUHJvcGVydHlOYW1lOiBzdHJpbmcsIHRyYW5zZm9ybUZ1bmN0aW9uPzogby5FeHByZXNzaW9uXVxuICB9O1xuXG4gIC8qKlxuICAgKiBBIG1hcHBpbmcgb2Ygb3V0cHV0cyBmcm9tIGNsYXNzIHByb3BlcnR5IG5hbWVzIHRvIGJpbmRpbmcgcHJvcGVydHkgbmFtZXMuXG4gICAqL1xuICBvdXRwdXRzPzoge1tjbGFzc1Byb3BlcnR5TmFtZTogc3RyaW5nXTogc3RyaW5nfTtcblxuICAvKipcbiAgICogSW5mb3JtYXRpb24gYWJvdXQgaG9zdCBiaW5kaW5ncyBwcmVzZW50IG9uIHRoZSBjb21wb25lbnQuXG4gICAqL1xuICBob3N0Pzoge1xuICAgIC8qKlxuICAgICAqIEEgbWFwcGluZyBvZiBhdHRyaWJ1dGUgbmFtZXMgdG8gdGhlaXIgdmFsdWUgZXhwcmVzc2lvbi5cbiAgICAgKi9cbiAgICBhdHRyaWJ1dGVzPzoge1trZXk6IHN0cmluZ106IG8uRXhwcmVzc2lvbn07XG5cbiAgICAvKipcbiAgICAgKiBBIG1hcHBpbmcgb2YgZXZlbnQgbmFtZXMgdG8gdGhlaXIgdW5wYXJzZWQgZXZlbnQgaGFuZGxlciBleHByZXNzaW9uLlxuICAgICAqL1xuICAgIGxpc3RlbmVyczoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG5cbiAgICAvKipcbiAgICAgKiBBIG1hcHBpbmcgb2YgYm91bmQgcHJvcGVydGllcyB0byB0aGVpciB1bnBhcnNlZCBiaW5kaW5nIGV4cHJlc3Npb24uXG4gICAgICovXG4gICAgcHJvcGVydGllcz86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9mIHRoZSBjbGFzcyBhdHRyaWJ1dGUsIGlmIHByZXNlbnQuIFRoaXMgaXMgc3RvcmVkIG91dHNpZGUgb2YgYGF0dHJpYnV0ZXNgIGFzIGl0c1xuICAgICAqIHN0cmluZyB2YWx1ZSBtdXN0IGJlIGtub3duIHN0YXRpY2FsbHkuXG4gICAgICovXG4gICAgY2xhc3NBdHRyaWJ1dGU/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2YgdGhlIHN0eWxlIGF0dHJpYnV0ZSwgaWYgcHJlc2VudC4gVGhpcyBpcyBzdG9yZWQgb3V0c2lkZSBvZiBgYXR0cmlidXRlc2AgYXMgaXRzXG4gICAgICogc3RyaW5nIHZhbHVlIG11c3QgYmUga25vd24gc3RhdGljYWxseS5cbiAgICAgKi9cbiAgICBzdHlsZUF0dHJpYnV0ZT86IHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogSW5mb3JtYXRpb24gYWJvdXQgdGhlIGNvbnRlbnQgcXVlcmllcyBtYWRlIGJ5IHRoZSBkaXJlY3RpdmUuXG4gICAqL1xuICBxdWVyaWVzPzogUjNEZWNsYXJlUXVlcnlNZXRhZGF0YVtdO1xuXG4gIC8qKlxuICAgKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgdmlldyBxdWVyaWVzIG1hZGUgYnkgdGhlIGRpcmVjdGl2ZS5cbiAgICovXG4gIHZpZXdRdWVyaWVzPzogUjNEZWNsYXJlUXVlcnlNZXRhZGF0YVtdO1xuXG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiBwcm92aWRlcnMgcHJvdmlkZWQgYnkgdGhlIGRpcmVjdGl2ZS5cbiAgICovXG4gIHByb3ZpZGVycz86IG8uRXhwcmVzc2lvbjtcblxuICAvKipcbiAgICogVGhlIG5hbWVzIGJ5IHdoaWNoIHRoZSBkaXJlY3RpdmUgaXMgZXhwb3J0ZWQuXG4gICAqL1xuICBleHBvcnRBcz86IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkaXJlY3RpdmUgaGFzIGFuIGluaGVyaXRhbmNlIGNsYXVzZS4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICB1c2VzSW5oZXJpdGFuY2U/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkaXJlY3RpdmUgaW1wbGVtZW50cyB0aGUgYG5nT25DaGFuZ2VzYCBob29rLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIHVzZXNPbkNoYW5nZXM/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkaXJlY3RpdmUgaXMgc3RhbmRhbG9uZS4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBpc1N0YW5kYWxvbmU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkaXJlY3RpdmUgaXMgYSBzaWduYWwtYmFzZWQgZGlyZWN0aXZlLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIGlzU2lnbmFsPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQWRkaXRpb25hbCBkaXJlY3RpdmVzIGFwcGxpZWQgdG8gdGhlIGRpcmVjdGl2ZSBob3N0LlxuICAgKi9cbiAgaG9zdERpcmVjdGl2ZXM/OiBSM0RlY2xhcmVIb3N0RGlyZWN0aXZlTWV0YWRhdGFbXTtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIHNoYXBlIG9mIHRoZSBvYmplY3QgdGhhdCB0aGUgYMm1ybVuZ0RlY2xhcmVDb21wb25lbnQoKWAgZnVuY3Rpb24gYWNjZXB0cy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSM0RlY2xhcmVDb21wb25lbnRNZXRhZGF0YSBleHRlbmRzIFIzRGVjbGFyZURpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIFRoZSBjb21wb25lbnQncyB1bnBhcnNlZCB0ZW1wbGF0ZSBzdHJpbmcgYXMgb3BhcXVlIGV4cHJlc3Npb24uIFRoZSB0ZW1wbGF0ZSBpcyByZXByZXNlbnRlZFxuICAgKiB1c2luZyBlaXRoZXIgYSBzdHJpbmcgbGl0ZXJhbCBvciB0ZW1wbGF0ZSBsaXRlcmFsIHdpdGhvdXQgc3Vic3RpdHV0aW9ucywgYnV0IGl0cyB2YWx1ZSBpc1xuICAgKiBub3QgcmVhZCBkaXJlY3RseS4gSW5zdGVhZCwgdGhlIHRlbXBsYXRlIHBhcnNlciBpcyBnaXZlbiB0aGUgZnVsbCBzb3VyY2UgZmlsZSdzIHRleHQgYW5kXG4gICAqIHRoZSByYW5nZSBvZiB0aGlzIGV4cHJlc3Npb24gdG8gcGFyc2UgZGlyZWN0bHkgZnJvbSBzb3VyY2UuXG4gICAqL1xuICB0ZW1wbGF0ZTogby5FeHByZXNzaW9uO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSB0ZW1wbGF0ZSB3YXMgaW5saW5lICh1c2luZyBgdGVtcGxhdGVgKSBvciBleHRlcm5hbCAodXNpbmcgYHRlbXBsYXRlVXJsYCkuXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgaXNJbmxpbmU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDU1MgZnJvbSBpbmxpbmUgc3R5bGVzIGFuZCBpbmNsdWRlZCBzdHlsZVVybHMuXG4gICAqL1xuICBzdHlsZXM/OiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogTGlzdCBvZiBjb21wb25lbnRzIHdoaWNoIG1hdGNoZWQgaW4gdGhlIHRlbXBsYXRlLCBpbmNsdWRpbmcgc3VmZmljaWVudFxuICAgKiBtZXRhZGF0YSBmb3IgZWFjaCBkaXJlY3RpdmUgdG8gYXR0cmlidXRlIGJpbmRpbmdzIGFuZCByZWZlcmVuY2VzIHdpdGhpblxuICAgKiB0aGUgdGVtcGxhdGUgdG8gZWFjaCBkaXJlY3RpdmUgc3BlY2lmaWNhbGx5LCBpZiB0aGUgcnVudGltZSBpbnN0cnVjdGlvbnNcbiAgICogc3VwcG9ydCB0aGlzLlxuICAgKi9cbiAgY29tcG9uZW50cz86IFIzRGVjbGFyZURpcmVjdGl2ZURlcGVuZGVuY3lNZXRhZGF0YVtdO1xuXG4gIC8qKlxuICAgKiBMaXN0IG9mIGRpcmVjdGl2ZXMgd2hpY2ggbWF0Y2hlZCBpbiB0aGUgdGVtcGxhdGUsIGluY2x1ZGluZyBzdWZmaWNpZW50XG4gICAqIG1ldGFkYXRhIGZvciBlYWNoIGRpcmVjdGl2ZSB0byBhdHRyaWJ1dGUgYmluZGluZ3MgYW5kIHJlZmVyZW5jZXMgd2l0aGluXG4gICAqIHRoZSB0ZW1wbGF0ZSB0byBlYWNoIGRpcmVjdGl2ZSBzcGVjaWZpY2FsbHksIGlmIHRoZSBydW50aW1lIGluc3RydWN0aW9uc1xuICAgKiBzdXBwb3J0IHRoaXMuXG4gICAqL1xuICBkaXJlY3RpdmVzPzogUjNEZWNsYXJlRGlyZWN0aXZlRGVwZW5kZW5jeU1ldGFkYXRhW107XG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgZGVwZW5kZW5jaWVzIHdoaWNoIG1hdGNoZWQgaW4gdGhlIHRlbXBsYXRlLCBpbmNsdWRpbmcgc3VmZmljaWVudFxuICAgKiBtZXRhZGF0YSBmb3IgZWFjaCBkaXJlY3RpdmUvcGlwZSB0byBhdHRyaWJ1dGUgYmluZGluZ3MgYW5kIHJlZmVyZW5jZXMgd2l0aGluXG4gICAqIHRoZSB0ZW1wbGF0ZSB0byBlYWNoIGRpcmVjdGl2ZSBzcGVjaWZpY2FsbHksIGlmIHRoZSBydW50aW1lIGluc3RydWN0aW9uc1xuICAgKiBzdXBwb3J0IHRoaXMuXG4gICAqL1xuICBkZXBlbmRlbmNpZXM/OiBSM0RlY2xhcmVUZW1wbGF0ZURlcGVuZGVuY3lNZXRhZGF0YVtdO1xuXG4gIC8qKlxuICAgKiBBIG1hcCBvZiBwaXBlIG5hbWVzIHRvIGFuIGV4cHJlc3Npb24gcmVmZXJlbmNpbmcgdGhlIHBpcGUgdHlwZSAocG9zc2libHkgYSBmb3J3YXJkIHJlZmVyZW5jZVxuICAgKiB3cmFwcGVkIGluIGEgYGZvcndhcmRSZWZgIGludm9jYXRpb24pIHdoaWNoIGFyZSB1c2VkIGluIHRoZSB0ZW1wbGF0ZS5cbiAgICovXG4gIHBpcGVzPzoge1twaXBlTmFtZTogc3RyaW5nXTogby5FeHByZXNzaW9ufCgoKSA9PiBvLkV4cHJlc3Npb24pfTtcblxuICAvKipcbiAgICogVGhlIGxpc3Qgb2YgdmlldyBwcm92aWRlcnMgZGVmaW5lZCBpbiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgdmlld1Byb3ZpZGVycz86IG8uRXhwcmVzc2lvbjtcblxuICAvKipcbiAgICogQSBjb2xsZWN0aW9uIG9mIGFuaW1hdGlvbiB0cmlnZ2VycyB0aGF0IHdpbGwgYmUgdXNlZCBpbiB0aGUgY29tcG9uZW50IHRlbXBsYXRlLlxuICAgKi9cbiAgYW5pbWF0aW9ucz86IG8uRXhwcmVzc2lvbjtcblxuICAvKipcbiAgICogU3RyYXRlZ3kgdXNlZCBmb3IgZGV0ZWN0aW5nIGNoYW5nZXMgaW4gdGhlIGNvbXBvbmVudC5cbiAgICogRGVmYXVsdHMgdG8gYENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRgLlxuICAgKi9cbiAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k7XG5cbiAgLyoqXG4gICAqIEFuIGVuY2Fwc3VsYXRpb24gcG9saWN5IGZvciB0aGUgY29tcG9uZW50J3Mgc3R5bGluZy5cbiAgICogRGVmYXVsdHMgdG8gYFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkYC5cbiAgICovXG4gIGVuY2Fwc3VsYXRpb24/OiBWaWV3RW5jYXBzdWxhdGlvbjtcblxuICAvKipcbiAgICogT3ZlcnJpZGVzIHRoZSBkZWZhdWx0IGludGVycG9sYXRpb24gc3RhcnQgYW5kIGVuZCBkZWxpbWl0ZXJzLiBEZWZhdWx0cyB0byB7eyBhbmQgfX0uXG4gICAqL1xuICBpbnRlcnBvbGF0aW9uPzogW3N0cmluZywgc3RyaW5nXTtcblxuICAvKipcbiAgICogV2hldGhlciB3aGl0ZXNwYWNlIGluIHRoZSB0ZW1wbGF0ZSBzaG91bGQgYmUgcHJlc2VydmVkLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBSM0RlY2xhcmVUZW1wbGF0ZURlcGVuZGVuY3lNZXRhZGF0YSA9IFIzRGVjbGFyZURpcmVjdGl2ZURlcGVuZGVuY3lNZXRhZGF0YXxcbiAgICBSM0RlY2xhcmVQaXBlRGVwZW5kZW5jeU1ldGFkYXRhfFIzRGVjbGFyZU5nTW9kdWxlRGVwZW5kZW5jeU1ldGFkYXRhO1xuXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZURpcmVjdGl2ZURlcGVuZGVuY3lNZXRhZGF0YSB7XG4gIGtpbmQ6ICdkaXJlY3RpdmUnfCdjb21wb25lbnQnO1xuXG4gIC8qKlxuICAgKiBTZWxlY3RvciBvZiB0aGUgZGlyZWN0aXZlLlxuICAgKi9cbiAgc2VsZWN0b3I6IHN0cmluZztcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBkaXJlY3RpdmUgY2xhc3MgKHBvc3NpYmx5IGEgZm9yd2FyZCByZWZlcmVuY2Ugd3JhcHBlZCBpbiBhIGBmb3J3YXJkUmVmYFxuICAgKiBpbnZvY2F0aW9uKS5cbiAgICovXG4gIHR5cGU6IG8uRXhwcmVzc2lvbnwoKCkgPT4gby5FeHByZXNzaW9uKTtcblxuICAvKipcbiAgICogUHJvcGVydHkgbmFtZXMgb2YgdGhlIGRpcmVjdGl2ZSdzIGlucHV0cy5cbiAgICovXG4gIGlucHV0cz86IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBFdmVudCBuYW1lcyBvZiB0aGUgZGlyZWN0aXZlJ3Mgb3V0cHV0cy5cbiAgICovXG4gIG91dHB1dHM/OiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogTmFtZXMgYnkgd2hpY2ggdGhpcyBkaXJlY3RpdmUgZXhwb3J0cyBpdHNlbGYgZm9yIHJlZmVyZW5jZXMuXG4gICAqL1xuICBleHBvcnRBcz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZVBpcGVEZXBlbmRlbmN5TWV0YWRhdGEge1xuICBraW5kOiAncGlwZSc7XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIHBpcGUgY2xhc3MgKHBvc3NpYmx5IGEgZm9yd2FyZCByZWZlcmVuY2Ugd3JhcHBlZCBpbiBhIGBmb3J3YXJkUmVmYFxuICAgKiBpbnZvY2F0aW9uKS5cbiAgICovXG4gIHR5cGU6IG8uRXhwcmVzc2lvbnwoKCkgPT4gby5FeHByZXNzaW9uKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0RlY2xhcmVOZ01vZHVsZURlcGVuZGVuY3lNZXRhZGF0YSB7XG4gIGtpbmQ6ICduZ21vZHVsZSc7XG5cbiAgdHlwZTogby5FeHByZXNzaW9ufCgoKSA9PiBvLkV4cHJlc3Npb24pO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZVF1ZXJ5TWV0YWRhdGEge1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgcHJvcGVydHkgb24gdGhlIGNsYXNzIHRvIHVwZGF0ZSB3aXRoIHF1ZXJ5IHJlc3VsdHMuXG4gICAqL1xuICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogV2hldGhlciB0byByZWFkIG9ubHkgdGhlIGZpcnN0IG1hdGNoaW5nIHJlc3VsdCwgb3IgYW4gYXJyYXkgb2YgcmVzdWx0cy4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBmaXJzdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEVpdGhlciBhbiBleHByZXNzaW9uIHJlcHJlc2VudGluZyBhIHR5cGUgKHBvc3NpYmx5IHdyYXBwZWQgaW4gYSBgZm9yd2FyZFJlZigpYCkgb3JcbiAgICogYEluamVjdGlvblRva2VuYCBmb3IgdGhlIHF1ZXJ5IHByZWRpY2F0ZSwgb3IgYSBzZXQgb2Ygc3RyaW5nIHNlbGVjdG9ycy5cbiAgICovXG4gIHByZWRpY2F0ZTogby5FeHByZXNzaW9ufHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGluY2x1ZGUgb25seSBkaXJlY3QgY2hpbGRyZW4gb3IgYWxsIGRlc2NlbmRhbnRzLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIGRlc2NlbmRhbnRzPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVHJ1ZSB0byBvbmx5IGZpcmUgY2hhbmdlcyBpZiB0aGVyZSBhcmUgdW5kZXJseWluZyBjaGFuZ2VzIHRvIHRoZSBxdWVyeS5cbiAgICovXG4gIGVtaXREaXN0aW5jdENoYW5nZXNPbmx5PzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQW4gZXhwcmVzc2lvbiByZXByZXNlbnRpbmcgYSB0eXBlIHRvIHJlYWQgZnJvbSBlYWNoIG1hdGNoZWQgbm9kZSwgb3IgbnVsbCBpZiB0aGUgZGVmYXVsdCB2YWx1ZVxuICAgKiBmb3IgYSBnaXZlbiBub2RlIGlzIHRvIGJlIHJldHVybmVkLlxuICAgKi9cbiAgcmVhZD86IG8uRXhwcmVzc2lvbjtcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhpcyBxdWVyeSBzaG91bGQgY29sbGVjdCBvbmx5IHN0YXRpYyByZXN1bHRzLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICpcbiAgICogSWYgc3RhdGljIGlzIHRydWUsIHRoZSBxdWVyeSdzIHJlc3VsdHMgd2lsbCBiZSBzZXQgb24gdGhlIGNvbXBvbmVudCBhZnRlciBub2RlcyBhcmUgY3JlYXRlZCxcbiAgICogYnV0IGJlZm9yZSBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMuIFRoaXMgbWVhbnMgdGhhdCBhbnkgcmVzdWx0cyB0aGF0IHJlbGllZCB1cG9uIGNoYW5nZSBkZXRlY3Rpb25cbiAgICogdG8gcnVuIChlLmcuIHJlc3VsdHMgaW5zaWRlICpuZ0lmIG9yICpuZ0ZvciB2aWV3cykgd2lsbCBub3QgYmUgY29sbGVjdGVkLiBRdWVyeSByZXN1bHRzIGFyZVxuICAgKiBhdmFpbGFibGUgaW4gdGhlIG5nT25Jbml0IGhvb2suXG4gICAqXG4gICAqIElmIHN0YXRpYyBpcyBmYWxzZSwgdGhlIHF1ZXJ5J3MgcmVzdWx0cyB3aWxsIGJlIHNldCBvbiB0aGUgY29tcG9uZW50IGFmdGVyIGNoYW5nZSBkZXRlY3Rpb25cbiAgICogcnVucy4gVGhpcyBtZWFucyB0aGF0IHRoZSBxdWVyeSByZXN1bHRzIGNhbiBjb250YWluIG5vZGVzIGluc2lkZSAqbmdJZiBvciAqbmdGb3Igdmlld3MsIGJ1dFxuICAgKiB0aGUgcmVzdWx0cyB3aWxsIG5vdCBiZSBhdmFpbGFibGUgaW4gdGhlIG5nT25Jbml0IGhvb2sgKG9ubHkgaW4gdGhlIG5nQWZ0ZXJDb250ZW50SW5pdCBmb3JcbiAgICogY29udGVudCBob29rcyBhbmQgbmdBZnRlclZpZXdJbml0IGZvciB2aWV3IGhvb2tzKS5cbiAgICovXG4gIHN0YXRpYz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogRGVzY3JpYmVzIHRoZSBzaGFwZSBvZiB0aGUgb2JqZWN0cyB0aGF0IHRoZSBgybXJtW5nRGVjbGFyZU5nTW9kdWxlKClgIGFjY2VwdHMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUjNEZWNsYXJlTmdNb2R1bGVNZXRhZGF0YSBleHRlbmRzIFIzUGFydGlhbERlY2xhcmF0aW9uIHtcbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV4cHJlc3Npb25zIHJlcHJlc2VudGluZyB0aGUgYm9vdHN0cmFwIGNvbXBvbmVudHMgc3BlY2lmaWVkIGJ5IHRoZSBtb2R1bGUuXG4gICAqL1xuICBib290c3RyYXA/OiBvLkV4cHJlc3Npb25bXTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZXhwcmVzc2lvbnMgcmVwcmVzZW50aW5nIHRoZSBkaXJlY3RpdmVzIGFuZCBwaXBlcyBkZWNsYXJlZCBieSB0aGUgbW9kdWxlLlxuICAgKi9cbiAgZGVjbGFyYXRpb25zPzogby5FeHByZXNzaW9uW107XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV4cHJlc3Npb25zIHJlcHJlc2VudGluZyB0aGUgaW1wb3J0cyBvZiB0aGUgbW9kdWxlLlxuICAgKi9cbiAgaW1wb3J0cz86IG8uRXhwcmVzc2lvbltdO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBleHByZXNzaW9ucyByZXByZXNlbnRpbmcgdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZS5cbiAgICovXG4gIGV4cG9ydHM/OiBvLkV4cHJlc3Npb25bXTtcblxuICAvKipcbiAgICogVGhlIHNldCBvZiBzY2hlbWFzIHRoYXQgZGVjbGFyZSBlbGVtZW50cyB0byBiZSBhbGxvd2VkIGluIHRoZSBOZ01vZHVsZS5cbiAgICovXG4gIHNjaGVtYXM/OiBvLkV4cHJlc3Npb25bXTtcblxuICAvKiogVW5pcXVlIElEIG9yIGV4cHJlc3Npb24gcmVwcmVzZW50aW5nIHRoZSB1bmlxdWUgSUQgb2YgYW4gTmdNb2R1bGUuICovXG4gIGlkPzogby5FeHByZXNzaW9uO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgc2hhcGUgb2YgdGhlIG9iamVjdHMgdGhhdCB0aGUgYMm1ybVuZ0RlY2xhcmVJbmplY3RvcigpYCBhY2NlcHRzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZUluamVjdG9yTWV0YWRhdGEgZXh0ZW5kcyBSM1BhcnRpYWxEZWNsYXJhdGlvbiB7XG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiBwcm92aWRlcnMgcHJvdmlkZWQgYnkgdGhlIGluamVjdG9yLlxuICAgKi9cbiAgcHJvdmlkZXJzPzogby5FeHByZXNzaW9uO1xuICAvKipcbiAgICogVGhlIGxpc3Qgb2YgaW1wb3J0cyBpbnRvIHRoZSBpbmplY3Rvci5cbiAgICovXG4gIGltcG9ydHM/OiBvLkV4cHJlc3Npb25bXTtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIHNoYXBlIG9mIHRoZSBvYmplY3QgdGhhdCB0aGUgYMm1ybVuZ0RlY2xhcmVQaXBlKClgIGZ1bmN0aW9uIGFjY2VwdHMuXG4gKlxuICogVGhpcyBpbnRlcmZhY2Ugc2VydmVzIHByaW1hcmlseSBhcyBkb2N1bWVudGF0aW9uLCBhcyBjb25mb3JtYW5jZSB0byB0aGlzIGludGVyZmFjZSBpcyBub3RcbiAqIGVuZm9yY2VkIGR1cmluZyBsaW5raW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZVBpcGVNZXRhZGF0YSBleHRlbmRzIFIzUGFydGlhbERlY2xhcmF0aW9uIHtcbiAgLyoqXG4gICAqIFRoZSBuYW1lIHRvIHVzZSBpbiB0ZW1wbGF0ZXMgdG8gcmVmZXIgdG8gdGhpcyBwaXBlLlxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoaXMgcGlwZSBpcyBcInB1cmVcIi5cbiAgICpcbiAgICogQSBwdXJlIHBpcGUncyBgdHJhbnNmb3JtKClgIG1ldGhvZCBpcyBvbmx5IGludm9rZWQgd2hlbiBpdHMgaW5wdXQgYXJndW1lbnRzIGNoYW5nZS5cbiAgICpcbiAgICogRGVmYXVsdDogdHJ1ZS5cbiAgICovXG4gIHB1cmU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBwaXBlIGlzIHN0YW5kYWxvbmUuXG4gICAqXG4gICAqIERlZmF1bHQ6IGZhbHNlLlxuICAgKi9cbiAgaXNTdGFuZGFsb25lPzogYm9vbGVhbjtcbn1cblxuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgc2hhcGUgb2YgdGhlIG9iamVjdCB0aGF0IHRoZSBgybXJtW5nRGVjbGFyZUZhY3RvcnkoKWAgZnVuY3Rpb24gYWNjZXB0cy5cbiAqXG4gKiBUaGlzIGludGVyZmFjZSBzZXJ2ZXMgcHJpbWFyaWx5IGFzIGRvY3VtZW50YXRpb24sIGFzIGNvbmZvcm1hbmNlIHRvIHRoaXMgaW50ZXJmYWNlIGlzIG5vdFxuICogZW5mb3JjZWQgZHVyaW5nIGxpbmtpbmcuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUjNEZWNsYXJlRmFjdG9yeU1ldGFkYXRhIGV4dGVuZHMgUjNQYXJ0aWFsRGVjbGFyYXRpb24ge1xuICAvKipcbiAgICogQSBjb2xsZWN0aW9uIG9mIGRlcGVuZGVuY2llcyB0aGF0IHRoaXMgZmFjdG9yeSByZWxpZXMgdXBvbi5cbiAgICpcbiAgICogSWYgdGhpcyBpcyBgbnVsbGAsIHRoZW4gdGhlIHR5cGUncyBjb25zdHJ1Y3RvciBpcyBub25leGlzdGVudCBhbmQgd2lsbCBiZSBpbmhlcml0ZWQgZnJvbSBhblxuICAgKiBhbmNlc3RvciBvZiB0aGUgdHlwZS5cbiAgICpcbiAgICogSWYgdGhpcyBpcyBgJ2ludmFsaWQnYCwgdGhlbiBvbmUgb3IgbW9yZSBvZiB0aGUgcGFyYW1ldGVycyB3YXNuJ3QgcmVzb2x2YWJsZSBhbmQgYW55IGF0dGVtcHQgdG9cbiAgICogdXNlIHRoZXNlIGRlcHMgd2lsbCByZXN1bHQgaW4gYSBydW50aW1lIGVycm9yLlxuICAgKi9cbiAgZGVwczogUjNEZWNsYXJlRGVwZW5kZW5jeU1ldGFkYXRhW118J2ludmFsaWQnfG51bGw7XG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgdGhlIHRhcmdldCBiZWluZyBjcmVhdGVkIGJ5IHRoZSBmYWN0b3J5LlxuICAgKi9cbiAgdGFyZ2V0OiBGYWN0b3J5VGFyZ2V0O1xufVxuXG5leHBvcnQgZW51bSBGYWN0b3J5VGFyZ2V0IHtcbiAgRGlyZWN0aXZlID0gMCxcbiAgQ29tcG9uZW50ID0gMSxcbiAgSW5qZWN0YWJsZSA9IDIsXG4gIFBpcGUgPSAzLFxuICBOZ01vZHVsZSA9IDQsXG59XG5cbi8qKlxuICogRGVzY3JpYmVzIHRoZSBzaGFwZSBvZiB0aGUgb2JqZWN0IHRoYXQgdGhlIGDJtcm1bmdEZWNsYXJlSW5qZWN0YWJsZSgpYCBmdW5jdGlvbiBhY2NlcHRzLlxuICpcbiAqIFRoaXMgaW50ZXJmYWNlIHNlcnZlcyBwcmltYXJpbHkgYXMgZG9jdW1lbnRhdGlvbiwgYXMgY29uZm9ybWFuY2UgdG8gdGhpcyBpbnRlcmZhY2UgaXMgbm90XG4gKiBlbmZvcmNlZCBkdXJpbmcgbGlua2luZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSM0RlY2xhcmVJbmplY3RhYmxlTWV0YWRhdGEgZXh0ZW5kcyBSM1BhcnRpYWxEZWNsYXJhdGlvbiB7XG4gIC8qKlxuICAgKiBJZiBwcm92aWRlZCwgc3BlY2lmaWVzIHRoYXQgdGhlIGRlY2xhcmVkIGluamVjdGFibGUgYmVsb25ncyB0byBhIHBhcnRpY3VsYXIgaW5qZWN0b3I6XG4gICAqIC0gYEluamVjdG9yVHlwZWAgc3VjaCBhcyBgTmdNb2R1bGVgLFxuICAgKiAtIGAncm9vdCdgIHRoZSByb290IGluamVjdG9yXG4gICAqIC0gYCdhbnknYCBhbGwgaW5qZWN0b3JzLlxuICAgKiBJZiBub3QgcHJvdmlkZWQsIHRoZW4gaXQgZG9lcyBub3QgYmVsb25nIHRvIGFueSBpbmplY3Rvci4gTXVzdCBiZSBleHBsaWNpdGx5IGxpc3RlZCBpbiB0aGVcbiAgICogcHJvdmlkZXJzIG9mIGFuIGluamVjdG9yLlxuICAgKi9cbiAgcHJvdmlkZWRJbj86IG8uRXhwcmVzc2lvbjtcblxuICAvKipcbiAgICogSWYgcHJvdmlkZWQsIGFuIGV4cHJlc3Npb24gdGhhdCBldmFsdWF0ZXMgdG8gYSBjbGFzcyB0byB1c2Ugd2hlbiBjcmVhdGluZyBhbiBpbnN0YW5jZSBvZiB0aGlzXG4gICAqIGluamVjdGFibGUuXG4gICAqL1xuICB1c2VDbGFzcz86IG8uRXhwcmVzc2lvbjtcblxuICAvKipcbiAgICogSWYgcHJvdmlkZWQsIGFuIGV4cHJlc3Npb24gdGhhdCBldmFsdWF0ZXMgdG8gYSBmdW5jdGlvbiB0byB1c2Ugd2hlbiBjcmVhdGluZyBhbiBpbnN0YW5jZSBvZlxuICAgKiB0aGlzIGluamVjdGFibGUuXG4gICAqL1xuICB1c2VGYWN0b3J5Pzogby5FeHByZXNzaW9uO1xuXG4gIC8qKlxuICAgKiBJZiBwcm92aWRlZCwgYW4gZXhwcmVzc2lvbiB0aGF0IGV2YWx1YXRlcyB0byBhIHRva2VuIG9mIGFub3RoZXIgaW5qZWN0YWJsZSB0aGF0IHRoaXMgaW5qZWN0YWJsZVxuICAgKiBhbGlhc2VzLlxuICAgKi9cbiAgdXNlRXhpc3Rpbmc/OiBvLkV4cHJlc3Npb247XG5cbiAgLyoqXG4gICAqIElmIHByb3ZpZGVkLCBhbiBleHByZXNzaW9uIHRoYXQgZXZhbHVhdGVzIHRvIHRoZSB2YWx1ZSBvZiB0aGUgaW5zdGFuY2Ugb2YgdGhpcyBpbmplY3RhYmxlLlxuICAgKi9cbiAgdXNlVmFsdWU/OiBvLkV4cHJlc3Npb247XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGRlcGVuZGVuY2llcyB0byBzdXBwb3J0IGluc3RhbnRpYXRpbmcgdGhpcyBpbmplY3RhYmxlIHZpYSBgdXNlQ2xhc3NgIG9yXG4gICAqIGB1c2VGYWN0b3J5YC5cbiAgICovXG4gIGRlcHM/OiBSM0RlY2xhcmVEZXBlbmRlbmN5TWV0YWRhdGFbXTtcbn1cblxuLyoqXG4gKiBNZXRhZGF0YSBpbmRpY2F0aW5nIGhvdyBhIGRlcGVuZGVuY3kgc2hvdWxkIGJlIGluamVjdGVkIGludG8gYSBmYWN0b3J5LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZURlcGVuZGVuY3lNZXRhZGF0YSB7XG4gIC8qKlxuICAgKiBBbiBleHByZXNzaW9uIHJlcHJlc2VudGluZyB0aGUgdG9rZW4gb3IgdmFsdWUgdG8gYmUgaW5qZWN0ZWQsIG9yIGBudWxsYCBpZiB0aGUgZGVwZW5kZW5jeSBpc1xuICAgKiBub3QgdmFsaWQuXG4gICAqXG4gICAqIElmIHRoaXMgZGVwZW5kZW5jeSBpcyBkdWUgdG8gdGhlIGBAQXR0cmlidXRlKClgIGRlY29yYXRvciwgdGhlbiB0aGlzIGlzIGFuIGV4cHJlc3Npb25cbiAgICogZXZhbHVhdGluZyB0byB0aGUgbmFtZSBvZiB0aGUgYXR0cmlidXRlLlxuICAgKi9cbiAgdG9rZW46IG8uRXhwcmVzc2lvbnxudWxsO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkZXBlbmRlbmN5IGlzIGluamVjdGluZyBhbiBhdHRyaWJ1dGUgdmFsdWUuXG4gICAqIERlZmF1bHQ6IGZhbHNlLlxuICAgKi9cbiAgYXR0cmlidXRlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZGVwZW5kZW5jeSBoYXMgYW4gQEhvc3QgcXVhbGlmaWVyLlxuICAgKiBEZWZhdWx0OiBmYWxzZSxcbiAgICovXG4gIGhvc3Q/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkZXBlbmRlbmN5IGhhcyBhbiBAT3B0aW9uYWwgcXVhbGlmaWVyLlxuICAgKiBEZWZhdWx0OiBmYWxzZSxcbiAgICovXG4gIG9wdGlvbmFsPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZGVwZW5kZW5jeSBoYXMgYW4gQFNlbGYgcXVhbGlmaWVyLlxuICAgKiBEZWZhdWx0OiBmYWxzZSxcbiAgICovXG4gIHNlbGY/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkZXBlbmRlbmN5IGhhcyBhbiBAU2tpcFNlbGYgcXVhbGlmaWVyLlxuICAgKiBEZWZhdWx0OiBmYWxzZSxcbiAgICovXG4gIHNraXBTZWxmPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIHNoYXBlIG9mIHRoZSBvYmplY3QgdGhhdCB0aGUgYMm1ybVuZ0RlY2xhcmVDbGFzc01ldGFkYXRhKClgIGZ1bmN0aW9uIGFjY2VwdHMuXG4gKlxuICogVGhpcyBpbnRlcmZhY2Ugc2VydmVzIHByaW1hcmlseSBhcyBkb2N1bWVudGF0aW9uLCBhcyBjb25mb3JtYW5jZSB0byB0aGlzIGludGVyZmFjZSBpcyBub3RcbiAqIGVuZm9yY2VkIGR1cmluZyBsaW5raW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZUNsYXNzTWV0YWRhdGEgZXh0ZW5kcyBSM1BhcnRpYWxEZWNsYXJhdGlvbiB7XG4gIC8qKlxuICAgKiBUaGUgQW5ndWxhciBkZWNvcmF0b3JzIG9mIHRoZSBjbGFzcy5cbiAgICovXG4gIGRlY29yYXRvcnM6IG8uRXhwcmVzc2lvbjtcblxuICAvKipcbiAgICogT3B0aW9uYWxseSBzcGVjaWZpZXMgdGhlIGNvbnN0cnVjdG9yIHBhcmFtZXRlcnMsIHRoZWlyIHR5cGVzIGFuZCB0aGUgQW5ndWxhciBkZWNvcmF0b3JzIG9mIGVhY2hcbiAgICogcGFyYW1ldGVyLiBUaGlzIHByb3BlcnR5IGlzIG9taXR0ZWQgaWYgdGhlIGNsYXNzIGRvZXMgbm90IGhhdmUgYSBjb25zdHJ1Y3Rvci5cbiAgICovXG4gIGN0b3JQYXJhbWV0ZXJzPzogby5FeHByZXNzaW9uO1xuXG4gIC8qKlxuICAgKiBPcHRpb25hbGx5IHNwZWNpZmllcyB0aGUgQW5ndWxhciBkZWNvcmF0b3JzIGFwcGxpZWQgdG8gdGhlIGNsYXNzIHByb3BlcnRpZXMuIFRoaXMgcHJvcGVydHkgaXNcbiAgICogb21pdHRlZCBpZiBubyBwcm9wZXJ0aWVzIGhhdmUgYW55IGRlY29yYXRvcnMuXG4gICAqL1xuICBwcm9wRGVjb3JhdG9ycz86IG8uRXhwcmVzc2lvbjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIHNoYXBlIG9mIHRoZSBvYmplY3QgbGl0ZXJhbCB0aGF0IGNhbiBiZVxuICogcGFzc2VkIGluIGFzIGEgcGFydCBvZiB0aGUgYGhvc3REaXJlY3RpdmVzYCBhcnJheS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSM0RlY2xhcmVIb3N0RGlyZWN0aXZlTWV0YWRhdGEge1xuICBkaXJlY3RpdmU6IG8uRXhwcmVzc2lvbjtcbiAgaW5wdXRzPzogc3RyaW5nW107XG4gIG91dHB1dHM/OiBzdHJpbmdbXTtcbn1cbiJdfQ==