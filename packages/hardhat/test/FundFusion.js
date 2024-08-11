const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FundFusion", function () {
  let FundFusion, fundFusion, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    FundFusion = await ethers.getContractFactory("FundFusion");
    fundFusion = await FundFusion.deploy();
  });

  it("Should set the correct owner", async function () {
    expect(await fundFusion.owner()).to.equal(owner.address);
  });

  it("Should allow the owner to add an administrator", async function () {
    await fundFusion.addAdministrator("Admin1");
    const admin = await fundFusion.administrators(0);
    expect(admin.name).to.equal("Admin1");
    expect(admin.addr).to.equal(owner.address);
  });

  it("Should not allow non-owner to add an administrator", async function () {
    await expect(
      fundFusion.connect(addr1).addAdministrator("Admin1")
    ).to.be.revertedWith("Only owner can call this function");
  });

  it("Should allow administrators to add a grant", async function () {
    await fundFusion.addAdministrator("Admin1");
    await fundFusion.addGrant(
      "Grant1",
      "Description1",
      Math.floor(Date.now() / 1000) + 10000,
      1000
    );

    const grant = await fundFusion.grants(0);
    expect(grant.name).to.equal("Grant1");
    expect(grant.amount).to.equal(1000);
  });

  it("Should not allow non-administrators to add a grant", async function () {
    await expect(
      fundFusion
        .connect(addr1)
        .addGrant(
          "Grant1",
          "Description1",
          Math.floor(Date.now() / 1000) + 10000,
          1000
        )
    ).to.be.revertedWith("Only administrators can call this function");
  });

  // it("Should allow users to make a grant application", async function () {
  //   await fundFusion.addAdministrator("Admin1");
  //   await fundFusion.addGrant(
  //     "Grant1",
  //     "Description1",
  //     Math.floor(Date.now() / 1000) + 10000,
  //     1000
  //   );

  //   const params = {
  //     projectTitle: "Project1",
  //     description: "Description1",
  //     problemStatement: "Problem1",
  //     solution: "Solution1",
  //     objectives: "Objectives1",
  //     teamMembers: "Team1",
  //     demoVideoLink: "DemoLink1",
  //     liveLink: "LiveLink1",
  //     sourceCode: "SourceCode1",
  //     ipfsHash: "IPFSHash1",
  //   };

  //   await fundFusion.connect(addr1).makeGrantApplication(params);

  //   const application = await fundFusion.grantApplications(0);
  //   expect(application.projectTitle).to.equal("Project1");
  //   expect(application.applicant).to.equal(addr1.address);
  // });

  // it("Should allow administrators to approve a grant application", async function () {
  //   await fundFusion.addAdministrator("Admin1");
  //   await fundFusion.addGrant(
  //     "Grant1",
  //     "Description1",
  //     Math.floor(Date.now() / 1000) + 10000,
  //     1000
  //   );

  //   const params = {
  //     projectTitle: "Project1",
  //     description: "Description1",
  //     problemStatement: "Problem1",
  //     solution: "Solution1",
  //     objectives: "Objectives1",
  //     teamMembers: "Team1",
  //     demoVideoLink: "DemoLink1",
  //     liveLink: "LiveLink1",
  //     sourceCode: "SourceCode1",
  //     ipfsHash: "IPFSHash1",
  //   };

  //   await fundFusion.connect(addr1).makeGrantApplication(params);

  //   await fundFusion.approveGrantApplication(0, 1000);
  //   const application = await fundFusion.grantApplications(0);
  //   expect(application.approved).to.equal(true);
  // });

  // it("Should not allow non-administrators to approve a grant application", async function () {
  //   await fundFusion.addAdministrator("Admin1");
  //   await fundFusion.addGrant(
  //     "Grant1",
  //     "Description1",
  //     Math.floor(Date.now() / 1000) + 10000,
  //     1000
  //   );

  //   const params = {
  //     projectTitle: "Project1",
  //     description: "Description1",
  //     problemStatement: "Problem1",
  //     solution: "Solution1",
  //     objectives: "Objectives1",
  //     teamMembers: "Team1",
  //     demoVideoLink: "DemoLink1",
  //     liveLink: "LiveLink1",
  //     sourceCode: "SourceCode1",
  //     ipfsHash: "IPFSHash1",
  //   };

  //   await fundFusion.connect(addr1).makeGrantApplication(params);

  //   await expect(
  //     fundFusion.connect(addr2).approveGrantApplication(0, 1000)
  //   ).to.be.revertedWith("Only administrators can call this function");
  // });
});
