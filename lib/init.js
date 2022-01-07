const ProgressBar = require('progress');
const client = require('./key-vault');

/**
 * Load all environment variables from key-vault.
 *
 * @param envKeys
 * @param underscoreReplacedBy
 * @returns {Promise<void>}
 */
async function init ({
    envKeys = {},
    underscoreReplacedBy = '0x'
}) {

    const keys = Object.keys(envKeys).map(key => {

        return {
            name: key,
            secretName: key.split('_').join(underscoreReplacedBy)
        };

    });

    try {

        const bar = new ProgressBar('setting up environment [:bar] :current of :total', {
            total: Object.keys(envKeys).length
        });

        await Promise.all(keys.map(async (key, index) => {

            const result = await client.getSecret(key.secretName);

            if (!process.env[key.name]) {

                process.env[key.name] = result.value;

            } else {

                console.debug(` process.env.${key.name} already exists. skipping...`);

            }

            bar.tick();

        }));

    } catch (error) {

        console.error(error);
        console.error('environment setup failed');
        process.exit(1);

    }

}

module.exports = init;
