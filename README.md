# azure-key-vault-env
Manage your environment variables using azure key vault.

### Problem
- When your application has many environment variables, they become difficult to manage.
- Securely sharing env file with team members is time-consuming.
- Managing multiple environments (local, demo, staging, production,...) again introduces some more challenges.

### Solution
If you are already using azure, manage your environment variables using key vault. It's a good service with many
benefits. [(learn more)](https://azure.microsoft.com/en-us/services/key-vault/)
- create a azure key vault.
- create a service principal with access to above key vault.
- use this package to set up and load env.

### Installation

```
npm install azure-key-vault-env
```

### Usage

***
### Initial Setup

1. Setup azure key-vault and get following config.
  - KEY_VAULT_URI: The keyvault uri in Azure
  - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  - AZURE_CLIENT_SECRET: The client secret for the registered application

Add these in your environment.

2. Prepare an envKeys file with all environment variables. 

```
const envKeys = {

    // Database    
    DB_HOST: '',
    DB_NAME: '',
    DB_USER: '',
    DB_PASS: '',

    // Any other variables
}
```

3. Run setup to send all data to azure key-vault.

```bash

const manager = require('azure-key-vault-env');

// Your environment variables.
const envKeys = {
       
    // Database    
    DB_HOST: '',
    DB_NAME: '',
    DB_USER: '',
    DB_PASS: '',

    // Any other variables
} 

const result = await manager.setup({ envKeys });

```
Now all your variables are uploaded to key-vault.

***

### Load Variables in your app.
 
```bash
const manager = require('azure-key-vault-env');

// Your environment variables file with just keys.
const envKeys = {
       
    // Database    
    DB_HOST: '',
    DB_NAME: '',
    DB_USER: '',
    DB_PASS: '',

    // Any other variables
} 

// load environment variables
const result = await manager.init({ envKeys });

```
  
### Example with express.js 

```javascript
/**
 * Entry File
 */

require('dotenv').config();
const azureKeyVaultEnv = require('azure-key-vault-env');
const envKeys = require('INSERT___PATH_TO_YOUR_ENV_KEYS_FILE'); 

/****************************************************************************************************
 *  Load environment variables from key-vault.
 *  Target environment variables are defined in envKeys.
 ****************************************************************************************************/

module.exports = azureKeyVaultEnv
    .init({ envKeys })
    .then(async () => {
        
        // setup your database connection or other operations

        const express = require('express');
        const app = express();
        const port = 3000;
        const server = require('http').Server(app);
        
        server.listen(port, (err) => {

            if (err) {

                return logger.error(`API: Failure to listen: ${err.message} | ${err.name}`);

            }

            logger.info(`Express app live @PORT: ${port}.`);

        });

        return app;

    }).catch(error => {

        logger.error(error);

    });

```
