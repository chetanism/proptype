/**
 * Created by chetanv on 15/06/16.
 */

import TypeFactory from './TypeFactory';

import AnyType from '../types/AnyType';
import ArrayType from '../types/ArrayType';
import BoolType from '../types/BoolType';
import FuncType from '../types/FuncType';
import NumberType from '../types/NumberType';
import ObjectType from '../types/ObjectType';
import StringType from '../types/StringType';
import SymbolType from '../types/SymbolType';

import ArrayOfType from '../types/ArrayOfType';
import CustomType from '../types/CustomType';
import InstanceOfType from '../types/InstanceOfType';
import ObjectOfType from '../types/ObjectOfType';
import OneOfType from '../types/OneOfType';
import OneOfTypeType from '../types/OneOfTypeType';
import ShapeType from '../types/ShapeType';

// import _debug from 'debug';
// const debug = _debug('factory');

const factory = new TypeFactory;
factory.register(AnyType, true);
factory.register(ArrayType, true);
factory.register(BoolType, true);
factory.register(FuncType, true);
factory.register(NumberType, true);
factory.register(ObjectType, true);
factory.register(StringType, true);
factory.register(SymbolType, true);

factory.register(ArrayOfType);
factory.register(CustomType);
factory.register(InstanceOfType);
factory.register(ObjectOfType);
factory.register(OneOfType);
factory.register(OneOfTypeType);
factory.register(ShapeType);

export default factory;
