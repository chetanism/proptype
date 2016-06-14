/**
 * Created by chetanv on 13/06/16.
 */

import NumberType from '../../src/types/NumberType';
import { expect } from 'chai';

describe('NumberType', function () {
  describe('#constructor', function () {
    it('can be created', function () {
      const type = new NumberType();
      expect(type).to.be.an.instanceof(NumberType);
      expect(type.required()).to.be.false;
    });

    it('can be created with required flag', function () {
      const type = new NumberType(true);
      expect(type).to.be.an.instanceof(NumberType);
      expect(type.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    it('passes empty values if not required', function () {
      const type = new NumberType();
      const err = type.validate();
      expect(err).to.not.exist;
    });

    it('does not passes empty values if required', function () {
      const type = new NumberType(true);
      const err = type.validate();
      expect(err).to.be.an.instanceof(Error);
    });

    it('returns error if value is not a number', function () {
      const type = new NumberType();
      const err = type.validate('abc');
      expect(err).to.be.an.instanceof(Error);
    });

    it('passes number values', function () {
      const type = new NumberType();
      const err = type.validate(45);
      expect(err).to.not.exist;
    });
  });
});
