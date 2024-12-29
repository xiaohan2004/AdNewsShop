<template>
  <div class="sidebar">
    <el-menu default-active="1" class="el-menu-vertical-demo">
      <el-menu-item index="1" @click="goToPage('/admin/dash-board')">仪表盘</el-menu-item>
      <el-menu-item index="2" @click="goToPage('/admin/ad-management')">广告管理</el-menu-item>
      <el-menu-item index="3" @click="goToPage('/admin/user-management')">浏览者管理</el-menu-item>
      <el-sub-menu index="4">
        <template #title>
          用户管理
        </template>
        <el-menu-item index="4-1" @click="goToPage('/admin/administrator-management')">管理员</el-menu-item>
        <el-menu-item index="4-2" @click="goToPage('/admin/advertisers-management')">广告商</el-menu-item>
        <el-menu-item index="4-3" @click="goToPage('/admin/website-operator-management')">网站站长</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="5" @click="goToPage('/admin/system-log')">系统日志</el-menu-item>
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
