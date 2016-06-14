/**
 * Created by chetanv on 10/06/16.
 */

import AnyType from './AnyType';
import getPropType from '../utils/getPropType';
import getPreciseType from '../utils/getPreciseType';

class PrimitiveType extends AnyType {
  type = null;

  constructor(type, required = false) {
    super(required);
    this.type = type;
  }

  validate(value) {
    let err = super.validate(value);
    if (err) {
      return err;
    }

    if (value !== null && value !== undefined) {
      const propType = getPropType(value);
      if (propType !== this.type) {
        const preciseType = getPreciseType(value);
        err = new Error(
          `Invalid value of ${preciseType}` +
          ` type supplied, expected ${this.type}.`
        );
      }
    }

    return err;
  }
}

export default PrimitiveType;
