'use strict'

/* sort, format, parse, stats, validate */

var utils = require('./dist/lib/index.js')

var sort = require('./dist/lib/sort.js')
var format = require('./dist/lib/format.js')
var parse = require('./dist/lib/parse.js')
var stats = require('./dist/lib/stats.js')
var validate = require('./dist/lib/validate.js')

// if you wanted to export multiple modules...
module.exports = {
  utils: utils,
  sort: sort,
  utils: utils,
  parse: parse,
  stats: stats,
  validate: validate
}
