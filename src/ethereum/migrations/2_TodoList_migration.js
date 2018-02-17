var TodoList = artifacts.require("./contracts/TodoList.sol");

module.exports = function (deployer) {
  deployer.deploy(TodoList);
};
