<template>
  <div class="container mx-auto p-6 bg-gradient-to-r from-indigo-100 via-blue-100 to-indigo-200 min-h-screen">
    <div v-if="loading" class="text-center text-lg font-semibold text-indigo-600">加载中...</div>
    <div v-else-if="error" class="text-center text-lg font-semibold text-red-500">错误: {{ error }}</div>
    <div v-else-if="hasOperatorData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 网站 URL 卡片 -->
      <div class="bg-white shadow-xl rounded-lg p-6">
        <label class="block text-xl font-semibold text-indigo-600 mb-2">token</label>
        <p class="text-lg text-gray-700">{{ operator.token || '暂无' }}</p> <!-- 显示 "暂无" 如果 token 不存在 -->
      </div>

      <!-- 按钮区域 -->
      <div class="col-span-full flex justify-center space-x-8 mt-6">
        <button @click="updateOperator" class="btn-main">
          更新token
        </button>
        <button @click="deleteOperator" class="btn-danger">
          删除token
        </button>
      </div>
    </div>
    <div v-else class="text-center text-lg font-semibold text-gray-600">未找到运营商信息</div>
    <div class="text-center text-lg font-semibold text-gray-600">
      <a href="http://10.100.164.44:8888/js/example.js" class="text-indigo-700">示例代码</a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from "@/api/api"

const operator = ref(null)
const loading = ref(true)
const error = ref(null)

function parseJWT(token) {
  const parts = token.split('.')
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format')
  }

  const header = JSON.parse(atob(parts[0]))
  const payload = JSON.parse(atob(parts[1]))

  return { header, payload }
}

const fetchOperator = async () => {
  try {
    const token = localStorage.getItem('jwt')
    if (!token) {
      throw new Error('未找到令牌')
    }

    const { payload } = parseJWT(token)
    const id = payload.id

    const response = await api.get(`/api/website-operators/${id}`)
    if (response.data.code === 1 && response.data.data) {
      operator.value = response.data.data
    } else {
      throw new Error(response.data.message || '获取运营商数据失败')
    }
  } catch (err) {
    console.error('Error fetching operator data:', err)
    error.value = err.response ? `服务器错误: ${err.response.status}` : err.message
  } finally {
    loading.value = false
  }
}

const updateOperator = async () => {
  try {
    loading.value = true
    const token = localStorage.getItem('jwt')
    if (!token) {
      throw new Error('未找到令牌')
    }

    const { payload } = parseJWT(token)
    const id = payload.id

    const response = await api.get(`/api/website-operators/token/${id}`)
    if (response.data.code === 1 && response.data.data) {
      operator.value.token = response.data.data
      alert('更新成功')
    } else {
      throw new Error(response.data.message || '更新运营商数据失败')
    }
  } catch (err) {
    console.error('Error updating operator data:', err)
    error.value = err.response ? `服务器错误: ${err.response.status}` : err.message
  } finally {
    loading.value = false
  }
}

const deleteOperator = async () => {
  if (!confirm('确定要清除运营商数据吗？此操作不可逆。')) {
    return
  }

  try {
    loading.value = true
    const token = localStorage.getItem('jwt')
    if (!token) {
      throw new Error('未找到令牌')
    }

    const { payload } = parseJWT(token)
    const id = payload.id

    const response = await api.delete(`/api/website-operators/token/${id}`)
    if (response.data.code === 1) {
      // 只将 token 设置为 null, 而不是删除整个 operator 对象
      if (operator.value) {
        operator.value.token = null
      }
      alert('清除成功')
    } else {
      throw new Error(response.data.message || '清除运营商数据失败')
    }
  } catch (err) {
    console.error('Error deleting operator data:', err)
    error.value = err.response ? `服务器错误: ${err.response.status}` : err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchOperator)

const hasOperatorData = computed(() => {
  return operator.value && Object.keys(operator.value).length > 0
})
</script>

<style scoped>
/* Container and Card Styling */
.container {
  background: linear-gradient(to right, #e0f7fa, #b3e5fc);
}

.bg-white {
  background-color: #fff;
}
.shadow-xl {
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
}
.rounded-lg {
  border-radius: 10px;
}
.p-6 {
  padding: 1.5rem;
}

/* Label and Text */
.text-indigo-600 {
  color: #5c6bc0;
}
.text-indigo-700 {
  color: #3f51b5;
}
.text-lg {
  font-size: 1.125rem;
}
.text-gray-700 {
  color: #424242;
}

/* Centering content */
.text-center {
  text-align: center;
}

/* Button Styles */
.btn-main {
  background-color: #4f46e5; /* Indigo */
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem; /* Larger padding for bigger buttons */
  font-size: 1.125rem; /* Larger text size */
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  border: none;
}

.btn-main:hover {
  background-color: #4338ca;
}

.btn-danger {
  background-color: #dc2626; /* 红色背景 */
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem; /* 更大的按钮内边距 */
  font-size: 1.125rem; /* 更大的文字大小 */
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  border: none;
}

.btn-danger:hover {
  background-color: #b91c1c; /* 鼠标悬停时稍微深一点的红色 */
}


/* Grid layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.grid-cols-1 {
  grid-template-columns: 1fr;
}
@media (min-width: 1024px) {
  .lg\:grid-cols-2 {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

