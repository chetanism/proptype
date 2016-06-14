/**
 * Created by chetanv on 13/06/16.
 */

/**
 * inlined Object.is polyfill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
/* eslint-disable no-self-compare */
function is(x, y) {
  let ret = false;
  // SameValue algorithm
  if (x === y) { // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    ret = (x !== 0 || 1 / x === 1 / y);
  } else {
    // Step 6.a: NaN == NaN
    ret = (x !== x && y !== y);
  }

  return ret;
}
/* eslint-enable no-self-compare */

export default is;
