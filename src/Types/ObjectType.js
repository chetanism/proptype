/**
 * Created by chetanv on 10/06/16.
 */

import PrimitiveType from './PrimitiveType';

class ObjectType extends PrimitiveType {
  static TYPE_NAME = 'object';

  static fromJson(obj) {
    return PrimitiveType.primitiveFromJson(obj, ObjectType);
  }

  constructor(required = false) {
    super(ObjectType.TYPE_NAME, required);
  }
}

export default ObjectType;
