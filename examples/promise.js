'use strict';

const LCL = require('..');

new LCL(process.argv.slice(2)[0]).getLastCommit()
  .then(commit => console.log(commit))
  .catch(e => console.error(e));
