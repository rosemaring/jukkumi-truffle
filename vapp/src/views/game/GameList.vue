<template>
  <div style="padding: 0px 15px 0px 15px; background-color: #000; height: 700px;">
    <div class="left" style="color: white; padding-top: 10px;">
      <h2 style="color: #ff0066;">주꾸미 게임 목록</h2>
      <div style="display: flex; padding: 5px; overflow-y: auto; height: 580px;">
        <div style="width: 100%;">
          <!-- 반복 : 게임 목록 -->
          <div v-show="!isLoadingGameList" v-for="(gameInfo, listIndex) in gameInfoList" :key="gameInfo.index" @click="selectGame(gameInfo, listIndex)"
            :style="`${selectedGame.listIndex == listIndex ? 'border: 1px solid #ff0066;' : 'border: 1px solid #fff;'} text-align: left; margin-bottom: 5px;`">
            <div style="display: flex;">
              <div style="text-align: center; width: 50px; padding: 15px 10px 0px 10px;">
                <h3 :style="`color: ${gameInfo.game.statusColor}; margin-top: 0px;`">{{ gameInfo.isOwner ? '*' + gameInfo.index : gameInfo.index }}</h3>
                <h4 :style="`color: ${gameInfo.game.statusColor}; margin-top: -20px; margin-bottom: 0px;`">{{ gameInfo.game.statusDisplay }}</h4>
              </div>
              <div style="flex-grow: 1;">
                <div style="padding-top: 5px; padding-bottom: 5px;">
                  [{{ gameInfo.playerList.length }}/{{ gameInfo.game.playerCountMax }}] {{ gameInfo.game.title }} <br>
                  <div style="font-size: 12px;">
                  - 호스트 {{ gameInfo.game.host }}<br>
                  - 참가비 {{ filterComma(gameInfo.game.participationFee) }}쭈, 호스트 상금 {{ filterComma(gameInfo.game.hostDeposit) }}쭈<br>
                  - 참가인원 {{ gameInfo.game.playerCountMin }}명 ~ {{ gameInfo.game.playerCountMax }}명<br>
                  </div>
                </div>
              </div>   
            </div>
          </div>      
        </div>
      </div>
    </div>
    <div class="right" style="color: white; padding-top: 5px;">
      <h2 style="color: #ff0066;">주꾸미 게임 상세정보</h2>
        <!-- 상세 페이지 -->
        <div style="position: relative; text-align: center; height: 585px; border: 1px solid #fff; margin: 30px 10px 10px 10px;">
          <div v-if="selectedGame.index" style="height: 530px; overflow-y: auto;">
            <h3 :style="`color: ${selectedGame.game.statusColor};`">{{ selectedGame.game.title }} - {{ selectedGame.game.statusDisplay }}{{ isWaitingFull(selectedGame) ? "(풀방)" : "" }}</h3>
            <div style="text-align: left; padding-left: 10px; font-size: 14px;">
              <h3 style="margin-bottom: 5px; padding-left: 10px;">게임 정보</h3>
              - 게임번호 : {{ selectedGame.index }}<br>
              - 호스트 : {{ selectedGame.game.host }}<br>
              <template v-for="(agent) in selectedGame.game.agentList">
                &nbsp;&nbsp;+ {{ agent }}<br>
              </template>
              - 참가인원 : 최소 {{ selectedGame.game.playerCountMin }}명, 최대 {{ selectedGame.game.playerCountMax }}명<br>
              <template v-if="isWaiting(selectedGame)">
              - 현재 {{ selectedGame.playerList.length }}명 참가자 대기중<br>
              </template>
              <template v-if="isPlaying(selectedGame)">
              - 현재 {{ selectedGame.playerList.length }}명 참가자 게임중<br>
              </template>              
              <template v-if="isEnd(selectedGame)">
              - {{ selectedGame.playerList.length }}명 참가자 중 {{ '???' }}명 우승<br>
              </template>
              - 참가비 {{ filterComma(selectedGame.game.participationFee) }}쭈, 호스트 상금 {{ filterComma(selectedGame.game.hostDeposit) }}쭈<br>
              - 최대 상금 : {{ calcMaxPrize(selectedGame) }}쭈 ({{ filterComma(selectedGame.game.playerCountMax) }} * {{ filterComma(selectedGame.game.participationFee) }} + {{ filterComma(selectedGame.game.hostDeposit) }})<br>
              <br>
              - 생성일시 : {{ selectedGame.game.createdAt }}<br>
              - 시작일시 : {{ selectedGame.game.startedAt != "0" ? selectedGame.game.startedAt : "-" }}<br>
              - 종료일시 : {{ selectedGame.game.endAt != "0" ? selectedGame.game.endAt : "-" }}<br>
              <br>
              <!-- - 호스트 권한 : 있음<br> -->
              <div style="padding-left: 10px;">
              <!-- <span style="font-size: 10px;">- 에이전트 : {{ selectedGame.game.agentList[0] }}<br></span> -->
                <h3 style="margin-bottom: 5px; margin-top: 0px;">게임 규칙</h3>
                <div>
                  <p style="margin-top: 5px;" v-html="selectedGame.game.rule"></p>
                </div>
              </div>
              <div style="padding-left: 10px;" v-if="true">
                <h3 style="margin-bottom: 5px;">참가자 목록</h3>
                <div v-if="selectedGame.playerList.length > 0">
                  <span v-for="player in selectedGame.playerList" :key="player.playerNo">
                    {{ `[${player.playerNo}] : ${player.playerAddress}` }}<br>
                  </span>
                </div>
                <div v-else>참가자가 없습니다.<br></div>
              </div>
              <div style="padding-left: 10px;" v-if="selectedGame.isOwner && isPlaying(selectedGame)">
                <h3 style="margin-bottom: 5px;">게임 결과 입력</h3>
                  <div style="display: flex; margin-bottom: 5px;">
                    <label style="width: 25%;">우승자 목록</label>
                    <input style="width: 60%; margin-top: -2px;" v-model="endGameForm.winnerList" placeholder="1,2,3" />
                  </div>                
                  <div style="display: flex; margin-bottom: 5px;">
                    <label style="width: 25%;">참가자 순위</label>
                    <input style="width: 60%; margin-top: -2px;" v-model="endGameForm.rankOrder" placeholder="1,2,3" />
                  </div>
                  <div style="display: flex; margin-bottom: 5px;">
                    <label style="width: 25%;">순위별 상금</label>
                    <input style="width: 60%; margin-top: -2px;" v-model="endGameForm.prizeByRank" placeholder="10000, 5000, 3000" />
                  </div>                
              </div>
              <div style="padding-left: 10px;" v-if="isEnd(selectedGame)">
                <h3 style="margin-bottom: 5px;">게임 결과</h3>
                <div v-if="selectedGame.playerList.length > 0">
                  <div v-for="player in selectedGame.result" :key="player.rank">
                    <div>
                      <b>[{{ player.rank }}등] : {{ player.playerNo }}번 참가자 / {{ player.isWinner ? '우승' : '탈락' }}</b><br>
                      - 주소 : {{ player.playerAddress }}<br>
                      - 상금 : {{ filterComma(player.prize) }}쭈
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="position: absolute; bottom: 0px; text-align: center; width: 100%;">
              <div style="position: relative; text-align: center;">
                <button v-if="!selectedGame.isOwner && isWaiting(selectedGame)" class="normal-button" @click="joinGame(selectedGame.index)">참가</button>
                <button v-else-if="selectedGame.isOwner && isWaiting(selectedGame)" class="normal-button" @click="startGame(selectedGame.index)">게임 시작</button>
                <button v-else-if="selectedGame.isOwner && isPlaying(selectedGame)" class="normal-button" @click="endGame(selectedGame.index)">게임 종료</button>
              </div>
            </div>              
          </div>
          <div v-else style="text-align: center; height: 300px; line-height:300px;">
            <h3>게임을 선택해주세요.</h3>
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
      gameInfoList: [],
      selectedGame: {},
      isLoadingGameList: false,
      isLoadingJoin: false,
      isLoadingStart: false,
      isLoadingEnd: false,
      myAccount: { address: '' },
      endGameForm: {
        winnerList: "",
        rankOrder: "",
        prizeByRank: "",
      }
    }
  },
  mounted() {
    this.fetchGameList();
    this.getMyAccountInfo();
  },
  methods: {
    async fetchGameList() {
      this.isLoadingGameList = true;
      let gameRes = await gameService.getGameInfoList(100, 0);
      let tempList = [];

      for (let i = gameRes.length - 1, len = gameRes.length; i >= 0; i--) {
        tempList.push({
          index: gameRes[i].game.index, 
          playerCount: gameRes[i].playerList.length,
          isOwner: this.isOwnership(gameRes[i]),
          game: { 
            ...gameRes[i].game, 
            statusDisplay: this.filterGameStatus(gameRes[i].game.status),
            statusColor: this.filterGameStatusColor(gameRes[i].game.status),
            rule: gameRes[i].game.rule.replaceAll("\n", "<br>"),
          },
          playerList: gameRes[i].playerList
        });
      }
      this.gameInfoList = tempList;
      console.log(this.gameInfoList);
      this.isLoadingGameList = false;
    },
    async joinGame(gameIndex) {
      if (this.isLoadingJoin === false && confirm(`주꾸미 게임에 참가하시겠습니까?\n참가비 : ${this.filterComma(this.selectedGame.game.participationFee)}쭈`) === true) {
        this.isLoadingJoin = true;
        const joinRes = await gameService.join(gameIndex, { walletAddress: this.myAccount.address });
        if (joinRes.status === true) {
          alert('주꾸미 게임에 참가했습니다.');
          let tempPlayer = {
            playerAddress: this.myAccount.address,
            playerNo: (this.selectedGame.playerList.length + 1).toString()
          }
          // this.gameInfoList[this.selectedGame.listIndex].playerList.push(tempPlayer);
          // this.selectedGame.playerList.push(tempPlayer);
        } else {
          if (joinRes.message.indexOf("not in a waiting status") !== -1) {
            alert('대기중인 상태가 아닙니다.');
          } else if (joinRes.message.indexOf("already joined") !== -1) {
            alert('이미 참가했습니다.');
          } else if (joinRes.message.indexOf("already fulled") !== -1) {
            alert('인원이 꽉 찼습니다.');
          } else {
            alert('오류입니다.');
            console.log(joinRes.message)
          }
        }
        this.isLoadingJoin = false;
      }
    },
    async startGame(gameIndex) {
      if (this.isLoadingStart === false && confirm(`주꾸미 게임을 시작하시겠습니까?`) === true) {
        this.isLoadingStart = true;
        const startRes = await gameService.startGame(gameIndex, { walletAddress: this.myAccount.address });
        if (startRes.status === true) {
          alert('주꾸미 게임을 시작했습니다.');
          const statusDisplay = this.filterGameStatus("1");
          const statusColor = this.filterGameStatusColor("1");
          this.selectedGame.game.status = "1";
          this.selectedGame.game.statusDisplay = statusDisplay;
          this.selectedGame.game.statusColor = statusColor;
          this.gameInfoList[this.selectedGame.listIndex].game.status = "1";
          this.gameInfoList[this.selectedGame.listIndex].game.statusDisplay = statusDisplay;
          this.gameInfoList[this.selectedGame.listIndex].game.statusColor = statusColor;
        } else {
          if (startRes.message.indexOf("not in a waiting status") !== -1) {
            alert('대기중인 상태가 아닙니다.');
          } else if (startRes.message.indexOf("no ownership of this game") !== -1) {
            alert('게임에 대한 소유권이 없습니다.');
          } else if (startRes.message.indexOf("need more player") !== -1) {
            alert(`참가자가 더 필요합니다.\n최소 참가자 수 : ${this.selectedGame.game.playerCountMin}\n현재 참가자 수 : ${this.selectedGame.playerList.length}`);
          } else {
            console.log(startRes.message)
            alert('오류입니다.');
          }
        }
        this.isLoadingStart = false;
      }
    },
    async endGame(gameIndex) {
      console.log('endGameForm.winnerList', this.endGameForm.winnerList)
      console.log('endGameForm.rankOrder', this.endGameForm.rankOrder)
      console.log('endGameForm.prizeByRank', this.endGameForm.prizeByRank)

      let winnerList = this.endGameForm.winnerList.split(',');
      let rankOrder = this.endGameForm.rankOrder.split(',');
      let prizeByRank = this.endGameForm.prizeByRank.split(',');
      let message = `다음과 같이 게임을 종료하시겠습니까?\n우승자 : [${winnerList}]\n순위 : [${rankOrder}]\n순위별 상금 : [${prizeByRank}]`;

      if (confirm(message)) {
        this.isLoadingEnd = true;
        const endRes = await gameService.endGame({ gameIndex, winnerList, rankOrder, prizeByRank }, { walletAddress: this.myAccount.address });
        console.log('endRes : ', endRes);
        if (endRes.status === true) {        
          alert('게임을 종료했습니다.');
          this.endGameForm.winnerList = "";
          this.endGameForm.rankOrder = "";
          this.endGameForm.prizeByRank = "";
        } 
        else if (endRes.message.indexOf("param array index is out of bounds" !== -1)) {
          alert('우승 입력값이 잘못되었습니다.');
        } else if (endRes.message.indexOf("prepared Prize is less than the Total Prize" !== -1)) {
          alert('준비된 상금보다 설정된 상금이 많습니다.');
        } else {
          console.log(endRes.message);
          alert('오류입니다.');
        }
        this.isLoadingEnd = false;
      }
    },
    calcMaxPrize(gameInfo) {
      const playerCountMax = Number(gameInfo.game.playerCountMax);
      const participationFee = Number(gameInfo.game.participationFee);
      const hostDeposit = Number(gameInfo.game.hostDeposit);
      return this.filterComma((playerCountMax * participationFee) + hostDeposit);
    },
    selectGame(gameInfo, listIndex) {
      this.selectedGame = gameInfo;
      this.selectedGame.listIndex = listIndex;
      if (this.isEnd(gameInfo)) {
        let objList = [];
        for (let i = 0; i < gameInfo.playerList.length; i++) {
          objList.push({...gameInfo.playerList[i]});
        }
        objList.sort((a, b) => {
          return a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : 0;
        })
        this.selectedGame.result = objList;
      }
    },
    findIndexFromGameList(gameIndex) {
      const index = this.gameInfoList.findIndex(ele => ele.index == gameIndex);
      return index;
    },
    isOwnership(gameInfo) {
      const host = gameInfo.game.host.toLowerCase();
      const myAccount = this.myAccount.address.toLowerCase();
      gameInfo.game.agentList.forEach(ele => ele.toLowerCase());

      if (host === myAccount || gameInfo.game.agentList.indexOf(this.myAccount.address) !== -1) {
        return true;
      } else {
        return false;
      }
    },
    isWaiting(gameInfo) { return gameInfo.game.status == "0" ? true : false; },
    isWaitingFull(gameInfo) { return gameInfo.game.status == "0" && gameInfo.playerList.length >= gameInfo.game.playerCountMax ? true : false; },
    isPlaying(gameInfo) { return gameInfo.game.status == "1" ? true : false; },
    isEnd(gameInfo) { return gameInfo.game.status == "2" ? true : false; },
    filterGameStatus(status) {
      return status == "0" ? "대기중" 
        : status == "1" ? "게임중"
        : status == "2" ? "종료"
        : "-";
    },
    filterGameStatusColor(status) {
      return status == "0" ? "#ff0066" 
        : status == "1" ? "#fccb48"
        : status == "2" ? "#108c95"
        : "#ffffff";
    },
    filterComma(textNum) {
      return Number(textNum).toLocaleString();
    },
    async getMyAccountInfo() {
      const myAccount = await tokenService.getAccount();
      this.myAccount.address = myAccount;
    },    
  }
}
</script>

<style scoped>

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
