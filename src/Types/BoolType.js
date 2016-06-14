/**
 * Created by chetanv on 10/06/16.
 */

import PrimitiveType from './PrimitiveType';

class BoolType extends PrimitiveType {
  constructor(required = false) {
    super('boolean', required);
  }
}

export default BoolType;
