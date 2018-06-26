const fs = require('fs')
const util = require('util')
const sinon = require('sinon')
const assert = require('assert')
const { join } = require('path')

const LCL = require('..')

const stdout = fs.readFileSync(join(__dirname, 'fixtures/stdout.txt'), 'utf8').replace(/\n$/, '')

describe('feature: return last commit info', function () {
  let stub
  let lcl

  beforeEach(function () {
    lcl = new LCL()
  })

  afterEach(function () {
    stub && stub.restore()
  })

  it('should parse git commands fully', function () {
    stub = sinon.stub(util, 'promisify').callsFake(() => {
      return () => Promise.resolve({ stdout })
    })

    return lcl.getLastCommit().then(commit => {
      assert.ok(commit)
      assert(commit.gitRemote === 'git@github.com:macacajs/last-commit-log.git' || commit.gitRemote === 'https://github.com/macacajs/last-commit-log.git')
      assert(commit.gitUrl === 'http://github.com/macacajs/last-commit-log' || commit.gitUrl === 'https://github.com/macacajs/last-commit-log')
      assert.equal(commit.shortHash, '42dc921')
      assert.equal(commit.hash, '42dc921d25a3e7e1607302d2acfdc3fd991c0c01')
      assert.equal(commit.subject, 'chore: add lock')
      assert.equal(commit.sanitizedSubject, 'chore-add-lock')
      assert.equal(commit.body, '')
      assert.equal(commit.committer.date, '1515240839')
      assert.equal(commit.committer.relativeDate, '2 hours ago')
      assert.equal(commit.committer.name, 'Committer Fred')
      assert.equal(commit.committer.email, 'fred@fred.com')
      assert.equal(commit.author.date, '1515240839')
      assert.equal(commit.author.relativeDate, '2 hours ago')
      assert.equal(commit.author.name, 'Author Baz')
      assert.equal(commit.author.email, 'baz@baz.com')
    })
  })

  it('should _fotmatGitHttpUrl correctly', function () {
    assert(lcl._formatGitHttpUrl() === '')
    assert(lcl._formatGitHttpUrl('https://github.com/macacajs/last-commit-log.git') === 'https://github.com/macacajs/last-commit-log')
  })

  it('should throw error', function () {
    stub = sinon.stub(util, 'promisify').callsFake(() => {
      const err = new Error('git command not found')
      return () => Promise.reject(err)
    })

    return lcl.getLastCommit().then(() => {
      assert.fail()
    }).catch(err => {
      assert(err.message === 'Can\'t get last commit, Error: git command not found')
    })
  })
})
