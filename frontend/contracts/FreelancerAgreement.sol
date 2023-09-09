// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FreelancerAgreement {
    enum MilestoneStatus { Created, Completed, Approved, Disputed }
    enum ContractStatus { Active, Completed, Terminated }
    
    struct Milestone {
        string description;
        uint256 amount;
        MilestoneStatus status;
    }

    address public client;
    address public freelancer;
    address public arbiter;  // Third-party for dispute resolution
    Milestone[] public milestones;
    ContractStatus public contractStatus;

    event MilestoneAdded(string description, uint256 amount);
    event MilestoneCompleted(uint256 index);
    event MilestoneApproved(uint256 index);
    event MilestoneDisputed(uint256 index);
    event MilestoneResolved(uint256 index);
    event ContractTerminated();

    constructor(address _client, address _freelancer, address _arbiter) {
        client = _client;
        freelancer = _freelancer;
        arbiter = _arbiter;
        contractStatus = ContractStatus.Active;
    }

    modifier onlyClient() {
        require(msg.sender == client, "Only the client can perform this action.");
        _;
    }

    modifier onlyFreelancer() {
        require(msg.sender == freelancer, "Only the freelancer can perform this action.");
        _;
    }

    modifier onlyArbiter() {
        require(msg.sender == arbiter, "Only the arbiter can perform this action.");
        _;
    }

    modifier contractIsActive() {
        require(contractStatus == ContractStatus.Active, "Contract is not active.");
        _;
    }

    function addMilestone(string memory description, uint256 amount) public onlyClient contractIsActive {
        Milestone memory newMilestone = Milestone(description, amount, MilestoneStatus.Created);
        milestones.push(newMilestone);
        emit MilestoneAdded(description, amount);
    }

    function completeMilestone(uint256 index) public onlyFreelancer contractIsActive {
        require(milestones[index].status == MilestoneStatus.Created, "Invalid milestone status.");
        milestones[index].status = MilestoneStatus.Completed;
        emit MilestoneCompleted(index);
    }

    function approveMilestone(uint256 index) public payable onlyClient contractIsActive {
        require(milestones[index].status == MilestoneStatus.Completed, "Invalid milestone status.");
        require(msg.value == milestones[index].amount, "Incorrect amount sent.");

        // Transfer funds to freelancer
        payable(freelancer).transfer(milestones[index].amount);
        milestones[index].status = MilestoneStatus.Approved;
        emit MilestoneApproved(index);
    }

    function disputeMilestone(uint256 index) public onlyClient contractIsActive {
        require(milestones[index].status == MilestoneStatus.Completed, "Invalid milestone status.");
        milestones[index].status = MilestoneStatus.Disputed;
        emit MilestoneDisputed(index);
    }

    function resolveDispute(uint256 index, bool approve) public onlyArbiter contractIsActive {
        require(milestones[index].status == MilestoneStatus.Disputed, "Invalid milestone status.");

        if (approve) {
            // Transfer funds to freelancer
            payable(freelancer).transfer(milestones[index].amount);
            milestones[index].status = MilestoneStatus.Approved;
        } else {
            milestones[index].status = MilestoneStatus.Created;
        }
        emit MilestoneResolved(index);
    }

    function terminateContract() public onlyClient {
        contractStatus = ContractStatus.Terminated;
        emit ContractTerminated();
    }

    // Add more functions for additional features as needed
}
