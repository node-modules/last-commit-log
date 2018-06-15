const LCL = require('..')

new LCL().getLastCommit()
  .then(commit => console.log(commit))
  .catch(e => console.error(e))
