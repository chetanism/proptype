/**
 * Created by chetanv on 17/06/16.
 */

import AnyType from './AnyType';

class CustomType extends AnyType {
  static TYPE_NAME = 'custom';

  static fromJson() {
    throw new Error(
      'CustomType can not be created from json object.' +
      ' It requires a function to validate the value.'
    );
  }

  validator = null;

  constructor(validator, required = false) {
    super(required);
    if (typeof validator !== 'function') {
      throw new Error('Invalid validator function supplied to CustomType');
    }

    this.validator = validator;
  }

  validate(value) {
    let err = super.validate(value);
    if (err) {
      return err;
    }

    if (value !== undefined && value !== null) {
      err = this.validator(value);
    }

    return err;
  }

  toJson() {
    throw new Error('CustomType can not be serialized to a json object.');
  }
}

export default CustomType;
