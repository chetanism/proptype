/**
 * Created by chetanv on 17/06/16.
 */

import factory from '../../src/factory/factory';

import AnyType from '../../src/types/AnyType';
import ArrayType from '../../src/types/ArrayType';
import BoolType from '../../src/types/BoolType';
import FuncType from '../../src/types/FuncType';
import NumberType from '../../src/types/NumberType';
import ObjectType from '../../src/types/ObjectType';
import StringType from '../../src/types/StringType';
import SymbolType from '../../src/types/SymbolType';

import ArrayOfType from '../../src/types/ArrayOfType';
import CustomType from '../../src/types/CustomType';
import InstanceOfType from '../../src/types/InstanceOfType';
import ObjectOfType from '../../src/types/ObjectOfType';
import OneOfType from '../../src/types/OneOfType';
import OneOfTypeType from '../../src/types/OneOfTypeType';
import ShapeType from '../../src/types/ShapeType';

import { expect } from 'chai';

describe('factory', function () {
  it('registers primitive types correctly', function () {
    const primitiveTypes = [
      AnyType, ArrayType, BoolType, FuncType, NumberType, ObjectType,
      StringType, SymbolType,
    ];

    primitiveTypes.forEach((Type) => {
      expect(factory.propTypes[Type.TYPE_NAME]).to.be.an.instanceof(Type);
      expect(factory.types[Type.TYPE_NAME]).to.be.equal(Type);
    });
  });

  it('registers complex types correctly', function () {
    const complexTypes = [ArrayOfType, CustomType, InstanceOfType, ObjectOfType,
      OneOfType, OneOfTypeType, ShapeType,
    ];

    complexTypes.forEach((Type) => {
      expect(factory.propTypes[Type.TYPE_NAME]).to.be.a('function');
      expect(factory.types[Type.TYPE_NAME]).to.be.equal(Type);
    });
  });
});

