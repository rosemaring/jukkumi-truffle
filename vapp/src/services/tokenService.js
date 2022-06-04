import Web3 from "web3";
import axios from "axios";
import detectEthereumProvider from "@metamask/detect-provider";
// import { objectToParam } from '@/utils/objectKey'

const blockchainUrl = process.env.VUE_APP_BLOCKCHAIN_URL;
// const gameContractAddress = process.env.VUE_APP_GAME_CONTRACT_ADDRESS;
const gameContractAddress = "0x0e020e064574ED7B21e04FA737B4801B4FC8B8d0";
// const url_base = process.env.VUE_APP_BASE_API + '/api/v1';
// const req_config = {
//   headers: {
//     'Content-Type': 'application/json'
//   }
// }

function startApp(provider) {
  // If the provider returned by detectEthereumProvider is not the same as
  // window.ethereum, something is overwriting it, perhaps another wallet.
  if (provider !== window.ethereum) {
    console.error("Do you have multiple wallets installed?");
    alert("메타마스크 정보를 찾을 수 없습니다.");
  }
  // Access the decentralized web!
}

const tokenService = {
  sign: (message) => {
    const from = ethereum.selectedAddress;
    const params = [message, from];
    const method = "personal_sign";
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));

    web3.currentProvider.sendAsync({ method, params, from }, (err, result) => {
      $.get("http://localhost:3000/sign/" + JSON.stringify(result.result));
    });
  },
  initMetamask: async () => {
    // this returns the provider, or null if it wasn't detected
    const provider = await detectEthereumProvider();
    console.log("provider : ", provider);
    if (provider) {
      startApp(provider); // Initialize your app
    } else {
      console.log("Please install MetaMask!");
    }
  },
  getAccount: async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    return accounts[0];
  },

  // checkMetamask: async () => {
  //   if (window.ethereum) {
  //     try {
  //       // Request account access if needed
  //       await ethereum.enable();
  //     } catch (error) {
  //       console.log(error)
  //       // User denied account access...
  //     }
  //   }
  //   // Legacy dapp browsers...
  //   else if (window.web3) {
  //     window.web3 = new Web3(web3.currentProvider);
  //     // Acccounts always exposed
  //     web3.eth.sendTransaction({/* ... */ });
  //   }
  //   // Non-dapp browsers...
  //   else {
  //     console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  //   }
  // },
};

export default tokenService;
