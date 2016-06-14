## Proptype

This library is inspired by [ReactJS](https://facebook.github.io/react/)'s [Prop Validation](https://facebook.github.io/react/docs/reusable-components.html#prop-validation)
module. The module serves well enough for ReactJS projects, but along with validations, I needed a little more: 

1. distinguish between types at runtime, and 
2. extract information about prop types.

A use case for this library is, if you are working on something such as a UI Builder that requires 
you to show a form with appropriate fields depending on property types expected by the component. 
You may find this library useful to defines property types required by your UI components.

Although this library is inspired by ReactJS, it is not restricted to be used with ReactJS in anyway.
In fact, property types specific to ReactJS i.e. element, node are not present in this library.


## Usage
If you have used ReactJS, the prop type declarations are very similar:

```javascript
import { PropTypes } from 'proptype';

const objectPropTypes = PropTypes.shape({
  optionalAny: PropTypes.any, 
  // => AnyType instance
  
  optionalArray: PropTypes.array, 
  // => ArrayType instance
  
  optionalBool: PropTypes.bool, 
  // => BoolType instance
  
  optionalFunc: PropTypes.func, 
  // => FuncType instance
  
  optionalNumber: PropTypes.number, 
  // => NumberType instance
  
  optionalObject: PropTypes.object, 
  // => ObjectType instance  
  
  optionalString: PropTypes.string, 
  // => StringType instance
  
  optionalSymbol: PropTypes.symbol, 
  // => SymbolType instance
  
  optionalInstanceOf: PropTypes.instanceOf(SomeClass), 
  // => InstanceOfType instance
  // optionalInstanceOf.InstanceOf => SomeClass
  
  optionalArrayOfNumbers: PropTypes.arrayOf(PropTypes.number), 
  // ArrayOfType instance
  // optionalArrayOfNumbers.arrayOf => NumberType instance
  
  optionalObjectOfStrings: PropTypes.objectOf(PropTypes.string), 
  // ObjectOfType instance
  // optionalObjectOfStrings.objectOf => StringType instance
  
  optionalOneOf: PropTypes.oneOf([1, 'two', 3]), 
  // => OneOfType instance
  // => optionalOneOf.oneOf => [1, 'two', 3]
  
  optionalOneOfType: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // => OneOfTypeType instance
  // optionalOneOfType.oneOfType => [PropTypes.number, PropTypes.string]
  
  optionalShape: PropTypes.shape({
    oNum: PropTypes.number,
    rString: PropTypes.string.isRequired,
    rShape: PropTypes.shape({
      a: PropTypes.array,
      b: PropTypes.func.isRequired,
    }).isRequired,
  }),
  // => ShapeType instance
  // optionalShape.shape => {
  //                            oNum: PropTypes.number, => NumberType instance
  //                            rString: PropTypes.string.isRequired, => StringType instance
  //                            rShape: PropTypes.shape({
  //                              a: PropTypes.array, => ArrayType instance
  //                              b: PropTypes.func.isRequired, => FuncType instance
  //                            }).isRequired, => ShapeType instance
  //                          }
                                                 
}).isRequired;

objectPropTypes.validate(objectPropValues);
```

You can suffix `isRequired` to mark the type as required, which otherwise would accept `null` and `undefined` values
as valid.

For example:
```javascript
const optionalType = PropTypes.number;
optionalType.required() === false;
let err = optionalType.validate(null); // => null;
err = optionalType.validate(23); // => null
err = optionalType.validate('abc'); // => Error instance

const requiredType = PropTypes.number.isRequired;
requiredType.required() === true;
let err = requiredType.validate(null); // => Error instance;
err = requiredType.validate(23); // => null
err = requiredType.validate('abc'); // => Error instance
```

### License

Copyright © 2015-2016 Chetan Verma. This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/chetanism/proptype/blob/master/LICENSE.txt) file.
The documentation to the project is licensed under the [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
license.


### A note of thanks
Last, but not the least, this library is built using [babel-starter-kit](https://github.com/kriasoft/babel-starter-kit)
Try it out for your next project!

---