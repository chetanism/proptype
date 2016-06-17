/**
 * Created by chetanv on 17/06/16.
 */

import TypeFactory from '../../src/factory/TypeFactory';
import DummyType from '../test-helper/DummyType';
import { expect } from 'chai';
import sinon from 'sinon';

describe('TypeFactory', function () {
  const dummyType = DummyType.TYPE_NAME;

  describe('#register', function () {
    it('can register type instances', function () {
      const factory = new TypeFactory;
      factory.register(DummyType, true);
      const type = factory.types[dummyType];
      const propType = factory.propTypes[dummyType];

      expect(type).to.be.equal(DummyType);
      expect(propType).to.be.an.instanceof(DummyType);
      expect(propType.required()).to.be.false;
      expect(propType.isRequired.required()).to.be.true;
    });

    it('can register type creators', function () {
      const factory = new TypeFactory;
      factory.register(DummyType);

      const type = factory.types[dummyType];
      const propType = factory.propTypes[dummyType];

      expect(type).to.be.equal(DummyType);
      expect(propType).to.be.a('function');

      const createdType = propType();
      expect(createdType).to.be.an.instanceof(DummyType);
      expect(createdType.required()).to.be.false;
      expect(createdType.isRequired).to.be.equal(createdType);
      expect(createdType.required()).to.be.true;
    });

    it('can not register types again or with same name', function () {
      const factory = new TypeFactory;

      function reRegister() {
        factory.register(DummyType, true);
        factory.register(DummyType);
      }

      expect(reRegister).to.throw(Error);
    });
  });

  describe('#fromJson', function () {
    const factory = new TypeFactory;
    factory.register(DummyType, true);

    it('validates typeJson', function () {
      function invalidTypeJson() {
        factory.fromJson();
      }

      expect(invalidTypeJson).to.throw(Error);
    });

    it('validates type of requested type', function () {
      function invalidTypeRequest() {
        factory.fromJson({ type: 'alpha' });
      }

      expect(invalidTypeRequest).to.throw(Error);
    });

    it('calls fromJson on Type to created Type', function () {
      const spy = sinon.spy(DummyType, 'fromJson');

      const typeJson = {
        type: 'dummy',
        required: true,
      };

      factory.fromJson(typeJson);

      expect(spy).to.have.been.calledWithMatch(typeJson);
      DummyType.fromJson.restore();
    });
  });
});
