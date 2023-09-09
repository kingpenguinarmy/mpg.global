const FreelancerAgreement = artifacts.require("FreelancerAgreement");

contract("FreelancerAgreement", accounts => {
  let contract;
  const client = accounts[0];
  const freelancer = accounts[1];
  const arbiter = accounts[2];

  beforeEach(async () => {
    contract = await FreelancerAgreement.new(client, freelancer, arbiter);
  });

  it("should initialize with correct client, freelancer, and arbiter", async () => {
    const contractClient = await contract.client();
    const contractFreelancer = await contract.freelancer();
    const contractArbiter = await contract.arbiter();

    assert.equal(contractClient, client, "Client address is incorrect");
    assert.equal(contractFreelancer, freelancer, "Freelancer address is incorrect");
    assert.equal(contractArbiter, arbiter, "Arbiter address is incorrect");
  });

  it("should allow the client to add a milestone", async () => {
    await contract.addMilestone("Design", 100, { from: client });
    const milestone = await contract.milestones(0);
    assert.equal(milestone.description, "Design", "Milestone description is incorrect");
    assert.equal(milestone.amount.toNumber(), 100, "Milestone amount is incorrect");
  });

  it("should allow the freelancer to complete a milestone", async () => {
    await contract.addMilestone("Design", 100, { from: client });
    await contract.completeMilestone(0, { from: freelancer });
    const milestone = await contract.milestones(0);
    assert.equal(milestone.status.toNumber(), 1, "Milestone status should be 'Completed'");
  });

  it("should allow the client to approve a milestone", async () => {
    await contract.addMilestone("Design", 100, { from: client });
    await contract.completeMilestone(0, { from: freelancer });
    await contract.approveMilestone(0, { from: client, value: 100 });
    const milestone = await contract.milestones(0);
    assert.equal(milestone.status.toNumber(), 2, "Milestone status should be 'Approved'");
  });

  // Add more tests for dispute resolution, fund escrow, etc.
});
