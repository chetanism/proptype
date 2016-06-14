/**
 * Created by chetanv on 13/06/16.
 */

import getPropType from '../../src/utils/getPropType';
import { expect } from 'chai';

describe('getPropType', function () {
  function testGenerator(value, type, subType) {
    describe(`${subType || type} values`, function () {
      it('detects type correctly', function () {
        expect(getPropType(value)).to.be.equal(type);
      });
    });
  }

  testGenerator('abcd', 'string');
  testGenerator(23, 'number', 'integer');
  testGenerator(23.32, 'number', 'float');
  testGenerator({}, 'object');
  testGenerator([], 'array');
  testGenerator(Symbol(), 'symbol');
  testGenerator(function () {}, 'function');
  testGenerator(undefined, 'undefined');
});
