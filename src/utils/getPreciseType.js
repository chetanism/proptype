/**
 * Created by chetanv on 11/06/16.
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

import getPropType from './getPropType';

function getPreciseType(propValue) {
  const propType = getPropType(propValue);

  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }

  return propType;
}

export default getPreciseType;
