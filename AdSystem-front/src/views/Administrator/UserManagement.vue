<template>
  <div>
    <!-- 筛选条件和增加按钮容器 -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <!-- 增加按钮，使用 flex-end 来让按钮右对齐 -->
      <el-button type="primary" @click="showAddDialog" size="small" style="margin-left: auto;">增加</el-button>
    </div>

    <!-- 浏览者信息列表 -->
    <el-table :data="paginatedUserData" style="width: 100%" stripe>
      <el-table-column label="浏览者编号" prop="id">
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

      <el-table-column label="cookie" prop="cookie">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.cookie"
              size="small"
              placeholder="请输入"
          ></el-input>
          <span v-else>{{ row.cookie }}</span>
        </template>
      </el-table-column>

      <el-table-column label="browserFingerprint" prop="browserFingerprint">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.browserFingerprint"
              size="small"
              placeholder="请输入"
          ></el-input>
          <span v-else>{{ row.browserFingerprint }}</span>
        </template>
      </el-table-column>


      <el-table-column label="游戏" prop="interestGames">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.interestGames"
              size="small"
              placeholder="请输入数量"
          ></el-input>
          <span v-else>{{ row.interestGames }}</span>
        </template>
      </el-table-column>

      <el-table-column label="电子产品" prop="interestDigitalProducts">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.interestDigitalProducts"
              size="small"
              placeholder="请输入数量"
          ></el-input>
          <span v-else>{{ row.interestDigitalProducts }}</span>
        </template>
      </el-table-column>

      <el-table-column label="汽车" prop="interestAutomotive">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.interestAutomotive"
              size="small"
              placeholder="请输入数量"
          ></el-input>
          <span v-else>{{ row.interestAutomotive }}</span>
        </template>
      </el-table-column>

      <el-table-column label="生活" prop="interestLifestyle">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.interestLifestyle"
              size="small"
              placeholder="请输入数量"
          ></el-input>
          <span v-else>{{ row.interestLifestyle }}</span>
        </template>
      </el-table-column>

      <el-table-column label="旅游" prop="interestTravel">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.interestTravel"
              size="small"
              placeholder="请输入数量"
          ></el-input>
          <span v-else>{{ row.interestTravel}}</span>
        </template>
      </el-table-column>

      <el-table-column label="娱乐" prop="interestEntertainment">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.interestEntertainment"
              size="small"
              placeholder="请输入数量"
          ></el-input>
          <span v-else>{{ row.interestEntertainment}}</span>
        </template>
      </el-table-column>

      <el-table-column label="美食" prop="interestFood">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.interestFood"
              size="small"
              placeholder="请输入数量"
          ></el-input>
          <span v-else>{{ row.interestFood}}</span>
        </template>
      </el-table-column>

      <el-table-column label="时尚" prop="interestFashion">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.interestFashion"
              size="small"
              placeholder="请输入数量"
          ></el-input>
          <span v-else>{{ row.interestFashion}}</span>
        </template>
      </el-table-column>

      <el-table-column label="健康" prop="interestHealth">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.interestHealth"
              size="small"
              placeholder="请输入数量"
          ></el-input>
          <span v-else>{{ row.interestHealth}}</span>
        </template>
      </el-table-column>

      <el-table-column label="体育" prop="interestSports">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.interestSports"
              size="small"
              placeholder="请输入数量"
          ></el-input>
          <span v-else>{{ row.interestSports}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="140" >
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
          :total="userData.length"
      >
      </el-pagination>
    </div>

    <!-- 添加浏览者对话框 -->
    <el-dialog title="添加新浏览者" v-model="dialogVisible" width="50%">
      <el-form :model="newUser" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="cookie">
              <el-input v-model="newUser.cookie"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Fingerprint">
              <el-input v-model="newUser.browserFingerprint"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="pre1">
              <el-input v-model="newUser.pre1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="pre2">
              <el-input v-model="newUser.pre2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="pre3">
              <el-input v-model="newUser.pre3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="pre4">
              <el-input v-model="newUser.pre4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="游戏">
              <el-input-number v-model="newUser.interestGames" :min="0" :max="100" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子产品">
              <el-input-number v-model="newUser.interestDigitalProducts" :min="0" :max="100" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="汽车">
              <el-input-number v-model="newUser.interestAutomotive" :min="0" :max="100" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生活">
              <el-input-number v-model="newUser.interestLifestyle" :min="0" :max="100" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="旅游">
              <el-input-number v-model="newUser.interestTravel" :min="0" :max="100" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="娱乐">
              <el-input-number v-model="newUser.interestEntertainment" :min="0" :max="100" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="美食">
              <el-input-number v-model="newUser.interestFood" :min="0" :max="100" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时尚">
              <el-input-number v-model="newUser.interestFashion" :min="0" :max="100" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="健康">
              <el-input-number v-model="newUser.interestHealth" :min="0" :max="100" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="体育">
              <el-input-number v-model="newUser.interestSports" :min="0" :max="100" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
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
import axios from "axios";
import { ElMessage } from 'element-plus';
import api from "@/api/api";

export default {
  name: "UserManagement",
  data() {
    return {
      selectedEnabled: "",
      userData: [],
      isLoading: false,
      dialogVisible: false,
      newUser: {
        cookie: '',
        browserFingerprint: '',
        pre1: '',
        pre2: '',
        pre3: '',
        pre4: '',
        interestGames: 0,
        interestDigitalProducts:0,
        interestAutomotive:0,
        interestLifestyle:0,
        interestTravel:0,
        interestEntertainment:0,
        interestFood:0,
        interestFashion:0,
        interestHealth:0,
        interestSports:0,
      },
      currentPage: 1,
      pageSize: 3
    };
  },
  computed: {
    filteredUserData() {
      return this.userData;
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
                id: user.id,
                cookie: user.cookie,
                browserFingerprint: user.browserFingerprint,
                pre1: user.pre1,
                pre2: user.pre2,
                pre3: user.pre3,
                pre4: user.pre4,
                interestGames: user.interestGames,
                interestDigitalProducts:user.interestDigitalProducts,
                interestAutomotive:user.interestAutomotive,
                interestLifestyle:user.interestLifestyle,
                interestTravel:user.interestTravel,
                interestEntertainment:user.interestEntertainment,
                interestFood:user.interestFood,
                interestFashion:user.interestFashion,
                interestHealth:user.interestHealth,
                interestSports:user.interestSports,
                isEditing: false,
              }));
              console.log('Total users:', this.userData.length);
            } else {
              console.error('Failed to fetch data');
              ElMessage.error('获取浏览者数据失败');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            ElMessage.error('获取浏览者数据失败');
          });
    },
    editRow(row) {
      row.isEditing = true;
    },
    saveRow(row) {
      api.put(`/api/users/${row.id}`, {
        id: row.id,
        cookie: row.cookie,
        browserFingerprint: row.browserFingerprint,
        pre1: row.pre1,
        pre2: row.pre2,
        pre3: row.pre3,
        pre4: row.pre4,
        interestGames: row.interestGames,
        interestDigitalProducts:row.interestDigitalProducts,
        interestAutomotive:row.interestAutomotive,
        interestLifestyle:row.interestLifestyle,
        interestTravel:row.interestTravel,
        interestEntertainment:row.interestEntertainment,
        interestFood:row.interestFood,
        interestFashion:row.interestFashion,
        interestHealth:row.interestHealth,
        interestSports:row.interestSports,
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
      api.delete(`/api/users/${row.id}`)
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
      api.post('/api/users', this.newUser)
          .then(response => {
            if (response.data.code === 1) {
              this.dialogVisible = false;
              this.fetchUserData(); // 刷新浏览者列表
              ElMessage.success('创建浏览者成功');
            } else {
              console.error('Failed to create user');
              ElMessage.error('创建浏览者失败');
            }
          })
          .catch(error => {
            console.error('Error creating user:', error);
            ElMessage.error('创建浏览者失败');
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



