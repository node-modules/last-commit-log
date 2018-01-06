const LCL = require('../')

async function lcommit () {
  try {
    const commit = await new LCL().getLastCommit()
    console.log(commit)
  } catch (err) {
    console.log(err)
  }
}

lcommit()
