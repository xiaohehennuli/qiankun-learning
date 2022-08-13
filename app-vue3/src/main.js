import Vue from "vue"
import App from "./App.vue"

Vue.config.productionTip = false

let instance = null

function render(props = {}) {
  const { container } = props
  console.log("container", container)
  // 乾坤会把子应用的html 渲染到主应用的指定容器下面,所以要用container，来做一个隔离，以免ID冲突
  // 当没有container，及不在qiankun环境下运行，和起初以一样
  instance = new Vue({
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app")
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
// 暴露三个生命周期函数提供给qiankun
// 1.bootstrap 渲染前函数
// 2.mount 渲染函数
// 3.unmounted 卸载函数

// 生命周期函数必须返回promise

export async function bootstrap() {
  console.log("[vue] vue app bootstraped")
}
export async function mount(props) {
  render(props)
}
export async function unmount() {
  console.log("instance", instance)
  instance.$destroy()
  instance.$el.innerHTML = ""
  instance = null
}
