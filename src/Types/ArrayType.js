/**
 * Created by chetanv on 10/06/16.
 */

import PrimitiveType from './PrimitiveType';

class ArrayType extends PrimitiveType {
  constructor(required = false) {
    super('array', required);
  }
}

export default ArrayType;
