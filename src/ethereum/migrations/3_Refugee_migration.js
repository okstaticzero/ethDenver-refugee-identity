var Refugee = artifacts.require("./contracts/Refugee.sol");

module.exports = function (deployer) {
  deployer.deploy(Refugee);
};
