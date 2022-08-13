<template>
  <div id="app">
    <div class="app-menu">
      <router-link to="/appReact">AppReact</router-link>
      <router-link to="/appVue2">AppVue2</router-link>
      <router-link to="/appVue3">AppVue3</router-link>
    </div>
    <div class="app-main">
      <div id="qiankun-container"></div>
    </div>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  color: #2c3e50;
}
#qiankun-container {
  height: 100vh;
  width: 100vw;
}

.app-main {
}

.app-menu {
  flex: 1;
  background: black;
  height: 100vh;
}
</style>
