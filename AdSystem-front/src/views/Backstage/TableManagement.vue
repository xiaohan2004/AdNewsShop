<template>
  <div>
    <!-- 筛选条件 -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <div>
        <el-select v-model="selectedStatus" placeholder="选择状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="空闲" value="空闲"></el-option>
          <el-option label="已预订" value="已预订"></el-option>
          <el-option label="占用" value="占用"></el-option>
        </el-select>
        <el-select v-model="selectedLocation" placeholder="选择区域">
          <el-option label="全部" value=""></el-option>
          <el-option label="大厅" value="大厅"></el-option>
          <el-option label="包间" value="包间"></el-option>
          <el-option label="私密房间" value="私密房间"></el-option>
        </el-select>
      </div>

      <!-- 增加按钮 -->
      <el-button type="primary" @click="openAddDialog" size="small">增加</el-button>
    </div>

    <!-- 用户列表 -->
    <el-table :data="paginatedTableData" style="width: 100%" stripe>
      <el-table-column label="餐桌编号" prop="tableId">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.tableId"
              size="small"
              disabled
          ></el-input>
          <span v-else>{{ row.tableId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" prop="status">
        <template #default="{ row }">
          <el-select
              v-if="row.isEditing"
              v-model="row.status"
              size="small"
              placeholder="选择状态"
          >
            <el-option label="空闲" value="空闲"></el-option>
            <el-option label="已预订" value="已预订"></el-option>
            <el-option label="占用" value="占用"></el-option>
          </el-select>
          <span v-else>{{ row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column label="位置" prop="location">
        <template #default="{ row }">
          <el-select
              v-if="row.isEditing"
              v-model="row.location"
              size="small"
              placeholder="选择位置"
          >
            <el-option label="大厅" value="大厅"></el-option>
            <el-option label="包间" value="包间"></el-option>
            <el-option label="私密房间" value="私密房间"></el-option>
          </el-select>
          <span v-else>{{ row.location }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              type="warning"
              size="small"
              @click="editRow(scope.row)"
              v-if="!scope.row.isEditing"
          >
            编辑
          </el-button>
          <el-button
              type="success"
              size="small"
              @click="saveRow(scope.row)"
              v-if="scope.row.isEditing"
          >
            保存
          </el-button>
          <el-button
              type="danger"
              size="small"
              @click="deleteRow(scope.row)"
          >
            删除
          </el-button>
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
          :total="filteredTableData.length"
      >
      </el-pagination>
    </div>

    <!-- 添加餐桌对话框 -->
    <el-dialog
        v-model="dialogVisible"
        title="添加新餐桌"
        width="30%"
        :before-close="handleClose"
    >
      <el-form :model="newTable" label-width="100px">
        <el-form-item label="状态">
          <el-select v-model="newTable.status" placeholder="选择状态">
            <el-option label="空闲" value="空闲"></el-option>
            <el-option label="已预订" value="已预订"></el-option>
            <el-option label="占用" value="占用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置">
          <el-select v-model="newTable.location" placeholder="选择位置">
            <el-option label="大厅" value="大厅"></el-option>
            <el-option label="包间" value="包间"></el-option>
            <el-option label="私密房间" value="私密房间"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitNewTable">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from 'element-plus';
import api from "@/api/api";

export default {
  name: "internal-staff",
  data() {
    return {
      selectedStatus: "",
      selectedLocation: "",
      tableData: [],
      isLoading: false,
      dialogVisible: false,
      newTable: {
        status: '空闲',
        location: '大厅'
      },
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    filteredTableData() {
      return this.tableData.filter((row) => {
        const matchesStatus = this.selectedStatus ? row.status === this.selectedStatus : true;
        const matchesLocation = this.selectedLocation ? row.location === this.selectedLocation : true;
        return matchesStatus && matchesLocation;
      });
    },
    paginatedTableData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredTableData.slice(start, end);
    },
  },
  created() {
    this.fetchTableData();
  },
  methods: {
    fetchTableData() {
      api.get('/api/tables')
          .then(response => {
            if (response.data.code === 1) {
              this.tableData = response.data.data.map(table => ({
                tableId: table.tableId,
                status: table.status === 0 ? '空闲' : table.status === 1 ? '已预订' : '占用',
                location: table.location === 0 ? '大厅' : table.location === 1 ? '包间' : '私密房间',
                isEditing: false,
              }));
            } else {
              console.error('Failed to fetch data');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    editRow(row) {
      row.isEditing = true;
    },
    saveRow(row) {
      api.put(`/api/tables/${row.tableId}`, {
        tableId: row.tableId,
        status: row.status === '空闲' ? 0 : row.status === '已预定' ? 1 : 2,
        location: row.location === '大厅' ? 0 : row.location === '包间' ? 1 : 2,
      })
          .then(response => {
            if (response.data.code === 1) {
              row.isEditing = false;
              ElMessage.success('更新成功');
            } else {
              console.error('Failed to update table');
              ElMessage.error('更新失败');
            }
          })
          .catch(error => {
            console.error('Error updating table:', error);
            ElMessage.error('更新失败');
          });
    },
    deleteRow(row) {
      api.delete(`/api/tables/${row.tableId}`)
          .then(response => {
            if (response.data.code === 1) {
              const index = this.tableData.indexOf(row);
              if (index !== -1) {
                this.tableData.splice(index, 1);
              }
              ElMessage.success('删除成功');
            } else {
              console.error('Failed to delete table');
              ElMessage.error('删除失败');
            }
          })
          .catch(error => {
            console.error('Error deleting table:', error);
            ElMessage.error('删除失败');
          });
    },
    openAddDialog() {
      this.dialogVisible = true;
      this.newTable = {
        status: '空闲',
        location: '大厅'
      };
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    submitNewTable() {
      this.isLoading = true;
      api.post('/api/tables', {
        status: this.newTable.status === '空闲' ? 0 : this.newTable.status === '已预订' ? 1 : 2,
        location: this.newTable.location === '大厅' ? 0 : this.newTable.location === '包间' ? 1 : 2,
      })
          .then(response => {
            if (response.data.code === 1) {
              ElMessage.success('创建成功');
              this.dialogVisible = false;
              this.fetchTableData();
              this.currentPage = Math.ceil(this.tableData.length / this.pageSize);
            } else {
              console.error('创建桌子失败');
              ElMessage.error('创建失败');
            }
          })
          .catch(error => {
            console.error('创建桌子时出错:', error);
            ElMessage.error('创建失败');
          })
          .finally(() => {
            this.isLoading = false;
          });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>

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




