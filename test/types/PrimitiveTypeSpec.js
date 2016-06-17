/**
 * Created by chetanv on 13/06/16.
 */

import PrimitiveType from '../../src/types/PrimitiveType';
import NumberType from '../../src/types/NumberType';
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

  describe('#toJson', function () {
    it('can serialize type to json', function () {
      const type = new PrimitiveType('number', true);
      const json = type.toJson();
      expect(json).to.be.eql({
        type: 'number',
        required: true,
      });
    });
  });

  describe('.primitiveFromJson', function () {
    it('can create type from json', function () {
      const type = PrimitiveType.primitiveFromJson(
        {
          type: 'number',
          required: false,
        },
        NumberType
      );

      expect(type).to.be.an.instanceof(NumberType);
      expect(type.required()).to.be.false;
    });
  });
});
