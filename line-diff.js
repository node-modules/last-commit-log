'use strict';

const { execSync } = require('child_process');

const fileNameReg = /diff --git a(.*) b.*/;
const lineReg = /@@ -(.*) \+(.*) @@/;

module.exports = (options = {}) => {
  const { targetBranch = 'master', currentBranch } = options;
  const cmd = [
    'git',
    'diff',
    '--unified=0',
    '--diff-filter=AM',
    '--color=never',
    targetBranch,
    currentBranch,
  ].join(' ');
  const str = execSync(cmd).toString().trim();
  if (!str) return null;
  const diffMap = {};
  const diffArray = str.split('\n');
  let currentFileName = '';
  diffArray
    .filter(str => !str.startsWith('+')
      && !str.startsWith('-')
      && !str.startsWith('index')
    )
    .forEach(str => {
      const fileNameMatched = str.match(fileNameReg);
      if (fileNameMatched) {
        currentFileName = fileNameMatched[1];
        diffMap[currentFileName] = [];
      }
      const matched = str.match(lineReg);
      if (matched) {
        const [ startLine, changedLength ] = matched[2].split(',');
        const start = Number(startLine);
        const end = changedLength ? start + Number(changedLength) - 1 : start;
        if (start <= end) {
          const modifiedCol = [ start, end ];
          diffMap[currentFileName].push(modifiedCol);
        }
      }
    });
  return diffMap;
};
