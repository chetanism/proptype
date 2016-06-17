/**
 * Created by chetanv on 13/06/16.
 */

import '../test-helper/testUtil';
import OneOfType from '../../src/types/OneOfType';
import { expect } from 'chai';
// import _debug from 'debug';

// const debug = _debug('OneOfTypeSpec');

describe('OneOfType', function () {
  describe('#constructor', function () {
    it('validates enum values are passed correctly', function () {
      /* eslint-disable no-new */
      function invalidType() {
        new OneOfType('invalidType');
      }

      function validType() {
        new OneOfType([1, 2, 3]);
      }

      /* eslint-enable no-new */

      expect(invalidType).to.throw(Error);
      expect(validType).to.not.throw(Error);
    });

    it('initialises required flag correctly', function () {
      const oneOfType = new OneOfType([1, 2, 3], true);
      expect(oneOfType.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    const expectedValues = [1, 'two', 'III'];
    const oneOfType = new OneOfType(expectedValues, false);
    const oneOfTypeR = new OneOfType(expectedValues, true);

    it('validates required', function () {
      const emptyValueErr = oneOfType.validate();
      expect(emptyValueErr).to.not.exist;

      const emptyValueErrR = oneOfTypeR.validate();
      expect(emptyValueErrR).to.be.an.instanceof(Error);
    });

    it('returns error if value is not one of expected values', function () {
      const err = oneOfType.validate(2);
      expect(err).to.be.an.instanceof(Error);
    });

    it('does not return error if value is one of expected values', function () {
      const err = oneOfType.validate('III');
      expect(err).to.not.exist;
    });
  });

  describe('#toJson', function () {
    it('can serialize type to json object', function () {
      const type = new OneOfType([1, 'two'], true);

      const json = type.toJson();
      expect(json).to.be.eql({
        type: 'oneOf',
        required: true,
        oneOf: [1, 'two'],
      });
    });
  });

  describe('.fromJson', function () {
    it('can create type from json', function () {
      const type = OneOfType.fromJson({
        type: 'oneOf',
        required: true,
        oneOf: [1, 'two'],
      });

      expect(type).to.be.an.instanceof(OneOfType);
      expect(type.required()).to.be.true;
      expect(type.oneOf).to.be.eql([1, 'two']);
    });
  });
});
