/**
 * Created by chetanv on 13/06/16.
 */

import ObjectType from '../../src/types/ObjectType';
import { expect } from 'chai';

describe('ObjectType', function () {
  describe('#constructor', function () {
    it('can be created', function () {
      const type = new ObjectType();
      expect(type).to.be.an.instanceof(ObjectType);
      expect(type.required()).to.be.false;
    });

    it('can be created with required flag', function () {
      const type = new ObjectType(true);
      expect(type).to.be.an.instanceof(ObjectType);
      expect(type.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    it('passes empty values if not required', function () {
      const type = new ObjectType();
      const err = type.validate();
      expect(err).to.not.exist;
    });

    it('does not passes empty values if required', function () {
      const type = new ObjectType(true);
      const err = type.validate();
      expect(err).to.be.an.instanceof(Error);
    });

    it('returns error if value is not an object', function () {
      const type = new ObjectType();
      const err = type.validate('abc');
      expect(err).to.be.an.instanceof(Error);
    });

    it('passes object values', function () {
      const type = new ObjectType();
      const err = type.validate({ a: 4 });
      expect(err).to.not.exist;
    });
  });
});
