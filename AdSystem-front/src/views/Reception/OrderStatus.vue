<template>
  <div>
    <!-- 筛选功能 -->
    <div
        style="margin-bottom: 16px; display: flex; justify-content: flex-start; gap: 16px;"
    >
      <!-- 筛选订单状态 -->
      <el-select v-model="selectedStatus" placeholder="选择订单状态" style="width: 120px;">
        <el-option label="全部" value="" />
        <el-option label="进行中" value="进行中" />
        <el-option label="已完成" value="已完成" />
        <el-option label="已结账" value="已结账" />
      </el-select>
    </div>

    <!-- 表格展示 -->
    <el-table
        :data="filteredOrderData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        border
        style="width: 100%;"
    >
      <!-- 订单编号列 -->
      <el-table-column label="订单编号" prop="orderId"></el-table-column>

      <!-- 餐桌编号列 -->
      <el-table-column label="餐桌编号" prop="tableId"></el-table-column>

      <!-- 下单时间列 -->
      <el-table-column label="下单时间" prop="orderTime"></el-table-column>

      <!-- 订单状态 -->
      <el-table-column label="订单状态" prop="status">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)" size="small">{{ row.status }}</el-tag>
        </template>
      </el-table-column>

    </el-table>

    <!-- 翻页功能 -->
    <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="filteredOrderData.length"
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
  name: "OrderManagement",
  data() {
    return {
      selectedStatus: "",  // 当前选中的状态筛选
      orderData: [],  // 存储从后端获取的用户数据
      currentPage: 1,  // 当前页码，初始化为第一页
      pageSize: 10,    // 每页显示的数据条数，初始化为10
    };
  },
  computed: {
    // 根据筛选条件过滤数据
    filteredOrderData() {
      return this.orderData.filter((item) => {
        const statusMatch = this.selectedStatus ? item.status === this.selectedStatus : true;
        return statusMatch;
      });
    },
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
    // 根据订单状态返回对应的颜色
    getStatusType(status) {
      switch (status) {
        case '进行中':
          return 'warning'; // 黄色
        case '已完成':
          return 'success'; // 绿色
        case '已结账':
          return 'info'; // 蓝色
        default:
          return 'default'; // 默认颜色
      }
    },

    fetchDailyData() {
      api.get('/api/orders')  // 替换为你的后端接口地址
          .then(response => {
            if (response.data.code === 1) {
              this.orderData = response.data.data.map(order => {
                return {
                  orderId: order.orderId,
                  tableId: order.tableId,
                  orderTime: order.orderTime,
                  status: order.status === 0 ? '进行中' : order.status === 1 ? '已完成' : '已结账',
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
/* 自定义样式 */
.el-table {
  width: 100% !important; /* 确保表格宽度适应容器 */
  height: 100% !important; /* 确保表格高度适应容器 */
}

.el-table__body-wrapper {
  max-height: calc(100vh - 150px); /* 限制表格的最大高度，避免超出屏幕 */
  overflow: auto;
}

/* 移除列宽度限制，确保表格填充所有区域 */
.el-table-column {
  width: auto; /* 让列宽度自动调整 */
}

.el-table__header,
.el-table__body {
  table-layout: fixed; /* 使用固定布局，使列宽平分 */
}

/* 给筛选框增加一些间距 */
.el-select {
  width: 120px; /* 设置固定宽度 */
}

.el-pagination {
  margin-top: 20px; /* 设置翻页与表格的间距 */
}
</style>

