/**
 * Created by chetanv on 13/06/16.
 */

import ObjectType from './ObjectType';
import AnyType from './AnyType';
import getPropType from '../utils/getPropType';

class ShapeType extends ObjectType {
  shape = null;

  constructor(shape, required = false) {
    super(required);

    if (getPropType(shape) !== 'object') {
      throw new Error('Invalid shape object supplied to shapeType.');
    }

    const keys = Object.keys(shape);

    for (const key of keys) {
      if (!(shape[key] instanceof AnyType)) {
        throw new Error('Invalid type supplied to shape type');
      }
    }

    this.shape = shape;
  }

  validate(value) {
    let err = super.validate(value);
    if (err) {
      return err;
    }

    if (value !== null && value !== undefined) {
      const keys = Object.keys(this.shape);
      for (const key of keys) {
        err = this.shape[key].validate(value[key]);
        if (err) {
          return err;
        }
      }
    }

    return null;
  }
}

export default ShapeType;
