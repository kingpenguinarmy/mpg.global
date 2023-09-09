const FreelancerAgreement = artifacts.require("FreelancerAgreement");

module.exports = function(deployer, network, accounts) {
  const client = accounts[0];
  const freelancer = accounts[1];
  const arbiter = accounts[2];

  deployer.deploy(FreelancerAgreement, client, freelancer, arbiter);
};
