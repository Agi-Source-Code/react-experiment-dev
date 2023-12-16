/**
 * Copyright (c) Meta Platform, Inc. and affiliates.
 *
 * This source code is licensed under the BSD-style license found in the
 */
import ReactNoopUpdateQueue from "./ReactNoopUpdateQueue";
import assign from "../../shared/assign";
const __DEV__ = true;
const emptyObject = {};
if (__DEV__) {
  Object.freeze(emptyObject);
}

/**
 * Base class helper for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that calls to `setState` will run
 * synchronously, as they may eventually be batched
 * together. You can provide an optional callback that
 * will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be
 * called at some point in the future(not synchronously).
 * It will be called with the up to date component
 * arguments (state, props, context). These values can be
 * different from this.* because your function may be
 * called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and
 * context will not yet be assigned to this.
 *
 * @param {object|function} partialState Next partial
 *  state or function to produce next partial state to be
 * merged with current state.
 * @param {?function} callback Called after state is
 * updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  if (
    typeof partialState !== "object" &&
    typeof partialState !== "function" &&
    partialState != null
  ) {
    throw new Error(
      "setState(...): takes an object of state variables to update or a" +
        "function which returns an object of state variables."
    );
  }

  this.updater.enqueueSetState(this, partialState, callback, "setState");
};

/**
 * Forces an update. This should only be invoked when it's
 * known with certainty that we are **not** in a DOM
 * transaction.
 *
 * You may want to call this when you know that some deepr
 * aspect of the component's state has changed but
 * `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it
 * will invoke `componentWillUpdate` and
 * `componentDidUpdate`
 *
 * @param {?function} callback Called after update is
 * complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

/**
 * Convenience component with default shallow equality check for sCU.
 */

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

export { Component, PureComponent };
