import Vue from "vue";
import App from "./App.vue";
import localization from "./localization";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  i18n: localization,
  data: {
    data: [],
  },
}).$mount("#app");
