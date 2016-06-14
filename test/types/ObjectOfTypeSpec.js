/**
 * Created by chetanv on 13/06/16.
 */

import '../test-helper/testUtil';
import ObjectOfType from '../../src/types/ObjectOfType';
import DummyType from '../test-helper/DummyType';
import { expect } from 'chai';
import sinon from 'sinon';
// import _debug from 'debug';

// const debug = _debug('ObjectOfTypeSpec');

describe('ObjectOfType', function () {
  describe('#constructor', function () {
    it('validates type is passed correctly', function () {
      /* eslint-disable no-new */
      function invalidType() {
        new ObjectOfType('invalidType');
      }

      function validType() {
        const type = new DummyType();
        new ObjectOfType(type);
      }

      /* eslint-enable no-new */

      expect(invalidType).to.throw(Error);
      expect(validType).to.not.throw(Error);
    });

    it('initialises required flag correctly', function () {
      const type = new DummyType();
      const objectOfType = new ObjectOfType(type, true);
      expect(objectOfType.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    const type = new DummyType(true);
    const objectOfType = new ObjectOfType(type, false);
    const objectOfTypeR = new ObjectOfType(type, true);

    it('validates required', function () {
      const emptyValueErr = objectOfType.validate();
      expect(emptyValueErr).to.not.exist;

      const emptyValueErrR = objectOfTypeR.validate();
      expect(emptyValueErrR).to.be.an.instanceof(Error);
    });

    it('returns error if value is not an object', function () {
      const err = objectOfType.validate('abc');
      expect(err).to.be.an.instanceof(Error);
    });

    it('invokes passed type\'s validate for each property', function () {
      const spy = sinon.spy(type, 'validate');
      const value = { a: 1, b: 2, c: 3 };
      const err = objectOfType.validate(value);
      expect(err).to.not.exist;
      expect(spy).to.have.callCount(3);
      type.validate.restore();
    });

    it('returns error if validation fails for any property', function () {
      const value = { a: 1, b: null, c: 3 };
      const err = objectOfType.validate(value);
      expect(err).to.be.an.instanceof(Error);
    });
  });
});
