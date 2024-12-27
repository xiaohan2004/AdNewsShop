<template>
  <div>
    <!-- 筛选条件 -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <div>
        <el-select v-model="selectedStatus" placeholder="身份">
          <el-option label="全部" value=""></el-option>
          <el-option label="管理员" value="管理员"></el-option>
          <el-option label="服务员" value="服务员"></el-option>
        </el-select>
        <el-select v-model="selectedEnabled" placeholder="是否启用">
          <el-option label="全部" value=""></el-option>
          <el-option label="启用" value="true"></el-option>
          <el-option label="禁用" value="false"></el-option>
        </el-select>
      </div>

      <!-- 增加按钮 -->
      <el-button type="primary" @click="showAddDialog" size="small">增加</el-button>
    </div>

    <!-- 用户列表 -->
    <el-table :data="paginatedUserData" style="width: 100%" stripe>
      <el-table-column label="用户编号" prop="userId">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.userId"
              size="small"
              disabled
          ></el-input>
          <span v-else>{{ row.userId }}</span>
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
              type="password" >
          </el-input>
          <span v-else>{{ row.password }}</span>
        </template>
      </el-table-column>

      <el-table-column label="身份" prop="status">
        <template #default="{ row }">
          <el-select
              v-if="row.isEditing"
              v-model="row.status"
              size="small"
              placeholder="选择身份"
          >
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="服务员" value="服务员"></el-option>
          </el-select>
          <span v-else>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否启用" prop="enabled">
        <template #default="{ row }">
          <el-switch
              v-if="row.isEditing"
              v-model="row.enabled"
              size="small"
          ></el-switch>
          <span v-else>{{ row.enabled ? '启用' : '禁用' }}</span>
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
          :total="filteredUserData.length"
      >
      </el-pagination>
    </div>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加新用户" v-model="dialogVisible" width="30%">
      <el-form :model="newUser" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="newUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="newUser.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="newUser.status" placeholder="选择身份">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="服务员" value="服务员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="newUser.enabled"></el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitNewUser">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import api from "@/api/api";

export default {
  name: "UserManagement",
  data() {
    return {
      selectedStatus: "",
      selectedEnabled: "",
      userData: [],
      isLoading: false,
      dialogVisible: false,
      newUser: {
        username: '',
        password: '',
        status: '服务员',
        enabled: true
      },
      currentPage: 1,
      pageSize: 10
    };
  },
  computed: {
    filteredUserData() {
      return this.userData.filter((row) => {
        const matchesStatus = this.selectedStatus ? row.status === this.selectedStatus : true;
        const matchesEnabled = this.selectedEnabled !== "" ? String(row.enabled) === this.selectedEnabled : true;
        return matchesStatus && matchesEnabled;
      });
    },
    paginatedUserData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredUserData.slice(start, end);
    },
  },
  methods: {
    fetchUserData() {
      api.get('/api/users')
          .then(response => {
            if (response.data.code === 1) {
              this.userData = response.data.data.map(user => ({
                userId: user.userId,
                username: user.username,
                password: user.password,
                status: user.role === 0 ? '管理员' : '服务员',
                enabled: user.status === 1,
                isEditing: false,
              }));
            } else {
              console.error('Failed to fetch data');
              ElMessage.error('获取用户数据失败');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            ElMessage.error('获取用户数据失败');
          });
    },
    editRow(row) {
      row.isEditing = true;
    },
    saveRow(row) {
      api.put(`/api/users/${row.userId}`, {
        userId: row.userId,
        username: row.username,
        password: row.password,
        role: row.status === '管理员' ? 0 : 1,
        status: row.enabled ? 1 : 0,
      })
          .then(response => {
            if (response.data.code === 1) {
              row.isEditing = false;
              ElMessage.success('更新成功');
            } else {
              console.error('Failed to update user');
              ElMessage.error('更新失败');
            }
          })
          .catch(error => {
            console.error('Error updating user:', error);
            ElMessage.error('更新失败');
          });
    },
    deleteRow(row) {
      api.delete(`/api/users/${row.userId}`)
          .then(response => {
            if (response.data.code === 1) {
              const index = this.userData.indexOf(row);
              if (index !== -1) {
                this.userData.splice(index, 1);
              }
              ElMessage.success('删除成功');
            } else {
              console.error('Failed to delete user');
              ElMessage.error('删除失败');
            }
          })
          .catch(error => {
            console.error('Error deleting user:', error);
            ElMessage.error('删除失败');
          });
    },
    showAddDialog() {
      this.dialogVisible = true;
    },
    submitNewUser() {
      this.isLoading = true;

      api.post('/api/users', {
        username: this.newUser.username,
        password: this.newUser.password,
        role: this.newUser.status === '管理员' ? 0 : 1,
        status: this.newUser.enabled ? 1 : 0,
      })
          .then(response => {
            if (response.data.code === 1) {
              this.dialogVisible = false;
              this.fetchUserData(); // 刷新用户列表
              ElMessage.success('创建用户成功');
            } else {
              console.error('创建用户失败');
              ElMessage.error('创建用户失败');
            }
          })
          .catch(error => {
            console.error('创建用户时出错:', error);
            ElMessage.error('创建用户失败');
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
    this.fetchUserData();
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