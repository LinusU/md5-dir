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

function md5DirSync (dirpath, ignorePaths) {
  if (!fs.existsSync(dirpath)) {
    throw new Error(dirpath + ' does not exist.')
  } else if (!fs.statSync(dirpath).isDirectory()) {
    throw new Error(dirpath + ' is not a directory.')
  }

  ignorePaths = ignorePaths || []

  if (!Array.isArray(ignorePaths)) {
    ignorePaths = [ignorePaths]
  }
  for (var i = 0; i < ignorePaths.length; i++) {
    ignorePaths[i] = fs.realpathSync(ignorePaths[i])
  }

  var files = fs.readdirSync(dirpath)
  var hash = crypto.createHash('md5')

  for (i = 0; i < files.length; i++) {
    var fullPath = fs.realpathSync(dirpath + '/' + files[i])

    if (ignorePaths.indexOf(fullPath) !== -1) {
      continue
    }

    var fileStats = fs.statSync(fullPath)
    var fileHash
    if (fileStats.isDirectory()) {
      fileHash = md5DirSync(fullPath, ignorePaths)
    } else if (fileStats.isFile()) {
      fileHash = md5File.sync(fullPath)
    } else {
      continue
    }

    hash.update(fileHash)
  }

  return hash.digest('hex')
}

module.exports = md5Dir
module.exports.sync = md5DirSync
