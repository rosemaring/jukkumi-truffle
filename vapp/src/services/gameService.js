import Web3 from "web3";
import axios from "axios";
import gameContractAbi from "../contracts/gameContract";

const blockchainUrl = process.env.VUE_APP_BLOCKCHAIN_URL;
const gameContractAddress = "0x0e020e064574ED7B21e04FA737B4801B4FC8B8d0"; //process.env.VUE_APP_GAME_CONTRACT_ADDRESS;

function createGameContract(web3) {
  // return new web3.eth.Contract(gameContractAbi).at(blockchainUrl);
  return new web3.eth.Contract(gameContractAddress, contractAddress);
}

const gameService = {
  getGameCount: () => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
    const contract = new web3.eth.Contract(
      gameContractAbi,
      gameContractAddress
    );
    return new Promise((resolve, reject) => {
      contract.methods
        .getGameCount()
        .call()
        .then((result, err) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  },
  getGameInfo: (gameIndex) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
    const contract = new web3.eth.Contract(
      gameContractAbi,
      gameContractAddress
    );
    return new Promise((resolve, reject) => {
      contract.methods
        .getGameInfo(gameIndex)
        .call()
        .then((result, err) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  },
  getGameInfoList: (limit, offset) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
    const contract = new web3.eth.Contract(
      gameContractAbi,
      gameContractAddress
    );

    return new Promise((resolve, reject) => {
      contract.methods
        .getGameInfoList(limit, offset)
        .call()
        .then((result, err) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  },
  createGame: async (gameObj, options) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
    const contract = new web3.eth.Contract(
      gameContractAbi,
      gameContractAddress
    );

    try {
      const gasAmount = await contract.methods
        .createGame(
          gameObj.title,
          gameObj.rule,
          gameObj.playerCountMin,
          gameObj.playerCountMax,
          gameObj.participationFee,
          gameObj.hostDeposit,
          gameObj.agentList
        )
        .estimateGas({ from: options.walletAddress });
      const res = await contract.methods
        .createGame(
          gameObj.title,
          gameObj.rule,
          gameObj.playerCountMin,
          gameObj.playerCountMax,
          gameObj.participationFee,
          gameObj.hostDeposit,
          gameObj.agentList
        )
        .send({ from: options.walletAddress, gas: gasAmount });
      return res;
    } catch (err) {
      return;
    }
  },
  join: async (gameIndex, options) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
    const contract = new web3.eth.Contract(
      gameContractAbi,
      gameContractAddress
    );

    try {
      const gasAmount = await contract.methods
        .join(gameIndex)
        .estimateGas({ from: options.walletAddress });
      const res = await contract.methods
        .join(gameIndex)
        .send({ from: options.walletAddress, gas: gasAmount });
      return res;
    } catch (err) {
      return err;
    }
  },
  startGame: async (gameIndex, options) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
    const contract = new web3.eth.Contract(
      gameContractAbi,
      gameContractAddress
    );

    try {
      const gasAmount = await contract.methods
        .startGame(gameIndex)
        .estimateGas({ from: options.walletAddress });
      const res = await contract.methods
        .startGame(gameIndex)
        .send({ from: options.walletAddress, gas: gasAmount });
      return res;
    } catch (err) {
      return err;
    }
  },
  endGame: async (gameObj, options) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
    const contract = new web3.eth.Contract(
      gameContractAbi,
      gameContractAddress
    );

    try {
      const gasAmount = await contract.methods
        .endGame(
          gameObj.gameIndex,
          gameObj.winnerList,
          gameObj.rankOrder,
          gameObj.prizeByRank
        )
        .estimateGas({ from: options.walletAddress });
      const res = await contract.methods
        .endGame(
          gameObj.gameIndex,
          gameObj.winnerList,
          gameObj.rankOrder,
          gameObj.prizeByRank
        )
        .send({ from: options.walletAddress, gas: gasAmount });
      return res;
    } catch (err) {
      return err;
    }
  },

  getTest: () => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
    const contract = new web3.eth.Contract(
      gameContractAbi,
      gameContractAddress
    );

    return new Promise((resolve, reject) => {
      contract.methods
        .getTest()
        .call()
        .then((result, err) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  },
  createGameTestTest: async (gameObj, walletAddress) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
    const contract = new web3.eth.Contract(
      gameContractAbi,
      gameContractAddress
    );
    const contractCall = contract.methods.sendTest(gameObj);
    const encodedABI = contractCall.encodeABI();
    const contractCall2 = await contract.methods.sendTest(gameObj).send({
      from: walletAddress,
      // data: encodedABI
    });
    return contractCall2;
  },

  // data: {
  //   title: gameObj.title, rule: gameObj.rule, playerCountMin: gameObj.playerCountMin,
  //   playerCountMax: gameObj.playerCountMax, participationFee: gameObj.participationFee,
  //   hostDeposit: gameObj.hostDeposit, agentList: gameObj.agentList
  // }

  createGame22: (gameObj, account) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
    const contract = new web3.eth.Contract(
      gameContractAbi,
      gameContractAddress
    );
    const contractCall = contract.methods.createGame();
    const encodedABI = contractCall.encodeABI();

    const tx = {
      from: options.walletAddress,
      to: options.contractAddress,
      gas: 8000000,
      data: encodedABI,
    };

    web3.eth.accounts.signTransaction(tx, options.privateKey).then((signed) => {
      var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);

      tran.on("receipt", (receipt) => {
        onConfirm(receipt);
      });

      tran.on("error", console.error);
    });

    // return new Promise((resolve, reject) => {
    //   contract.methods.createGame(gameObj.title, gameObj.rule, gameObj.playerCountMin, gameObj.playerCountMax, gameObj.participationFee, gameObj.hostDeposit, gameObj.agentList)
    //     .call().then((result, err) => {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve(result);
    //       }
    //     });
    // });
  },
  getGameCount8: () => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
    const contract = new web3.eth.Contract(
      gameContractAbi,
      gameContractAddress
    );

    return new Promise((resolve, reject) => {
      contract.methods
        .getGameCount()
        .call()
        .then((result, err) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  },

  /* deprecated */
  getGame: (gameIndex) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
    const contract = new web3.eth.Contract(
      gameContractAbi,
      gameContractAddress
    );

    return new Promise((resolve, reject) => {
      contract.methods
        .getGame(gameIndex)
        .call()
        .then((result, err) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  },
  getGameList: (limit, offset) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
    const contract = new web3.eth.Contract(
      gameContractAbi,
      gameContractAddress
    );

    return new Promise((resolve, reject) => {
      contract.methods
        .getGameList(limit, offset)
        .call()
        .then((result, err) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  },
  getPlayerList: (gameIndex) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
    const contract = new web3.eth.Contract(
      gameContractAbi,
      gameContractAddress
    );

    return new Promise((resolve, reject) => {
      contract.methods
        .getPlayerList(gameIndex)
        .call()
        .then((result, err) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  },
  transactionTest123: (txData, callback) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchain));
    const contract = createGameContract(web3, options.contractAddress);
    const getGameCountCall = contract.methods.getGameCount();
    const encodedABI = getGameCountCall.encodeABI();

    const txObj = {
      from: "", //txData.walletAddress,
      to: "", //txData.contractAddress,
      gas: 300000, //8000000,
      data: encodedABI,
    };

    web3.eth.accounts.signTransaction(tx, options.privateKey).then((signed) => {
      let tran = web3.eth.sendSignedTransaction(signed.rawTransaction);
      tran.on("receipt", (receipt) => {
        callback(receipt);
      });
      tran.on("error", console.error);
    });
  },
};

export default gameService;
