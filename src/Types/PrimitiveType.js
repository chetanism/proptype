/**
 * Created by chetanv on 10/06/16.
 */

import AnyType from './AnyType';
import getPropType from '../utils/getPropType';
import getPreciseType from '../utils/getPreciseType';
import checkType from '../utils/checkType';

class PrimitiveType extends AnyType {
  static primitiveFromJson(obj, Type) {
    checkType(obj.type, Type);
    return new Type(obj.required);
  }

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

  toJson() {
    return {
      type: this.type,
      required: this.valueIsRequired,
    };
  }
}

export default PrimitiveType;
