/**
 * Created by chetanv on 13/06/16.
 */

import CustomType from '../../src/types/CustomType';
import DummyClass from '../test-helper/DummyClass';
import { expect } from 'chai';
import sinon from 'sinon';

describe('CustomType', function () {
  describe('#constructor', function () {
    it('validates a valid function is passed', function () {
      /* eslint-disable no-new */
      function invalidFunction() {
        new CustomType(123);
      }

      function validClass() {
        new CustomType(() => null);
      }
      /* eslint-enable no-new */

      expect(invalidFunction).to.throw(Error);
      expect(validClass).to.not.throw(Error);
    });

    it('can be created', function () {
      const type = new CustomType(() => null);
      expect(type).to.be.an.instanceof(CustomType);
      expect(type.required()).to.be.false;
    });

    it('can be created with required flag', function () {
      const type = new CustomType(() => null, true);
      expect(type).to.be.an.instanceof(CustomType);
      expect(type.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    it('passes empty values if not required', function () {
      const type = new CustomType(() => null);
      const err = type.validate();
      expect(err).to.not.exist;
    });

    it('does not passes empty values if required', function () {
      const type = new CustomType(() => null, true);
      const err = type.validate();
      expect(err).to.be.an.instanceof(Error);
    });

    it('does not call validator for null values', function () {
      const spy = sinon.spy();
      const type = new CustomType(spy);
      const err = type.validate();
      expect(err).to.not.exist;
      expect(spy).to.not.have.been.called;
    });

    it('calls validator with the value', function () {
      const spy = sinon.spy(() => null);
      const type = new CustomType(spy);
      type.validate(34);
      expect(spy).to.have.been.calledWith(34);
    });

    it('returns value returned by the validator', function () {
      function validator() {
        return 'alpha-beta';
      }

      const type = new CustomType(validator);
      const err = type.validate(34);
      expect(err).to.be.equal('alpha-beta');
    });
  });

  describe('#toJson', function () {
    it('throws error', function () {
      const type = new CustomType(DummyClass);
      function cantSerialize() {
        type.toJson();
      }
      expect(cantSerialize).to.throw(Error);
    });
  });

  describe('.fromJson', function () {
    it('throws error', function () {
      function cantCreateFromJson() {
        CustomType.fromJson({});
      }

      expect(cantCreateFromJson).to.throw(Error);
    });
  });
});
