import { Apps, getApp } from "./index"
import { importHtml } from "./import-html"
import { getNextRouter, getPreRouter } from "./rewrite-router"

// 处理路由变换逻辑即匹配子应用

export const handleRouter = async () => {
  const apps = getApp()
  // 卸载之前的子应用

  // 获取上一个子应用
  const preApp = apps.find((app) => getPreRouter().startsWith(app.activeRule))

  // const nextApp = apps.find((app) => getNextRouter().startsWith(app.activeRule))

  // 如果有上一个应用
  if (preApp) {
    await unmount(preApp)
  }

  const app = apps.find((app) =>
    window.location.pathname.startsWith(app.activeRule)
  )

  // 如果没找到匹配的资源就不处理任何逻辑
  if (!app) {
    return
  }
  // 加载子应用
  // 因为浏览器安全问题 innerHTML不会加载里面的srcipt的脚本，所以直接innerHTML不能渲染视图
  // 如果找到了就拿到对应的html，并渲染到指定容器

  const { template, execScripts } = await importHtml(app.entry)
  const container = document.querySelector(app.container)
  container?.appendChild(template)

  //渲染子应用

  // 配置全局变量，让子应用在qiankun中运行
  window.__POWERED_BY_QIANKUN__ = true

  //执行子应用代码
  const appExports = await execScripts()

  app.bootstrap = appExports.bootstrap
  app.mount = appExports.mount
  app.unmount = appExports.unmount

  // 运行生命周期
  await bootstrap(app)
  await mount(app)
  await unmount(app)
}

async function bootstrap(app: Apps) {
  app.bootstrap && (await app.bootstrap())
}

async function mount(app: Apps) {
  app.mount &&
    (await app.mount({
      container: document.querySelector(app.container),
    }))
}

async function unmount(app: Apps) {
  app.unmount &&
    (await app.unmount({
      container: document.querySelector(app.container),
    }))
}
