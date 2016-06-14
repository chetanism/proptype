/**
 * Created by chetanv on 13/06/16.
 */

import '../test-helper/testUtil';
import ArrayOfType from '../../src/types/ArrayOfType';
import DummyType from '../test-helper/DummyType';
import { expect } from 'chai';
import sinon from 'sinon';
// import _debug from 'debug';

// const debug = _debug('ArrayOfTypeSpec');

describe('ArrayOfType', function () {
  describe('#constructor', function () {
    it('validates type is passed correctly', function () {
      /* eslint-disable no-new */
      function invalidType() {
        new ArrayOfType('invalidType');
      }

      function validType() {
        const type = new DummyType();
        new ArrayOfType(type);
      }

      /* eslint-enable no-new */

      expect(invalidType).to.throw(Error);
      expect(validType).to.not.throw(Error);
    });

    it('initialises required flag correctly', function () {
      const type = new DummyType();
      const arrayOfType = new ArrayOfType(type, true);
      expect(arrayOfType.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    const type = new DummyType(true);
    const arrayOfType = new ArrayOfType(type, false);
    const arrayOfTypeR = new ArrayOfType(type, true);

    it('validates required', function () {
      const emptyValueErr = arrayOfType.validate();
      expect(emptyValueErr).to.not.exist;

      const emptyValueErrR = arrayOfTypeR.validate();
      expect(emptyValueErrR).to.be.an.instanceof(Error);
    });

    it('returns error if value is not an array', function () {
      const err = arrayOfType.validate('abc');
      expect(err).to.be.an.instanceof(Error);
    });

    it('invokes passed type\'s validate for each value', function () {
      const spy = sinon.spy(type, 'validate');
      const value = [1, 2, 3];
      const err = arrayOfType.validate(value);
      expect(err).to.not.exist;
      expect(spy).to.have.callCount(value.length);
      value.forEach(function (item, index) {
        const spyCall = spy.getCall(index);
        expect(spyCall).to.have.been.calledWith(item);
      });
      type.validate.restore();
    });

    it('returns error if validation fails for any value', function () {
      const value = [1, null, 3];
      const err = arrayOfType.validate(value);
      expect(err).to.be.an.instanceof(Error);
    });
  });
});
