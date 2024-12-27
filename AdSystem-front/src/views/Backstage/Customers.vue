<template>
  <div>
    <!-- 筛选条件和增加按钮容器 -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <!-- 增加按钮，使用 flex-end 来让按钮右对齐 -->
      <el-button type="primary" @click="showAddDialog" size="small" style="margin-left: auto;">增加</el-button>
    </div>

    <!-- 顾客信息列表 -->
    <el-table :data="paginatedCustomerData" style="width: 100%" stripe>
      <el-table-column label="顾客编号" prop="customerId">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.customerId"
              size="small"
              disabled
          ></el-input>
          <span v-else>{{ row.customerId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名" prop="name">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.name"
              size="small"
              placeholder="请输入姓名"
          ></el-input>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="电话" prop="phone">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.phone"
              size="small"
              placeholder="请输入电话"
          ></el-input>
          <span v-else>{{ row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="邮箱" prop="email">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.email"
              size="small"
              placeholder="请输入邮箱"
          ></el-input>
          <span v-else>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="地址" prop="address">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.address"
              size="small"
              placeholder="请输入地址"
          ></el-input>
          <span v-else>{{ row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column label="注册日期" prop="registrationDate">
        <template #default="{ row }">
          {{ row.registrationDate }}
        </template>
      </el-table-column>

      <el-table-column label="生日" prop="birthday">
        <template #default="{ row }">
          <el-date-picker
              v-if="row.isEditing"
              v-model="row.birthday"
              type="date"
              placeholder="选择日期"
              size="small"
          ></el-date-picker>
          <span v-else>{{ row.birthday }}</span>
        </template>
      </el-table-column>

      <el-table-column label="累计消费金额" prop="totalSpent">
        <template #default="{ row }">
          {{ row.totalSpent }}
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
          :total="customerData.length"
      >
      </el-pagination>
    </div>

    <!-- 添加顾客对话框 -->
    <el-dialog title="添加新顾客" v-model="dialogVisible" width="30%">
      <el-form :model="newCustomer" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="newCustomer.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="newCustomer.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="newCustomer.email"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="newCustomer.address"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="newCustomer.birthday" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="累计消费金额">
          <el-input v-model="newCustomer.totalSpent" type="number"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitNewCustomer">确定</el-button>
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
  name: "CustomerManagement",
  data() {
    return {
      selectedEnabled: "",
      customerData: [],
      isLoading: false,
      dialogVisible: false,
      newCustomer: {
        name: '',
        phone: '',
        email: '',
        address: '',
        birthday: '',
        totalSpent: 0
      },
      currentPage: 1,
      pageSize: 8
    };
  },
  computed: {
    filteredCustomerData() {
      return this.customerData;
    },
    paginatedCustomerData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredCustomerData.slice(start, end);
    },
  },
  methods: {
    fetchCustomerData() {
      api.get('/api/customers')
          .then(response => {
            if (response.data.code === 1) {
              this.customerData = response.data.data.map(customer => ({
                customerId: customer.customerId,
                name: customer.name,
                phone: customer.phone,
                email: customer.email,
                address: customer.address,
                registrationDate: customer.registrationDate,
                birthday: customer.birthday,
                totalSpent: customer.totalSpent,
                isEditing: false,
              }));
              console.log('Total customers:', this.customerData.length);
            } else {
              console.error('Failed to fetch data');
              ElMessage.error('获取顾客数据失败');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            ElMessage.error('获取顾客数据失败');
          });
    },
    editRow(row) {
      row.isEditing = true;
    },
    saveRow(row) {
      api.put(`/api/customers/${row.customerId}`, {
        customerId: row.customerId,
        name: row.name,
        phone: row.phone,
        email: row.email,
        address: row.address,
        registrationDate: row.registrationDate,
        birthday: row.birthday,
        totalSpent: row.totalSpent,
      })
          .then(response => {
            if (response.data.code === 1) {
              row.isEditing = false;
              ElMessage.success('更新成功');
            } else {
              console.error('Failed to update customer');
              ElMessage.error('更新失败');
            }
          })
          .catch(error => {
            console.error('Error updating customer:', error);
            ElMessage.error('更新失败');
          });
    },
    deleteRow(row) {
      api.delete(`/api/customers/${row.customerId}`)
          .then(response => {
            if (response.data.code === 1) {
              const index = this.customerData.indexOf(row);
              if (index !== -1) {
                this.customerData.splice(index, 1);
              }
              ElMessage.success('删除成功');
            } else {
              console.error('Failed to delete customer');
              ElMessage.error('删除失败');
            }
          })
          .catch(error => {
            console.error('Error deleting customer:', error);
            ElMessage.error('删除失败');
          });
    },
    showAddDialog() {
      this.dialogVisible = true;
    },
    submitNewCustomer() {
      this.isLoading = true;

      // 获取当前本地时间并格式化为 "YYYY-MM-DDTHH:mm:ss" 格式
      const now = new Date();
      const formattedDate = now.getFullYear() + '-' +
          String(now.getMonth() + 1).padStart(2, '0') + '-' +
          String(now.getDate()).padStart(2, '0') + 'T' +
          String(now.getHours()).padStart(2, '0') + ':' +
          String(now.getMinutes()).padStart(2, '0') + ':' +
          String(now.getSeconds()).padStart(2, '0');

      const customerData = {
        ...this.newCustomer,
        registrationDate: formattedDate
      };

      api.post('/api/customers', customerData)
          .then(response => {
            if (response.data.code === 1) {
              this.dialogVisible = false;
              this.fetchCustomerData(); // 刷新顾客列表
              ElMessage.success('创建顾客成功');
            } else {
              console.error('Failed to create customer');
              ElMessage.error('创建顾客失败');
            }
          })
          .catch(error => {
            console.error('Error creating customer:', error);
            ElMessage.error('创建顾客失败');
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
    this.fetchCustomerData();
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

