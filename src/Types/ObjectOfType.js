/**
 * Created by chetanv on 11/06/16.
 */

import AnyType from './AnyType';
import ObjectType from './ObjectType';
import factory from '../factory/factory';
import checkType from '../utils/checkType';

class ObjectOfType extends ObjectType {
  static TYPE_NAME = 'objectOf';

  static fromJson(obj) {
    checkType(obj.type, ObjectOfType);
    return new ObjectOfType(factory.fromJson(obj.objectOf), obj.required);
  }

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

  toJson() {
    return {
      type: ObjectOfType.TYPE_NAME,
      required: this.required(),
      objectOf: this.objectOf.toJson(),
    };
  }
}

export default ObjectOfType;
