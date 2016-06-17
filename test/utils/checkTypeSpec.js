/**
 * Created by chetanv on 17/06/16.
 */

import checkType from '../../src/utils/checkType';
import DummyType from '../test-helper/DummyType';
import { expect } from 'chai';

describe('checkType', function () {
  it('throws error correctly', function () {
    function noType() {
      checkType(null, DummyType);
    }

    function typeNotSame() {
      checkType('alpha', DummyType);
    }

    function typeSame() {
      checkType(DummyType.TYPE_NAME, DummyType);
    }

    expect(noType).to.not.throw(Error);
    expect(typeNotSame).to.throw(Error);
    expect(typeSame).to.not.throw(Error);
  })
});