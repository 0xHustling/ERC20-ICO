const { deployments, hardhatArguments } = require("hardhat");

module.exports = async function () {
  if (
    hardhatArguments.network === "ganache" ||
    hardhatArguments.network === "hardhat" ||
    hardhatArguments.network === "rinkeby" ||
    hardhatArguments.network === "ropsten"
  ) {
    const { log } = deployments;
    const namedAccounts = await hre.getNamedAccounts();
    const Erc20Token = await deployments.getOrNull("Erc20Token");

    if (!Erc20Token) {
      const erc20TokenDeployment = await deployments.deploy("Erc20Token", {
        from: namedAccounts.deployer,
        args: [process.env.INITIAL_SUPPLY, process.env.OWNER, process.env.RATE],
      });
      console.log("ERC20Token deployed to:", erc20TokenDeployment.address);
    } else {
      log("ERC20Token already deployed");
    }
  }
};

module.exports.tags = ["ActionFactory"];
