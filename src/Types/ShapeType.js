/**
 * Created by chetanv on 13/06/16.
 */

import ObjectType from './ObjectType';
import AnyType from './AnyType';
import getPropType from '../utils/getPropType';
import factory from '../factory/factory';
import checkType from '../utils/checkType';
import mapObject from '../utils/mapObject';

class ShapeType extends ObjectType {
  static TYPE_NAME = 'shape';

  static fromJson(obj) {
    checkType(obj.type, ShapeType);
    return new ShapeType(
      mapObject(obj.shape, (typeJson) => factory.fromJson(typeJson)),
      obj.required
    );
  }

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

  toJson() {
    return {
      type: ShapeType.TYPE_NAME,
      required: this.required(),
      shape: mapObject(this.shape, (type) => type.toJson()),
    };
  }
}

export default ShapeType;
