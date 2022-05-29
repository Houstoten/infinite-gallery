/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { ERC721 } from "../ERC721";

export class ERC721__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    name_: string,
    symbol_: string,
    overrides?: Overrides
  ): Promise<ERC721> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC721>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  attach(address: string): ERC721 {
    return super.attach(address) as ERC721;
  }
  connect(signer: Signer): ERC721__factory {
    return super.connect(signer) as ERC721__factory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC721 {
    return new Contract(address, _abi, signerOrProvider) as ERC721;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200148d3803806200148d8339810160408190526200003491620001db565b81516200004990600090602085019062000068565b5080516200005f90600190602084019062000068565b50505062000281565b828054620000769062000245565b90600052602060002090601f0160209004810192826200009a5760008555620000e5565b82601f10620000b557805160ff1916838001178555620000e5565b82800160010185558215620000e5579182015b82811115620000e5578251825591602001919060010190620000c8565b50620000f3929150620000f7565b5090565b5b80821115620000f35760008155600101620000f8565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013657600080fd5b81516001600160401b03808211156200015357620001536200010e565b604051601f8301601f19908116603f011681019082821181831017156200017e576200017e6200010e565b816040528381526020925086838588010111156200019b57600080fd5b600091505b83821015620001bf5785820183015181830184015290820190620001a0565b83821115620001d15760008385830101525b9695505050505050565b60008060408385031215620001ef57600080fd5b82516001600160401b03808211156200020757600080fd5b620002158683870162000124565b935060208501519150808211156200022c57600080fd5b506200023b8582860162000124565b9150509250929050565b600181811c908216806200025a57607f821691505b6020821081036200027b57634e487b7160e01b600052602260045260246000fd5b50919050565b6111fc80620002916000396000f3fe608060405234801561001057600080fd5b50600436106100af5760003560e01c806301ffc9a7146100b457806306fdde03146100dc578063081812fc146100f1578063095ea7b31461011c57806323b872dd1461013157806342842e0e146101445780636352211e1461015757806370a082311461016a57806395d89b411461018b578063a22cb46514610193578063b88d4fde146101a6578063c87b56dd146101b9578063e985e9c5146101cc575b600080fd5b6100c76100c2366004610d0f565b6101df565b60405190151581526020015b60405180910390f35b6100e4610231565b6040516100d39190610d84565b6101046100ff366004610d97565b6102c3565b6040516001600160a01b0390911681526020016100d3565b61012f61012a366004610dcc565b610350565b005b61012f61013f366004610df6565b610460565b61012f610152366004610df6565b610491565b610104610165366004610d97565b6104ac565b61017d610178366004610e32565b610523565b6040519081526020016100d3565b6100e46105aa565b61012f6101a1366004610e4d565b6105b9565b61012f6101b4366004610e9f565b6105c8565b6100e46101c7366004610d97565b610600565b6100c76101da366004610f7b565b6106d8565b60006001600160e01b031982166380ac58cd60e01b148061021057506001600160e01b03198216635b5e139f60e01b145b8061022b57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461024090610fae565b80601f016020809104026020016040519081016040528092919081815260200182805461026c90610fae565b80156102b95780601f1061028e576101008083540402835291602001916102b9565b820191906000526020600020905b81548152906001019060200180831161029c57829003601f168201915b5050505050905090565b60006102ce82610706565b6103345760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061035b826104ac565b9050806001600160a01b0316836001600160a01b0316036103c85760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b606482015260840161032b565b336001600160a01b03821614806103e457506103e481336106d8565b6104515760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776044820152771b995c881b9bdc88185c1c1c9bdd995908199bdc88185b1b60421b606482015260840161032b565b61045b8383610723565b505050565b61046a3382610791565b6104865760405162461bcd60e51b815260040161032b90610fe8565b61045b83838361085b565b61045b838383604051806020016040528060008152506105c8565b6000818152600260205260408120546001600160a01b03168061022b5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b606482015260840161032b565b60006001600160a01b03821661058e5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b606482015260840161032b565b506001600160a01b031660009081526003602052604090205490565b60606001805461024090610fae565b6105c43383836109f7565b5050565b6105d23383610791565b6105ee5760405162461bcd60e51b815260040161032b90610fe8565b6105fa84848484610ac1565b50505050565b606061060b82610706565b61066f5760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b606482015260840161032b565b600061068660408051602081019091526000815290565b905060008151116106a657604051806020016040528060008152506106d1565b806106b084610af4565b6040516020016106c1929190611039565b6040516020818303038152906040525b9392505050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6000908152600260205260409020546001600160a01b0316151590565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610758826104ac565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600061079c82610706565b6107fd5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b606482015260840161032b565b6000610808836104ac565b9050806001600160a01b0316846001600160a01b0316148061082f575061082f81856106d8565b806108535750836001600160a01b0316610848846102c3565b6001600160a01b0316145b949350505050565b826001600160a01b031661086e826104ac565b6001600160a01b0316146108d25760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b606482015260840161032b565b6001600160a01b0382166109345760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161032b565b61093f600082610723565b6001600160a01b038316600090815260036020526040812080546001929061096890849061107e565b90915550506001600160a01b0382166000908152600360205260408120805460019290610996908490611095565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b031603610a545760405162461bcd60e51b815260206004820152601960248201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b604482015260640161032b565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610acc84848461085b565b610ad884848484610bf5565b6105fa5760405162461bcd60e51b815260040161032b906110ad565b606081600003610b1b5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610b455780610b2f816110ff565b9150610b3e9050600a8361112e565b9150610b1f565b60008167ffffffffffffffff811115610b6057610b60610e89565b6040519080825280601f01601f191660200182016040528015610b8a576020820181803683370190505b5090505b841561085357610b9f60018361107e565b9150610bac600a86611142565b610bb7906030611095565b60f81b818381518110610bcc57610bcc611156565b60200101906001600160f81b031916908160001a905350610bee600a8661112e565b9450610b8e565b60006001600160a01b0384163b15610ceb57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610c3990339089908890889060040161116c565b6020604051808303816000875af1925050508015610c74575060408051601f3d908101601f19168201909252610c71918101906111a9565b60015b610cd1573d808015610ca2576040519150601f19603f3d011682016040523d82523d6000602084013e610ca7565b606091505b508051600003610cc95760405162461bcd60e51b815260040161032b906110ad565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610853565b506001949350505050565b6001600160e01b031981168114610d0c57600080fd5b50565b600060208284031215610d2157600080fd5b81356106d181610cf6565b60005b83811015610d47578181015183820152602001610d2f565b838111156105fa5750506000910152565b60008151808452610d70816020860160208601610d2c565b601f01601f19169290920160200192915050565b6020815260006106d16020830184610d58565b600060208284031215610da957600080fd5b5035919050565b80356001600160a01b0381168114610dc757600080fd5b919050565b60008060408385031215610ddf57600080fd5b610de883610db0565b946020939093013593505050565b600080600060608486031215610e0b57600080fd5b610e1484610db0565b9250610e2260208501610db0565b9150604084013590509250925092565b600060208284031215610e4457600080fd5b6106d182610db0565b60008060408385031215610e6057600080fd5b610e6983610db0565b915060208301358015158114610e7e57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610eb557600080fd5b610ebe85610db0565b9350610ecc60208601610db0565b925060408501359150606085013567ffffffffffffffff80821115610ef057600080fd5b818701915087601f830112610f0457600080fd5b813581811115610f1657610f16610e89565b604051601f8201601f19908116603f01168101908382118183101715610f3e57610f3e610e89565b816040528281528a6020848701011115610f5757600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60008060408385031215610f8e57600080fd5b610f9783610db0565b9150610fa560208401610db0565b90509250929050565b600181811c90821680610fc257607f821691505b602082108103610fe257634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b6000835161104b818460208801610d2c565b83519083019061105f818360208801610d2c565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561109057611090611068565b500390565b600082198211156110a8576110a8611068565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60006001820161111157611111611068565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261113d5761113d611118565b500490565b60008261115157611151611118565b500690565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061119f90830184610d58565b9695505050505050565b6000602082840312156111bb57600080fd5b81516106d181610cf656fea26469706673582212204f4fbac536804887ed4009fa83db1da80e362bf3ea21577bdd8801407e3793be64736f6c634300080d0033";
