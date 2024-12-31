<template>
  <div id="app">
    <NavBar />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <AdComponent/>
    <FooterComponent />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import AdComponent from '@/components/AdComponent.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    FooterComponent,
    AdComponent
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-bottom: 60px; /* 为页脚留出空间 */
}

/* 全局样式 */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

a {
  color: #3498db;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  cursor: pointer;
}
</style>

