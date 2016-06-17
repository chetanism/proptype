/**
 * Created by chetanv on 13/06/16.
 */

import AnyType from './AnyType';
import is from '../utils/is';
import checkType from '../utils/checkType';

class OneOfType extends AnyType {
  static TYPE_NAME = 'oneOf';

  static fromJson(obj) {
    checkType(obj.type, OneOfType);
    return new OneOfType(obj.oneOf, obj.required);
  }

  oneOf = [];

  constructor(oneOf, required = false) {
    super(required);

    if (!Array.isArray(oneOf)) {
      throw new Error(
        'Invalid argument supplied to oneOf, expected an instance of array.'
      );
    }

    this.oneOf = oneOf;
  }

  validate(value) {
    const err = super.validate(value);
    if (err) {
      return err;
    }

    if (value === null || value === undefined) {
      return null;
    }

    for (const expectedValue of this.oneOf) {
      if (is(value, expectedValue)) {
        return null;
      }
    }

    return new Error(
      `Ivalid value ${value} given. ` +
      `Expected one of ${JSON.stringify(this.oneOf)}`
    );
  }

  toJson() {
    return {
      type: OneOfType.TYPE_NAME,
      required: this.required(),
      oneOf: this.oneOf,
    };
  }
}

export default OneOfType;
