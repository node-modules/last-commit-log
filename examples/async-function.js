const LCL = require('..')
const lcl = new LCL()

async function lcommit () {
  try {
    const commit = await lcl.getLastCommit()
    console.log(commit)
  } catch (err) {
    console.error(err)
  }
}

lcommit()
