/* eslint-env mocha */

var path = require('path')
var assert = require('assert')

var md5Dir = require('./')
var md5DirAsPromised = require('./promise')

var fixtures = path.join(__dirname, 'fixtures')

var EXPECTED = '1c3063c41c4e4aee0bfeeabc55fddb9b'
var EXPECTED_WITHOUT_B = '463edb473461b37ae9dd26f32078d696'
var EXPECTED_WITHOUT_D = 'db87314af23c17588af0e2abbbe31bf3'
var EXPECTED_WITHOUT_B_AND_D = '87c3627dd4c51c0faa25ee917aaf1a49'

describe('MD5 Directory', function () {
  it('should compute the hash of a directory (async)', function (done) {
    md5Dir(fixtures, function (err, hash) {
      assert.ifError(err)
      assert.equal(hash, EXPECTED)

      done()
    })
  })

  it('should compute the hash of a directory (sync)', function () {
    var hash = md5Dir.sync(fixtures)
    assert.equal(hash, EXPECTED)
  })

  it('should ignore files (1) (async)', function (done) {
    md5Dir(fixtures, { ignore: ['/b'] }, function (err, hash) {
      assert.ifError(err)
      assert.equal(hash, EXPECTED_WITHOUT_B)

      done()
    })
  })

  it('should ignore files (1) (sync)', function () {
    var hash = md5Dir.sync(fixtures, { ignore: ['/b'] })
    assert.equal(hash, EXPECTED_WITHOUT_B)
  })

  it('should ignore files (2) (async)', function (done) {
    md5Dir(fixtures, { ignore: ['d'] }, function (err, hash) {
      assert.ifError(err)
      assert.equal(hash, EXPECTED_WITHOUT_D)

      done()
    })
  })

  it('should ignore files (2) (sync)', function () {
    var hash = md5Dir.sync(fixtures, { ignore: ['d'] })
    assert.equal(hash, EXPECTED_WITHOUT_D)
  })

  it('should ignore files (3) (async)', function (done) {
    md5Dir(fixtures, { ignore: ['b', '/c/d'] }, function (err, hash) {
      assert.ifError(err)
      assert.equal(hash, EXPECTED_WITHOUT_B_AND_D)

      done()
    })
  })

  it('should ignore files (3) (sync)', function () {
    var hash = md5Dir.sync(fixtures, { ignore: ['b', '/c/d'] })
    assert.equal(hash, EXPECTED_WITHOUT_B_AND_D)
  })

  if (typeof global.Promise !== 'undefined') {
    it('should provide a promise-based interface (async)', function () {
      return md5DirAsPromised(fixtures).then(function (hash) {
        assert.equal(hash, EXPECTED)
      })
    })

    it('should provide a promise-based interface (sync)', function () {
      var hash = md5DirAsPromised.sync(fixtures)
      assert.equal(hash, EXPECTED)
    })
  }
})
