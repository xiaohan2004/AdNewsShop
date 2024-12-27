<template>
  <div class="system-log">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="操作人">
        <el-input v-model="filterForm.operateUser" placeholder="输入操作人"></el-input>
      </el-form-item>
      <el-form-item label="操作类名">
        <el-input v-model="filterForm.className" placeholder="输入操作类名"></el-input>
      </el-form-item>
      <el-form-item label="操作方法名">
        <el-input v-model="filterForm.methodName" placeholder="输入操作方法名"></el-input>
      </el-form-item>
      <el-form-item label="操作方法参数">
        <el-input v-model="filterForm.methodParams" placeholder="输入操作方法参数"></el-input>
      </el-form-item>
      <el-form-item label="操作时间">
        <el-date-picker
            v-model="filterForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="applyFilters">筛选</el-button>
        <el-button @click="resetFilters">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
        v-if="filteredAndSortedLogData.length > 0"
        :data="paginatedLogData"
        style="width: 100%"
        :border="false"
        :stripe="true"
        :highlight-current-row="true"
        @sort-change="handleSortChange"
    >
      <el-table-column prop="id" label="ID" width="80" align="center"/>
      <el-table-column prop="operateUser" label="操作人" min-width="120" align="center"/>
      <el-table-column prop="operateTime" label="操作时间" min-width="180" align="center">
        <template #default="scope">
          <el-tag size="small" effect="plain">
            {{ formatDate(scope.row.operateTime) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="className" label="操作类名" min-width="200" show-overflow-tooltip/>
      <el-table-column prop="methodName" label="操作方法名" min-width="200" show-overflow-tooltip/>
      <el-table-column prop="methodParams" label="操作方法参数" min-width="250" show-overflow-tooltip/>
      <el-table-column prop="costTime" label="操作耗时(ms)" min-width="120" align="center" sortable="custom">
        <template #default="scope">
          <el-tag :type="getTimeType(scope.row.costTime)" size="small">
            {{ scope.row.costTime }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-else description="暂无数据"></el-empty>

    <div class="pagination-container">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredAndSortedLogData.length"
          background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  ElMessage,
  ElTable,
  ElTableColumn,
  ElCard,
  ElTag,
  ElEmpty,
  ElPagination,
  ElForm,
  ElFormItem,
  ElInput,
  ElDatePicker,
  ElButton
} from 'element-plus'
import api from "@/api/api";

export default {
  name: 'SystemLog',
  components: {
    ElTable,
    ElTableColumn,
    ElCard,
    ElTag,
    ElEmpty,
    ElPagination,
    ElForm,
    ElFormItem,
    ElInput,
    ElDatePicker,
    ElButton
  },
  data() {
    return {
      logData: [],
      currentPage: 1,
      pageSize: 10,
      filterForm: {
        operateUser: '',
        className: '',
        methodName: '',
        methodParams: '',
        dateRange: []
      },
      sortBy: 'costTime',
      sortOrder: 'descending'
    }
  },
  computed: {
    filteredAndSortedLogData() {
      return this.logData.filter(log => {
        const operateUserMatch = (log.operateUser || '').toLowerCase().includes(this.filterForm.operateUser.toLowerCase());
        const classNameMatch = (log.className || '').toLowerCase().includes(this.filterForm.className.toLowerCase());
        const methodNameMatch = (log.methodName || '').toLowerCase().includes(this.filterForm.methodName.toLowerCase());
        const methodParamsMatch = (log.methodParams || '').toLowerCase().includes(this.filterForm.methodParams.toLowerCase());

        let dateMatch = true;
        if (this.filterForm.dateRange && this.filterForm.dateRange.length === 2) {
          const logDate = new Date(log.operateTime);
          const startDate = new Date(this.filterForm.dateRange[0]);
          const endDate = new Date(this.filterForm.dateRange[1]);
          dateMatch = logDate >= startDate && logDate <= endDate;
        }

        return operateUserMatch && classNameMatch && methodNameMatch && methodParamsMatch && dateMatch;
      }).sort((a, b) => {
        const aValue = a[this.sortBy] || 0;
        const bValue = b[this.sortBy] || 0;
        return this.sortOrder === 'ascending' ? aValue - bValue : bValue - aValue;
      });
    },
    paginatedLogData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredAndSortedLogData.slice(start, end);
    },
    total() {
      return this.filteredAndSortedLogData.length;
    }
  },
  methods: {
    async fetchLogData() {
      try {
        const response = await api.get('/log');
        if (response.data.code === 1) {
          this.logData = response.data.data || [];
        } else {
          this.logData = [];
          ElMessage.error('获取系统日志失败');
        }
      } catch (error) {
        console.error('获取系统日志时出错:', error);
        this.logData = [];
        ElMessage.error('获取系统日志失败');
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getTimeType(time) {
      if (time < 10) return 'success'
      if (time < 20) return 'warning'
      return 'danger'
    },
    applyFilters() {
      this.currentPage = 1;
    },
    resetFilters() {
      this.filterForm = {
        operateUser: '',
        className: '',
        methodName: '',
        methodParams: '',
        dateRange: []
      };
      this.currentPage = 1;
    },
    handleSortChange({prop, order}) {
      if (prop === 'costTime') {
        this.sortBy = prop;
        this.sortOrder = order;
      }
    }
  },
  mounted() {
    this.fetchLogData()
  }
}
</script>

<style scoped>
.system-log {
  padding: 16px;
}

.filter-card {
  margin-bottom: 16px;
}

.el-card {
  border-radius: 8px;
}

.el-table {
  width: 100%;
}

.el-table th {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: bold;
}

.el-table .el-table__row:hover {
  background-color: #f5f7fa;
}

.pagination-container {
  margin-top: 16px;
  text-align: right;
}

.el-pagination {
  justify-content: flex-end;
}
</style>