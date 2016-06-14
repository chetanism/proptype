/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import AnyType from './types/AnyType';
import ArrayType from './types/ArrayType';
import BoolType from './types/BoolType';
import FuncType from './types/FuncType';
import NumberType from './types/NumberType';
import ObjectType from './types/ObjectType';
import StringType from './types/StringType';
import SymbolType from './types/SymbolType';

import ArrayOfType from './types/ArrayOfType';
import InstanceOfType from './types/InstanceOfType';
import ObjectOfType from './types/ObjectOfType';
import OneOfType from './types/OneOfType';
import OneOfTypeType from './types/OneOfTypeType';
import ShapeType from './types/ShapeType';


function createPrimitivePropType(Type) {
  const type = new Type;
  type.isRequired = new Type(true);
  return type;
}

function createComplexPropType(Type) {
  return (...args) => {
    const type = new Type(...args);
    Object.defineProperty(type, 'isRequired', {
      /* eslint-disable func-names, object-shorthand */
      get: function () {
        this.valueIsRequired = true;
        return this;
      },
      /* eslint-enable func-names, object-shorthand */
    });
    return type;
  };
}

const PropTypes = {
  any: createPrimitivePropType(AnyType),
  array: createPrimitivePropType(ArrayType),
  bool: createPrimitivePropType(BoolType),
  func: createPrimitivePropType(FuncType),
  number: createPrimitivePropType(NumberType),
  object: createPrimitivePropType(ObjectType),
  string: createPrimitivePropType(StringType),
  symbol: createPrimitivePropType(SymbolType),

  arrayOf: createComplexPropType(ArrayOfType),
  instanceOf: createComplexPropType(InstanceOfType),
  objectOf: createComplexPropType(ObjectOfType),
  oneOf: createComplexPropType(OneOfType),
  oneOfType: createComplexPropType(OneOfTypeType),
  shape: createComplexPropType(ShapeType),
};

export {
  PropTypes,

  AnyType as AnyType,
  ArrayType as ArrayType,
  BoolType as BoolType,
  FuncType as FuncType,
  NumberType as NumberType,
  ObjectType as ObjectType,
  StringType as StringType,
  SymbolType as SymbolType,

  ArrayOfType as ArrayOfType,
  InstanceOfType as InstanceOfType,
  ObjectOfType as ObjectOfType,
  OneOfType as OneOfType,
  OneOfTypeType as OneOfTypeType,
  ShapeType as ShapeType,
};
