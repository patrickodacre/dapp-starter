module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId,
    getUnnamedAccounts,
}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();

    // libraries:
    // const exampleLibrary = await deploy("ExampleLibary", {
        // from: deployer
    // });

    // the following will only deploy "Greeter" if the contract
    // was never deployed or if the code changed since last deployment
    const greeter = await deploy('Greeter', {
        from: deployer,
        gas: 4000000,
        args: ['Hello, World!'],
        // libraries: {
            // ExampleLibrary: exampleLibrary.address
        // }
    })

    console.log("Greeter deployed to:", greeter.address);
};
