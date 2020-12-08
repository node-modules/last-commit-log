'use strict';

const assert = require('assert');

const LCL = require('..');

describe('./test/unit.test.js', () => {
  it('should parse git commands fully', () => {
    const lcl = new LCL();
    return lcl.getLastCommit().then(commit => {
      assert.ok(commit);
      assert(commit.gitRemote === 'git@github.com:node-modules/last-commit-log.git' || commit.gitRemote === 'https://github.com/node-modules/last-commit-log.git');
      assert(commit.gitUrl === 'http://github.com/node-modules/last-commit-log' || commit.gitUrl === 'https://github.com/node-modules/last-commit-log');
      assert(typeof commit.shortHash === 'string');
      assert(typeof commit.hash === 'string');
      assert(typeof commit.subject === 'string');
      assert(typeof commit.sanitizedSubject === 'string');
      assert(typeof commit.body === 'string');
      assert(typeof commit.committer.date === 'string');
      assert(typeof commit.committer.relativeDate === 'string');
      assert(typeof commit.committer.name === 'string');
      assert(typeof commit.committer.email === 'string');
      assert(typeof commit.author.date === 'string');
      assert(typeof commit.author.relativeDate === 'string');
      assert(typeof commit.author.name === 'string');
      assert(typeof commit.author.email === 'string');
    });
  });

  it('should work with sync', () => {
    const lcl = new LCL();
    const commit = lcl.getLastCommitSync();
    assert(commit.gitRemote === 'git@github.com:node-modules/last-commit-log.git' || commit.gitRemote === 'https://github.com/node-modules/last-commit-log.git');
    assert(commit.gitUrl === 'http://github.com/node-modules/last-commit-log' || commit.gitUrl === 'https://github.com/node-modules/last-commit-log');
    assert(typeof commit.shortHash === 'string');
    assert(typeof commit.hash === 'string');
    assert(typeof commit.subject === 'string');
    assert(typeof commit.sanitizedSubject === 'string');
    assert(typeof commit.body === 'string');
    assert(typeof commit.committer.date === 'string');
    assert(typeof commit.committer.relativeDate === 'string');
    assert(typeof commit.committer.name === 'string');
    assert(typeof commit.committer.email === 'string');
    assert(typeof commit.author.date === 'string');
    assert(typeof commit.author.relativeDate === 'string');
    assert(typeof commit.author.name === 'string');
    assert(typeof commit.author.email === 'string');
  });

  it('should _fotmatGitHttpUrl correctly', () => {
    const lcl = new LCL();
    assert(lcl._formatGitHttpUrl() === '');
    assert(lcl._formatGitHttpUrl('https://github.com/node-modules/last-commit-log.git') === 'https://github.com/node-modules/last-commit-log');
  });

  it('should throw error', () => {
    const lcl = new LCL('package.json');
    return lcl.getLastCommit().then(() => {
      assert.fail();
    }).catch(err => {
      // console.log(err.stack);
      assert(err.message.includes('Can\'t get last commit'));
    });
  });
});
