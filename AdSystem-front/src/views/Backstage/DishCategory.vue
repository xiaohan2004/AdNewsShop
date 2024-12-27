<template>
  <div>
    <!-- 筛选条件和增加按钮容器 -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <!-- 增加按钮，使用 flex-end 来让按钮右对齐 -->
      <el-button type="primary" @click="showAddDialog" size="small" style="margin-left: auto;">增加</el-button>
    </div>

    <el-table :data="paginatedCategoryData" style="width: 100%" stripe>
      <el-table-column label="类别编号" prop="categoryId">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.categoryId"
              size="small"
              disabled
          ></el-input>
          <span v-else>{{ row.categoryId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="类别名称" prop="categoryName">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.categoryName"
              size="small"
              placeholder="请输入姓名"
          ></el-input>
          <span v-else>{{ row.categoryName }}</span>
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
          :total="categoryData.length"
      >
      </el-pagination>
    </div>

    <!-- 添加对话框 -->
    <el-dialog title="添加新类别" v-model="dialogVisible" width="30%">
      <el-form :model="newCategory" label-width="100px">
        <el-form-item label="名称">
        </el-form-item>
          <el-input v-model="newCategory.categoryName"></el-input>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitNewCategory">确定</el-button>
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
  name: "CategoryManagement",
  data() {
    return {
      categoryData: [],
      isLoading: false,
      dialogVisible: false,
      newCategory: {
        categoryName: '',
      },
      currentPage: 1,
      pageSize: 10
    };
  },
  computed: {
    filteredCategoryData() {
      return this.categoryData;
    },
    paginatedCategoryData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredCategoryData.slice(start, end);
    },
  },
  methods: {
    fetchCategoryData() {
      api.get('/api/categories')
          .then(response => {
            if (response.data.code === 1) {
              this.categoryData = response.data.data.map(category => ({
                categoryId: category.categoryId,
                categoryName: category.categoryName,
                isEditing: false,
              }));
              console.log('Total categories:', this.categoryData.length);
            } else {
              console.error('Failed to fetch data');
              ElMessage.error('获取类别数据失败');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            ElMessage.error('获取类别数据失败');
          });
    },
    editRow(row) {
      row.isEditing = true;
    },
    saveRow(row) {
      api.put(`/api/categories/${row.categoryId}`, {
        categoryId: row.categoryId,
        categoryName: row.categoryName,
      })
          .then(response => {
            if (response.data.code === 1) {
              row.isEditing = false;
              ElMessage.success('更新成功');
            } else {
              console.error('Failed to update category');
              ElMessage.error('更新失败');
            }
          })
          .catch(error => {
            console.error('Error updating category:', error);
            ElMessage.error('更新失败');
          });
    },
    deleteRow(row) {
      api.delete(`/api/categories/${row.categoryId}`)
          .then(response => {
            if (response.data.code === 1) {
              const index = this.categoryData.indexOf(row);
              if (index !== -1) {
                this.categoryData.splice(index, 1);
              }
              ElMessage.success('删除成功');
            } else {
              console.error('Failed to delete category');
              ElMessage.error('删除失败,该类别下有关联菜品');
            }
          })
          .catch(error => {
            console.error('Error deleting category:', error);
            ElMessage.error('删除失败');
          });
    },
    showAddDialog() {
      this.dialogVisible = true;
    },
    submitNewCategory() {
      this.isLoading = true;

      const categoryData = {
        ...this.newCategory,
      };

      api.post('/api/categories', categoryData)
          .then(response => {
            if (response.data.code === 1) {
              this.dialogVisible = false;
              this.fetchCategoryData(); // 刷新类别列表
              ElMessage.success('创建类别成功');
            } else {
              console.error('Failed to create category');
              ElMessage.error('创建类别失败');
            }
          })
          .catch(error => {
            console.error('Error creating category:', error);
            ElMessage.error('创建类别失败');
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
    this.fetchCategoryData();
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

