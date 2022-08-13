// 获取子应用代码

export const fetchRource = (url: string) => fetch(url).then((res) => res.text())
