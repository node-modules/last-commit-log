'use strict';

const assert = require('assert');
const cp = require('child_process');

describe('./test/line-diff.mock.test.js', () => {
  let originalExecSync;

  beforeEach(() => {
    originalExecSync = cp.execSync;
  });

  afterEach(() => {
    cp.execSync = originalExecSync;
    // 清理缓存，避免对其他测试产生影响
    delete require.cache[require.resolve('..')];
    delete require.cache[require.resolve('../line-diff')];
  });

  it('should return null when git diff is empty', () => {
    cp.execSync = () => Buffer.from('');
    const diff = require('../line-diff');
    const res = diff({ targetBranch: 'master', currentBranch: 'master' });
    assert.strictEqual(res, null);
  });

  it('should parse complex diff blocks (single and range lines)', () => {
    const mock = [
      'diff --git a/src/a.js b/src/a.js',
      'index 1111111..2222222 100644',
      '--- a/src/a.js',
      '+++ b/src/a.js',
      '@@ -1,0 +5,3 @@',
      '+new line',
      '+new line',
      '+new line',
      'diff --git a/src/b.js b/src/b.js',
      'index 3333333..4444444 100644',
      '--- a/src/b.js',
      '+++ b/src/b.js',
      '@@ -10 +20 @@',
      '+only one line change',
    ].join('\n');

    cp.execSync = () => Buffer.from(mock);
    const diff = require('../line-diff');
    const res = diff({ targetBranch: 'master', currentBranch: 'feature/x' });

    assert.ok(res);
    assert.deepStrictEqual(res['/src/a.js'], [[5, 7]]);
    assert.deepStrictEqual(res['/src/b.js'], [[20, 20]]);
  });
});


