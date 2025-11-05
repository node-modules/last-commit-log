'use strict';

const assert = require('assert');
const LCL = require('..');

describe('./test/format-url.test.js', () => {
  it('should format ssh remote to http url', () => {
    const lcl = new LCL();
    const res = lcl._formatGitHttpUrl('git@github.com:group/repo.git');
    assert.strictEqual(res, 'http://github.com/group/repo');
  });

  it('should strip credentials in https remote and drop .git', () => {
    const lcl = new LCL();
    const withToken = lcl._formatGitHttpUrl('https://user:token@github.com/group/repo.git');
    assert.strictEqual(withToken, 'https://github.com/group/repo');

    const withAtToken = lcl._formatGitHttpUrl('https://user@token@github.com/group/repo.git');
    assert.strictEqual(withAtToken, 'https://github.com/group/repo');
  });

  it('should passthrough non-.git http(s) url', () => {
    const lcl = new LCL();
    const res = lcl._formatGitHttpUrl('https://github.com/group/repo');
    assert.strictEqual(res, 'https://github.com/group/repo');
  });

  it('should return empty string for empty input', () => {
    const lcl = new LCL();
    assert.strictEqual(lcl._formatGitHttpUrl(), '');
    assert.strictEqual(lcl._formatGitHttpUrl(''), '');
  });
});


