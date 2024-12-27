<script>
import axios from 'axios';
import api from "@/api/api";

export default {
  name: 'TableManagement',
  data() {
    return {
      tables: [], // 餐桌数据
      filterStatus: 'all', // 当前筛选状态
      filterType: 'all', // 当前筛选位置
      currentPage: 1, // 当前页码
      pageSize: 40, // 每页显示的餐桌数量
      refreshInterval: null, // 定时刷新间隔
    };
  },
  computed: {
    // 根据筛选条件过滤餐桌数据
    filteredTables() {
      return this.tables.filter((table) => {
        const matchStatus = this.filterStatus === 'all' || table.status === this.filterStatus;
        const matchType = this.filterType === 'all' || table.location === this.filterType;
        return matchStatus && matchType;
      });
    },
    // 当前页显示的餐桌数据
    paginatedTables() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.filteredTables.slice(startIndex, startIndex + this.pageSize);
    }
  },
  methods: {
    // 获取餐桌数据
    fetchTables() {
      api.get('/api/tables')
          .then(response => {
            if (response.data.code === 1) {
              this.tables = response.data.data.map(table => ({
                tableId: table.tableId,
                // 状态映射：0 => 空闲, 1 => 已预订, 2 => 已占用
                status: table.status === 0 ? '空闲' : table.status === 1 ? '已预订' : '已占用',
                // 位置映射：0 => 大厅, 1 => 包间, 2 => 私密房间
                location: table.location === 0 ? '大厅' : table.location === 1 ? '包间' : '私密房间',
              }));
            } else {
              console.error('Failed to fetch table data');
            }
          })
          .catch(error => {
            console.error('Error fetching table data:', error);
          });
    },
    // 页码变动时的处理函数
    handlePageChange(page) {
      this.currentPage = page;
    }
  },
  created() {
    // 页面创建时加载数据
    this.fetchTables();

    // 启动定时器，每5秒请求一次数据
    this.refreshInterval = setInterval(() => {
      this.fetchTables();
    }, 5000); // 5000毫秒即5秒
  },
  beforeDestroy() {
    // 在组件销毁之前清除定时器
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
};
</script>


<template>
  <div class="filters">
    <!-- 筛选条件 -->
    <el-select v-model="filterType" placeholder="按位置筛选" class="filter-select">
      <el-option value="all" label="全部位置" />
      <el-option value="hall" label="大厅" />
      <el-option value="private" label="包厢" />
      <el-option value="privateRoom" label="私密房间" />
    </el-select>
    <el-select v-model="filterStatus" placeholder="按状态筛选" class="filter-select">
      <el-option value="all" label="全部状态" />
      <el-option value="empty" label="空闲" />
      <el-option value="reserved" label="已预订" />
      <el-option value="occupied" label="已占用" />
    </el-select>
  </div>

  <!-- 餐桌网格 -->
  <div class="grid-container">
    <div
        v-for="table in paginatedTables"
        :key="table.tableId"
        class="table-item"
        :class="{
          'empty': table.status === '空闲',
          'reserved': table.status === '已预订',
          'occupied': table.status === '已占用'
        }"
    >
      <p>餐桌 {{ table.tableId }}</p>
      <!-- 位置映射 -->
      <p>{{ table.location === '大厅' ? '大厅' : table.location === '包间' ? '包间' : '私密房间' }}</p>
      <!-- 状态映射 -->
      <p class="status">
        {{
          table.status === '空闲'
              ? '空闲'
              : table.status === '已占用'
                  ? '已占用'
                  : '已预订'
        }}
      </p>
    </div>
  </div>

  <!-- 分页组件 -->
  <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :total="filteredTables.length"
      layout="prev, pager, next"
      class="pagination"
  ></el-pagination>
</template>



<style scoped>
/* 筛选区域样式 */
.filters {
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

/* 设置筛选框的宽度 */
.filter-select {
  width: 150px;
}

/* 网格容器 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  padding: 16px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 8px;
}

/* 餐桌项样式 */
.table-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.table-item.empty {
  background-color: #e0f7fa;
}

.table-item.occupied {
  background-color: #ffcdd2;
}

.table-item.reserved {
  background-color: #fff9c4;
}

.table-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 分页组件样式 */
.pagination {
  margin-top: 16px;
  text-align: center;
}
</style>

