<template>
  <div>
    <!-- 筛选功能 -->
    <div style="margin-bottom: 16px; display: flex; justify-content: space-between;">
      <!-- 日期选择器 -->
      <div style="flex: 1; display: flex; gap: 16px;">
        <el-date-picker
            v-model="selectedDate"
            type="year"
            placeholder="选择年份"
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
        :data="filteredMonthlyData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        border
        style="width: 100%; height: 100%; overflow: auto;"
    >
      <!-- 列：报表编号 -->
      <el-table-column label="报表编号" prop="reportId" />
      <!-- 列：月份 -->
      <el-table-column label="月份" prop="month" />
      <!-- 列：年份 -->
      <el-table-column label="年份" prop="year" />
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
        :total="filteredMonthlyData.length"
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
  name: "ReportMonthly",
  data() {
    return {
      selectedDate: null,  // 当前选中的状态筛选
      monthlyData: [],  // 存储从后端获取的用户数据
      currentPage: 1,  // 当前页码，初始化为第一页
      pageSize: 10,    // 每页显示的数据条数，初始化为10
    };
  },
  computed: {
    // 根据选择的年份过滤数据
    filteredMonthlyData() {
      if (!this.selectedDate) return this.monthlyData; // 如果未选择年份，显示全部数据

      const selectedYear = this.selectedDate.getFullYear(); // 获取选择的年份
      return this.monthlyData.filter(row => row.year === selectedYear); // 根据年份筛选
    },
  },

  methods: {
    // 导出数据逻辑
    submitData() {
      console.log("导出的数据：", this.filteredMonthlyData);
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
    fetchMonthlyData() {
      api.get('/api/monthly-reports')  // 替换为你的后端接口地址
          .then(response => {
            if (response.data.code === 1) {
              this.monthlyData = response.data.data.map(monthly => {
                return {
                  reportId: monthly.reportId,
                  month: monthly.month,
                  year: monthly.year,
                  totalSales: monthly.totalSales,
                  totalOrders: monthly.totalOrders,
                  totalBills: monthly.totalBills,
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
    this.fetchMonthlyData();  // 页面创建时加载数据
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

