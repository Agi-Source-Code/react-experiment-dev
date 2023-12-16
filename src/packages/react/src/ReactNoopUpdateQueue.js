/**
 * Copyright (c) Meta Platforms, Inc.
 *
 */

const didWarnStateUpdateForUnmountedComponent = {};
const __DEV__ = true;
function warnNoop(publicInstance, callerName) {
  if (__DEV__) {
    const constructor = publicInstance.constructor;
    const componentName =
      (constructor && (constructor.displayName || constructor.name)) ||
      "ReactClass";
    const warningKey = `${componentName}.${callerName}`;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    console.error(
      "Can't call %s on a component that is not yet mounted." +
        "This is no-op, but it might indicate a bug in your application." +
        "Instead, assign to `this.state` directly or define a `state = {};`" +
        `class property with the desired state in the %s component.`,
      callerName,
      componentName
    );
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */

const ReactNoopUpdateQueue = {
  /**
   * Check whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance the instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },
  /**
   * Forces an updates. This should only be invoked when it's known with certainly that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the component's state has changed but `setState` was not called.
   *
   * This will not invoke  `shouldComponentUpdate`, but it will invoke `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance the instance that should rerender.
   * @param {?function} callback Called after component is update.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (
    publicInstance,
    completeState,
    callback,
    callerName
  ) {
    warnNoop(publicInstance, "replaceState");
  },

  /**
   * Sets a subset of the state. This only exist because _pendingState is internal. This provides a merging strategy that is not available to deep properties which is confusing. TODO: Expose pendingState or don't use it during the merge.
   *
   * @param {ReactClass} publicInstance the instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (
    publicInstance,
    partialState,
    callback,
    callerName
  ) {
    warnNoop(publicInstance, "setState");
  },
};

export default ReactNoopUpdateQueue;
