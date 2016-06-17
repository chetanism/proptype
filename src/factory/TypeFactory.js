/**
 * Created by chetanv on 15/06/16.
 */

// import _debug from 'debug';
// const debug = _debug('TypeFactory');

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

class TypeFactory {
  types = {};
  propTypes = {};

  register(Type, asInstance = false) {
    const typeName = Type.TYPE_NAME;

    if (this.types[typeName]) {
      throw new Error(`Type ${typeName} already registered.`);
    }

    this.types[typeName] = Type;

    this.propTypes[typeName] = asInstance ?
      createPrimitivePropType(Type) :
      createComplexPropType(Type);
  }

  fromJson(typeJson) {
    if (typeof typeJson !== 'object') {
      throw new Error('Invalid type json passed');
    }

    const Type = this.types[typeJson.type];

    if (!Type) {
      throw new Error(`Unknown type '${typeJson.type}' requested`);
    }

    return Type.fromJson(typeJson);
  }
}

export default TypeFactory;
