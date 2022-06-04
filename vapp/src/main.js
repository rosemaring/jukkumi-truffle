import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Web3 from 'web3';
import router from './router'

Vue.use(Vuex)
const store = new Vuex.Store({ 
  // modules: {
  //   vuexApp: {
  //     namespaced: true,
  //     getters,
  //   }
  // },
  state: {},
})

Vue.config.productionTip = false;

// import detectEthereumProvider from '@metamask/detect-provider';
// (async function detectMetamask() {
//   const provider = await detectEthereumProvider();
//   if (provider) {
//     // From now on, this should always be true:
//     // provider === window.ethereum
//     startApp(provider); // initialize your app
//   } else {
//     alert('메타마스크 정보가 없습니다.');
//   }
// })();

const blockchainUrl = process.env.VUE_APP_BLOCKCHAIN_URL;
let web3js;
if (typeof web3 !== 'undefined') {
  // Use Mist/MetaMask's provider 
  web3js = new Web3(web3.currentProvider);
} else {
  // this.$router.push('/');
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail) 
  web3js = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
  if (!web3js) {
    alert('메타마스크 정보가 없습니다.');
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')