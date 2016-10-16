'use strict'

var fs = require('fs')
var path = require('path')
var crypto = require('crypto')

var each = require('async-each')
var md5File = require('md5-file')

function md5Dir (dirname, cb) {
  fs.readdir(dirname, function (err, files) {
    if (err) return cb(err)

    function iterator (file, cb) {
      var filepath = path.join(dirname, file)

      fs.stat(filepath, function (err, stat) {
        if (err) return cb(err)

        if (stat.isFile()) {
          return md5File(filepath, cb)
        }

        if (stat.isDirectory()) {
          return md5Dir(filepath, cb)
        }

        return cb(null, null)
      })
    }

    each(files, iterator, function done (err, hashes) {
      if (err) return cb(err)

      var hash = crypto.createHash('md5')

      hashes.forEach(function (h) {
        if (h !== null) hash.update(h)
      })

      cb(null, hash.digest('hex'))
    })
  })
}

module.exports = md5Dir
