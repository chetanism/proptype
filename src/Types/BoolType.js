/**
 * Created by chetanv on 10/06/16.
 */

import PrimitiveType from './PrimitiveType';

class BoolType extends PrimitiveType {
  static TYPE_NAME = 'bool';

  static fromJson(obj) {
    return PrimitiveType.primitiveFromJson(obj, BoolType);
  }

  constructor(required = false) {
    super('boolean', required);
  }

  toJson() {
    return {
      type: BoolType.TYPE_NAME,
      required: this.required(),
    };
  }
}

export default BoolType;
