/**
 * Created by chetanv on 11/06/16.
 */

import AnyType from './AnyType';

// import _debug from 'debug';
// const debug = _debug('InstanceOfType');

class InstanceOfType extends AnyType {
  static TYPE_NAME = 'instanceOf';

  static fromJson() {
    throw new Error(
      'InstanceOfType can not be created from json object.' +
      ' It requires a class/constructor function to validate the value.'
    );
  }

  InstanceOf = null;

  constructor(InstanceOf, required = false) {
    super(required);

    if (typeof InstanceOf !== 'function') {
      throw new Error('Invalid class passed to InstanceOf type');
    }
    this.InstanceOf = InstanceOf;
  }

  validate(value) {
    const err = super.validate(value);
    if (err) {
      return err;
    }

    if (value && !(value instanceof this.InstanceOf)) {
      return new Error(
        'Invalid value supplied. ' +
        `Expect value to be an instance of ${this.InstanceOf.name}`
      );
    }

    return null;
  }

  toJson() {
    throw new Error('InstanceOfType can not be serialized to a json object.');
  }
}

export default InstanceOfType;
