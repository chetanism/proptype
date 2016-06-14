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

import isSymbol from './isSymbol';

// Equivalent of `typeof` but with special handling for array and regexp.
function getPropType(propValue) {
  const propType = typeof propValue;

  if (Array.isArray(propValue)) {
    return 'array';
  }

  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }

  if (isSymbol(propValue)) {
    return 'symbol';
  }

  return propType;
}

export default getPropType;
