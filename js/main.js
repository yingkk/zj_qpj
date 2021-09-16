new Vue({
  el: "#main",
  data: function () {
    return {
      idCardNum: "",
      cardInfo: null,
      phoneNum: "",
      count: 0,
      step: 1,
      seconds: 5,
      times: null,
      successData: null,
      errMsg: "",
      isPhoneErr: false,
      isLoading: false,
      state: null,
      loop: 5,
    };
  },
  created: function () {
    // 读卡器连接
    this.connect();
  },
  methods: {
    connect: function () {
      var _this = this;
      createConnect(
        function (res) {
          _this.times = setInterval(_this.handleReadCardInfo, 2000);
        },
        function (err) {
          if (_this.loop > 0) {
            _this.connect();
            --_this.loop;
          } else {
            console.log(err);
            _this.loop = 5;
            _this.$message.error(err);
          }
        }
      );
    },
    handlePrev: function () {
      this.step = this.step - 1;
      !this.step ? (window.location.href = "./index.html") : null;
    },
    handleNext: function () {
      if (this.step === 1 && !this.idCardNum) {
        return;
      }
      if (this.step === 2 && !this.phoneNum) {
        return;
      }
      var step = this.step + 1;
      if (step === 3) {
        var _this = this;
        this.isLoading = true;
        this.cardInfo['phone'] = this.phoneNum;
        this.cardInfo['childNum'] = this.count;
        saveAppointInfo(
          this.cardInfo,
          function (data) {
            _this.isLoading = false;
            _this.successData = data.data;
            _this.state = +data.state;
            _this.step = step;
            setInterval(_this.handleSecondsMinus, 1000);
          },
          function (errMsg) {
            _this.isLoading = false;
            _this.errMsg = errMsg;
            _this.step = step;
            setInterval(_this.handleSecondsMinus, 1000);
          }
        );
      } else {
        this.step = step;
      }
    },
    handleMinus: function () {
      this.count = this.count ? this.count - 1 : 0;
    },
    handlePlus: function () {
      this.count = this.count === 3 ? this.count : this.count + 1;
    },
    handleReadCardInfo: function () {
      var _this = this;
      getCardInfo(
        function (res) {
          const originCardInfo = res.resultContent;
          _this.cardInfo = {
            name: originCardInfo.partyName,
            idCard: originCardInfo.certNumber,
          };
          _this.idCardNum = originCardInfo.certNumber;
          clearInterval(_this.times);
          // 断开连接
          disConnect(
            function (res) {
              console.log("disconnect success");
            },
            function (err) {
              console.log("disconnect failed");
            }
          );
        },
        function (err) {
          _this.$message.error("身份证信息读取失败！");
        }
      );

      // todo test
      // this.cardInfo = {
      //   name: "张三",
      //   idCard: "15030319520807254X"
      // };
      // clearInterval(this.times);
    },
    handleClick: function (e) {
      if (e.target.tagName !== "LI") return;
      var val = e.target.dataset.value;
      var optionsMap = {
        DELETE: this.deleteNumber,
        SURE: this.sureNumber,
      };
      optionsMap[val] && optionsMap[val]();
      optionsMap[val] || this.addNumber(val);
    },
    addNumber: function (val) {
      this.isPhoneErr = false;
      if (this.phoneNum.length === 11) return;
      this.phoneNum += val;
    },
    deleteNumber: function () {
      this.isPhoneErr = false;
      this.phoneNum = this.phoneNum.replace(/\d{1}$/, "");
    },
    isPhoneNumber: function (str) {
      // /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      return /^1[0-9]{10}$/.test(str);
    },
    showErrorInfo: function () {
      this.isPhoneErr = true;
      // this.phoneNum = "";
    },
    sureNumber: function () {
      if (!this.isPhoneNumber(this.phoneNum)) {
        this.showErrorInfo();
        return;
      }
      this.handleNext();
    },
    handleOver: function () {
      window.location.href = "./index.html";
    },
    handleSecondsMinus: function () {
      if (!this.seconds) {
        this.handleOver();
        return;
      }
      this.seconds = this.seconds - 1;
    },
  },
});
