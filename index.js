'use strict';

const url = require('url');
const dotgitconfig = require('dotgitconfig');
const { execSync } = require('child_process');

module.exports = class LCL {
  constructor(dir = process.cwd()) {
    this.cwd = dir;
  }

  async getLastCommit() {
    return this.getLastCommitSync();
  }

  getLastCommitSync() {
    const prettyFormat = [
      '%h', '%H', '%s', '%f', '%b',
      '%ct', '%cr', '%cn', '%ce',
      '%at', '%ar', '%an', '%ae',
    ];
    const splitCharacter = '<#__last-commit-log__#>';
    const command = 'git log -1 --pretty=format:"' + prettyFormat.join(splitCharacter) + '"';

    let c;
    let gitRemote;
    let gitBranch;
    let gitTag;
    try {
      const opts = {
        cwd: this.cwd,
      };
      const stdout = execSync(command, opts).toString();
      c = stdout.split(splitCharacter);
      gitBranch = getGitBranch(opts, {
        shortHash: c[0],
      });
      const tag = execSync('git tag --contains HEAD', opts).toString();
      gitTag = tag.trim();
      const config = dotgitconfig(this.cwd);
      gitRemote = config.remote && config.remote.origin && config.remote.origin.url;
    } catch (e) {
      throw new Error(`Can't get last commit, ${e}`);
    }

    return {
      gitTag,
      gitBranch,
      gitRemote,
      gitUrl: this._formatGitHttpUrl(gitRemote),
      shortHash: c[0],
      hash: c[1],
      subject: c[2],
      sanitizedSubject: c[3],
      body: c[4],
      committer: {
        date: c[5],
        relativeDate: c[6],
        name: c[7],
        email: c[8],
      },
      author: {
        date: c[9],
        relativeDate: c[10],
        name: c[11],
        email: c[12],
      },
    };
  }

  /**
   * git@github.com:group/repo.git     => http://github.com/group/repo
   * https://user@token@github.com/group/repo.git => https://github.com/group/repo
   */
  _formatGitHttpUrl(remote = '') {
    if (remote.startsWith('git@')) {
      return 'http://' + remote
        .replace(/^git@/, '')
        .replace(/.git$/, '')
        .replace(/:/, '/');
    }
    if (remote.startsWith('http') && remote.endsWith('.git')) {
      const parsed = url.parse(remote.replace(/\.git$/, ''));
      return `${parsed.protocol}//${parsed.host}${parsed.path}`;
    }
    return remote;
  }
};

function getGitBranch(opts = {}, { shortHash }) {
  let _branch = '';

  const revParseBranch = execSync('git rev-parse --abbrev-ref HEAD', opts).toString();
  const nameRevBranch = execSync('git name-rev --name-only HEAD', opts).toString();
  const gitLogBranch = execSync('git log -n 1 --pretty=%d HEAD', opts).toString();

  const branchRP = revParseBranch.trim();
  const branchNR = nameRevBranch.trim()
    .replace('remotes/origin/', '')
    .replace(/~\d+$/, ''); // in case 'develop~1'
  const branchGL = gitLogBranch.split(',')
    .filter(i => i.includes('origin/'))
    .map(i => i.trim())
    .map(i => i.split('/')[1])
    .map(i => i.replace(/[()]/, ''))
    .filter(i => i !== 'HEAD');
  _branch = branchRP !== 'HEAD'
    ? branchRP
    : !branchNR.startsWith('tags/')
      ? branchNR : branchGL.length > 1
        ? branchGL.filter(i => i !== 'master')[0] : branchGL[0];
  // in case branch is deleted
  if (!_branch) {
    _branch = `branch_is_deleted_${shortHash}`;
  }
  return _branch;
}
