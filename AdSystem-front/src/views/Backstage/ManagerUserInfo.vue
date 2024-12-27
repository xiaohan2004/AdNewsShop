<template>
  <div class="user-profile">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="image" style="width: 100px; height: 100px" />
        <el-skeleton-item variant="p" style="width: 250px" />
        <el-skeleton-item variant="text" style="width: 100px" />
        <el-skeleton-item variant="text" style="width: 100px" />
      </template>

      <template #default>
        <el-descriptions v-if="userInfo" title="个人信息" border>
          <el-descriptions-item :rowspan="2" :width="140" label="头像" align="center">
            <el-image
                style="width: 100px; height: 100px"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                fit="cover"
            />
          </el-descriptions-item>
          <el-descriptions-item label="用户编号">{{ userInfo.id }}</el-descriptions-item>
          <el-descriptions-item label="用户名">{{ userInfo.username }}</el-descriptions-item>
          <el-descriptions-item label="身份">{{ userInfo.role }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag size="small" :type="userInfo.status === '启用' ? 'success' : 'danger'">
              {{ userInfo.status }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="个人简介" align="center">
            热爱工作，积极向上。
          </el-descriptions-item>
        </el-descriptions>
      </template>
    </el-skeleton>

    <el-alert
        v-if="error"
        :title="error"
        type="error"
        :closable="false"
        show-icon
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import api from '@/api/api'

function parseJWT(token) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format');
  }

  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));

  return { header, payload };
}

export default {
  name: 'UserProfile',
  setup() {
    const userInfo = ref(null)
    const loading = ref(true)
    const error = ref(null)

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
          userInfo.value = {
            id: userData.userId,
            username: userData.username,
            role: userData.role === 0 ? '管理员' : '服务员',
            status: userData.status === 0 ? '禁用' : '启用'
          }
        } else {
          throw new Error(response.data.msg || 'Failed to fetch user info')
        }
      } catch (err) {
        console.error('Error fetching user info:', err)
        error.value = '获取用户信息失败'
        ElMessage.error('获取用户信息失败')
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchUserInfo()
    })

    return {
      userInfo,
      loading,
      error
    }
  }
}
</script>

