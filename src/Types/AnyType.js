/**
 * Created by chetanv on 10/06/16.
 */

class AnyType {
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
}

export default AnyType;
