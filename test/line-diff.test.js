'use strict';

const assert = require('assert');

const { diff } = require('..');

describe('./test/line-diff.test.js', () => {
  let res;
  it('should parse git', () => {
    res = diff({
      currentBranch: 'master',
    });
    assert.equal(typeof res, 'object');
  });
});

describe('./test/line-diff.test.js with filters', () => {
  let res;
  it('should parse git', () => {
    res = diff({
      currentBranch: 'master',
      filetypes: [ '*.ts', '*.js' ],
    });
    assert.equal(typeof res, 'object');
  });
});
