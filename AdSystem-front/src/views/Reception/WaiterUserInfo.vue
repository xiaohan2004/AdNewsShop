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

<!--可编辑版-->
<!--<template>-->
<!--  <div>-->
<!--    <el-descriptions title="个人信息" border>-->
<!--      <el-descriptions-item-->
<!--          :rowspan="2"-->
<!--          :width="140"-->
<!--          label="头像"-->
<!--          align="center"-->
<!--      >-->
<!--        <el-image-->
<!--            style="width: 100px; height: 100px"-->
<!--            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"-->
<!--        />-->
<!--      </el-descriptions-item>-->

<!--      &lt;!&ndash; 用户编号 &ndash;&gt;-->
<!--      <el-descriptions-item label="用户编号">-->
<!--        <span v-if="!editable">{{ userInfo.userId }}</span>-->
<!--        <el-input v-else v-model="userInfo.userId" size="small" />-->
<!--      </el-descriptions-item>-->

<!--      &lt;!&ndash; 用户名 &ndash;&gt;-->
<!--      <el-descriptions-item label="用户名">-->
<!--        <span v-if="!editable">{{ userInfo.username }}</span>-->
<!--        <el-input v-else v-model="userInfo.username" size="small" />-->
<!--      </el-descriptions-item>-->

<!--      &lt;!&ndash; 身份 &ndash;&gt;-->
<!--      <el-descriptions-item label="身份">-->
<!--        <span v-if="!editable">{{ userInfo.role }}</span>-->
<!--        <el-select v-else v-model="userInfo.role" size="small" disabled={!editable}>-->
<!--          <el-option label="管理员" value="管理员" />-->
<!--          <el-option label="用户" value="用户" />-->
<!--        </el-select>-->
<!--      </el-descriptions-item>-->

<!--      &lt;!&ndash; 状态 &ndash;&gt;-->
<!--      <el-descriptions-item label="状态">-->
<!--        <el-tag size="small" :type="userInfo.status === '启用' ? 'success' : 'danger'">-->
<!--          {{ userInfo.status }}-->
<!--        </el-tag>-->
<!--      </el-descriptions-item>-->

<!--      &lt;!&ndash; 个人简介 &ndash;&gt;-->
<!--      <el-descriptions-item label="个人简介" align="center">-->
<!--        <span v-if="!editable">{{ userInfo.bio }}</span>-->
<!--        <el-input v-else v-model="userInfo.bio" type="textarea" rows="4" size="small" />-->
<!--      </el-descriptions-item>-->
<!--    </el-descriptions>-->

<!--    &lt;!&ndash; 编辑和完成按钮 &ndash;&gt;-->
<!--    <div style="margin-top: 20px; text-align: center;">-->
<!--      <el-button v-if="!editable" type="primary" @click="editInfo">编辑</el-button>-->
<!--      <el-button v-if="editable" type="success" @click="saveInfo">完成</el-button>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      editable: false, // 用于控制是否处于编辑状态-->
<!--      userInfo: {-->
<!--        userId: "01",-->
<!--        username: "用户1",-->
<!--        role: "管理员",-->
<!--        status: "启用",-->
<!--        bio: "你好！",-->
<!--      },-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    // 编辑按钮点击时，切换到编辑状态-->
<!--    editInfo() {-->
<!--      this.editable = true;-->
<!--    },-->
<!--    // 完成按钮点击时，保存信息并切换回不可编辑状态-->
<!--    saveInfo() {-->
<!--      this.editable = false;-->
<!--      // 在这里可以进行数据保存操作，例如提交到后端等-->
<!--      console.log("保存的数据：", this.userInfo);-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--/* 自定义样式 */-->
<!--.el-descriptions-item {-->
<!--  font-size: 14px;-->
<!--}-->
<!--</style>-->
