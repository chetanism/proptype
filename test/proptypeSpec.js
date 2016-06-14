/**
 * Created by chetanv on 14/06/16.
 */

import { PropTypes } from '../src/index';
import DummyClass from './test-helper/DummyClass';
import { expect } from 'chai';


describe('proptype', function () {
  it('test optional', function () {
    const propTypes = {
      optionalAny: PropTypes.any,
      optionalArray: PropTypes.array,
      optionalArrayOfNumbers: PropTypes.arrayOf(PropTypes.number),
      optionalArrayOfRequiredNumbers: PropTypes.arrayOf(
        PropTypes.number.isRequired
      ),
      optionalBool: PropTypes.bool,
      optionalFunc: PropTypes.func,
      optionalInstanceOf: PropTypes.instanceOf(DummyClass),
      optionalNumber: PropTypes.number,
      optionalObjectOfStrings: PropTypes.objectOf(PropTypes.string),
      optionalObjectOfRequiredString: PropTypes.objectOf(PropTypes.string.isRequired),
      optionalObject: PropTypes.object,
      optionalOneOf: PropTypes.oneOf([1, 'two', 3]),
      optionalOneOfNumberOrStringType: PropTypes.oneOfType(
        [PropTypes.number, PropTypes.string]
      ),
      optionalShape: PropTypes.shape({
        oNum: PropTypes.number,
        rString: PropTypes.string.isRequired,
        rShape: PropTypes.shape({
          a: PropTypes.array,
          b: PropTypes.func.isRequired,
        }).isRequired,
      }),
      optionalString: PropTypes.string,
      optionalSymbol: PropTypes.symbol,
    };


    let err = propTypes.optionalAny.validate(null);
    expect(err).to.not.exist;
    err = propTypes.optionalAny.validate({ a: 1 });
    expect(err).to.not.exist;


    err = propTypes.optionalArray.validate();
    expect(err).to.not.exist;
    err = propTypes.optionalArray.validate([1, { a: 2 }]);
    expect(err).to.not.exist;
    err = propTypes.optionalArray.validate(2);
    expect(err).to.be.an.instanceof(Error);


    err = propTypes.optionalArrayOfNumbers.validate(null);
    expect(err).to.not.exist;
    err = propTypes.optionalArrayOfNumbers.validate(2);
    expect(err).to.be.an.instanceof(Error);
    err = propTypes.optionalArrayOfNumbers.validate([1, 2, 'abc']);
    expect(err).to.be.an.instanceof(Error);
    err = propTypes.optionalArrayOfNumbers.validate([1, 2, null]);
    expect(err).to.not.exist;
    err = propTypes.optionalArrayOfNumbers.validate([1, 2, 3]);
    expect(err).to.not.exist;

    err = propTypes.optionalArrayOfRequiredNumbers.validate([1, 2, null]);
    expect(err).to.be.an.instanceof(Error);


    err = propTypes.optionalShape.validate();
    expect(err).to.not.exist;
    err = propTypes.optionalShape.validate({
      rString: 'abc',
      rShape: {
        b: () => null,
      },
    });
    expect(err).to.not.exist;
    err = propTypes.optionalShape.validate({
      rString: 'abc',
      rShape: {
        a: [],
      },
    });
    expect(err).to.be.an.instanceof(Error);
    err = propTypes.optionalShape.validate({
      rString: 'abc',
      oNum: 3,
    });
    expect(err).to.be.an.instanceof(Error);

    err = propTypes.optionalOneOfNumberOrStringType.validate({});
    expect(err).to.be.an.instanceof(Error);
    err = propTypes.optionalOneOfNumberOrStringType.validate(1);
    expect(err).to.not.exist;
    err = propTypes.optionalOneOfNumberOrStringType.validate('two');
    expect(err).to.not.exist;

  });
});
