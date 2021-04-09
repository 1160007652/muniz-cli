#!/usr/bin/env node
'use strict';
const importLocal = require('import-local');

if (importLocal(__filename)) {
  console.log('Using local version of this package');
} else {
  require('./start')(process.argv.slice(2));
}
