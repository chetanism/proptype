/**
 * Created by chetanv on 13/06/16.
 */

import AnyType from './AnyType';
import factory from '../factory/factory';
import checkType from '../utils/checkType';

class OneOfTypeType extends AnyType {
  static TYPE_NAME = 'oneOfType';

  static fromJson(obj) {
    checkType(obj.type, OneOfTypeType);
    return new OneOfTypeType(
      obj.oneOfType.map(typeJson => factory.fromJson(typeJson)),
      obj.required,
    );
  }

  oneOfType = null;

  constructor(oneOfType, required = false) {
    super(required);

    if (!Array.isArray(oneOfType)) {
      throw new Error(
        'Invalid argument supplied to oneOfType, expected an instance of array.'
      );
    }

    for (const type of oneOfType) {
      if (!(type instanceof AnyType)) {
        throw new Error('Invalid type supplied to oneOfType array of types');
      }
    }

    this.oneOfType = oneOfType;
  }

  validate(value) {
    const err = super.validate(value);
    if (err) {
      return err;
    }

    if (value === null || value === undefined) {
      return null;
    }

    for (const type of this.oneOfType) {
      if (type.validate(value) === null) {
        return null;
      }
    }

    return new Error('Invalid value supplied');
  }

  toJson() {
    return {
      type: OneOfTypeType.TYPE_NAME,
      required: this.required(),
      oneOfType: this.oneOfType.map(type => type.toJson()),
    };
  }
}

export default OneOfTypeType;
