async function main() {
  // We get the contract to deploy
  const CanvasSaver = await ethers.getContractFactory("CanvasSaver");
  const canvasSaver = await CanvasSaver.deploy();

  await canvasSaver.deployed();

  console.log("CanvasSaver deployed to:", canvasSaver.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });