<template>
  <div>
    <div class="title">
      <div style="display: flex; align-items: center;">
        <div>
          <img src="@/assets/img/주꾸미.png" style="width: 80%; height: 90%;"/>
        </div>
        <h2>주꾸미 게임~</h2>
      </div>
    </div>
    <div id="vtab">
      <ul>
        <li :class="`${menuMap.home.selected} ${menuMap.home.mouseOver}`" 
          @click="onClickTabMenu('home')" 
          @mouseover="onMouseOverMenu('home')"
          @mouseleave="onMouseLeaveMenu('home')">
          <div class="menu-area">
            <div class="menu-img">
              <img src="@/assets/img/낚시대.jpeg" alt="낚시대"/>
            </div>
            <div class="menu-text" style="margin-top: 0px;">
              주꾸미 소개
            </div>
          </div>
        </li>
        <li :class="`${menuMap.info.selected} ${menuMap.info.mouseOver}`" 
          @click="onClickTabMenu('info')" 
          @mouseover="onMouseOverMenu('info')"
          @mouseleave="onMouseLeaveMenu('info')">
          <div class="menu-area" style="margin-top: 5px;">
            <div class="menu-img">
              <img src="@/assets/img/살림망.jpeg" alt="살림망"/>
            </div>
            <div class="menu-text" style="margin-top: 0px;">
              내 정보
            </div>
          </div>
        </li>
        <li :class="`${menuMap.create.selected} ${menuMap.create.mouseOver}`" 
          @click="onClickTabMenu('create')" 
          @mouseover="onMouseOverMenu('create')"
          @mouseleave="onMouseLeaveMenu('create')">
          <div class="menu-area" style="margin-top: 0px;">
            <div class="menu-img">
              <img src="@/assets/img/애자.jpeg" alt="애자"/>
            </div>
            <div class="menu-text">
              게임 생성
            </div>
          </div>
        </li>
        <li :class="`${menuMap.join.selected} ${menuMap.join.mouseOver}`" 
          @click="onClickTabMenu('join')" style="height: 85%;" 
          @mouseover="onMouseOverMenu('join')"
          @mouseleave="onMouseLeaveMenu('join')">
          <div class="menu-area" style="padding-top: 15px;">
            <div class="menu-img">
              <img src="@/assets/img/에기.jpeg" alt="에기" />
            </div>
            <div class="menu-text" style="padding-top: 10px;">
              게임 참여
            </div>
          </div>
        </li>
        <li :class="`${menuMap.link.selected} ${menuMap.link.mouseOver}`" 
          @click="onClickTabMenu('link')" 
          @mouseover="onMouseOverMenu('link')"
          @mouseleave="onMouseLeaveMenu('link')">
          <div class="menu-area">
            <div class="menu-img">
              <img src="@/assets/img/베이트릴.jpeg" alt="베이트릴" style="width: 75%; height: 75%;" />
            </div>
            <div class="menu-text" style="margin-top: 0px;">
              외부 링크
            </div>
          </div>
        </li>                        
      </ul>
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>

import "@/assets/css/vtap.css";

export default {
  name: 'app',
  components: { },
  data() {
    return {
      menuMap: {
        home: { name: "home", route: "/app/home", selected: "", mouseOver: "" },
        info: { name: "info", route: "/app/info/me", selected: "", mouseOver: "" },
        create: { name: "create", route: "/app/game/create", selected: "", mouseOver: "" },
        join: { name: "join", route: "/app/game/list", selected: "", mouseOver: "" },
        link: { name: "link", route: "/app/link", selected: "", mouseOver: "" },
      }
    }
  },
  mounted() {
    this.initMetamask();
    this.menuSetting();
  },
  methods: {
    async initMetamask() {
      // Checking if Web3 has been injected by the browser (Mist/MetaMask) 
      // let web3js;
      // if (typeof web3 !== 'undefined') { 
      //   // Use Mist/MetaMask's provider 
      //   web3js = new Web3(web3.currentProvider); 
      // } else { 
      //   console.log('No web3? You should consider trying MetaMask!'); 
      //   // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail) 
      //   web3js = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); 
      // }
    },
    onClickTabMenu(tab) {
      if (this.menuMap[tab] && this.menuMap[tab].route !== this.myRoute) {
        this.$router.push(this.menuMap[tab].route);
      }
    },
    menuSetting() {
      Object.keys(this.menuMap).forEach(ele => {
        if (this.menuMap[ele].route === this.myRoute) {
          this.menuMap[ele].selected = "selected";
        } else {
          this.menuMap[ele].selected = "";
        }
      });
    },
    onMouseOverMenu(tab) {
      this.menuMap[tab].mouseOver = "mouseOver";
    },
    onMouseLeaveMenu(tab) {
      this.menuMap[tab].mouseOver = "";
    },
    async initMetamask2() {
      if (window.ethereum) {
        console.log('window.ethereum');
        try {
          // await ethereum.eth_requestAccounts(); // Request account access if needed
          await ethereum.enable(); // Request account access if needed
        } catch (error) {
          console.log(error); // User denied account access...
        }
      }
      else if (window.web3) {
        console.log('window.web3');
          window.web3 = new Web3(web3.currentProvider); // Legacy dapp browsers...
          web3.eth.sendTransaction({/* ... */}); // Acccounts always exposed
      }
      else {
        // Non-dapp browsers...
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }      
    },    
  },
  computed: {
    myRoute() {
      return this.$route.fullPath;
    }
  },
  watch: {
    myRoute() {
      this.menuSetting();
    }
  }  
}
</script>

<style scoped>
.title {
  margin: auto;
  width: 1000px;
  height: 100%;  
  /* margin: auto; */
  /* margin-left: 120px; */
}

.menu-img > img {
  width: 80%;
  height: 80%;
}

.menu-text {
  /*  */
}

/* .menu-icon .home {
  background: url("@/assets/img/낚시대.jpeg") no-repeat center center;
} */

</style>
