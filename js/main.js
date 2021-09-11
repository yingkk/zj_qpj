new Vue({
  el: "#main",
  data: function () {
    return {
      idCardNum: "32010219980421332X",
      cardInfo: null,
      phoneNum: "",
      count: 0,
      step: 1,
      seconds: 5,
      times: null,
      successData: null,
      errMsg: "",
      isPhoneErr: false
    };
  },
  mounted: function () {
    this.times = setInterval(this.handleReadCardInfo, 500);
  },
  created: function () {

  },
  methods: {
    handlePrev: function () {
      this.step = this.step - 1;
      !this.step ? (window.location.href = "../index.html") : null;
    },
    handleNext: function () {
      if (this.step === 1 && !this.idCardNum) {
        return;
      }
      if (this.step === 2 && !this.phoneNum) {
        return;
      }
      this.step = this.step + 1;
      if (this.step === 3) {
        saveAppointInfo(
          this.cardInfo,
          function (data) {
            this.successData = data;
          },
          function (errMsg) {
            this.errMsg = errMsg;
          }
        );
      }
    },
    handleMinus: function () {
      this.count = this.count ? this.count - 1 : 0;
    },
    handlePlus: function () {
      this.count = this.count === 3 ? this.count : this.count + 1;
    },
    handleReadCardInfo: function () {
      // const CardInfoOrigin = document.getElementById("idCard");
      // const result = CardInfoOrigin.ReadCard();
      // if (result === "0") {
      //   this.cardInfo = {
      //     name: CardInfoOrigin.Name,
      //     sex: CardInfoOrigin.Sex,
      //     cardNum: CardInfoOrigin.CardNo,
      //   };
      //   this.idCardNum = CardInfoOrigin.CardNo;
      //   clearInterval(this.times);

      // test
      this.cardInfo = {
        name: "张三",
        idCard: "32010219980421332X",
        childNum: this.count,
        phone: this.phoneNum
      };
    },
    handleClick: function (e) {
      if (e.target.tagName !== 'LI') return;
      const val = e.target.dataset.value;
      const optionsMap = {
        DELETE: this.deleteNumber,
        SURE: this.sureNmber,
      };
      optionsMap[val] && optionsMap[val]();
      optionsMap[val] || this.addNumber(val);
    },
    addNumber(val) {
      this.isPhoneErr = false;
      if (this.phoneNum.length === 11) return;
      this.phoneNum += val;
    },
    deleteNumber() {
      this.isPhoneErr = false;
      this.phoneNum = this.phoneNum.replace(/\d{1}$/, "");
    },
    isPhoneNumber(str) {
      // /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      return /^1[0-9]{10}$/.test(str);
    },
    showErrorInfo() {
      this.isPhoneErr = true
      // this.phoneNum = "";
    },
    sureNmber() {
      if (!this.isPhoneNumber(this.phoneNum)) {
        this.showErrorInfo();
        return;
      }
      this.handleNext();
    },
    handleOver: function () {
      window.location.href = "../index.html";
    },
    handleSecondsMinus() {
      if (!this.seconds) {
        this.handleOver();
        return;
      }
      this.seconds = this.seconds - 1;
    },
  },
});
