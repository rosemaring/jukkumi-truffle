const Migrations = artifacts.require("JukkumiGame");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
