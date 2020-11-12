# DApp Starter Project

This DApp Starter Uses [Hardhat](https://hardhat.org/) for base tooling, testing, migrations, etc.

## Tests

`npx hardhat test`

## Deployments

### Localhost

`npx hardhat node`
`npx hardhat --network localhost deploy`

### Rinkeby

For Rinkeby Deployments, you'll need to create a new file `.env.js` based on .env_sample.js and fill in the desired wallet mnemonic and account numbers that will be used to sign the deployment. These values are referenced in the hardhat.config.js file. 

Depending on what you're doing, you may need to edit these configurations.

## WebApp

The webapp is part of this repository for convenience only; it can easily be put into its own repo if you prefer.
