/**
 * Created by chetanv on 10/06/16.
 */

import PrimitiveType from './PrimitiveType';

class SymbolType extends PrimitiveType {
  static TYPE_NAME = 'symbol';

  static fromJson(obj) {
    return PrimitiveType.primitiveFromJson(obj, SymbolType);
  }

  constructor(required = false) {
    super(SymbolType.TYPE_NAME, required);
  }
}

export default SymbolType;
