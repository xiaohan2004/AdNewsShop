<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import {onMounted, ref} from "vue";
import api from "@/api/api";
import {ElMessage} from "element-plus";

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
  router.push('/internalStaff-login');
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
    const userId = payload.userId

    const response = await api.get(`/api/users/${userId}`)
    if (response.data.code === 1) {
      const userData = response.data.data
      username.value = userData.username
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
  <div style="height: 50px; border-bottom: 1px solid #ccc; display: flex; align-items: center;">
    <div style="width: 150px; text-align: center; font-weight: bold; color: dodgerblue;">前台管理</div>
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
            <el-dropdown-item @click="goToPage('/reception/waiter-user')">个人信息</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.el-dropdown-link:focus {
  outline: none;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>