/**
 * Created by chetanv on 13/06/16.
 */

import InstanceOfType from '../../src/types/InstanceOfType';
import DummyClass from '../test-helper/DummyClass';
import { expect } from 'chai';

describe('InstanceOfType', function () {
  describe('#constructor', function () {
    it('validates a valid class is passed', function () {
      /* eslint-disable no-new */
      function invalidClass() {
        new InstanceOfType(123);
      }

      function validClass() {
        new InstanceOfType(DummyClass);
      }
      /* eslint-enable no-new */

      expect(invalidClass).to.throw(Error);
      expect(validClass).to.not.throw(Error);
    });

    it('can be created', function () {
      const type = new InstanceOfType(DummyClass);
      expect(type).to.be.an.instanceof(InstanceOfType);
      expect(type.required()).to.be.false;
    });

    it('can be created with required flag', function () {
      const type = new InstanceOfType(DummyClass, true);
      expect(type).to.be.an.instanceof(InstanceOfType);
      expect(type.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    it('passes empty values if not required', function () {
      const type = new InstanceOfType(DummyClass);
      const err = type.validate();
      expect(err).to.not.exist;
    });

    it('does not passes empty values if required', function () {
      const type = new InstanceOfType(DummyClass, true);
      const err = type.validate();
      expect(err).to.be.an.instanceof(Error);
    });

    it('returns error if value is not an instance of passed class',
      function () {
        const type = new InstanceOfType(DummyClass);
        const err = type.validate(123);
        expect(err).to.be.an.instanceof(Error);
      }
    );

    it('passes instances of passed class', function () {
      const type = new InstanceOfType(DummyClass);
      const err = type.validate(new DummyClass());
      expect(err).to.not.exist;
    });
  });

  describe('#toJson', function () {
    it('throws error', function () {
      const type = new InstanceOfType(DummyClass);
      function cantSerialize() {
        type.toJson();
      }
      expect(cantSerialize).to.throw(Error);
    });
  });

  describe('.fromJson', function () {
    it('throws error', function () {
      function cantCreateFromJson() {
        InstanceOfType.fromJson({});
      }

      expect(cantCreateFromJson).to.throw(Error);
    });
  });
});
