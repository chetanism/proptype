/**
 * Created by chetanv on 10/06/16.
 */

import PrimitiveType from './PrimitiveType';

class StringType extends PrimitiveType {
  constructor(required = false) {
    super('string', required);
  }
}

export default StringType;
