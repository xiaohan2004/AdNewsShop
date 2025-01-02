<template>
  <div class="sidebar">
    <el-menu default-active="1" class="el-menu-vertical-demo">
      <el-menu-item index="1" @click="goToPage('/website-operator/revenue')">收益</el-menu-item>
      <el-menu-item index="2" @click="goToPage('/website-operator/api')">API管理</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    // 使用 router.push 实现路由跳转
    goToPage(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 17vw; /* 设置宽度为视口宽度的20% */
  height: calc(100vh - 50px); /* 减去导航栏高度 */
  background-color: #fff;
  border-right: 1px solid #ccc;
  overflow-y: auto;
}

.el-menu-vertical-demo {
  width: 100%;
}
</style>

