import "./public-path"
import Vue from "vue"
import App from "./App.vue"
Vue.config.productionTip = false

let instance = null
function render(props = {}) {
  const { container } = props

  instance = new Vue({
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app")
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// 导出必要的生命周期函数
// 1.bootstrap 渲染之前
// 2.mount 渲染函数
// 3.写在函数

// 生命周期函数必须返回promise

export async function bootstrap() {
  console.log("[vue] vue app bootstraped")
}
export async function mount(props) {
  console.log("[vue] props from main framework", props)
  render(props)
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ""
  instance = null
}
