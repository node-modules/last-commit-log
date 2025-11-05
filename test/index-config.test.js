'use strict';

const assert = require('assert');
const cp = require('child_process');

describe('./test/index-config.test.js', () => {
  let originalExecSync;

  beforeEach(() => {
    originalExecSync = cp.execSync;
    // 确保后续 require('..') 重新加载，并捕获最新的 execSync 引用
    delete require.cache[require.resolve('..')];
  });

  afterEach(() => {
    cp.execSync = originalExecSync;
    delete require.cache[require.resolve('..')];
  });

  it('should read user.name from git config via getUserNameSync', () => {
    cp.execSync = () => Buffer.from('Alice\n');
    const LCL = require('..');
    const lcl = new LCL();
    const name = lcl.getUserNameSync();
    assert.strictEqual(name, 'Alice');
  });

  it('should expose config getter with user.name', () => {
    cp.execSync = () => Buffer.from('Bob\n');
    const LCL = require('..');
    const lcl = new LCL();
    const cfg = lcl.config;
    assert.strictEqual(cfg.user.name, 'Bob');
  });

  it('should format http .git url as expected', () => {
    const LCL = require('..');
    const lcl = new LCL();
    const res = lcl._formatGitHttpUrl('http://github.com/group/repo.git');
    assert.strictEqual(res, 'http://github.com/group/repo');
  });
});


