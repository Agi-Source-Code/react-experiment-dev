/**
 * Copyright (c) Meta platforms, Inc. and affiliates.
 *
 * @flow
 */

import type { RefObject } from "../../shared/ReactTypes";

// an immutable object with a single mutable value
const __DEV__ = true;
export function createRef(): RefObject {
    const refObject = {
        current: null
    };
    if(__DEV__){
        Object.seal(refObject);
    }
    return refObject;
}