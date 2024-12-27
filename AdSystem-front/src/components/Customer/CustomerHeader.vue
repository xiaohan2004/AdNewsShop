<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {onMounted, ref} from "vue";
import api from "@/api/api"; // 导入 Element Plus 的提示组件

const router = useRouter()
const username = ref('用户') // Default value

// 跳转到个人信息页面
const goToPage = (path) => {
  router.push(path)
}

// 登出功能
const handleLogout = () => {
  localStorage.removeItem('jwt');
  // 重定向到登录页面
  router.push('/customer-login');
};

function parseJWT(token) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format');
  }

  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));

  return { header, payload };
}

const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem('jwt')
    if (!token) {
      throw new Error('No token found')
    }

    const { payload } = parseJWT(token)
    const customerId = payload.customerId

    const response = await api.get(`/api/customers/${customerId}`)
    if (response.data.code === 1) {
      const userData = response.data.data
      username.value = userData.name
    } else {
      throw new Error(response.data.msg || 'Failed to fetch user info')
    }
  } catch (err) {
    console.error('Error fetching user info:', err)
    ElMessage.error('获取用户信息失败')
  }
}

onMounted(() => {
  fetchUserInfo()
})

</script>

<template>
  <div class="header">
    <div style="width: 150px; text-align: center; font-weight: bold; color: dodgerblue;"></div>
    <div style="flex: 1;"></div>

    <div style="width: 100px;">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goToPage('/customer/customer-user')">个人信息</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  background-color: #ff9800; /* 橙黄色背景 */
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px); /* 波点背景 */
  background-size: 10px 10px; /* 控制波点大小 */
}

.el-dropdown-link:focus {
  outline: none;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

/* 按钮样式 */
.buttons {
  display: flex;
  justify-content: flex-start; /* 更紧凑的布局 */
  gap: 10px; /* 设置按钮之间的间距 */
  width: 130px; /* 可以适当缩小容器宽度 */
  margin-left: auto; /* 将按钮放置到右边 */
}

.circle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%; /* 圆形按钮 */
  background-color: #fff3e0; /* 淡黄色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #ff9800;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.circle-btn:hover {
  background-color: #ffe0b2; /* 悬停时稍微深一些的黄色 */
}
</style>
