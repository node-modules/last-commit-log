# last-commit-log

<p>
  <a href="https://circleci.com/gh/macacajs/last-commit-log/tree/master"><img src="https://img.shields.io/circleci/project/macacajs/last-commit-log/master.svg" alt="Build Status"></a>
  <a href="https://codecov.io/github/macacajs/last-commit-log?branch=master"><img src="https://img.shields.io/codecov/c/github/macacajs/last-commit-log/master.svg" alt="Coverage Status"></a>
  <a href="https://www.npmjs.com/package/last-commit-log"><img src="https://img.shields.io/npm/v/last-commit-log.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/last-commit-log"><img src="https://img.shields.io/npm/l/last-commit-log.svg" alt="License"></a>
  <a href="https://www.npmjs.com/package/last-commit-log"><img src="https://img.shields.io/node/v/last-commit-log.svg" alt="Node.js"></a>
</p>


Node.js module to read last git commit information - mostly to be used by continuous integration and build systems for build tagging purposes.

## Usage

#### Async function

```javascript
const LCL = require('last-commit-log')
const lcl = new LCL() // or `new LCL(dir)` dir is process.cwd() by default

// @throws error
async function lcommit () {
  const commit = await lcl.getLastCommit()
  console.log(commit)
}

lcommit()
```

[full examples](./examples)

commit is an object like this:

```javascript
{
  "gitRemote": "git@github.com:group/repo.git", // .git http or ssh
  "gitUrl": "http://github.com/group/repo",     // url only
  "shortHash": "42dc921",
  "hash": "42dc921d25a3e7e1607302d2acfdc3fd991c0c01",
  "subject": "chore: add lock",
  "sanitizedSubject": "chore-add-lock",
  "body": "",
  "committer": {
    "date": "1515240839",
    "relativeDate": "2 hours ago",
    "name": "Committer Fred",
    "email": "fred@fred.com"
  },
  "author": {
    "date": "1515240839",
    "relativeDate": "2 hours ago",
    "name": "Author Baz",
    "email": "baz@baz.com"
  }
}
```

> inspired by [git-last-commit](https://github.com/seymen/git-last-commit) and fixed the parsing issue.

