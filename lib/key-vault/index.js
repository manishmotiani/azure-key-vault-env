const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const url = process.env.KEY_VAULT_URI;
const credential = new DefaultAzureCredential();
const client = new SecretClient(url, credential);

module.exports = client;
