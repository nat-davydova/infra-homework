const yaml = require('yaml');
const fs = require('node:fs');

// eslint-disable-next-line node/no-deprecated-api
require.extensions['.yml'] = function (module, filename) {
  const content = fs.readFileSync(filename, 'utf-8');

  try {
    module.exports = yaml.parse(content)
  } catch (err) {
    err.message = filename + ': ' + err.message
    throw err
  }
}
