const hre = require("hardhat");
// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const config = require('../hardhat.config.js')

async function main() {

    const {networks} = config

    for (const network in networks) {

        process.env.HARDHAT_NETWORK=network
        const hre = require("hardhat");

        await hre.run("deploy")

        console.log('deployed to ', network)
    }
    //  console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
