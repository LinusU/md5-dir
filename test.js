/* eslint-env mocha */

var path = require('path')
var assert = require('assert')

var md5Dir = require('./')
var md5DirAsPromised = require('./promise')

var fixtures = path.join(__dirname, 'fixtures')

describe('MD5 Directory', function () {
  it('should compute the hash of a directory (async)', function (done) {
    md5Dir(fixtures, function (err, hash) {
      assert.ifError(err)
      assert.equal(hash, '1c3063c41c4e4aee0bfeeabc55fddb9b')

      done()
    })
  })

  it('should compute the hash of a directory (sync)', function () {
    var hash = md5Dir.sync(fixtures)
    assert.equal(hash, '1c3063c41c4e4aee0bfeeabc55fddb9b')
  })

  if (typeof global.Promise !== 'undefined') {
    it('should provide a promise-based interface (async)', function () {
      return md5DirAsPromised(fixtures).then(function (hash) {
        assert.equal(hash, '1c3063c41c4e4aee0bfeeabc55fddb9b')
      })
    })

    it('should provide a promise-based interface (sync)', function () {
      var hash = md5DirAsPromised.sync(fixtures)
      assert.equal(hash, '1c3063c41c4e4aee0bfeeabc55fddb9b')
    })
  }
})
