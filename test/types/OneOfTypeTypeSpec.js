/**
 * Created by chetanv on 13/06/16.
 */

import '../test-helper/testUtil';
import OneOfTypeType from '../../src/types/OneOfTypeType';
import NumberType from '../../src/types/NumberType';
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

  describe('#toJson', function () {
    it('can serialize type to json object', function () {
      const type = new OneOfTypeType([new NumberType(true)], true);

      const json = type.toJson();
      expect(json).to.be.eql({
        type: 'oneOfType',
        required: true,
        oneOfType: [{
          type: 'number',
          required: true,
        }]
      });
    });
  });

  describe('.fromJson', function () {
    it('can create type from json', function () {
      const type = OneOfTypeType.fromJson({
        type: 'oneOfType',
        required: true,
        oneOfType: [{
          type: 'number',
          required: true,
        }]
      });

      expect(type).to.be.an.instanceof(OneOfTypeType);
      expect(type.required()).to.be.true;
      expect(type.oneOfType).to.be.an('array');
      expect(type.oneOfType[0]).to.be.an.instanceof(NumberType);
      expect(type.oneOfType[0].required()).to.be.true;
    });
  });
});
