/**
 * Created by chetanv on 13/06/16.
 */

import PrimitiveType from '../../src/types/PrimitiveType';
import { expect } from 'chai';

describe('PrimitiveType', function () {
  describe('#constructor', function () {
    it('can be created', function () {
      const type = new PrimitiveType('string');
      expect(type).to.be.an.instanceof(PrimitiveType);
      expect(type.required()).to.be.false;
    });

    it('can be created with required flag', function () {
      const type = new PrimitiveType('string', true);
      expect(type).to.be.an.instanceof(PrimitiveType);
      expect(type.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    it('passes empty values if not required', function () {
      const type = new PrimitiveType('string');
      const err = type.validate();
      expect(err).to.not.exist;
    });

    it('does not passes empty values if required', function () {
      const type = new PrimitiveType('string', true);
      const err = type.validate();
      expect(err).to.be.an.instanceof(Error);
    });
  });
});
