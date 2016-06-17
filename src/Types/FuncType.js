/**
 * Created by chetanv on 10/06/16.
 */

import PrimitiveType from './PrimitiveType';

class FuncType extends PrimitiveType {
  static TYPE_NAME = 'func';

  static fromJson(obj) {
    return PrimitiveType.primitiveFromJson(obj, FuncType);
  }
  
  constructor(required = false) {
    super('function', required);
  }

  toJson() {
    return {
      type: FuncType.TYPE_NAME,
      required: this.required(),
    };
  }
}

export default FuncType;
