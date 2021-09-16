Vue.component("app-footer", {
  template: '<div class="app-footer">\
                   <div class="btn prev" @click="handlePrev">返回</div>\
                    <div class="btn next"  @click="handleNext">下一步</div>\
                </div>',
  data: function () {
    return {};
  },
  created: function () {},
  methods: {
    handlePrev: function () {
      this.$emit("prev");
    },
    handleNext: function () {
      this.$emit("next");
    },
  },
});
