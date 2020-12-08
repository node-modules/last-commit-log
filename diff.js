'use strict';

const { execSync } = require('child_process');
const fileNameReg = /diff --git a(.*) b.*/;
const lineReg = /@@ -(.*) \+(.*) @@/;

module.exports = (targetBranch, currentBranch) => {
  const cmd = [
    'git',
    'diff',
    '--unified=0',
    '--diff-filter=AM',
    targetBranch,
    currentBranch,
    '|',
    'grep',
    '-v',
    '-e',
    '\'^[+-]\'',
    '-e',
    '\'^index\'',
  ].join(' ');
  const str = execSync(cmd).toString().trim();
  if (!str) return null;
  const diffTree = {};
  const diffArray = str.split('\n');
  let currentFileName = '';
  diffArray.forEach(ele => {
    const fileNameMatched = ele.match(fileNameReg);
    if (fileNameMatched) {
      currentFileName = fileNameMatched[1];
      diffTree[currentFileName] = [];
    }
    const lineMatched = ele.match(lineReg);
    if (lineMatched) {
      const [ startLine, changedLength ] = lineMatched[2].split(',');
      const start = Number(startLine);
      const end = changedLength ? Number(startLine) + Number(changedLength) - 1 : Number(startLine);
      if (start < end) {
        const modifiedCol = [ start, end ];
        diffTree[currentFileName].push(modifiedCol);
      }
    }
  });
  return diffTree;
};
