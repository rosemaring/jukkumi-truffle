<template>
  <div style="padding: 0px 15px 0px 15px; background-color: #000; height: 700px;">
    <div class="" style="color: white; padding-top: 10px; text-align: center;">
      <h2 style="color: #ff0066;">주꾸미 게임 생성</h2>
      <div style="padding: 5px;">
        <div style="position: absolute; left: 50%; transform: translate(-50%, 0%); width: 70%;">
          <div class="div-form">
            <div class="div-label">
              <label class="width100">게임 이름</label>
            </div>
            <div class="div-input">
              <input type="text" v-model="gameForm.title" class="width100"/>
            </div>
          </div>
          <div class="div-form">
            <div class="div-label">
              <label class="width100">게임참여 최소인원</label>
            </div>
            <div class="div-input">
              <input type="text" v-model="gameForm.playerCountMin" class="width100"/>
            </div>
          </div>
          <div class="div-form">
            <div class="div-label">
              <label class="width100">게임참여 최대인원</label>
            </div>
            <div class="div-input">
              <input type="text" v-model="gameForm.playerCountMax" class="width100"/>
            </div>
          </div>
          <div class="div-form">
            <div class="div-label">
              <label class="width100">게임 참가비</label>
            </div>
            <div class="div-input">
              <input type="text" v-model="gameForm.participationFee" class="width100"/>
            </div>
          </div>
          <div class="div-form">
            <div class="div-label">
              <label class="width100">주최자 상금 기여</label>
            </div>
            <div class="div-input">
              <input type="text" v-model="gameForm.hostDeposit" class="width100"/>
            </div>
          </div>
          <div class="div-form">
            <div class="div-label">
              <label class="width100">에이전트</label>
            </div>
            <div class="div-input">
              <input type="text" v-model="gameForm.agent" class="width100"/>
            </div>
          </div>
          <div class="div-form" v-show="false">
            <div class="div-label">
              <label class="width100">에이전트만 운영 권한</label>
            </div>
            <div class="div-input" style="text-align: left;">
              <input type="checkbox" v-model="gameForm.isAgentOnlyAuthority" style="width: 25px; height: 25px;"/>
            </div>
          </div>
          <div class="div-form">
            <div class="div-label">
              <label class="width100">게임 규칙</label>
            </div>
            <div class="div-input">
              <textarea rows="5" v-model="gameForm.rule" style="resize: none; width: 100%; height: 100px; font-size: 14px;"/>
            </div>
          </div>
          <div class="div-form">
            <div style="position: relative; width: 100%; height: 75px;">
              <div style="position: absolute; left: 50%; bottom: 0px; margin-left: -10%;">
                <button class="normal-button" @click="onClickCreateGame">게임 생성</button>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import gameService from '@/services/gameService';
import tokenService from '@/services/tokenService';

export default {
  components: { },
  data() {
    return {
      gameForm: {
        title: '',
        rule: '',
        playerCountMin: '',
        playerCountMax: '',
        participationFee: '',
        hostDeposit: '',
        agent: '',
        isAgentOnlyAuthority: false,
      },
      myAccount: { address: '' },
    }
  },  
  mounted() {
    this.getMyAccountInfo();
  },
  methods: {
    onClickCreateGame() {
      if (!this.gameForm.title) { alert('게임 제목을 입력해주세요.'); return false; }
      if (!this.gameForm.playerCountMin || this.gameForm.playerCountMin < 2) { alert('게임참여 최소인원을 확인해주세요.'); return false; }
      if (!this.gameForm.playerCountMax || this.gameForm.playerCountMax < 2 || this.gameForm.playerCountMax < this.gameForm.playerCountMin) { alert('게임참여 최대인원을 확인해주세요.'); return false; }
      if (0 != this.gameForm.participationFee && !this.gameForm.participationFee) { alert('게임 참가비를 입력해주세요.'); return false; }
      if (0 != this.gameForm.hostDeposit && !this.gameForm.hostDeposit) { alert('주최자 상금 기여금을 입력해주세요.'); return false; }

      let confirmText = "다음과 같이 게임을 주최합니다.\n";
      confirmText += "게임 제목 : " + this.gameForm.title + "\n";
      confirmText += "게임참여 인원 : " + this.gameForm.playerCountMin + "~" + this.gameForm.playerCountMax + "명\n";
      confirmText += "게임 참가비 : " + this.gameForm.participationFee + "쭈\n";
      confirmText += "주최자 상금 기여 : " + this.gameForm.hostDeposit + "쭈\n";
      confirmText += "에이전트 : " + (this.gameForm.agent ? this.gameForm.agent : '없음') + "\n";
      confirmText += "게임 권한 : " + (this.gameForm.agent ? this.gameForm.isAgentOnlyAuthority ? "에이전트만" : "호스트와 에이전트" : "호스트만") + "\n";
      confirmText += "주최하시겠습니까?";

      if (confirm(confirmText)) {
        this.createGame();
      }
    },
    async createGame() {
      if (!this.myAccount.address) {
        alert('계좌정보가 없습니다.');
        return false;
      }
      const res = await gameService.createGame({
        title: this.gameForm.title, 
        rule: this.gameForm.rule, 
        playerCountMin: this.gameForm.playerCountMin, 
        playerCountMax: this.gameForm.playerCountMax, 
        participationFee: this.gameForm.participationFee, 
        hostDeposit: this.gameForm.hostDeposit, 
        agentList: [this.myAccount.address]
      }, { walletAddress: this.myAccount.address });
      if (res) {
        const eventRes = res.events['CreateGame'].returnValues;
        alert(`게임을 생성했습니다.\n게임번호 : ${eventRes.gameIndex}\n호스트 : ${eventRes.host}\n가스비 : ${res.gasUsed}`);
        this.initGameForm();
      }
    },
    async getMyAccountInfo() {
      const myAccount = await tokenService.getAccount();
      this.myAccount.address = myAccount;
    },
    initGameForm() {
      this.gameForm = { title: '', rule: '', playerCountMin: '', playerCountMax: '', participationFee: '', hostDeposit: '', agent: '', isAgentOnlyAuthority: false };
    },
  }
}
</script>

<style scoped>

.div-form {
  margin-bottom: 10px;
  display: flex; 
  text-align: left;
}

.div-label {
  width: 40%;
  padding-top: 6px;
}

.div-input {
  width: 60%;
}

.width100 {
  width: 100%;
  height: 25px;
  font-size: 16px;
}

div.left {
  width: 50%;
  float: left;
  text-align: center;
  /* padding: 15px; */
  /* box-sizing: border-box; */
}
div.right {
  width: 50%;
  float: right;
  text-align: center;
  /* padding: 15px; */
  /* box-sizing: border-box; */
}

.normal-button {
  padding: 5px 15px 5px 15px;
  margin: 10px;
  color: #fff;
  background-color: #ff0066;
  border-color: #ff0066;  
  text-align: center;
  vertical-align: middle;  
  border: 1px solid transparent;
  border-radius: 5px;  
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;  
}

.btn {
    display: inline-block;
    font-weight: 400;
    /* color: #212529; */
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 12px;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

</style>
