<template>
  <div>
    <!-- 广告信息列表 -->
    <el-table :data="paginatedAdvertisementData" style="width: 100%" stripe>
      <el-table-column label="广告编号" prop="id" width="120" align="left">
        <template #default="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标题" prop="title" min-width="120" align="left">
        <template #default="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="请求次数" prop="requesttimes" width="100" align="center">
        <template #default="{ row }">
          <span>{{ row.requesttimes }}</span>
        </template>
      </el-table-column>

      <el-table-column label="点击次数" prop="clicktimes" width="280" align="center">
        <template #default="{ row }">
          <span>{{ row.clicktimes }}</span>
        </template>
      </el-table-column>

      <el-table-column label="请求/点击比例" min-width="200" align="center">
        <template #default="{ row }">
          <div class="chart-container" style="width: 250px; height: 100px;">
            <canvas :ref="el => { if (el) chartRefs[row.id] = el }"></canvas>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div class="pagination-container">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="advertisementData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { ElMessage } from 'element-plus'
import api from "@/api/api"
import Chart from 'chart.js/auto'

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
  name: "AdvertisementManagement",
  setup() {
    const advertisementData = ref([])
    const isLoading = ref(false)
    const currentPage = ref(1)
    const pageSize = ref(7)
    const chartRefs = ref({})
    const charts = ref({})

    const filteredAdvertisementData = computed(() => advertisementData.value)
    const paginatedAdvertisementData = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value
      const end = start + pageSize.value
      return filteredAdvertisementData.value.slice(start, end)
    })

    const fetchAdvertisementData = async () => {
      try {
        const token = localStorage.getItem('jwt')
        if (!token) {
          throw new Error('No token found')
        }

        const {payload} = parseJWT(token)
        const id = payload.id

        const response = await api.get(`/api/advertisements/advertiser/${id}`)

        if (response.data.code === 1) {
          advertisementData.value = Array.isArray(response.data.data)
              ? response.data.data
              : [response.data.data];
          console.log('Total advertisements:', advertisementData.value.length);
        } else {
          throw new Error('Failed to fetch data')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        ElMessage.error('获取广告数据失败')
      }
    }

    const renderCharts = () => {
      Object.values(charts.value).forEach(chart => chart.destroy())
      charts.value = {}

      paginatedAdvertisementData.value.forEach(row => {
        const canvas = chartRefs.value[row.id]
        if (canvas) {
          const ctx = canvas.getContext('2d')
          const data = [row.requesttimes, row.clicktimes]

          charts.value[row.id] = new Chart(ctx, {
            type: 'pie',
            data: {
              labels: ['请求次数', '点击次数'],
              datasets: [{
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB'],
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: 'right',
                  labels: {
                    generateLabels: (chart) => {
                      const datasets = chart.data.datasets;
                      return chart.data.labels.map((label, i) => {
                        const meta = chart.getDatasetMeta(0);
                        const style = meta.controller.getStyle(i);
                        const value = datasets[0].data[i];
                        return {
                          text: `${label}: ${value}`,
                          fillStyle: style.backgroundColor,
                          strokeStyle: style.borderColor,
                          lineWidth: style.borderWidth,
                          hidden: isNaN(value) || value === 0,
                          index: i
                        };
                      });
                    }
                  }
                },
                tooltip: {
                  enabled: false
                }
              }
            }
          })
        }
      })
    }

    const handleSizeChange = (val) => {
      pageSize.value = val
      currentPage.value = 1
    }

    const handleCurrentChange = (val) => {
      currentPage.value = val
    }

    watch([paginatedAdvertisementData, currentPage, pageSize], () => {
      nextTick(() => {
        renderCharts()
      })
    })

    onMounted(() => {
      fetchAdvertisementData()
    })

    return {
      advertisementData,
      paginatedAdvertisementData,
      isLoading,
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
      chartRefs,
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


<style scoped>
.el-table {
  width: 100%;
}

.el-select {
  width: 120px;
  margin-right: 10px;
}

.el-button {
  height: 36px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style>
