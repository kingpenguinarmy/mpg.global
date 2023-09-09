// deploy.js

const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  // Compile the contracts
  await hre.run("compile");

  // Deploy Verifier contract
  const Verifier = await ethers.getContractFactory("Verifier");
  const verifier = await Verifier.deploy();
  await verifier.deployed();
  console.log("Verifier deployed to:", verifier.address);

  // Deploy IdentityVerification contract with Verifier address as a parameter
  const IdentityVerification = await ethers.getContractFactory("IdentityVerification");
  const identityVerification = await IdentityVerification.deploy(verifier.address);
  await identityVerification.deployed();
  console.log("IdentityVerification deployed to:", identityVerification.address);

  // Optional: Verify the contracts on Etherscan
  await hre.run("verify:verify", {
    address: verifier.address,
    constructorArguments: [],
  });

  await hre.run("verify:verify", {
    address: identityVerification.address,
    constructorArguments: [verifier.address],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
