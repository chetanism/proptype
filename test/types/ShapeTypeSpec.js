/**
 * Created by chetanv on 13/06/16.
 */

import '../test-helper/testUtil';
import ShapeType from '../../src/types/ShapeType';
import DummyType from '../test-helper/DummyType';
import { expect } from 'chai';
import sinon from 'sinon';
// import _debug from 'debug';

// const debug = _debug('ShapeTypeSpec');

describe('ShapeType', function () {
  describe('#constructor', function () {
    it('validates type shape is passed correctly', function () {
      /* eslint-disable no-new */
      function invalidType() {
        new ShapeType('invalidType');
      }

      function shapeOfInvalidType() {
        new ShapeType({ a: 'invalidType' });
      }

      function validType() {
        const type = new DummyType();
        new ShapeType({ a: type });
      }

      /* eslint-enable no-new */

      expect(invalidType).to.throw(Error);
      expect(shapeOfInvalidType).to.throw(Error);
      expect(validType).to.not.throw(Error);
    });

    it('initialises required flag correctly', function () {
      const type = new DummyType();
      const shapeType = new ShapeType({ a: type }, true);
      expect(shapeType.required()).to.be.true;
    });
  });

  describe('#validate', function () {
    const type1 = new DummyType(true);
    const type2 = new DummyType(true);
    const type3 = new DummyType(true);
    const shapeType = new ShapeType({ a: type1, b: type2, c: type3 }, false);
    const shapeTypeR = new ShapeType({ a: type1, b: type2, c: type3 }, true);

    it('validates required', function () {
      const emptyValueErr = shapeType.validate();
      expect(emptyValueErr).to.not.exist;

      const emptyValueErrR = shapeTypeR.validate();
      expect(emptyValueErrR).to.be.an.instanceof(Error);
    });

    it('invokes validate for each shape key', function () {
      const spy1 = sinon.spy(type1, 'validate');
      const spy2 = sinon.spy(type2, 'validate');
      const spy3 = sinon.spy(type3, 'validate');
      const value = { a: 1, b: 2, c: 3 };
      const err = shapeType.validate(value);
      expect(err).to.not.exist;
      expect(spy1).to.have.been.calledWith(value.a);
      expect(spy2).to.have.been.calledWith(value.b);
      expect(spy3).to.have.been.calledWith(value.c);
      type1.validate.restore();
      type2.validate.restore();
      type3.validate.restore();
    });

    it('returns error if validation fails', function () {
      const value = { a: 1, b: 'asd', c: 3 };
      const err = shapeType.validate(value);
      expect(err).to.exist;
    });

    it('does not returns error if validation passes', function () {
      const value = { a: 1, b: 2, c: 3 };
      const err = shapeType.validate(value);
      expect(err).to.not.exist;
    });
  });
});
