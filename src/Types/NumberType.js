/**
 * Created by chetanv on 10/06/16.
 */

import PrimitiveType from './PrimitiveType';

class NumberType extends PrimitiveType {
  constructor(required = false) {
    super('number', required);
  }
}

export default NumberType;
