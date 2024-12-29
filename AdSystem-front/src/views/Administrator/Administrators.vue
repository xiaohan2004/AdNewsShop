<template>
  <div>
    <!-- 筛选条件和增加按钮容器 -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <!-- 增加按钮，使用 flex-end 来让按钮右对齐 -->
      <el-button type="primary" @click="showAddDialog" size="small" style="margin-left: auto;">增加</el-button>
    </div>

    <!-- 管理员信息列表 -->
    <el-table :data="paginatedAdministratorData" style="width: 100%" stripe>
      <el-table-column label="管理员编号" prop="id">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.id"
              size="small"
              disabled
          ></el-input>
          <span v-else>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户名" prop="username">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.username"
              size="small"
              placeholder="请输入用户名"
          ></el-input>
          <span v-else>{{ row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column label="密码" prop="password">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.password"
              size="small"
              placeholder="请输入密码"
          ></el-input>
          <span v-else>{{ row.password }}</span>
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
          :total="administratorData.length"
      >
      </el-pagination>
    </div>

    <!-- 添加管理员对话框 -->
    <el-dialog title="添加新管理员" v-model="dialogVisible" width="30%">
      <el-form :model="newAdministrator" label-width="100px">
        <el-form-item label="账号">
          <el-input v-model="newAdministrator.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="newAdministrator.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitNewAdministrator">确定</el-button>
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
  name: "AdministratorManagement",
  data() {
    return {
      selectedEnabled: "",
      administratorData: [],
      isLoading: false,
      dialogVisible: false,
      newAdministrator: {
        username: '',
        password: '',
      },
      currentPage: 1,
      pageSize: 8
    };
  },
  computed: {
    filteredAdministratorData() {
      return this.administratorData;
    },
    paginatedAdministratorData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredAdministratorData.slice(start, end);
    },
  },
  methods: {
    fetchAdministratorData() {
      api.get('/api/administrators')
          .then(response => {
            if (response.data.code === 1) {
              this.administratorData = response.data.data.map(administrator => ({
                id: administrator.id,
                username:administrator.username,
                password:administrator.password,
                isEditing: false,
              }));
              console.log('Total administrators:', this.administratorData.length);
            } else {
              console.error('Failed to fetch data');
              ElMessage.error('获取管理员数据失败');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            ElMessage.error('获取管理员数据失败');
          });
    },
    editRow(row) {
      row.isEditing = true;
    },
    saveRow(row) {
      api.put(`/api/administrators/${row.id}`, {
        id: row.id,
        username: row.username,
        password: row.password,
      })
          .then(response => {
            if (response.data.code === 1) {
              row.isEditing = false;
              ElMessage.success('更新成功');
            } else {
              console.error('Failed to update administrator');
              ElMessage.error('更新失败');
            }
          })
          .catch(error => {
            console.error('Error updating administrator:', error);
            ElMessage.error('更新失败');
          });
    },
    deleteRow(row) {
      api.delete(`/api/administrators/${row.id}`)
          .then(response => {
            if (response.data.code === 1) {
              const index = this.administratorData.indexOf(row);
              if (index !== -1) {
                this.administratorData.splice(index, 1);
              }
              ElMessage.success('删除成功');
            } else {
              console.error('Failed to delete administrator');
              ElMessage.error('删除失败');
            }
          })
          .catch(error => {
            console.error('Error deleting administrator:', error);
            ElMessage.error('删除失败');
          });
    },
    showAddDialog() {
      this.dialogVisible = true;
    },
    submitNewAdministrator() {
      this.isLoading = true;
      api.post('/api/administrators', this.newAdministrator)
          .then(response => {
            if (response.data.code === 1) {
              this.dialogVisible = false;
              this.fetchAdministratorData(); // 刷新管理员列表
              ElMessage.success('创建管理员成功');
            } else {
              console.error('Failed to create administrator');
              ElMessage.error('创建管理员失败');
            }
          })
          .catch(error => {
            console.error('Error creating administrator:', error);
            ElMessage.error('创建管理员失败');
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
  created() {
    this.fetchAdministratorData();
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


