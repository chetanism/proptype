/**
 * Created by chetanv on 13/06/16.
 */

import AnyType from './AnyType';

class OneOfTypeType extends AnyType {

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
}

export default OneOfTypeType;
