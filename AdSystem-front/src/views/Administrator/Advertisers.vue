<template>
  <div>
    <!-- 筛选条件和增加按钮容器 -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <!-- 增加按钮，使用 flex-end 来让按钮右对齐 -->
      <el-button type="primary" @click="showAddDialog" size="small" style="margin-left: auto;">增加</el-button>
    </div>

    <!-- 广告商信息列表 -->
    <el-table :data="paginatedAdvertiserData" style="width: 100%" stripe>
      <el-table-column label="广告商编号" prop="id">
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

      <el-table-column label="公司名" prop="companyName">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.companyName"
              size="small"
              placeholder="请输入公司名"
          ></el-input>
          <span v-else>{{ row.companyName }}</span>
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
          :total="advertiserData.length"
      >
      </el-pagination>
    </div>

    <!-- 添加广告商对话框 -->
    <el-dialog title="添加新广告商" v-model="dialogVisible" width="30%">
      <el-form :model="newAdvertiser" label-width="100px">
        <el-form-item label="公司名">
          <el-input v-model="newAdvertiser.companyName"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="newAdvertiser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="newAdvertiser.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitNewAdvertiser">确定</el-button>
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
  name: "AdvertiserManagement",
  data() {
    return {
      selectedEnabled: "",
      advertiserData: [],
      isLoading: false,
      dialogVisible: false,
      newAdvertiser: {
        companyName: '',
        username: '',
        password: '',
      },
      currentPage: 1,
      pageSize: 8
    };
  },
  computed: {
    filteredAdvertiserData() {
      return this.advertiserData;
    },
    paginatedAdvertiserData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredAdvertiserData.slice(start, end);
    },
  },
  methods: {
    fetchAdvertiserData() {
      api.get('/api/advertisers')
          .then(response => {
            if (response.data.code === 1) {
              this.advertiserData = response.data.data.map(advertiser => ({
                id: advertiser.id,
                companyName: advertiser.companyName,
                username:advertiser.username,
                password:advertiser.password,
                isEditing: false,
              }));
              console.log('Total advertisers:', this.advertiserData.length);
            } else {
              console.error('Failed to fetch data');
              ElMessage.error('获取广告商数据失败');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            ElMessage.error('获取广告商数据失败');
          });
    },
    editRow(row) {
      row.isEditing = true;
    },
    saveRow(row) {
      api.put(`/api/advertisers/${row.id}`, {
        id: row.id,
        companyName:row.companyName,
        username: row.username,
        password: row.password,
      })
          .then(response => {
            if (response.data.code === 1) {
              row.isEditing = false;
              ElMessage.success('更新成功');
            } else {
              console.error('Failed to update advertiser');
              ElMessage.error('更新失败');
            }
          })
          .catch(error => {
            console.error('Error updating advertiser:', error);
            ElMessage.error('更新失败');
          });
    },
    deleteRow(row) {
      api.delete(`/api/advertisers/${row.id}`)
          .then(response => {
            if (response.data.code === 1) {
              const index = this.advertiserData.indexOf(row);
              if (index !== -1) {
                this.advertiserData.splice(index, 1);
              }
              ElMessage.success('删除成功');
            } else {
              console.error('Failed to delete advertiser');
              ElMessage.error('删除失败');
            }
          })
          .catch(error => {
            console.error('Error deleting advertiser:', error);
            ElMessage.error('删除失败');
          });
    },
    showAddDialog() {
      this.dialogVisible = true;
    },
    submitNewAdvertiser() {
      this.isLoading = true;


      api.post('/api/advertisers', this.newAdvertiser)
          .then(response => {
            if (response.data.code === 1) {
              this.dialogVisible = false;
              this.fetchAdvertiserData(); // 刷新广告商列表
              ElMessage.success('创建广告商成功');
            } else {
              console.error('Failed to create advertiser');
              ElMessage.error('创建广告商失败');
            }
          })
          .catch(error => {
            console.error('Error creating advertiser:', error);
            ElMessage.error('创建广告商失败');
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
    this.fetchAdvertiserData();
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