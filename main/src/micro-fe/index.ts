import { rewriteRouter } from "./rewrite-router"
import { handleRouter } from "./handle-router"

export interface Apps {
  name: string
  entry: string
  container: string
  activeRule: string
  bootstrap?: () => void
  mount?: (props: { container: HTMLElement | null }) => void
  unmount?: (props: { container: HTMLElement | null }) => void
}

export const getApp = () => _apps

let _apps: Apps[] = []

export const registerMicroApps = (apps: Apps[]) => {
  _apps = apps
}

// 开启微应用
export const start = () => {
  // 微前端的运行原理
  // 1. 监听路由变化
  rewriteRouter()
  // 2. 根据路由变化匹配子应用
  handleRouter()
  // 3. 加载子应用
  // 4. 渲染子应用
}
