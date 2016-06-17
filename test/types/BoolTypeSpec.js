/**
 * Created by chetanv on 13/06/16.
 */

import BoolType from '../../src/types/BoolType';
import { expect } from 'chai';

describe('BoolType', function () {
  describe('#constructor', function () {
    it('can be created', function () {
      const type = new BoolType();
      expect(type).to.be.an.instanceof(BoolType);
      expect(type.required()).to.be.false;
    });

    it('can be created with required flag', function () {
      const type = new BoolType(true);
      expect(type).to.be.an.instanceof(BoolType);
      expect(type.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    it('passes empty values if not required', function () {
      const type = new BoolType();
      const err = type.validate();
      expect(err).to.not.exist;
    });

    it('does not passes empty values if required', function () {
      const type = new BoolType(true);
      const err = type.validate();
      expect(err).to.be.an.instanceof(Error);
    });

    it('returns error if value is not a bool', function () {
      const type = new BoolType();
      const err = type.validate(123);
      expect(err).to.be.an.instanceof(Error);
    });

    it('passes bool values', function () {
      const type = new BoolType();
      const err = type.validate(false);
      expect(err).to.not.exist;
    });
  });

  describe('#toJson', function () {
    it('can serialize type to json object', function () {
      const type = new BoolType(true);

      const json = type.toJson();
      expect(json).to.be.eql({
        type: 'bool',
        required: true,
      });
    });
  });

  describe('.fromJson', function () {
    it('can create type from json', function () {
      const type = BoolType.fromJson({
        type: 'bool',
        required: true,
      });

      expect(type).to.be.an.instanceof(BoolType);
      expect(type.required()).to.be.true;
    });
  });
});
