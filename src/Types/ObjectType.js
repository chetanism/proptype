/**
 * Created by chetanv on 10/06/16.
 */

import PrimitiveType from './PrimitiveType';

class ObjectType extends PrimitiveType {
  constructor(required = false) {
    super('object', required);
  }
}

export default ObjectType;
