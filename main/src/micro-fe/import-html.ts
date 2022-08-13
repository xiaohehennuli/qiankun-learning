import { Apps } from "."
import { fetchRource } from "./utils"

interface ImportResult {
  template: HTMLDivElement
  getExternalScripts: () => Promise<any>
  execScripts: () => Promise<Pick<Apps, "bootstrap" | "mount" | "unmount">>
}

// 模仿qiankun import-html-entry包解析子应用html

export const importHtml = async (url: string): Promise<ImportResult> => {
  const template = document.createElement("div")
  const html = await fetchRource(url)
  template.innerHTML = html
  // 拿到其中所又的scrpit代码
  const scrpits = template.querySelectorAll("script")
  // 获取所有scripts标签代码：[代码，代码]
  const getExternalScripts = (): Promise<string[]> => {
    // 获取子应用的代码
    return Promise.all(
      Array.from(scrpits).map((scrpit) => {
        const src = scrpit.getAttribute("src")
        if (!src) {
          return Promise.resolve(scrpit.innerHTML)
        } else {
          return fetchRource(src.startsWith("http") ? src : `${url}${src}`)
        }
      })
    )
  }

  // 获取并执行所有的scripts脚本代码
  const execScripts = async () => {
    const scrpits = await getExternalScripts()
    console.log("scrpits", scrpits)
    // 构造CommonJS环境，配合打包UMd格式执行jS
    const module = { exports: {} }
    const exports = module.exports
    scrpits.forEach((scrpit) => {
      eval(scrpit)
    })
    return module.exports
  }
  return {
    template,
    getExternalScripts,
    execScripts,
  }
}
