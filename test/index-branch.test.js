'use strict';

const assert = require('assert');
const cp = require('child_process');
const path = require('path');

describe('./test/index-branch.test.js', () => {
  let originalExecSync;
  const projectRoot = path.resolve(__dirname, '..');

  beforeEach(() => {
    originalExecSync = cp.execSync;
    delete require.cache[require.resolve('..')];
  });

  afterEach(() => {
    cp.execSync = originalExecSync;
    delete process.env.GIT_DIR;
    delete require.cache[require.resolve('..')];
  });

  it('should respect non-standard GIT_DIR (without /.git) and still work', () => {
    process.env.GIT_DIR = projectRoot; // 不带 /.git，触发 path.resolve 分支
    cp.execSync = (cmd) => {
      if (cmd.includes('config user.name')) return Buffer.from('Carol\n');
      // 其他命令不在本用例覆盖范围，返回空
      return Buffer.from('');
    };
    const LCL = require('..');
    const lcl = new LCL();
    const name = lcl.getUserNameSync();
    assert.strictEqual(name, 'Carol');
  });

  it('should fallback to branch_is_deleted_<short> when branch deleted', () => {
    const splitCharacter = '<#__last-commit-log__#>';
    const fields = [
      'abc1234',
      'abc1234abcdefabcdefabcdefabcdefabcdef',
      'subject',
      'subject-sanitized',
      '',
      '1700000000', '1 hour ago', 'Committer', 'committer@example.com',
      '1700000000', '1 hour ago', 'Author', 'author@example.com',
    ];
    cp.execSync = (cmd) => {
      if (cmd.includes('log -1 --pretty=format:')) return Buffer.from(fields.join(splitCharacter));
      if (cmd.includes('tag --contains HEAD')) return Buffer.from('');
      if (cmd.includes('rev-parse --abbrev-ref HEAD')) return Buffer.from('HEAD\n');
      if (cmd.includes('name-rev --name-only HEAD')) return Buffer.from('tags/v1.0.0\n');
      if (cmd.includes('log -n 1 --pretty=%d HEAD')) return Buffer.from('');
      return Buffer.from('');
    };
    const LCL = require('..');
    const lcl = new LCL();
    const commit = lcl.getLastCommitSync();
    assert.strictEqual(commit.gitBranch, 'branch_is_deleted_abc1234');
  });
});


