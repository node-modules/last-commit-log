'use strict';

const { diff } = require('..');
const assert =  require('assert');

describe('./test/diff.test.js', () => {
  it.only('should parse git', (done) => {
    diff('master', 'feat/support-diff')
      .then(d => {
        console.log(d);
        done();
      })
  });
});
