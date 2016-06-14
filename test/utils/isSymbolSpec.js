/**
 * Created by chetanv on 13/06/16.
 */

import isSymbol from '../../src/utils/isSymbol';
import { expect } from 'chai';

describe('isSymbol', function () {
  it('detects symbols correctly', function () {
    const symbol = Symbol();
    expect(isSymbol(symbol)).to.be.true;
  });

  it('detects non-symbols correctly', function () {
    const symbol = 'alpha';
    expect(isSymbol(symbol)).to.be.false;
    expect(isSymbol(undefined)).to.be.false;
  });
});
