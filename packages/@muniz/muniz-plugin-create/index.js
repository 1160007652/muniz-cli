if (process.env.CLI_ENV === 'development') {
  module.exports = require('./src');
} else {
  module.exports = require('./dist');
}
