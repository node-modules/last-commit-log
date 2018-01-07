# last-commit-log

<p>
  <a href="https://circleci.com/gh/zhangyuheng/last-commit-log/tree/master"><img src="https://img.shields.io/circleci/project/zhangyuheng/last-commit-log/master.svg" alt="Build Status"></a>
  <a href="https://codecov.io/github/zhangyuheng/last-commit-log?branch=master"><img src="https://img.shields.io/codecov/c/github/zhangyuheng/last-commit-log/master.svg" alt="Coverage Status"></a>
  <a href="https://www.npmjs.com/package/last-commit-log"><img src="https://img.shields.io/npm/v/last-commit-log.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/last-commit-log"><img src="https://img.shields.io/npm/l/last-commit-log.svg" alt="License"></a>
  <a href="https://www.npmjs.com/package/last-commit-log"><img src="https://img.shields.io/node/v/last-commit-log.svg" alt="Node.js"></a>
</p>


Node.js module to read last git commit information including tags and branch - mostly to be used by continuous integration and build systems for build tagging purposes.

> fork from [git-last-commit](https://github.com/seymen/git-last-commit)

## Usage

#### Async function

```javascript
const LCL = require('last-commit-log')
const lcl = new LCL(dir) // dir is process.cwd() by default

async function lcommit () {
  try {
    const commit = await lcl.getLastCommit()
    console.log(commit)
  } catch (err) {
    console.error(err)
  }
}

lcommit()
```

#### Promise

```javascript
const LCL = require('last-commit-log')
const lcl = new LCL()

lcl.getLastCommit()
  .then(commit => console.log(commit))
  .catch(e => console.error(e))
```

commit is an object like this:

```javascript
{
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

