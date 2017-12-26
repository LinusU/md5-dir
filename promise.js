'use strict'

var md5Dir = require('./')

function md5DirAsPromised (dirname) {
  return new Promise(function (resolve, reject) {
    md5Dir(dirname, function (err, hash) {
      if (err) return reject(err)

      resolve(hash)
    })
  })
}

module.exports = md5DirAsPromised
module.exports.sync = md5Dir.sync
