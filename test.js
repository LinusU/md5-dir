/* eslint-env mocha */

var path = require('path')
var assert = require('assert')

var md5Dir = require('./')
var md5DirAsPromised = require('./promise')

var fixtures = path.join(__dirname, 'fixtures')

describe('MD5 Directory', function () {
  it('should compute the hash of a directory', function (done) {
    md5Dir(fixtures, function (err, hash) {
      assert.ifError(err)
      assert.equal(hash, '1c3063c41c4e4aee0bfeeabc55fddb9b')

      done()
    })
  })

  if (typeof global.Promise !== 'undefined') {
    it('should provide a promise-based interface', function () {
      return md5DirAsPromised(fixtures).then(function (hash) {
        assert.equal(hash, '1c3063c41c4e4aee0bfeeabc55fddb9b')
      })
    })
  }
})
