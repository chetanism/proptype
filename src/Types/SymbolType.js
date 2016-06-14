/**
 * Created by chetanv on 10/06/16.
 */

import PrimitiveType from './PrimitiveType';

class SymbolType extends PrimitiveType {
  constructor(required = false) {
    super('symbol', required);
  }
}

export default SymbolType;
