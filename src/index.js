
module.exports = class LCL {
  constructor (dir = process.cwd()) {
    this.cwd = dir
  }

  async getLastCommit () {
    const promisify = require('util').promisify
    const exec = promisify(require('child_process').exec)
    const prettyFormat = [
      '%h', '%H', '%s', '%f', '%b',
      '%ct', '%cr', '%cn', '%ce',
      '%at', '%ar', '%an', '%ae'
    ]
    const splitCharacter = `<#__last-commit-log__#>`
    const command = 'git log -1 --pretty=format:"' + prettyFormat.join(splitCharacter) + '"'

    let c
    try {
      const { stdout } = await exec(command, { cwd: this.cwd })
      c = stdout.split(splitCharacter)
    } catch (e) {
      throw new Error(`Can't get last commit, ${e.stderr}`)
    }
    return ({
      shortHash: c[0],
      hash: c[1],
      subject: c[2],
      sanitizedSubject: c[3],
      body: c[4],
      committer: {
        date: c[5],
        relativeDate: c[6],
        name: c[7],
        email: c[8]
      },
      author: {
        date: c[9],
        relativeDate: c[10],
        name: c[11],
        email: c[12]
      }
    })
  }
}
