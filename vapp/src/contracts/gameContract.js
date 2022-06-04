export default [
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "rule",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "playerCountMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "playerCountMax",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "participationFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "hostDeposit",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "agentList",
        type: "address[]",
      },
    ],
    name: "createGame",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameIndex",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "host",
        type: "address",
      },
    ],
    name: "CreateGame",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameIndex",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "winnerList",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "rankOrder",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "prizeByRank",
        type: "uint256[]",
      },
    ],
    name: "endGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameIndex",
        type: "uint256",
      },
    ],
    name: "join",
    outputs: [
      {
        internalType: "uint256",
        name: "playerNo",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "sendTest",
    outputs: [
      {
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameIndex",
        type: "uint256",
      },
    ],
    name: "startGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameIndex",
        type: "uint256",
      },
    ],
    name: "getGame",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "rule",
            type: "string",
          },
          {
            internalType: "address",
            name: "host",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "agentList",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "playerCountMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "playerCountMax",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "participationFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "hostDeposit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endAt",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "playerList",
            type: "address[]",
          },
          {
            internalType: "enum JukkumiGame.GameStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct JukkumiGame.Game",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getGameCount",
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
        name: "gameIndex",
        type: "uint256",
      },
    ],
    name: "getGameInfo",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "index",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "rule",
                type: "string",
              },
              {
                internalType: "address",
                name: "host",
                type: "address",
              },
              {
                internalType: "address[]",
                name: "agentList",
                type: "address[]",
              },
              {
                internalType: "uint256",
                name: "playerCountMin",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "playerCountMax",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "participationFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "hostDeposit",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "createdAt",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "startedAt",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "endAt",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "playerList",
                type: "address[]",
              },
              {
                internalType: "enum JukkumiGame.GameStatus",
                name: "status",
                type: "uint8",
              },
            ],
            internalType: "struct JukkumiGame.Game",
            name: "game",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "playerNo",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "playerAddress",
                type: "address",
              },
              {
                internalType: "bool",
                name: "isWinner",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "rank",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "prize",
                type: "uint256",
              },
            ],
            internalType: "struct JukkumiGame.Player[]",
            name: "playerList",
            type: "tuple[]",
          },
        ],
        internalType: "struct JukkumiGame.GameInfo",
        name: "gameInfo",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
    ],
    name: "getGameInfoList",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "index",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "rule",
                type: "string",
              },
              {
                internalType: "address",
                name: "host",
                type: "address",
              },
              {
                internalType: "address[]",
                name: "agentList",
                type: "address[]",
              },
              {
                internalType: "uint256",
                name: "playerCountMin",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "playerCountMax",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "participationFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "hostDeposit",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "createdAt",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "startedAt",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "endAt",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "playerList",
                type: "address[]",
              },
              {
                internalType: "enum JukkumiGame.GameStatus",
                name: "status",
                type: "uint8",
              },
            ],
            internalType: "struct JukkumiGame.Game",
            name: "game",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "playerNo",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "playerAddress",
                type: "address",
              },
              {
                internalType: "bool",
                name: "isWinner",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "rank",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "prize",
                type: "uint256",
              },
            ],
            internalType: "struct JukkumiGame.Player[]",
            name: "playerList",
            type: "tuple[]",
          },
        ],
        internalType: "struct JukkumiGame.GameInfo[]",
        name: "gameInfoList",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
    ],
    name: "getGameList",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "rule",
            type: "string",
          },
          {
            internalType: "address",
            name: "host",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "agentList",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "playerCountMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "playerCountMax",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "participationFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "hostDeposit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endAt",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "playerList",
            type: "address[]",
          },
          {
            internalType: "enum JukkumiGame.GameStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct JukkumiGame.Game[]",
        name: "gameList",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameIndex",
        type: "uint256",
      },
    ],
    name: "getPlayerList",
    outputs: [
      {
        internalType: "address[]",
        name: "playerList",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTest",
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
    inputs: [],
    name: "owner",
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
];
