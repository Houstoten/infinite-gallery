async function main() {
   const CanvasSaver = await ethers.getContractFactory("CanvasSaver");

   // Start deployment, returning a promise that resolves to a contract object
   const canvasSaver = await CanvasSaver.deploy();   
   console.log("Contract deployed to address:", canvasSaver.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });