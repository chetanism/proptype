/**
 * Created by chetanv on 14/06/16.
 */

import PropType, {
  PropTypes,
  AnyType,
  ArrayType,
  ArrayOfType,
  BoolType,
  FuncType,
  InstanceOfType,
  NumberType,
  ObjectOfType,
  ObjectType,
  OneOfType,
  OneOfTypeType,
  ShapeType,
  StringType,
  SymbolType,
} from '../src/index';

import AnyType2 from '../src/types/AnyType';
import ArrayType2 from '../src/types/ArrayType';
import ArrayOfType2 from '../src/types/ArrayOfType';
import BoolType2 from '../src/types/BoolType';
import FuncType2 from '../src/types/FuncType';
import InstanceOfType2 from '../src/types/InstanceOfType';
import NumberType2 from '../src/types/NumberType';
import ObjectOfType2 from '../src/types/ObjectOfType';
import ObjectType2 from '../src/types/ObjectType';
import OneOfType2 from '../src/types/OneOfType';
import OneOfTypeType2 from '../src/types/OneOfTypeType';
import ShapeType2 from '../src/types/ShapeType';
import StringType2 from '../src/types/StringType';
import SymbolType2 from '../src/types/SymbolType';

import DummyClass from './test-helper/DummyClass';

import TypeFactory from '../src/factory/TypeFactory';

import { expect } from 'chai';

describe('index', function () {
  it('exports correct types', function () {
    expect(AnyType).to.be.equal(AnyType2);
    expect(ArrayType).to.be.equal(ArrayType2);
    expect(ArrayOfType).to.be.equal(ArrayOfType2);
    expect(BoolType).to.be.equal(BoolType2);
    expect(FuncType).to.be.equal(FuncType2);
    expect(InstanceOfType).to.be.equal(InstanceOfType2);
    expect(NumberType).to.be.equal(NumberType2);
    expect(ObjectOfType).to.be.equal(ObjectOfType2);
    expect(ObjectType).to.be.equal(ObjectType2);
    expect(OneOfType).to.be.equal(OneOfType2);
    expect(OneOfTypeType).to.be.equal(OneOfTypeType2);
    expect(ShapeType).to.be.equal(ShapeType2);
    expect(StringType).to.be.equal(StringType2);
    expect(SymbolType).to.be.equal(SymbolType2);
  });

  it('exports PropTypes correctly', function () {
    expect(PropTypes.any).to.be.an.instanceof(AnyType2);
    expect(PropTypes.any.isRequired).to.be.an.instanceof(AnyType2);

    expect(PropTypes.array).to.be.an.instanceof(ArrayType2);
    expect(PropTypes.array.isRequired).to.be.an.instanceof(ArrayType2);

    expect(PropTypes.bool).to.be.an.instanceof(BoolType2);
    expect(PropTypes.bool.isRequired).to.be.an.instanceof(BoolType2);

    expect(PropTypes.func).to.be.an.instanceof(FuncType2);
    expect(PropTypes.func.isRequired).to.be.an.instanceof(FuncType2);

    expect(PropTypes.number).to.be.an.instanceof(NumberType2);
    expect(PropTypes.number.isRequired).to.be.an.instanceof(NumberType2);

    expect(PropTypes.object).to.be.an.instanceof(ObjectType2);
    expect(PropTypes.object.isRequired).to.be.an.instanceof(ObjectType2);

    expect(PropTypes.string).to.be.an.instanceof(StringType2);
    expect(PropTypes.string.isRequired).to.be.an.instanceof(StringType2);

    expect(PropTypes.symbol).to.be.an.instanceof(SymbolType2);
    expect(PropTypes.symbol.isRequired).to.be.an.instanceof(SymbolType2);

    expect(PropTypes.arrayOf).to.be.a('function');
    const arrayOf = PropTypes.arrayOf(PropTypes.any);
    expect(arrayOf).to.be.an.instanceof(ArrayOfType);
    expect(arrayOf.required()).to.be.false;
    expect(arrayOf.isRequired).to.be.an.instanceof(ArrayOfType);
    expect(arrayOf.isRequired.required()).to.be.true;

    expect(PropTypes.instanceOf).to.be.a('function');
    const instanceOf = PropTypes.instanceOf(DummyClass);
    expect(instanceOf).to.be.an.instanceof(InstanceOfType2);
    expect(instanceOf.required()).to.be.false;
    expect(instanceOf.isRequired).to.be.an.instanceof(InstanceOfType2);
    expect(instanceOf.isRequired.required()).to.be.true;

    expect(PropTypes.objectOf).to.be.a('function');
    const objectOf = PropTypes.objectOf(PropTypes.any);
    expect(objectOf).to.be.an.instanceof(ObjectOfType);
    expect(objectOf.required()).to.be.false;
    expect(objectOf.isRequired).to.be.an.instanceof(ObjectOfType);
    expect(objectOf.isRequired.required()).to.be.true;

    expect(PropTypes.oneOf).to.be.a('function');
    const oneOf = PropTypes.oneOf([1, 2]);
    expect(oneOf).to.be.an.instanceof(OneOfType);
    expect(oneOf.required()).to.be.false;
    expect(oneOf.isRequired).to.be.an.instanceof(OneOfType);
    expect(oneOf.isRequired.required()).to.be.true;

    expect(PropTypes.oneOfType).to.be.a('function');
    const oneOfType = PropTypes.oneOfType([PropTypes.any]);
    expect(oneOfType).to.be.an.instanceof(OneOfTypeType);
    expect(oneOfType.required()).to.be.false;
    expect(oneOfType.isRequired).to.be.an.instanceof(OneOfTypeType);
    expect(oneOfType.isRequired.required()).to.be.true;

    expect(PropTypes.shape).to.be.a('function');
    const shape = PropTypes.shape({ a: PropTypes.any });
    expect(shape).to.be.an.instanceof(ShapeType);
    expect(shape.required()).to.be.false;
    expect(shape.isRequired).to.be.an.instanceof(ShapeType);
    expect(shape.isRequired.required()).to.be.true;
  });

  it('exports factory as PropType', function () {
    expect(PropType).to.be.an.instanceof(TypeFactory);
    const typeCount1 = Object.keys(PropType.types).length;
    const typeCount2 = Object.keys(PropType.propTypes).length;

    expect(typeCount1).to.be.equal(typeCount2);
    expect(typeCount1).to.be.greaterThan(0);
  });
});
