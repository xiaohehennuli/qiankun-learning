import Vue from "vue"
import App from "./App.vue"
import router from "./router"
// import { registerMicroApps, start } from "qiankun"
import { registerMicroApps, start } from "./micro-fe"

Vue.config.productionTip = false

registerMicroApps([
  {
    name: "app react", // app name registered
    entry: "http://localhost:3000",
    container: "#qiankun-container",
    activeRule: "/appReact",
  },
  {
    name: "app vue2",
    entry: "http://localhost:8080",
    container: "#qiankun-container",
    activeRule: "/appVue2",
  },
  {
    name: "app vue3",
    entry: "http://localhost:8081",
    container: "#qiankun-container",
    activeRule: "/appVue3",
  },
])

start()

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
