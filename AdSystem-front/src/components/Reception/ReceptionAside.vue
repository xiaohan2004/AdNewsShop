<template>
  <div class="sidebar">
    <el-menu default-active="1" class="el-menu-vertical-demo">
      <el-menu-item index="1" @click="goToPage('/reception/table-status')">餐桌状态</el-menu-item>
      <el-menu-item index="2" @click="goToPage('/reception/dish-status')">菜品状态</el-menu-item>
      <el-menu-item index="3" @click="goToPage('/reception/order-status')">订单状态</el-menu-item>
<!--      <el-sub-menu index="3">-->
<!--        <template #title>-->
<!--          用户管理-->
<!--        </template>-->
<!--        <el-menu-item index="3-1" @click="goToPage('/backstage/user-management-internalStaff')">内部人员</el-menu-item>-->
<!--        <el-menu-item index="3-2" @click="goToPage('/backstage/user-management-customers')">顾客</el-menu-item>-->
<!--      </el-sub-menu>-->
<!--      <el-sub-menu index="4" >-->
<!--        <template #title>-->
<!--          生成报表-->
<!--        </template>-->
<!--        <el-menu-item index="4-1" @click="goToPage('/backstage/report-generation-daily')">日结账单</el-menu-item>-->
<!--        <el-menu-item index="4-2" @click="goToPage('/backstage/report-generation-monthly')">月结账单</el-menu-item>-->
<!--        <el-menu-item index="4-3" @click="goToPage('/backstage/report-generation-yearly')">年结账单</el-menu-item>-->
<!--      </el-sub-menu>-->
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

