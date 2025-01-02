<template>
  <div>
    <!-- 筛选条件和增加按钮容器 -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <!-- 增加按钮，使用 flex-end 来让按钮右对齐 -->
      <el-button type="primary" @click="showAddDialog" size="small" style="margin-left: auto;">增加</el-button>
    </div>

    <!-- 互联网站长信息列表 -->
    <el-table :data="paginatedWebsiteOperatorData" style="width: 100%" stripe>
      <el-table-column label="互联网站长编号" prop="id">
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

      <el-table-column label="网址" prop="websiteUrl">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.websiteUrl"
              size="small"
              placeholder="请输入网址"
          ></el-input>
          <span v-else>{{ row.websiteUrl }}</span>
        </template>
      </el-table-column>

      <el-table-column label="token" prop="token">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.token"
              size="small"
              placeholder="请输入token"
          ></el-input>
          <span v-else>{{ row.token }}</span>
        </template>
      </el-table-column>

      <el-table-column label="请求次数" prop="requesttimes">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.requesttimes"
              size="small"
              placeholder="请输入次数"
          ></el-input>
          <span v-else>{{ row.requesttimes }}</span>
        </template>
      </el-table-column>

      <el-table-column label="添加次数" prop="addtimes">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.addtimes"
              size="small"
              placeholder="请输入次数"
          ></el-input>
          <span v-else>{{ row.addtimes }}</span>
        </template>
      </el-table-column>

      <el-table-column label="点击次数" prop="clicktimes">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.clicktimes"
              size="small"
              placeholder="请输入次数"
          ></el-input>
          <span v-else>{{ row.clicktimes }}</span>
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
          :total="websiteOperatorData.length"
      >
      </el-pagination>
    </div>

    <!-- 添加互联网站长对话框 -->
    <el-dialog title="添加新互联网站长" v-model="dialogVisible" width="30%">
      <el-form :model="newWebsiteOperator" label-width="100px">
        <el-form-item label="账号">
          <el-input v-model="newWebsiteOperator.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="newWebsiteOperator.password"></el-input>
        </el-form-item>
        <el-form-item label="网址">
          <el-input v-model="newWebsiteOperator.websiteUrl"></el-input>
        </el-form-item>
        <el-form-item label="token">
          <el-input v-model="newWebsiteOperator.token"></el-input>
        </el-form-item>
        <el-form-item label="请求次数">
          <el-input v-model="newWebsiteOperator.requesttimes"></el-input>
        </el-form-item>
        <el-form-item label="添加次数">
          <el-input v-model="newWebsiteOperator.addtimes"></el-input>
        </el-form-item>
        <el-form-item label="点击次数">
          <el-input v-model="newWebsiteOperator.clicktimes"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitNewWebsiteOperator">确定</el-button>
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
  name: "WebsiteOperatorManagement",
  data() {
    return {
      selectedEnabled: "",
      websiteOperatorData: [],
      isLoading: false,
      dialogVisible: false,
      newWebsiteOperator: {
        username: '',
        password: '',
        websiteUrl:'',
        token: '',
        requesttimes: 0,
        addtimes: 0,
        clicktimes: 0,
      },
      currentPage: 1,
      pageSize: 8
    };
  },
  computed: {
    filteredWebsiteOperatorData() {
      return this.websiteOperatorData;
    },
    paginatedWebsiteOperatorData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredWebsiteOperatorData.slice(start, end);
    },
  },
  methods: {
    fetchWebsiteOperatorData() {
      api.get('/api/website-operators')
          .then(response => {
            if (response.data.code === 1) {
              this.websiteOperatorData = response.data.data.map(websiteOperator => ({
                id: websiteOperator.id,
                username:websiteOperator.username,
                password:websiteOperator.password,
                websiteUrl: websiteOperator.websiteUrl,
                token: websiteOperator.token,
                requesttimes: websiteOperator.requesttimes,
                addtimes: websiteOperator.addtimes,
                clicktimes: websiteOperator.clicktimes,
                isEditing: false,
              }));
              console.log('Total websiteOperators:', this.websiteOperatorData.length);
            } else {
              console.error('Failed to fetch data');
              ElMessage.error('获取互联网站长数据失败');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            ElMessage.error('获取互联网站长数据失败');
          });
    },
    editRow(row) {
      row.isEditing = true;
    },
    saveRow(row) {
      api.put(`/api/website-operators/${row.id}`, {
        id: row.id,
        username: row.username,
        password: row.password,
        websiteUrl:row.websiteUrl,
        token:row.token,
        requesttimes: row.requesttimes,
        addtimes: row.addtimes,
        clicktimes: row.clicktimes,
      })
          .then(response => {
            if (response.data.code === 1) {
              row.isEditing = false;
              ElMessage.success('更新成功');
            } else {
              console.error('Failed to update websiteOperator');
              ElMessage.error('更新失败');
            }
          })
          .catch(error => {
            console.error('Error updating websiteOperator:', error);
            ElMessage.error('更新失败');
          });
    },
    deleteRow(row) {
      api.delete(`/api/website-operators/${row.id}`)
          .then(response => {
            if (response.data.code === 1) {
              const index = this.websiteOperatorData.indexOf(row);
              if (index !== -1) {
                this.websiteOperatorData.splice(index, 1);
              }
              ElMessage.success('删除成功');
            } else {
              console.error('Failed to delete websiteOperator');
              ElMessage.error('删除失败');
            }
          })
          .catch(error => {
            console.error('Error deleting websiteOperator:', error);
            ElMessage.error('删除失败');
          });
    },
    showAddDialog() {
      this.dialogVisible = true;
    },
    submitNewWebsiteOperator() {
      this.isLoading = true;


      api.post('/api/website-operators', this.newWebsiteOperator)
          .then(response => {
            if (response.data.code === 1) {
              this.dialogVisible = false;
              this.fetchWebsiteOperatorData(); // 刷新互联网站长列表
              ElMessage.success('创建互联网站长成功');
            } else {
              console.error('Failed to create websiteOperator');
              ElMessage.error('创建互联网站长失败');
            }
          })
          .catch(error => {
            console.error('Error creating websiteOperator:', error);
            ElMessage.error('创建互联网站长失败');
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
    this.fetchWebsiteOperatorData();
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

