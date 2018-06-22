# last-commit-log

---

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/last-commit-log.svg?style=flat-square
[npm-url]: https://npmjs.org/package/last-commit-log
[travis-image]: https://img.shields.io/travis/macacajs/last-commit-log.svg?style=flat-square
[travis-url]: https://travis-ci.org/macacajs/last-commit-log
[coveralls-image]: https://img.shields.io/coveralls/macacajs/last-commit-log.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/macacajs/last-commit-log?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_8-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/last-commit-log.svg?style=flat-square
[download-url]: https://npmjs.org/package/last-commit-log

> Node.js module to read last git commit information - mostly to be used by continuous integration and build systems.

## Usage

```javascript
const LCL = require('last-commit-log')
const lcl = new LCL() // or `new LCL(dir)` dir is process.cwd() by default

// @throws error
async function run () {
  const commit = await lcl.getLastCommit()
  console.log(commit)
}

run()
```

[full examples](./examples)

commit is an object like this:

```javascript
{
  "gitTag": "2.0.0",
  "gitBranch": "master",
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

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars1.githubusercontent.com/u/2139038?v=4" width="100px;"/><br/><sub><b>zhangyuheng</b></sub>](https://github.com/zhangyuheng)<br/>|[<img src="https://avatars1.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>
| :---: | :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto upated at `Fri Jun 22 2018 13:55:26 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

## License

The MIT License (MIT)
