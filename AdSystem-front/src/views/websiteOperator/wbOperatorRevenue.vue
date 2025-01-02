<template>
  <div class="container mx-auto p-6 bg-gradient-to-r from-indigo-100 via-blue-100 to-indigo-200 min-h-screen">
    <div v-if="loading" class="text-center text-lg font-semibold text-indigo-600">加载中...</div>
    <div v-else-if="error" class="text-center text-lg font-semibold text-red-500">错误: {{ error }}</div>
    <div v-else-if="hasOperatorData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <!-- 网站 URL 卡片 -->
      <div class="bg-white shadow-xl rounded-lg p-6">
        <label class="block text-xl font-semibold text-indigo-600 mb-2">网站 URL:</label>
        <p class="text-lg text-gray-700">{{ operator.websiteUrl }}</p>
      </div>

      <!-- 请求次数 卡片 -->
      <div class="bg-white shadow-xl rounded-lg p-6">
        <label class="block text-xl font-semibold text-indigo-600 mb-2">请求次数:</label>
        <p class="text-lg text-gray-700">{{ operator.requesttimes }}</p>
      </div>

      <!-- 添加次数 卡片 -->
      <div class="bg-white shadow-xl rounded-lg p-6">
        <label class="block text-xl font-semibold text-indigo-600 mb-2">添加次数:</label>
        <p class="text-lg text-gray-700">{{ operator.addtimes }}</p>
      </div>

      <!-- 点击次数 卡片 -->
      <div class="bg-white shadow-xl rounded-lg p-6">
        <label class="block text-xl font-semibold text-indigo-600 mb-2">点击次数:</label>
        <p class="text-lg text-gray-700">{{ operator.clicktimes }}</p>
      </div>

      <!-- 总收益 卡片 -->
      <div class="bg-white shadow-xl rounded-lg p-6">
        <label class="block text-xl font-semibold text-indigo-600 mb-2">总收益:</label>
        <p class="text-lg text-indigo-700">¥{{ totalEarnings.toFixed(2) }}</p>
      </div>

      <!-- 收益明细 卡片 -->
      <div class="bg-white shadow-xl rounded-lg p-6">
        <label class="block text-xl font-semibold text-indigo-600 mb-2">收益明细:</label>
        <div class="h-72">
          <Pie :data="chartData" :options="chartOptions" />
        </div>
      </div>

    </div>
    <div v-else class="text-center text-lg font-semibold text-gray-600">未找到运营商信息</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import axios from 'axios'
import api from "@/api/api";

ChartJS.register(ArcElement, Tooltip, Legend)

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

onMounted(fetchOperator)

const earnings = computed(() => {
  if (!operator.value) return { request: 0, add: 0, click: 0 }
  return {
    request: operator.value.requesttimes * 0.5,
    add: operator.value.addtimes * 0.8,
    click: operator.value.clicktimes * 1
  }
})

const totalEarnings = computed(() => {
  return earnings.value.request + earnings.value.add + earnings.value.click
})

const chartData = computed(() => ({
  labels: ['请求收益', '添加收益', '点击收益'],
  datasets: [
    {
      data: [earnings.value.request, earnings.value.add, earnings.value.click],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.label || ''
          const value = context.raw || 0
          const percentage = ((value / totalEarnings.value) * 100).toFixed(2)
          return `${label}: ¥${value.toFixed(2)} (${percentage}%)`
        }
      }
    }
  }
}

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

/* Pie Chart container */
.h-72 {
  height: 18rem;
}

/* Centering content */
.text-center {
  text-align: center;
}

/* Grid layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}
</style>

