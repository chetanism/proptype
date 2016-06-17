/**
 * Created by chetanv on 17/06/16.
 */

import mapObject from '../../src/utils/mapObject';
import { expect } from 'chai';
import sinon from 'sinon';

describe('mapObject', function () {
  function twice(a) {
    return a + a;
  }

  const obj = {
    a: 2,
    x: 5,
  };

  it('validates arguments', function () {
    function noCallback() {
      mapObject({});
    }

    function noObject() {
      mapObject();
    }

    expect(noCallback).to.throw(Error);
    expect(noObject).to.throw(Error);
  });

  it('calls the callback correctly', function () {
    const spy = sinon.spy(twice);
    mapObject(obj, spy);
    expect(spy).to.have.callCount(2);
    spy.reset();

    const obj1 = { a: 3 };
    mapObject(obj1, spy);
    expect(spy).to.have.been.calledWith(3, 'a');
  });

  it('maps object correctly', function () {
    const mappedObj = mapObject(obj, twice);

    expect(mappedObj).to.be.eql({
      a: 4,
      x: 10,
    });
  });
});