import { buildAnimationAst } from '../dsl/animation_ast_builder';
import { buildTrigger } from '../dsl/animation_trigger';
import { triggerBuildFailed } from '../error_helpers';
import { warnTriggerBuild } from '../warning_helpers';
import { parseTimelineCommand } from './shared';
import { TimelineAnimationEngine } from './timeline_animation_engine';
import { TransitionAnimationEngine } from './transition_animation_engine';
export class AnimationEngine {
    constructor(bodyNode, _driver, _normalizer) {
        this.bodyNode = bodyNode;
        this._driver = _driver;
        this._normalizer = _normalizer;
        this._triggerCache = {};
        // this method is designed to be overridden by the code that uses this engine
        this.onRemovalComplete = (element, context) => { };
        this._transitionEngine = new TransitionAnimationEngine(bodyNode, _driver, _normalizer);
        this._timelineEngine = new TimelineAnimationEngine(bodyNode, _driver, _normalizer);
        this._transitionEngine.onRemovalComplete = (element, context) => this.onRemovalComplete(element, context);
    }
    registerTrigger(componentId, namespaceId, hostElement, name, metadata) {
        const cacheKey = componentId + '-' + name;
        let trigger = this._triggerCache[cacheKey];
        if (!trigger) {
            const errors = [];
            const warnings = [];
            const ast = buildAnimationAst(this._driver, metadata, errors, warnings);
            if (errors.length) {
                throw triggerBuildFailed(name, errors);
            }
            if (warnings.length) {
                warnTriggerBuild(name, warnings);
            }
            trigger = buildTrigger(name, ast, this._normalizer);
            this._triggerCache[cacheKey] = trigger;
        }
        this._transitionEngine.registerTrigger(namespaceId, name, trigger);
    }
    register(namespaceId, hostElement) {
        this._transitionEngine.register(namespaceId, hostElement);
    }
    destroy(namespaceId, context) {
        this._transitionEngine.destroy(namespaceId, context);
    }
    onInsert(namespaceId, element, parent, insertBefore) {
        this._transitionEngine.insertNode(namespaceId, element, parent, insertBefore);
    }
    onRemove(namespaceId, element, context) {
        this._transitionEngine.removeNode(namespaceId, element, context);
    }
    disableAnimations(element, disable) {
        this._transitionEngine.markElementAsDisabled(element, disable);
    }
    process(namespaceId, element, property, value) {
        if (property.charAt(0) == '@') {
            const [id, action] = parseTimelineCommand(property);
            const args = value;
            this._timelineEngine.command(id, element, action, args);
        }
        else {
            this._transitionEngine.trigger(namespaceId, element, property, value);
        }
    }
    listen(namespaceId, element, eventName, eventPhase, callback) {
        // @@listen
        if (eventName.charAt(0) == '@') {
            const [id, action] = parseTimelineCommand(eventName);
            return this._timelineEngine.listen(id, element, action, callback);
        }
        return this._transitionEngine.listen(namespaceId, element, eventName, eventPhase, callback);
    }
    flush(microtaskId = -1) {
        this._transitionEngine.flush(microtaskId);
    }
    get players() {
        return [
            ...this._transitionEngine.players,
            ...this._timelineEngine.players,
        ];
    }
    whenRenderingDone() {
        return this._transitionEngine.whenRenderingDone();
    }
    afterFlushAnimationsDone(cb) {
        this._transitionEngine.afterFlushAnimationsDone(cb);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2VuZ2luZV9uZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5pbWF0aW9ucy9icm93c2VyL3NyYy9yZW5kZXIvYW5pbWF0aW9uX2VuZ2luZV9uZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVBLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBbUIsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFeEUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFHcEQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzlDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBRXhFLE1BQU0sT0FBTyxlQUFlO0lBUzFCLFlBQ1ksUUFBYSxFQUFVLE9BQXdCLEVBQy9DLFdBQXFDO1FBRHJDLGFBQVEsR0FBUixRQUFRLENBQUs7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUMvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBMEI7UUFQekMsa0JBQWEsR0FBc0MsRUFBRSxDQUFDO1FBRTlELDZFQUE2RTtRQUN0RSxzQkFBaUIsR0FBRyxDQUFDLE9BQVksRUFBRSxPQUFZLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUs1RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSx1QkFBdUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRW5GLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLE9BQVksRUFBRSxPQUFZLEVBQUUsRUFBRSxDQUN0RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxlQUFlLENBQ1gsV0FBbUIsRUFBRSxXQUFtQixFQUFFLFdBQWdCLEVBQUUsSUFBWSxFQUN4RSxRQUFrQztRQUNwQyxNQUFNLFFBQVEsR0FBRyxXQUFXLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLE1BQU0sR0FBWSxFQUFFLENBQUM7WUFDM0IsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO1lBQzlCLE1BQU0sR0FBRyxHQUFHLGlCQUFpQixDQUNiLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBNkIsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFlLENBQUM7WUFDN0YsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNqQixNQUFNLGtCQUFrQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQzthQUN4QztZQUNELElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDbkIsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsT0FBTyxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsUUFBUSxDQUFDLFdBQW1CLEVBQUUsV0FBZ0I7UUFDNUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELE9BQU8sQ0FBQyxXQUFtQixFQUFFLE9BQVk7UUFDdkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELFFBQVEsQ0FBQyxXQUFtQixFQUFFLE9BQVksRUFBRSxNQUFXLEVBQUUsWUFBcUI7UUFDNUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsUUFBUSxDQUFDLFdBQW1CLEVBQUUsT0FBWSxFQUFFLE9BQVk7UUFDdEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxPQUFZLEVBQUUsT0FBZ0I7UUFDOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsT0FBTyxDQUFDLFdBQW1CLEVBQUUsT0FBWSxFQUFFLFFBQWdCLEVBQUUsS0FBVTtRQUNyRSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEQsTUFBTSxJQUFJLEdBQUcsS0FBYyxDQUFDO1lBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pEO2FBQU07WUFDTCxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3ZFO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FDRixXQUFtQixFQUFFLE9BQVksRUFBRSxTQUFpQixFQUFFLFVBQWtCLEVBQ3hFLFFBQTZCO1FBQy9CLFdBQVc7UUFDWCxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO1lBQzlCLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNuRTtRQUNELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFzQixDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTztZQUNMLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU87WUFDakMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU87U0FDaEMsQ0FBQztJQUNKLENBQUM7SUFFRCxpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxFQUFnQjtRQUN2QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsd0JBQXdCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FuaW1hdGlvbk1ldGFkYXRhLCBBbmltYXRpb25QbGF5ZXIsIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7VHJpZ2dlckFzdH0gZnJvbSAnLi4vZHNsL2FuaW1hdGlvbl9hc3QnO1xuaW1wb3J0IHtidWlsZEFuaW1hdGlvbkFzdH0gZnJvbSAnLi4vZHNsL2FuaW1hdGlvbl9hc3RfYnVpbGRlcic7XG5pbXBvcnQge0FuaW1hdGlvblRyaWdnZXIsIGJ1aWxkVHJpZ2dlcn0gZnJvbSAnLi4vZHNsL2FuaW1hdGlvbl90cmlnZ2VyJztcbmltcG9ydCB7QW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyfSBmcm9tICcuLi9kc2wvc3R5bGVfbm9ybWFsaXphdGlvbi9hbmltYXRpb25fc3R5bGVfbm9ybWFsaXplcic7XG5pbXBvcnQge3RyaWdnZXJCdWlsZEZhaWxlZH0gZnJvbSAnLi4vZXJyb3JfaGVscGVycyc7XG5pbXBvcnQge3dhcm5UcmlnZ2VyQnVpbGR9IGZyb20gJy4uL3dhcm5pbmdfaGVscGVycyc7XG5cbmltcG9ydCB7QW5pbWF0aW9uRHJpdmVyfSBmcm9tICcuL2FuaW1hdGlvbl9kcml2ZXInO1xuaW1wb3J0IHtwYXJzZVRpbWVsaW5lQ29tbWFuZH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtUaW1lbGluZUFuaW1hdGlvbkVuZ2luZX0gZnJvbSAnLi90aW1lbGluZV9hbmltYXRpb25fZW5naW5lJztcbmltcG9ydCB7VHJhbnNpdGlvbkFuaW1hdGlvbkVuZ2luZX0gZnJvbSAnLi90cmFuc2l0aW9uX2FuaW1hdGlvbl9lbmdpbmUnO1xuXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uRW5naW5lIHtcbiAgcHJpdmF0ZSBfdHJhbnNpdGlvbkVuZ2luZTogVHJhbnNpdGlvbkFuaW1hdGlvbkVuZ2luZTtcbiAgcHJpdmF0ZSBfdGltZWxpbmVFbmdpbmU6IFRpbWVsaW5lQW5pbWF0aW9uRW5naW5lO1xuXG4gIHByaXZhdGUgX3RyaWdnZXJDYWNoZToge1trZXk6IHN0cmluZ106IEFuaW1hdGlvblRyaWdnZXJ9ID0ge307XG5cbiAgLy8gdGhpcyBtZXRob2QgaXMgZGVzaWduZWQgdG8gYmUgb3ZlcnJpZGRlbiBieSB0aGUgY29kZSB0aGF0IHVzZXMgdGhpcyBlbmdpbmVcbiAgcHVibGljIG9uUmVtb3ZhbENvbXBsZXRlID0gKGVsZW1lbnQ6IGFueSwgY29udGV4dDogYW55KSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgYm9keU5vZGU6IGFueSwgcHJpdmF0ZSBfZHJpdmVyOiBBbmltYXRpb25Ecml2ZXIsXG4gICAgICBwcml2YXRlIF9ub3JtYWxpemVyOiBBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXIpIHtcbiAgICB0aGlzLl90cmFuc2l0aW9uRW5naW5lID0gbmV3IFRyYW5zaXRpb25BbmltYXRpb25FbmdpbmUoYm9keU5vZGUsIF9kcml2ZXIsIF9ub3JtYWxpemVyKTtcbiAgICB0aGlzLl90aW1lbGluZUVuZ2luZSA9IG5ldyBUaW1lbGluZUFuaW1hdGlvbkVuZ2luZShib2R5Tm9kZSwgX2RyaXZlciwgX25vcm1hbGl6ZXIpO1xuXG4gICAgdGhpcy5fdHJhbnNpdGlvbkVuZ2luZS5vblJlbW92YWxDb21wbGV0ZSA9IChlbGVtZW50OiBhbnksIGNvbnRleHQ6IGFueSkgPT5cbiAgICAgICAgdGhpcy5vblJlbW92YWxDb21wbGV0ZShlbGVtZW50LCBjb250ZXh0KTtcbiAgfVxuXG4gIHJlZ2lzdGVyVHJpZ2dlcihcbiAgICAgIGNvbXBvbmVudElkOiBzdHJpbmcsIG5hbWVzcGFjZUlkOiBzdHJpbmcsIGhvc3RFbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyxcbiAgICAgIG1ldGFkYXRhOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEpOiB2b2lkIHtcbiAgICBjb25zdCBjYWNoZUtleSA9IGNvbXBvbmVudElkICsgJy0nICsgbmFtZTtcbiAgICBsZXQgdHJpZ2dlciA9IHRoaXMuX3RyaWdnZXJDYWNoZVtjYWNoZUtleV07XG4gICAgaWYgKCF0cmlnZ2VyKSB7XG4gICAgICBjb25zdCBlcnJvcnM6IEVycm9yW10gPSBbXTtcbiAgICAgIGNvbnN0IHdhcm5pbmdzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgY29uc3QgYXN0ID0gYnVpbGRBbmltYXRpb25Bc3QoXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJpdmVyLCBtZXRhZGF0YSBhcyBBbmltYXRpb25NZXRhZGF0YSwgZXJyb3JzLCB3YXJuaW5ncykgYXMgVHJpZ2dlckFzdDtcbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IHRyaWdnZXJCdWlsZEZhaWxlZChuYW1lLCBlcnJvcnMpO1xuICAgICAgfVxuICAgICAgaWYgKHdhcm5pbmdzLmxlbmd0aCkge1xuICAgICAgICB3YXJuVHJpZ2dlckJ1aWxkKG5hbWUsIHdhcm5pbmdzKTtcbiAgICAgIH1cbiAgICAgIHRyaWdnZXIgPSBidWlsZFRyaWdnZXIobmFtZSwgYXN0LCB0aGlzLl9ub3JtYWxpemVyKTtcbiAgICAgIHRoaXMuX3RyaWdnZXJDYWNoZVtjYWNoZUtleV0gPSB0cmlnZ2VyO1xuICAgIH1cbiAgICB0aGlzLl90cmFuc2l0aW9uRW5naW5lLnJlZ2lzdGVyVHJpZ2dlcihuYW1lc3BhY2VJZCwgbmFtZSwgdHJpZ2dlcik7XG4gIH1cblxuICByZWdpc3RlcihuYW1lc3BhY2VJZDogc3RyaW5nLCBob3N0RWxlbWVudDogYW55KSB7XG4gICAgdGhpcy5fdHJhbnNpdGlvbkVuZ2luZS5yZWdpc3RlcihuYW1lc3BhY2VJZCwgaG9zdEVsZW1lbnQpO1xuICB9XG5cbiAgZGVzdHJveShuYW1lc3BhY2VJZDogc3RyaW5nLCBjb250ZXh0OiBhbnkpIHtcbiAgICB0aGlzLl90cmFuc2l0aW9uRW5naW5lLmRlc3Ryb3kobmFtZXNwYWNlSWQsIGNvbnRleHQpO1xuICB9XG5cbiAgb25JbnNlcnQobmFtZXNwYWNlSWQ6IHN0cmluZywgZWxlbWVudDogYW55LCBwYXJlbnQ6IGFueSwgaW5zZXJ0QmVmb3JlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fdHJhbnNpdGlvbkVuZ2luZS5pbnNlcnROb2RlKG5hbWVzcGFjZUlkLCBlbGVtZW50LCBwYXJlbnQsIGluc2VydEJlZm9yZSk7XG4gIH1cblxuICBvblJlbW92ZShuYW1lc3BhY2VJZDogc3RyaW5nLCBlbGVtZW50OiBhbnksIGNvbnRleHQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUucmVtb3ZlTm9kZShuYW1lc3BhY2VJZCwgZWxlbWVudCwgY29udGV4dCk7XG4gIH1cblxuICBkaXNhYmxlQW5pbWF0aW9ucyhlbGVtZW50OiBhbnksIGRpc2FibGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl90cmFuc2l0aW9uRW5naW5lLm1hcmtFbGVtZW50QXNEaXNhYmxlZChlbGVtZW50LCBkaXNhYmxlKTtcbiAgfVxuXG4gIHByb2Nlc3MobmFtZXNwYWNlSWQ6IHN0cmluZywgZWxlbWVudDogYW55LCBwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKHByb3BlcnR5LmNoYXJBdCgwKSA9PSAnQCcpIHtcbiAgICAgIGNvbnN0IFtpZCwgYWN0aW9uXSA9IHBhcnNlVGltZWxpbmVDb21tYW5kKHByb3BlcnR5KTtcbiAgICAgIGNvbnN0IGFyZ3MgPSB2YWx1ZSBhcyBhbnlbXTtcbiAgICAgIHRoaXMuX3RpbWVsaW5lRW5naW5lLmNvbW1hbmQoaWQsIGVsZW1lbnQsIGFjdGlvbiwgYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUudHJpZ2dlcihuYW1lc3BhY2VJZCwgZWxlbWVudCwgcHJvcGVydHksIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBsaXN0ZW4oXG4gICAgICBuYW1lc3BhY2VJZDogc3RyaW5nLCBlbGVtZW50OiBhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBldmVudFBoYXNlOiBzdHJpbmcsXG4gICAgICBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGFueSk6ICgpID0+IGFueSB7XG4gICAgLy8gQEBsaXN0ZW5cbiAgICBpZiAoZXZlbnROYW1lLmNoYXJBdCgwKSA9PSAnQCcpIHtcbiAgICAgIGNvbnN0IFtpZCwgYWN0aW9uXSA9IHBhcnNlVGltZWxpbmVDb21tYW5kKGV2ZW50TmFtZSk7XG4gICAgICByZXR1cm4gdGhpcy5fdGltZWxpbmVFbmdpbmUubGlzdGVuKGlkLCBlbGVtZW50LCBhY3Rpb24sIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUubGlzdGVuKG5hbWVzcGFjZUlkLCBlbGVtZW50LCBldmVudE5hbWUsIGV2ZW50UGhhc2UsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGZsdXNoKG1pY3JvdGFza0lkOiBudW1iZXIgPSAtMSk6IHZvaWQge1xuICAgIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUuZmx1c2gobWljcm90YXNrSWQpO1xuICB9XG5cbiAgZ2V0IHBsYXllcnMoKTogQW5pbWF0aW9uUGxheWVyW10ge1xuICAgIHJldHVybiBbXG4gICAgICAuLi50aGlzLl90cmFuc2l0aW9uRW5naW5lLnBsYXllcnMsXG4gICAgICAuLi50aGlzLl90aW1lbGluZUVuZ2luZS5wbGF5ZXJzLFxuICAgIF07XG4gIH1cblxuICB3aGVuUmVuZGVyaW5nRG9uZSgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2l0aW9uRW5naW5lLndoZW5SZW5kZXJpbmdEb25lKCk7XG4gIH1cblxuICBhZnRlckZsdXNoQW5pbWF0aW9uc0RvbmUoY2I6IFZvaWRGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUuYWZ0ZXJGbHVzaEFuaW1hdGlvbnNEb25lKGNiKTtcbiAgfVxufVxuIl19