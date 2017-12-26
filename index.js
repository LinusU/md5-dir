'use strict'

var fs = require('fs')
var path = require('path')
var crypto = require('crypto')
var ignore = require('ignore')

var each = require('async-each')
var md5File = require('md5-file')

function md5Dir (dirname, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  options = options || {}

  var ig = ignore()

  if (options.ignore) {
    ig.add(options.ignore)
  }

  function run (prefix, cb) {
    fs.readdir(path.join(dirname, prefix), function (err, files) {
      if (err) return cb(err)

      function iterator (file, cb) {
        var relativeFilepath = path.join(prefix, file)

        if (ig.ignores(relativeFilepath)) {
          return cb(null, null)
        }

        var absoluteFilepath = path.join(dirname, relativeFilepath)

        fs.stat(absoluteFilepath, function (err, stat) {
          if (err) return cb(err)

          if (stat.isFile()) {
            return md5File(absoluteFilepath, cb)
          }

          if (stat.isDirectory()) {
            return run(relativeFilepath, cb)
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

  return run('', cb)
}

function md5DirSync (dirname, options) {
  options = options || {}

  var ig = ignore()

  if (options.ignore) {
    ig.add(options.ignore)
  }

  function run (prefix) {
    var hash = crypto.createHash('md5')
    var files = fs.readdirSync(path.join(dirname, prefix))

    for (var i = 0; i < files.length; i++) {
      var relativeFilepath = path.join(prefix, files[i])

      if (ig.ignores(relativeFilepath)) {
        continue
      }

      var absoluteFilepath = path.join(dirname, relativeFilepath)
      var stat = fs.statSync(absoluteFilepath)

      if (stat.isFile()) {
        hash.update(md5File.sync(absoluteFilepath))
      }

      if (stat.isDirectory()) {
        hash.update(run(relativeFilepath))
      }
    }

    return hash.digest('hex')
  }

  return run('')
}

module.exports = md5Dir
module.exports.sync = md5DirSync
