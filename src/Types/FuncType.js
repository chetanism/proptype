/**
 * Created by chetanv on 10/06/16.
 */

import PrimitiveType from './PrimitiveType';

class FuncType extends PrimitiveType {
  constructor(required = false) {
    super('function', required);
  }
}

export default FuncType;
