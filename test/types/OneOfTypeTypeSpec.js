/**
 * Created by chetanv on 13/06/16.
 */

import '../test-helper/testUtil';
import OneOfTypeType from '../../src/types/OneOfTypeType';
import DummyType from '../test-helper/DummyType';
import { expect } from 'chai';
import sinon from 'sinon';
// import _debug from 'debug';

// const debug = _debug('OneOfTypeTypeSpec');

describe('OneOfTypeType', function () {
  describe('#constructor', function () {
    it('validates type array is passed correctly', function () {
      /* eslint-disable no-new */
      function invalidType() {
        new OneOfTypeType('invalidType');
      }

      function arrayOfInvalidType() {
        new OneOfTypeType(['invalidType']);
      }

      function validType() {
        const type = new DummyType();
        new OneOfTypeType([type]);
      }

      /* eslint-enable no-new */

      expect(invalidType).to.throw(Error);
      expect(arrayOfInvalidType).to.throw(Error);
      expect(validType).to.not.throw(Error);
    });

    it('initialises required flag correctly', function () {
      const type = new DummyType();
      const oneOfTypeType = new OneOfTypeType([type], true);
      expect(oneOfTypeType.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    const type1 = new DummyType(true);
    const type2 = new DummyType(true);
    const oneOfTypeType = new OneOfTypeType([type1, type2], false);
    const oneOfTypeTypeR = new OneOfTypeType([type1, type2], true);

    it('validates required', function () {
      const emptyValueErr = oneOfTypeType.validate();
      expect(emptyValueErr).to.not.exist;

      const emptyValueErrR = oneOfTypeTypeR.validate();
      expect(emptyValueErrR).to.be.an.instanceof(Error);
    });

    it('invokes validate of each type (assuming none matches)', function () {
      const spy1 = sinon.spy(type1, 'validate');
      const spy2 = sinon.spy(type2, 'validate');
      const value = 'a';
      const err = oneOfTypeType.validate(value);
      expect(err).to.exist;
      expect(spy1).to.have.been.calledWith(value);
      expect(spy2).to.have.been.calledWith(value);
      type1.validate.restore();
      type2.validate.restore();
    });

    it('does not returns error if validation passes for any type', function () {
      const value = 1;
      const err = oneOfTypeType.validate(value);
      expect(err).to.not.exist;
    });
  });
});
