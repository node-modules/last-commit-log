# last-commit-log

---

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/last-commit-log.svg
[npm-url]: https://npmjs.org/package/last-commit-log
[travis-image]: https://img.shields.io/travis/node-modules/last-commit-log.svg
[travis-url]: https://travis-ci.org/node-modules/last-commit-log
[codecov-image]: https://img.shields.io/codecov/c/github/node-modules/last-commit-log.svg
[codecov-url]: https://codecov.io/gh/node-modules/last-commit-log/branch/master
[node-image]: https://img.shields.io/badge/node.js-%3E=_8-green.svg
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/last-commit-log.svg
[download-url]: https://npmjs.org/package/last-commit-log

> Node.js module to get the last git commit information - mostly to be used by CI/CD and building phase.

## Who are using

- ⭐⭐⭐[niftylettuce/forward-email](//github.com/niftylettuce/forward-email)
- ⭐⭐⭐[cabinjs/cabin](//github.com/cabinjs/cabin)
- ⭐⭐⭐[microsoft/BotFramework-WebChat](//github.com/microsoft/BotFramework-WebChat)

[For more](//github.com/node-modules/last-commit-log/network/dependents)

## Usage

```javascript
const LCL = require('last-commit-log');
const lcl = new LCL(); // or `new LCL(dir)` dir is process.cwd() by default
```

Asychronous use, using a Promise:

```javascript
lcl
  .getLastCommit()
  .then(commit => console.log(commit));
```

Synchronous use:

```javascript
const commit = lcl.getLastCommitSync();
```

[full examples](./examples)

commit information is an object like this:

```json
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

Get map of line changed or added from `git diff`:

```javascript
const data = lcl.diff({
  currentBranch: 'gh-pages',
});

/**
{
  '/diff.js': [
    [
      1,
      46
    ]
  ],
  '/index.js': [
    [
      124,
      125
    ]
  ],
  '/package.json': [],
  '/test/diff.test.js': [
    [
      1,
      14
    ]
  ]
}
 */
console.log(data);
```

```javascript
const commit = lcl.getLastCommitSync();
```

> inspired by [git-last-commit](https://github.com/seymen/git-last-commit) and fixed the parsing issue.

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars.githubusercontent.com/u/2139038?v=4" width="100px;"/><br/><sub><b>zhangyuheng</b></sub>](https://github.com/zhangyuheng)<br/>|[<img src="https://avatars.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|[<img src="https://avatars.githubusercontent.com/u/1001610?v=4" width="100px;"/><br/><sub><b>stared</b></sub>](https://github.com/stared)<br/>|[<img src="https://avatars.githubusercontent.com/u/101466223?v=4" width="100px;"/><br/><sub><b>titanism</b></sub>](https://github.com/titanism)<br/>|[<img src="https://avatars.githubusercontent.com/u/10104168?v=4" width="100px;"/><br/><sub><b>yihuineng</b></sub>](https://github.com/yihuineng)<br/>|[<img src="https://avatars.githubusercontent.com/u/197375?v=4" width="100px;"/><br/><sub><b>antife-yinyue</b></sub>](https://github.com/antife-yinyue)<br/>|
| :---: | :---: | :---: | :---: | :---: | :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto updated at `Thu Jul 07 2022 13:16:44 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

## License

The MIT License (MIT)
