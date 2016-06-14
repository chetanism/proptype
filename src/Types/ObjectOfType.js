/**
 * Created by chetanv on 11/06/16.
 */

import AnyType from './AnyType';
import ObjectType from './ObjectType';

class ObjectOfType extends ObjectType {
  objectOf = null;

  constructor(objectOf, required = false) {
    super(required);

    if (!(objectOf instanceof AnyType)) {
      throw new Error('Invalid PropType notation inside ObjectOf.');
    }

    this.objectOf = objectOf;
  }

  validate(value) {
    let err = super.validate(value);
    if (err) {
      return err;
    }

    const valueToValidate = value || {};

    const keys = Object.keys(valueToValidate);

    for (const key of keys) {
      err = this.objectOf.validate(valueToValidate[key]);
      if (err) {
        return err;
      }
    }

    return null;
  }
}

export default ObjectOfType;
