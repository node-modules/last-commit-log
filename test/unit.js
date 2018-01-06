const fs = require('fs')
const { join } = require('path')
const assert = require('assert')
const sinon = require('sinon')
const util = require('util')
const LCL = require('..')

const stdout = fs.readFileSync(join(__dirname, 'fixtures/stdout.txt'), 'utf8').replace(/\n$/, '')

describe('feature: return last commit info', function () {
  let stub
  let lcl

  beforeEach(function () {
    lcl = new LCL()
  })

  afterEach(function () {
    stub.restore()
  })

  it('should parse git commands fully', function () {
    stub = sinon.stub(util, 'promisify').callsFake(() => {
      return () => Promise.resolve({ stdout })
    })

    return lcl.getLastCommit().then(commit => {
      assert.ok(commit)
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

  it('should handle error', function () {
    stub = sinon.stub(util, 'promisify').callsFake(() => {
      const err = new Error()
      err.stderr = 'git command not found'
      return () => Promise.reject(err)
    })

    return lcl.getLastCommit().then(() => {
      assert.fail()
    }).catch(err => {
      assert(err.message === 'Can\'t get last commit, git command not found')
    })
  })
})
