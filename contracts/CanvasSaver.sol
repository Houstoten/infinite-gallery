pragma solidity ^0.8.13;

import "hardhat/console.sol";

contract CanvasSaver {
    constructor() {
        console.log("Deploying a CanvasSaver");
    }

    event SaveToLog(address indexed _from, string canvasItem);

    function saveCanvasItem(string memory itemHash) public {
        console.log(itemHash);
        emit SaveToLog(msg.sender, itemHash);
    }
}
