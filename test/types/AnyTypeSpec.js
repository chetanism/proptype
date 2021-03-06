/**
 * Created by chetanv on 13/06/16.
 */

import AnyType from '../../src/types/AnyType';
import { expect } from 'chai';

describe('AnyType', function () {
  describe('#constructor', function () {
    it('can be created', function () {
      const type = new AnyType();
      expect(type).to.be.an.instanceof(AnyType);
      expect(type.required()).to.be.false;
    });

    it('can be created with required flag as true', function () {
      const type = new AnyType(true);
      expect(type).to.be.an.instanceof(AnyType);
      expect(type.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    it('validates required values', function () {
      const type = new AnyType(true);

      const emptyErr = type.validate(null);
      expect(emptyErr).to.exist;
      expect(emptyErr).to.be.an.instanceof(Error);

      const validErr = type.validate('someValue');
      expect(validErr).to.not.exist;
    });

    it('validates null values if not required', function () {
      const type = new AnyType(false);

      const emptyErr = type.validate(null);
      expect(emptyErr).to.not.exist;

      const validErr = type.validate('someValue');
      expect(validErr).to.not.exist;
    });
  });

  describe('#fromJson', function () {
    const obj = { type: 'any', required: true };
    let type = AnyType.fromJson(obj);
    expect(type).to.be.an.instanceof(AnyType);

    obj.type = null;
    type = AnyType.fromJson(obj);
    expect(type).to.be.an.instanceof(AnyType);

    function invalidType() {
      obj.type = 'array';
      AnyType.fromJson(obj);
    }

    expect(invalidType).to.throw(Error);
  });

  describe('#toJson', function () {
    const type1 = new AnyType();

    expect(type1.toJson()).to.be.eql({
      type: AnyType.TYPE_NAME,
      required: false,
    });
  });
});
