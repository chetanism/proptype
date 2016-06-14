/**
 * Created by chetanv on 13/06/16.
 */

import getPreciseType from '../../src/utils/getPreciseType';
import { expect } from 'chai';

describe('getPreciseType', function () {
  it('returns correct type for date objects', function () {
    const type = getPreciseType(new Date());
    expect(type).to.be.equal('date');
  });

  it('returns correct type for regexp values', function () {
    const regExp = /someRegEx/;
    const type = getPreciseType(regExp);
    expect(type).to.be.equal('regexp');
  });
});
