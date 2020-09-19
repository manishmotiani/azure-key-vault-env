const client = require('./key-vault');

/**
 * Setup environment variables in key-vault.
 *
 * @param envKeys
 * @param underscoreReplacedBy
 * @param prefix
 * @returns {Promise<void>}
 */
async function setup ({
    envKeys = {},
    underscoreReplacedBy = '0x',
    prefix = ''
}) {

    console.log('set up env: starting...');

    const envFieldsArray = [];
    Object.keys(envKeys).forEach(key => {

        envFieldsArray.push({
            name: key,
            value: envKeys[key]
        });

    });

    for (const item of envFieldsArray) {

        const stripped = item.name.split('_').join(underscoreReplacedBy);
        const secretName = `${prefix}${stripped}`;
        const value = item.value;

        await client.setSecret(secretName, value, {});
        console.log(`${secretName} ===> saved`);

    }

    console.log('set up env: completed.');

}

module.exports = setup;
