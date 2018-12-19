'use strict';

const LCL = require('..');
const lcl = new LCL(process.argv.slice(2)[0]);

async function lcommit() {
  try {
    const commit = await lcl.getLastCommit();
    console.log(commit);
  } catch (err) {
    console.error(err);
  }
}

lcommit();
