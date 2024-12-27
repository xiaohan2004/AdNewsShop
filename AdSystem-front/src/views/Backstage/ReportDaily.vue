<template>
  <div>
    <!-- 筛选功能 -->
    <div style="margin-bottom: 16px; display: flex; justify-content: space-between;">
      <!-- 日期选择器 -->
      <div style="flex: 1; display: flex; gap: 16px;">
        <el-date-picker
            v-model="selectedDate"
            type="month"
            placeholder="选择年月"
            style="width: 200px;"
            @change="filterData"
        />
      </div>

      <!-- 导出按钮 -->
      <div style="display: flex; gap: 16px;">
        <el-button type="primary" @click="submitData">导出</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
        :data="filteredDailyData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        border
        style="width: 100%; height: 100%; overflow: auto;"
    >
      <!-- 列：报表编号 -->
      <el-table-column label="报表编号" prop="reportId" />
      <!-- 列：日期 -->
      <el-table-column label="日期" prop="date" />
      <!-- 列：总销售额 -->
      <el-table-column label="总销售额" prop="totalSales" />
      <!-- 列：总订单数 -->
      <el-table-column label="总订单数" prop="totalOrders" />
      <!-- 列：总账单数 -->
      <el-table-column label="总账单数" prop="totalBills" />
    </el-table>

    <!-- 分页 -->
    <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="filteredDailyData.length"
        layout="total, prev, pager, next, jumper"
        @current-change="handlePageChange"
        class="pagination"
    />
  </div>
</template>

<script>

import axios from "axios";
import api from "@/api/api";

export default {
  name: "daily",
  data() {
    return {
      selectedDate: null,  // 当前选中的状态筛选
      dailyData: [],  // 存储从后端获取的用户数据
      currentPage: 1,  // 当前页码，初始化为第一页
      pageSize: 10,    // 每页显示的数据条数，初始化为10
    };
  },
  computed: {
    // 根据选择的年月过滤数据
    filteredDailyData() {
      if (!this.selectedDate) return this.dailyData; // 如果未选择日期，显示全部数据

      // 将 selectedDate 转换为 yyyy-MM 格式
      const year = this.selectedDate.getFullYear();
      const month = String(this.selectedDate.getMonth() + 1).padStart(2, "0"); // 月份需要 +1，因为 getMonth() 从 0 开始
      const selectedYearMonth = `${year}-${month}`;

      return this.dailyData.filter(row => {
        const rowYearMonth = row.date.slice(0, 7); // 提取数据的年月
        return rowYearMonth === selectedYearMonth; // 比较
      });
    },
  },

  methods: {
    // 导出数据逻辑
    submitData() {
      console.log("导出的数据：", this.filteredDailyData);
    },
    // 翻页逻辑
    handlePageChange(page) {
      this.currentPage = page; // 更新当前页
    },
    // 当日期选择器变化时的逻辑
    filterData() {
      this.currentPage = 1; // 切换日期后，将页码重置为第一页
    },
    // 获取数据
    fetchDailyData() {
      api.get('/api/daily-reports')  // 替换为你的后端接口地址
          .then(response => {
            if (response.data.code === 1) {
              this.dailyData = response.data.data.map(daily => {
                return {
                  reportId: daily.reportId,
                  date: daily.date,
                  totalSales: daily.totalSales,
                  totalOrders: daily.totalOrders,
                  totalBills: daily.totalBills,
                };
              });
            } else {
              console.error('Failed to fetch data');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
  },

  created() {
    this.fetchDailyData();  // 页面创建时加载数据
  },
};
</script>


<style scoped>
/* 表格样式 */
.el-table {
  width: 100% !important;
  height: 100% !important;
}

/* 表格内容最大高度，支持滚动 */
.el-table__body-wrapper {
  max-height: calc(100vh - 150px);
  overflow: auto;
}

/* 日期选择器样式 */
.el-date-picker {
  width: 200px !important;
}

/* 按钮样式 */
.el-button {
  height: 36px;
}

/* 分页样式 */
.el-pagination {
  margin-top: 20px;
}
</style>
