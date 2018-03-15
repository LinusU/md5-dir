# md5-dir [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Get the MD5-sum of a given directory, with low memory usage, even on huge files.

## Installation

```sh
npm install --save md5-dir
```

## Usage

```js
const md5Dir = require('md5-dir')

/* Async usage */
md5Dir('Documents', (err, hash) => {
  if (err) throw err

  console.log(`The MD5 sum of Documents is: ${hash}`)
})

/* Sync usage */
const hash = md5Dir.sync('Documents')
console.log(`The MD5 sum of Documents is: ${hash}`)
```

## Promise support

If you require `md5-dir/promise` you'll receive an alternative API where all
functions that takes callbacks are replaced by `Promise`-returning functions.

```js
const md5Dir = require('md5-dir/promise')

md5Dir('Documents').then(hash => {
  console.log(`The MD5 sum of Documents is: ${hash}`)
})
```

## API

### `md5Dir(dirname: string[, options: Options], cb: function)`

Asynchronously get the MD5-sum of the directory at `dirname`.

The callback `cb` will be called with `(err: Error, hash: string)`.

### `md5Dir.sync(dirname: string[, options: Options]) => string`

Synchronously get the MD5-sum of the directory at `dirname`.

### `Options`

#### `ignore`

File or list of files to ignore. Follows the same format as `.gitignore`-files. Uses the [`ignore` module](https://github.com/kaelzhang/node-ignore).

### License

MIT
