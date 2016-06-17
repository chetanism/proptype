/**
 * Created by chetanv on 13/06/16.
 */

import StringType from '../../src/types/StringType';
import { expect } from 'chai';

describe('StringType', function () {
  describe('#constructor', function () {
    it('can be created', function () {
      const type = new StringType();
      expect(type).to.be.an.instanceof(StringType);
      expect(type.required()).to.be.false;
    });

    it('can be created with required flag', function () {
      const type = new StringType(true);
      expect(type).to.be.an.instanceof(StringType);
      expect(type.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    it('passes empty values if not required', function () {
      const type = new StringType();
      const err = type.validate();
      expect(err).to.not.exist;
    });

    it('does not passes empty values if required', function () {
      const type = new StringType(true);
      const err = type.validate();
      expect(err).to.be.an.instanceof(Error);
    });

    it('returns error if value is not a string', function () {
      const type = new StringType();
      const err = type.validate(123);
      expect(err).to.be.an.instanceof(Error);
    });

    it('passes string values', function () {
      const type = new StringType();
      const err = type.validate('abc');
      expect(err).to.not.exist;
    });
  });

  describe('#toJson', function () {
    it('can serialize type to json object', function () {
      const type = new StringType(true);

      const json = type.toJson();
      expect(json).to.be.eql({
        type: 'string',
        required: true,
      });
    });
  });

  describe('.fromJson', function () {
    it('can create type from json', function () {
      const type = StringType.fromJson({
        type: 'string',
        required: true,
      });

      expect(type).to.be.an.instanceof(StringType);
      expect(type.required()).to.be.true;
    });
  });
});
