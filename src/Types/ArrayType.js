/**
 * Created by chetanv on 10/06/16.
 */

import PrimitiveType from './PrimitiveType';


class ArrayType extends PrimitiveType {
  static TYPE_NAME = 'array';

  static fromJson(obj) {
    return PrimitiveType.primitiveFromJson(obj, ArrayType);
  }

  constructor(required = false) {
    super(ArrayType.TYPE_NAME, required);
  }
}

export default ArrayType;
