// https://github.com/uvio-network/contracts/blob/main/src/Markets.sol
export const Markets = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_settings",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "MAX_CLAIMS",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "MIN_STAKE_FREEZE_DURATION",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint40",
        "internalType": "uint40"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "PRECISION",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "PRICE_PRECISION",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "claimKey",
    "inputs": [
      {
        "name": "_marketId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_claimId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "claimProceeds",
    "inputs": [
      {
        "name": "_marketId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_claimId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "claims",
    "inputs": [
      {
        "name": "_marketId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[4]",
        "internalType": "struct IMarkets.Claim[4]",
        "components": [
          {
            "name": "metadataURI",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "expiration",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "proposer",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "asset",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "isNullifyMarket",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "stake",
            "type": "tuple",
            "internalType": "struct IMarkets.Stake",
            "components": [
              {
                "name": "yea",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "nay",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "expiration",
                "type": "uint40",
                "internalType": "uint40"
              },
              {
                "name": "start",
                "type": "uint40",
                "internalType": "uint40"
              },
              {
                "name": "yeaStakers",
                "type": "address[]",
                "internalType": "address[]"
              },
              {
                "name": "nayStakers",
                "type": "address[]",
                "internalType": "address[]"
              },
              {
                "name": "price",
                "type": "tuple",
                "internalType": "struct IMarkets.Price",
                "components": [
                  {
                    "name": "curveType",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "steepness",
                    "type": "uint256",
                    "internalType": "uint256"
                  }
                ]
              }
            ]
          },
          {
            "name": "vote",
            "type": "tuple",
            "internalType": "struct IMarkets.Vote",
            "components": [
              {
                "name": "yea",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "nay",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "expiration",
                "type": "uint40",
                "internalType": "uint40"
              },
              {
                "name": "disputeExpiration",
                "type": "uint40",
                "internalType": "uint40"
              },
              {
                "name": "yeaVoters",
                "type": "address[]",
                "internalType": "address[]"
              },
              {
                "name": "nayVoters",
                "type": "address[]",
                "internalType": "address[]"
              },
              {
                "name": "outcome",
                "type": "uint8",
                "internalType": "enum IMarkets.Outcome"
              }
            ]
          },
          {
            "name": "status",
            "type": "uint8",
            "internalType": "enum IMarkets.ClaimStatus"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "claimsLength",
    "inputs": [
      {
        "name": "_marketId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "committeeResolve",
    "inputs": [
      {
        "name": "_outcome",
        "type": "uint8",
        "internalType": "enum IMarkets.Outcome"
      },
      {
        "name": "_marketId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deposit",
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_reciever",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "endVote",
    "inputs": [
      {
        "name": "_marketId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "marketId",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "marketMinStake",
    "inputs": [
      {
        "name": "_marketId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "nullifiedMarkets",
    "inputs": [
      {
        "name": "targetMarketId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "nullifyMarketId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "prepareVote",
    "inputs": [
      {
        "name": "_yeaVoters",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "_nayVoters",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "_marketId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "propose",
    "inputs": [
      {
        "name": "_propose",
        "type": "tuple",
        "internalType": "struct IMarkets.Propose",
        "components": [
          {
            "name": "metadataURI",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "nullifyMarketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "amount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "asset",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "claimExpiration",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "stakingExpiration",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "yea",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "dispute",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "price",
            "type": "tuple",
            "internalType": "struct IMarkets.Price",
            "components": [
              {
                "name": "curveType",
                "type": "uint8",
                "internalType": "uint8"
              },
              {
                "name": "steepness",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "resolve",
    "inputs": [
      {
        "name": "_marketId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "s",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract ISettings"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "stake",
    "inputs": [
      {
        "name": "_marketId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_yea",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "userBalance",
    "inputs": [
      {
        "name": "_asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "userClaimed",
    "inputs": [
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_claimKey",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "userStake",
    "inputs": [
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_claimKey",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "userStakeStatus",
    "inputs": [
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_claimKey",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint8",
        "internalType": "enum IMarkets.VoteStatus"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "userVoteStatus",
    "inputs": [
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_userVoteKey",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint8",
        "internalType": "enum IMarkets.VoteStatus"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "vote",
    "inputs": [
      {
        "name": "_marketId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_yea",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "_stake",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_reciever",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "ClaimProceeds",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "proceeds",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "fee",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "earned",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "marketId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "claimId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CommitteeResolve",
    "inputs": [
      {
        "name": "marketId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Deposit",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "reciever",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "EndVote",
    "inputs": [
      {
        "name": "marketId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "PrepareVote",
    "inputs": [
      {
        "name": "marketId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Proposed",
    "inputs": [
      {
        "name": "propose",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct IMarkets.Propose",
        "components": [
          {
            "name": "metadataURI",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "nullifyMarketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "amount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "asset",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "claimExpiration",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "stakingExpiration",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "yea",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "dispute",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "price",
            "type": "tuple",
            "internalType": "struct IMarkets.Price",
            "components": [
              {
                "name": "curveType",
                "type": "uint8",
                "internalType": "uint8"
              },
              {
                "name": "steepness",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          }
        ]
      },
      {
        "name": "claimId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Resolve",
    "inputs": [
      {
        "name": "marketId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Staked",
    "inputs": [
      {
        "name": "staker",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "marketId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "claimId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "timeWeightedAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "yea",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Voted",
    "inputs": [
      {
        "name": "voter",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "marketId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "claimId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "yea",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      },
      {
        "name": "stake",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Withdraw",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "reciever",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "AddressEmptyCode",
    "inputs": [
      {
        "name": "target",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "AddressInsufficientBalance",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "AssetNotWhitelisted",
    "inputs": []
  },
  {
    "type": "error",
    "name": "FailedInnerCall",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidAddress",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidAmount",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidCaller",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidExpiration",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidMarketId",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidNullifyMarketId",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidNullifyMarketParams",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidPeriod",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidPriceParams",
    "inputs": []
  },
  {
    "type": "error",
    "name": "MaxClaimsReached",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NotPendingCommitteeResolution",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NullifyMarketNotResolved",
    "inputs": []
  },
  {
    "type": "error",
    "name": "SafeERC20FailedOperation",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "UserNotWhitelisted",
    "inputs": []
  }
];