/**
 * Created by chetanv on 13/06/16.
 */

import NumberType from '../../src/types/NumberType';
import checkType from '../../src/utils/checkType';

class DummyType extends NumberType {
  static TYPE_NAME = 'dummy';

  static fromJson(obj) {
    checkType(obj.type, DummyType);
    return new DummyType(obj.required);
  }

  toJson() {
    const superJson = super.toJson();
    const thisJson = {
      type: DummyType.TYPE_NAME,
    };
    return { ...superJson, ...thisJson };
  }
}

export default DummyType;
