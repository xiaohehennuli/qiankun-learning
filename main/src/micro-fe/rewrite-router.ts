import { handleRouter } from "./handle-router"

// 记录路由

let preRouter = "" //上一个路由
let nextRouter = window.location.pathname // 下一个路由

export const getPreRouter = () => preRouter

export const getNextRouter = () => nextRouter

// hash 路由变化 onhashChange
// history 路由
// 监听history理由replace，即替换
export const rewriteRouter = () => {
  // history.go history.back history.forward 使用popstate 监听
  window.addEventListener("popstate", () => {
    preRouter = nextRouter
    nextRouter = window.location.pathname
    handleRouter()
  })

  // history.pushState,history.replace需要通过函数重写的方式监听，因为原声没有提供方法监听

  // 监听pushState
  const rowRouterPushState = window.history.pushState
  window.history.pushState = (...args) => {
    preRouter = window.location.pathname
    rowRouterPushState.call(window.history, ...args)
    nextRouter = window.location.pathname
    handleRouter()
  }

  // 监听replaceState
  const rowRouterReplaceState = window.history.replaceState
  window.history.replaceState = (...args) => {
    preRouter = window.location.pathname
    rowRouterReplaceState.call(window.history, ...args)
    nextRouter = window.location.pathname

    handleRouter()
  }
}
