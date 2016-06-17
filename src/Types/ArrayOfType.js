/**
 * Created by chetanv on 11/06/16.
 */

import AnyType from './AnyType';
import ArrayType from './ArrayType';
import factory from '../factory/factory';
import checkType from '../utils/checkType';

// import _debug from 'debug';
// const debug = _debug('ArrayOfType');

class ArrayOfType extends ArrayType {
  static TYPE_NAME = 'arrayOf';

  static fromJson(obj) {
    checkType(obj.type, ArrayOfType);
    return new ArrayOfType(factory.fromJson(obj.arrayOf), obj.required);
  }

  arrayOf = null;

  constructor(arrayOf, required = false) {
    super(required);

    if (!(arrayOf instanceof AnyType)) {
      throw new Error('Invalid PropType notation inside arrayOf.');
    }
    this.arrayOf = arrayOf;
  }

  validate(value) {
    let err = super.validate(value);

    if (err) {
      return err;
    }

    const valueToValidate = value || [];
    for (const valueItem of valueToValidate) {
      err = this.arrayOf.validate(valueItem);
      if (err) {
        return err;
      }
    }

    return null;
  }

  toJson() {
    return {
      type: ArrayOfType.TYPE_NAME,
      required: this.valueIsRequired,
      arrayOf: this.arrayOf.toJson()
    };
  }
}

export default ArrayOfType;
