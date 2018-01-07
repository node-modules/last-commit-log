const LCL = require('..')
const lcl = new LCL()

lcl.getLastCommit()
  .then(commit => console.log(commit))
  .catch(e => console.error(e))
