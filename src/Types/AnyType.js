/**
 * Created by chetanv on 10/06/16.
 */

import checkType from '../utils/checkType';

class AnyType {
  static TYPE_NAME = 'any';
  
  static fromJson(obj) {
    checkType(obj.type, AnyType);
    return new AnyType(obj.required);
  }

  valueIsRequired = false;

  constructor(required = false) {
    this.valueIsRequired = required;
  }

  validate(value) {
    if (value == null && this.valueIsRequired) {
      return new Error('Required value was not specified');
    }

    return null;
  }

  required() {
    return this.valueIsRequired;
  }

  toJson() {
    return {
      type: AnyType.TYPE_NAME,
      required: this.valueIsRequired,
    };
  }
}

export default AnyType;
