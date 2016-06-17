/**
 * Created by chetanv on 13/06/16.
 */

import FuncType from '../../src/types/FuncType';
import { expect } from 'chai';

describe('FuncType', function () {
  describe('#constructor', function () {
    it('can be created', function () {
      const type = new FuncType();
      expect(type).to.be.an.instanceof(FuncType);
      expect(type.required()).to.be.false;
    });

    it('can be created with required flag', function () {
      const type = new FuncType(true);
      expect(type).to.be.an.instanceof(FuncType);
      expect(type.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    it('passes empty values if not required', function () {
      const type = new FuncType();
      const err = type.validate();
      expect(err).to.not.exist;
    });

    it('does not passes empty values if required', function () {
      const type = new FuncType(true);
      const err = type.validate();
      expect(err).to.be.an.instanceof(Error);
    });

    it('returns error if value is not a function', function () {
      const type = new FuncType();
      const err = type.validate(123);
      expect(err).to.be.an.instanceof(Error);
    });

    it('passes function values', function () {
      const type = new FuncType();
      const err = type.validate(function () {});
      expect(err).to.not.exist;
    });
  });

  describe('#toJson', function () {
    it('can serialize type to json object', function () {
      const type = new FuncType(true);

      const json = type.toJson();
      expect(json).to.be.eql({
        type: 'func',
        required: true,
      });
    });
  });

  describe('.fromJson', function () {
    it('can create type from json', function () {
      const type = FuncType.fromJson({
        type: 'func',
        required: true,
      });

      expect(type).to.be.an.instanceof(FuncType);
      expect(type.required()).to.be.true;
    });
  });
});
