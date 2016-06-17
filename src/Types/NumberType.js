/**
 * Created by chetanv on 10/06/16.
 */

import PrimitiveType from './PrimitiveType';

class NumberType extends PrimitiveType {
  static TYPE_NAME = 'number';

  static fromJson(obj) {
    return PrimitiveType.primitiveFromJson(obj, NumberType);
  }

  constructor(required = false) {
    super('number', required);
  }
}

export default NumberType;
