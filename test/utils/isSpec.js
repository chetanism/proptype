/**
 * Created by chetanv on 13/06/16.
 */

import is from '../../src/utils/is';
import { expect } from 'chai';


describe('is', function () {
  function testGenerator(type, values, copiesShouldBeEqual) {
    describe(`${type} values`, function () {

      it('compares same values correctly', function () {
        const sameInstance = is(values.value1, values.value1);
        expect(sameInstance).to.be.equal(true);
      });

      it('compares copy of values correctly', function () {
        const copyInstance = is(values.value1, values.value1Copy);
        expect(copyInstance).to.be.equal(copiesShouldBeEqual);
      });

      it('compares different values correctly', function () {
        const different = is(values.value1, values.value2);
        expect(different).to.be.false;
      });
    });
  }

  testGenerator(
    'bool',
    {
      value1: false,
      value1Copy: false,
      value2: true,
    },
    true
  );

  testGenerator(
    'string',
    {
      value1: 'abcd',
      value1Copy: 'abcd',
      value2: 'pqr',
    },
    true
  );

  testGenerator(
    'integer',
    {
      value1: 23,
      value1Copy: 23,
      value2: 32,
    },
    true
  );

  testGenerator(
    'float',
    {
      value1: 23.87634,
      value1Copy: 23.87634,
      value2: 23.87633,
    },
    true
  );

  testGenerator(
    'zeros',
    {
      value1: 0,
      value1Copy: 0,
      value2: -0,
    },
    true
  );

  testGenerator(
    'objects',
    {
      value1: { a: 1, b: { c: 2 } },
      value1Copy: { a: 1, b: { c: 2 } },
      value2: { a: 1, b: { c: 4 } },
    },
    false
  );

  testGenerator(
    'symbol',
    {
      value1: Symbol('value1'),
      value1Copy: Symbol('value1'),
      value2: Symbol('value2'),
    },
    false
  );

  testGenerator(
    'NaN',
    {
      value1: NaN,
      value1Copy: NaN,
      value2: 2,
    },
    true
  );
});
