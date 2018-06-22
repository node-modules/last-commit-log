# last-commit-log

---

[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]

[travis-image]: https://img.shields.io/travis/macacajs/last-commit-log.svg?style=flat-square
[travis-url]: https://travis-ci.org/macacajs/last-commit-log
[coveralls-image]: https://img.shields.io/codecov/c/github/macacajs/last-commit-log.svg?style=flat-square
[coveralls-url]: https://codecov.io/gh/macacajs/last-commit-log
[node-image]: https://img.shields.io/badge/node.js-%3E=_8-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

> Node.js module to read last git commit information - mostly to be used by continuous integration and build systems for build tagging purposes.

## Usage

### Async function

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

## License

The MIT License (MIT)
