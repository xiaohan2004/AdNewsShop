<template>
  <div>

    <div style="margin-bottom: 16px; display: flex; justify-content: flex-end;">
      <!-- 导出按钮 -->
      <el-button type="primary" @click="submitData">导出</el-button>
    </div>

    <!-- 表格 -->
    <el-table
        :data="filteredYearlyData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        border
        style="width: 100%; height: 100%; overflow: auto;"
    >
      <!-- 列：报表编号 -->
      <el-table-column label="报表编号" prop="reportId" />
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
        :total="filteredYearlyData.length"
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
  name: "ReportYearly",
  data() {
    return {
      yearlyData: [],  // 存储从后端获取的年度数据
      currentPage: 1,  // 当前页码，初始化为第一页
      pageSize: 10,    // 每页显示的数据条数，初始化为10
    };
  },
  computed: {
    // 过滤后的数据
    filteredYearlyData() {
      return this.yearlyData; // 目前不需要额外的筛选
    },
  },

  methods: {
    // 导出数据逻辑
    submitData() {
      console.log("导出的数据：", this.filteredYearlyData);
    },

    // 获取年度数据
    fetchYearlyData() {
      api.get('/api/annual-reports')  // 替换为你的后端接口地址
          .then(response => {
            if (response.data.code === 1) {
              this.yearlyData = response.data.data.map(yearly => {
                return {
                  reportId: yearly.reportId,
                  year: yearly.year,
                  totalSales: yearly.totalSales,
                  totalOrders: yearly.totalOrders,
                  totalBills: yearly.totalBills,
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

    // 翻页逻辑
    handlePageChange(page) {
      this.currentPage = page; // 更新当前页
    },
  },

  created() {
    this.fetchYearlyData();  // 页面创建时加载年度数据
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

/* 按钮样式 */
.el-button {
  height: 36px;
}

/* 分页样式 */
.el-pagination {
  margin-top: 20px;
}
</style>


