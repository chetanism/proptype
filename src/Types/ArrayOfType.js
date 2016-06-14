/**
 * Created by chetanv on 11/06/16.
 */

import AnyType from './AnyType';
import ArrayType from './ArrayType';

class ArrayOfType extends ArrayType {
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
}

export default ArrayOfType;
