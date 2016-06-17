/**
 * Created by chetanv on 13/06/16.
 */

import SymbolType from '../../src/types/SymbolType';
import { expect } from 'chai';

describe('SymbolType', function () {
  describe('#constructor', function () {
    it('can be created', function () {
      const type = new SymbolType();
      expect(type).to.be.an.instanceof(SymbolType);
      expect(type.required()).to.be.false;
    });

    it('can be created with required flag', function () {
      const type = new SymbolType(true);
      expect(type).to.be.an.instanceof(SymbolType);
      expect(type.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    it('passes empty values if not required', function () {
      const type = new SymbolType();
      const err = type.validate();
      expect(err).to.not.exist;
    });

    it('does not passes empty values if required', function () {
      const type = new SymbolType(true);
      const err = type.validate();
      expect(err).to.be.an.instanceof(Error);
    });

    it('returns error if value is not a symbol', function () {
      const type = new SymbolType();
      const err = type.validate(123);
      expect(err).to.be.an.instanceof(Error);
    });

    it('passes symbol values', function () {
      const type = new SymbolType();
      const err = type.validate(Symbol('abc'));
      expect(err).to.not.exist;
    });
  });

  describe('#toJson', function () {
    it('can serialize type to json object', function () {
      const type = new SymbolType(true);

      const json = type.toJson();
      expect(json).to.be.eql({
        type: 'symbol',
        required: true,
      });
    });
  });

  describe('.fromJson', function () {
    it('can create type from json', function () {
      const type = SymbolType.fromJson({
        type: 'symbol',
        required: true,
      });

      expect(type).to.be.an.instanceof(SymbolType);
      expect(type.required()).to.be.true;
    });
  });
});
