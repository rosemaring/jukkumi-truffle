<template>
  <div style="padding-left: 15px; background-color: #000; height: 700px;">
    <div style="text-align: center; background-color: #000; padding: 25px;">
      <h2 style="color: #ff0066;">기본 규칙</h2>
      <div style="color: white;">
        <h3>게임에 대한 기본 정보는 이더리움 네트워크에 모두 기록된다.</h3>
        <h4>제1항. 한번 시작된 게임은 종료할 수 없다.</h4>
        <h4>
          제2항. 게임의 운영권은 호스트와, 권한을 위임받은 에이전트들에게 있다.
        </h4>
        <h4>
          제3항. 주꾸미 게임에서는, 주꾸미 토큰을 사용하여 게임을 진행한다.
        </h4>
        <h4>
          게임이 종료되면 우승자들에게는 게임 호스트가 건 상금과 처음 참가자 수
          × 참가비를 더한 토큰이 지급된다.
        </h4>
        <hr />
        <h4>
          게임 진행을 위해, 메타마스크 확장 프로그램을 설치하고 지갑에
          로그인하십시오.
          <a href="javascript:void(0);" @click="clickMetamaskLink">[설치]</a>
        </h4>
        <hr />
        <div style="text-align: center;">
          <h2>메타마스크 - {{ address ? "연동됨" : "연결되지 않음" }}</h2>
          <h3 v-if="address">메타마스크 주소 : [{{ address }}]</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tokenService from "../../services/tokenService";

export default {
  name: "home",
  components: {},
  data() {
    return {
      myAccount: { address: "" },
    };
  },
  mounted() {
    this.getMyAccountInfo();
  },
  computed: {
    address() {
      return this.myAccount.address;
    },
  },
  methods: {
    async getMyAccountInfo() {
      await window.ethereum.enable();
      const myAccount = await tokenService.getAccount();
      this.myAccount.address = myAccount;
    },
    clickMetamaskLink() {
      window.open("https://metamask.io/download");
    },
  },
};
</script>

<style></style>
