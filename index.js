require('dotenv').config();

module.exports = {
    init: require('./lib/init'),
    setup: require('./lib/setup'),
    keyVault: require('./lib/key-vault')
};
