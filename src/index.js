/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import factory from './factory/factory';

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

// import _debug from 'debug';
// const debug = _debug('index');

const PropTypes = factory.propTypes;

export {
  PropTypes,

  AnyType,
  ArrayType,
  BoolType,
  FuncType,
  NumberType,
  ObjectType,
  StringType,
  SymbolType,

  ArrayOfType,
  InstanceOfType,
  ObjectOfType,
  OneOfType,
  OneOfTypeType,
  ShapeType,
};

export default factory;
