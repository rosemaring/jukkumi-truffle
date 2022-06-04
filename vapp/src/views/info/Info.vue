<template>
  <div style="padding-left: 15px; background-color: #000; height: 700px;">
    <div class="left" style="color: white; padding-top: 10px;">
      <h2 style="color: #ff0066;">내 주꾸미 정보</h2>
      <h4>살림망 주소<br>[{{ myAccount.address }}]</h4>
      <h3>안전한 주꾸미 300마리</h3>
      <h3>베팅된 주꾸미 200마리</h3>
      <button class="normal-button" @click="onClickPurchaseToken">구매</button>
      <button class="normal-button" @click="onClickPurchaseToken">보내기</button>
      <button class="normal-button" @click="onClickPurchaseToken">판매</button>
      <div style="margin-top: 30px;">
        <h2 style="color: #ff0066;">주꾸미 사용 내역</h2>
        <div style="height: 50px; line-height: 50px; display: flex; overflow-y: auto; height:330px;">
          <div style="width: 100%;">
            <div style="border: 1px solid #fff; text-align: left; margin-bottom: 5px;">
              <div style="padding-left: 15px; display: flex;">
                <h3 style="color: #ff0066; margin: 0px;">구매</h3>
                <div style="margin-left: 10px;">200쭈 -> 300쭈</div>
              </div>
            </div>
            <div style="border: 1px solid #fff; text-align: left; margin-bottom: 5px;">
              <div style="padding-left: 15px; display: flex;">
                <h3 style="color: #ff0066; margin: 0px;">구매</h3>
                <div style="margin-left: 10px;">200주꾸미 -> 현재 주꾸미 300마리</div>
              </div>
            </div>
            <div style="border: 1px solid #fff; text-align: left; margin-bottom: 5px;">
              <div style="padding-left: 15px; display: flex;">
                <h3 style="color: #ff0066; margin: 0px;">구매</h3>
                <div style="margin-left: 10px;">200주꾸미 -> 현재 주꾸미 300마리</div>
              </div>
            </div>
            <div style="border: 1px solid #fff; text-align: left; margin-bottom: 5px;">
              <div style="padding-left: 15px; display: flex;">
                <h3 style="color: #ff0066; margin: 0px;">구매</h3>
                <div style="margin-left: 10px;">200주꾸미 -> 현재 주꾸미 300마리</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right" style="color: white; padding-top: 10px;">
      <h2 style="color: #ff0066;">주꾸미 게임 내역</h2>
      <!-- height: 75px; line-height: 75px;  -->
      <div style="display: flex; padding: 10px;">
        <div style="width: 100%;">
          <div style="border: 1px solid #fff; text-align: left; margin-bottom: 5px;">
            <div style="display: flex;">
              <div style="text-align: center; width: 50px; padding: 15px 10px 0px 10px;">
                <h3 style="color: #ff0066;">대기중</h3>
              </div>
              <div style="flex-grow: 1;">
                <div style="padding-top: 5px; padding-bottom: 5px;">
                  [100/456] 게임제목<br>
                  <div style="font-size: 12px;">
                  - 호스트 : 0x2F9f3e88EF4940144Ad66c3820B8bBfa99502e71<br>
                  - 생성시간 : 2021-10-31 14:23<br>
                  - 참가비 100쭈 / 상금 456,000쭈<br>
                  - 최대 참가인원 456명, 예상 우승자 1명<br>
                  </div>
                </div>
              </div>   
            </div>
          </div>
          <div style="border: 1px solid #fff; text-align: left; margin-bottom: 5px;">
            <div style="display: flex;">
              <div style="text-align: center; width: 50px; padding: 15px 10px 0px 10px;">
                <h3 style="color: #ff0066;">게임중</h3>
              </div>
              <div style="flex-grow: 1;">
                <div style="padding-top: 5px; padding-bottom: 5px;">
                  [100/456] 게임제목<br>
                  <div style="font-size: 12px;">
                  - 호스트 : 0x2F9f3e88EF4940144Ad66c3820B8bBfa99502e71<br>
                  - 게임시간 : 2021-10-31 14:23 ~ <br>
                  - 참가비 100쭈 / 상금 456,000쭈<br>
                  - 최대 참가인원 456명, 예상 우승자 1명<br>
                  </div>
                </div>
              </div>   
            </div>
          </div>          
          <div style="border: 1px solid #fff; text-align: left; margin-bottom: 5px;">
            <div style="display: flex;">
              <div style="text-align: center; width: 50px; padding: 15px 10px 0px 10px;">
                <h3 style="color: #0000ff;">&nbsp;우승&nbsp;</h3>
              </div>
              <div style="flex-grow: 1;">
                <div style="padding-top: 5px; padding-bottom: 5px;">
                  [100/456] 승리<br>
                  <div style="font-size: 12px;">
                  - 호스트 : 0x2F9f3e88EF4940144Ad66c3820B8bBfa99502e71<br>
                  - 게임시간 : 2021-10-31 14:23 ~ <br>
                  - 참가비 100쭈 / 상금 456,000쭈<br>
                  - 최대 참가인원 456명, 예상 우승자 1명<br>
                  </div>
                </div>
              </div>   
            </div>
          </div>          
          <div style="border: 1px solid #fff; text-align: left; margin-bottom: 5px;">
            <div style="display: flex;">
              <div style="text-align: center; width: 50px; padding: 15px 10px 0px 10px;">
                <h3 style="color: #ff0000;">&nbsp;탈락&nbsp;</h3>
              </div>
              <div style="flex-grow: 1;">
                <div style="padding-top: 5px; padding-bottom: 5px;">
                  [100/456] 패<br>
                  <div style="font-size: 12px;">
                  - 호스트 : 0x2F9f3e88EF4940144Ad66c3820B8bBfa99502e71<br>
                  - 게임시간 : 2021-10-31 14:23 ~ <br>
                  - 참가비 100쭈 / 상금 456,000쭈<br>
                  - 최대 참가인원 456명, 예상 우승자 1명<br>
                  </div>
                </div>
              </div>   
            </div>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import tokenService from '@/services/tokenService';
import gameService from '@/services/gameService';

export default {
  components: { },
  data() {
    return {
      myAccount: { address: '' },
    }
  },  
  mounted() {
    this.getMyAccountInfo();
  },
  methods: {
    onClickPurchaseToken() {
      alert('asdf');
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
