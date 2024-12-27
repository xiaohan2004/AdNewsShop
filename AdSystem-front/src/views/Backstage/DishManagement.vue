<template>
  <div>
    <!-- Filtering and Add New Dish button -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <div style="display: flex; gap: 10px;">
        <el-select v-model="selectedCategory" placeholder="类别">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="category in categories" :key="category.categoryId" :label="category.categoryName" :value="category.categoryId"></el-option>
        </el-select>
        <el-select v-model="selectedEnabled" placeholder="是否启用">
          <el-option label="全部" value=""></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="showAddDialog" size="large">新增菜品</el-button>
    </div>

    <!-- Dish List -->
    <el-table :data="paginatedDishData" style="width: 100%" stripe>
      <el-table-column label="菜品编号" prop="dishId">
        <template #default="{ row }">
          <el-input v-if="row.isEditing" v-model="row.dishId" size="small" disabled></el-input>
          <span v-else>{{ row.dishId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name">
        <template #default="{ row }">
          <el-input v-if="row.isEditing" v-model="row.name" size="small" />
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" prop="img">
        <template #default="{ row }">
          <el-upload
              v-if="row.isEditing"
              class="avatar-uploader"
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="(file) => handleImageChange(file, row)"
          >
            <img v-if="row.img" :src="row.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <img v-else :src="row.img" style="width: 50px; height: 50px; object-fit: cover;">
        </template>
      </el-table-column>
      <el-table-column label="类别" prop="categoryId">
        <template #default="{ row }">
          <el-select
              v-if="row.isEditing"
              v-model="row.categoryId"
              size="small"
              placeholder="选择类别"
          >
            <el-option v-for="category in categories" :key="category.categoryId" :label="category.categoryName" :value="category.categoryId"></el-option>
          </el-select>
          <span v-else>{{ getCategoryName(row.categoryId) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="price">
        <template #default="{ row }">
          <el-input-number v-if="row.isEditing" v-model="row.price" size="small" :step="0.01" />
          <span v-else>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="description">
        <template #default="{ row }">
          <el-input v-if="row.isEditing" v-model="row.description" type="textarea" :rows="2" size="small" />
          <span v-else>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="启用" prop="enabled">
        <template #default="{ row }">
          <el-switch v-if="row.isEditing" v-model="row.enabled" size="small" />
          <span v-else>{{ row.enabled ? '启用' : '禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button v-if="!row.isEditing" size="small" type="primary" @click="row.isEditing = true">编辑</el-button>
          <el-button v-if="row.isEditing" size="small" type="success" @click="saveRow(row)">保存</el-button>
          <el-button size="small" type="danger" @click="deleteRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <div class="pagination-container" style="margin-top: 20px; text-align: right;">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredDishData.length"
      >
      </el-pagination>
    </div>

    <!-- Add New Dish Dialog -->
    <el-dialog v-model="dialogVisible" title="新增菜品" width="50%">
      <el-form :model="newDish" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="newDish.name" />
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="newDish.categoryId" placeholder="选择类别">
            <el-option v-for="category in categories" :key="category.categoryId" :label="category.categoryName" :value="category.categoryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="newDish.price" :step="0.01" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="newDish.description" type="textarea" />
        </el-form-item>
        <el-form-item label="启用">
          <el-switch v-model="newDish.enabled" />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
              class="avatar-uploader"
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleNewDishImageChange"
          >
            <img v-if="newDish.img" :src="newDish.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitNewDish" :loading="isLoading">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import api from "@/api/api";

export default {
  data() {
    return {
      dishData: [],
      dialogVisible: false,
      isLoading: false,
      categories: [],
      newDish: {
        name: '',
        categoryId: '',
        price: 0,
        description: '',
        enabled: true,
        img: null
      },
      currentPage: 1,
      pageSize: 6,
      selectedCategory: '',
      selectedEnabled: '',
      categoryMap: new Map(),
    };
  },
  created() {
    this.fetchDishData();
  },
  computed: {
    filteredDishData() {
      return this.dishData.filter(dish => {
        const categoryMatch = this.selectedCategory ? dish.categoryId === this.selectedCategory : true;
        const enabledMatch = this.selectedEnabled ? String(dish.isActive) === this.selectedEnabled : true;
        return categoryMatch && enabledMatch;
      });
    },
    paginatedDishData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredDishData.slice(start, end);
    }
  },
  methods: {
    fetchDishData() {
      Promise.all([
        api.get('/api/dishes'),
        api.get('/api/categories')
      ])
          .then(([dishesResponse, categoriesResponse]) => {
            if (dishesResponse.data.code === 1 && categoriesResponse.data.code === 1) {
              this.dishData = dishesResponse.data.data.map(dish => ({
                ...dish,
                isEditing: false,
                enabled: dish.isActive === 1
              }));
              this.categories = categoriesResponse.data.data;
              this.fetchCategoryDetails();
            } else {
              console.error('Failed to fetch data');
              ElMessage.error('获取数据失败');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            ElMessage.error('获取数据失败');
          });
    },
    fetchCategoryDetails() {
      const uniqueCategoryIds = [...new Set(this.dishData.map(dish => dish.categoryId))];
      const fetchPromises = uniqueCategoryIds.map(categoryId =>
          api.get(`/api/categories/${categoryId}`)
              .then(response => {
                if (response.data.code === 1) {
                  this.categoryMap.set(categoryId, response.data.data.categoryName);
                }
              })
              .catch(error => {
                console.error(`Error fetching category ${categoryId}:`, error);
              })
      );

      Promise.all(fetchPromises).then(() => {
        this.$forceUpdate();
      });
    },
    async uploadImage(file) {
      const formData = new FormData();
      formData.append('img', file);

      try {
        const response = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.code === 1) {
          return response.data.data; // Assuming this is the URL of the uploaded image
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        ElMessage.error('图片大小过大，上传失败');
        throw error;
      }
    },
    async saveRow(row) {
      this.isLoading = true;
      try {
        if (row.newImage) {
          const imageUrl = await this.uploadImage(row.newImage);
          row.img = imageUrl;
        }

        const response = await api.put(`/api/dishes/${row.dishId}`, {
          dishId: row.dishId,
          name: row.name,
          img: row.img,
          categoryId: row.categoryId,
          price: row.price,
          description: row.description,
          isActive: row.enabled ? 1 : 0,
        });

        if (response.data.code === 1) {
          row.isEditing = false;
          ElMessage.success('更新成功');
        } else {
          throw new Error('Failed to update dish');
        }
      } catch (error) {
        console.error('Error updating dish:', error);
        ElMessage.error('更新失败');
      } finally {
        this.isLoading = false;
      }
    },
    async submitNewDish() {
      this.isLoading = true;
      try {
        if (this.newDish.newImage) {
          const imageUrl = await this.uploadImage(this.newDish.newImage);
          this.newDish.img = imageUrl;
        }

        const response = await api.post('/api/dishes', {
          name: this.newDish.name,
          img: this.newDish.img,
          categoryId: this.newDish.categoryId,
          price: this.newDish.price,
          description: this.newDish.description,
          isActive: this.newDish.enabled ? 1 : 0,
        });

        if (response.data.code === 1) {
          this.dialogVisible = false;
          this.fetchDishData();
          ElMessage.success('创建菜品成功');
        } else {
          throw new Error('Failed to create dish');
        }
      } catch (error) {
        console.error('Error creating dish:', error);
        ElMessage.error('创建菜品失败');
      } finally {
        this.isLoading = false;
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.categoryId === categoryId);
      return category ? category.categoryName : 'Unknown';
    },
    showAddDialog() {
      this.dialogVisible = true;
      this.newDish = {
        name: '',
        categoryId: '',
        price: 0,
        description: '',
        enabled: true,
        img: null,
        newImage: null
      };
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleImageChange(file, row) {
      row.newImage = file.raw;
      row.img = URL.createObjectURL(file.raw);
    },
    handleNewDishImageChange(file) {
      this.newDish.newImage = file.raw;
      this.newDish.img = URL.createObjectURL(file.raw);
    },
    deleteRow(row) {
      ElMessageBox.confirm('确定要删除这个菜品吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.delete(`/api/dishes/${row.dishId}`)
            .then(response => {
              if (response.data.code === 1) {
                this.dishData = this.dishData.filter(dish => dish.dishId !== row.dishId);
                ElMessage.success('删除成功');
              } else {
                console.error('Failed to delete dish');
                ElMessage.error('删除失败');
              }
            })
            .catch(error => {
              console.error('Error deleting dish:', error);
              ElMessage.error('删除失败');
            });
      }).catch(() => {
        ElMessage.info('已取消删除');
      });
    }
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

.el-select {
  margin-right: 10px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

