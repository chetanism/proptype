/**
 * Created by chetanv on 13/06/16.
 */

import ArrayType from '../../src/types/ArrayType';
import { expect } from 'chai';

describe('ArrayType', function () {
  describe('#constructor', function () {
    it('can be created', function () {
      const type = new ArrayType();
      expect(type).to.be.an.instanceof(ArrayType);
      expect(type.required()).to.be.false;
    });

    it('can be created with required flag', function () {
      const type = new ArrayType(true);
      expect(type).to.be.an.instanceof(ArrayType);
      expect(type.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    it('passes empty values if not required', function () {
      const type = new ArrayType();
      const err = type.validate();
      expect(err).to.not.exist;
    });

    it('does not passes empty values if required', function () {
      const type = new ArrayType(true);
      const err = type.validate();
      expect(err).to.be.an.instanceof(Error);
    });

    it('returns error if value is not an array', function () {
      const type = new ArrayType();
      const err = type.validate(123);
      expect(err).to.be.an.instanceof(Error);
    });

    it('passes array values', function () {
      const type = new ArrayType();
      const err = type.validate([1, 'two', { c: 'three' }]);
      expect(err).to.not.exist;
    });
  });
});
