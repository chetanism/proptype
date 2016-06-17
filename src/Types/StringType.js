/**
 * Created by chetanv on 10/06/16.
 */

import PrimitiveType from './PrimitiveType';

class StringType extends PrimitiveType {
  static TYPE_NAME = 'string';

  static fromJson(obj) {
    return PrimitiveType.primitiveFromJson(obj, StringType);
  }

  constructor(required = false) {
    super(StringType.TYPE_NAME, required);
  }
}

export default StringType;
