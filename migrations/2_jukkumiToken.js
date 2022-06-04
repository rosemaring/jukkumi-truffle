const Migrations = artifacts.require("JukkumiToken");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
