/**
 * Created by chetanv on 17/06/16.
 */

function mapObject(obj, fn) {
  if (typeof obj !== 'object') {
    throw new Error('Expected an object as the first argument');
  }

  if (typeof fn !== 'function') {
    throw new Error('Expected second argument to be a function');
  }

  const keys = Object.keys(obj);
  const mappedObj = {};
  for (const key of keys) {
    mappedObj[key] = fn(obj[key], key);
  }
  return mappedObj;
}

export default mapObject;
