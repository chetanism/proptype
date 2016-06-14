/**
 * Created by chetanv on 10/06/16.
 */

/**
 *
 * This source code was taken from
 * https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js
 *
 * Following is the license as per the file mentioned above
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

function isSymbol(propValue) {
  const propType = typeof propValue;

  // Native Symbol.
  if (propType === 'symbol') {
    return true;
  }

  // following code is just to make things work when probably not in right env
  // mostly, the above code should handle things fine.

  /* istanbul ignore next */
  if (propValue) {
    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }
  }

  return false;
}

export default isSymbol;
