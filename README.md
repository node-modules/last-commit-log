# last-commit-log

<p align="center">
  <a href="https://circleci.com/gh/zhangyuheng/last-commit-log/tree/master"><img src="https://img.shields.io/circleci/project/zhangyuheng/last-commit-log/master.svg" alt="Build Status"></a>
  <a href="https://codecov.io/github/zhangyuheng/last-commit-log?branch=master"><img src="https://img.shields.io/codecov/c/github/zhangyuheng/last-commit-log/master.svg" alt="Coverage Status"></a>
  <a href="https://www.npmjs.com/package/last-commit-log"><img src="https://img.shields.io/npm/v/last-commit-log.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/last-commit-log"><img src="https://img.shields.io/npm/l/last-commit-log.svg" alt="License"></a>
</p>


Node.js module to read last git commit information including tags and branch - mostly to be used by continuous integration and build systems for build tagging purposes.

> fork from [git-last-commit](https://github.com/seymen/git-last-commit)

## Usage

```javascript
const LCL = require('last-commit-log')

async function lcommit () {
  try {
    // dir is process.cwd() by default
    const commit = await new LCL({ dir: __REPO_DIRECTORY__ }).getLastCommit()
    console.log(commit)
  } catch (err) {
    console.error(err)
  }
}

lcommit()
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

