var OwnerIdentity = artifacts.require("./contracts/OwnerIdentity.sol");

module.exports = function (deployer) {
  deployer.deploy(OwnerIdentity);
};
