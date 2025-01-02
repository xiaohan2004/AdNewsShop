<template>
  <div>
    <!-- 筛选条件和增加按钮容器 -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <!-- 增加按钮，使用 flex-end 来让按钮右对齐 -->
      <el-button type="primary" @click="showAddDialog" size="small" style="margin-left: auto;">增加</el-button>
    </div>

    <!-- 广告信息列表 -->
    <el-table :data="paginatedAdvertisementData" style="width: 100%" stripe>
      <el-table-column label="广告编号" prop="id">
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

      <el-table-column label="标题" prop="title">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.title"
              size="small"
              placeholder="请输入标题"
          ></el-input>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="内容" prop="content">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.content"
              size="small"
              placeholder="请输入内容"
          ></el-input>
          <span v-else>{{ row.content }}</span>
        </template>
      </el-table-column>

      <el-table-column label="类型" prop="adType">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.adType"
              size="small"
              placeholder="请输入类型"
          ></el-input>
          <span v-else>{{ row.adType }}</span>
        </template>
      </el-table-column>

      <el-table-column label="图片" prop="imageUrl">
        <template #default="{ row }">
          <el-upload
              v-if="row.isEditing"
              class="avatar-uploader"
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="(file) => handleImageChange(file, row)"
          >
            <img v-if="row.imageUrl" :src="row.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <img v-else :src="row.imageUrl" style="width: 50px; height: 50px; object-fit: cover;">
        </template>
      </el-table-column>

      <el-table-column label="广告商编号" prop="advertiserId">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.advertiserId"
              size="small"
              placeholder="请输入广告商编号"
          ></el-input>
          <span v-else>{{ row.advertiserId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="请求次数" prop="requesttimes">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.requesttimes"
              size="small"
              placeholder="请输入请求次数"
          ></el-input>
          <span v-else>{{ row.requesttimes}}</span>
        </template>
      </el-table-column>

      <el-table-column label="点击次数" prop="clicktimes">
        <template #default="{ row }">
          <el-input
              v-if="row.isEditing"
              v-model="row.clicktimes"
              size="small"
              placeholder="请输入点击次数"
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
          :total="advertisementData.length"
      >
      </el-pagination>
    </div>

    <!-- 添加广告对话框 -->
    <el-dialog title="添加新广告" v-model="dialogVisible" width="30%">
      <el-form :model="newAdvertisement" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="newAdvertisement.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="newAdvertisement.content"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-input v-model="newAdvertisement.adType"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
              class="avatar-uploader"
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleNewAdvertisementImageChange"
          >
            <img v-if="newAdvertisement.imageUrl" :src="newAdvertisement.imageUrl" class="avatar">
            <img v-else src="https://pic.616pic.com/ys_bnew_img/00/46/51/qGEhxCt0bx.jpg" class="avatar-uploader-icon">
          </el-upload>
        </el-form-item>
        <el-form-item label="广告商编号">
          <el-input v-model="newAdvertisement.advertiserId"></el-input>
        </el-form-item>
        <el-form-item label="请求次数">
          <el-input v-model="newAdvertisement.requesttimes"></el-input>
        </el-form-item>
        <el-form-item label="点击次数">
          <el-input v-model="newAdvertisement.clicktimes"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitNewAdvertisement">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import api from "@/api/api"

export default {
  name: "AdvertisementManagement",
  setup() {
    const advertisementData = ref([])
    const isLoading = ref(false)
    const dialogVisible = ref(false)
    const newAdvertisement = ref({
      title: '',
      content: '',
      adType: '',
      imageUrl: '',
      advertiserId: '',
      requesttimes:0,
      clicktimes: 0,
    })
    const currentPage = ref(1)
    const pageSize = ref(7)
    const error = ref(null) // Added error variable
    const loading = ref(true) // Added loading variable


    const filteredAdvertisementData = computed(() => advertisementData.value)
    const paginatedAdvertisementData = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value
      const end = start + pageSize.value
      return filteredAdvertisementData.value.slice(start, end)
    })

    const fetchAdvertisementData = async () => {
      try {
        const response = await api.get('/api/advertisements') // Changed to fetch all advertisements
        if (response.data.code === 1) {
          advertisementData.value = response.data.data.map(advertisement => ({
            ...advertisement,
            isEditing: false,
          }))
          console.log('Total advertisements:', advertisementData.value.length)
        } else {
          throw new Error('Failed to fetch data')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        ElMessage.error('获取广告数据失败')
      } finally {
        loading.value = false; // Update loading status after fetching data
      }
    }

    const editRow = (row) => {
      row.isEditing = true
    }

    const uploadImage = async (file) => {
      const formData = new FormData();
      formData.append('img', file);  // 这里将字段名改为 'img'

      try {
        const response = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // 保持这个 Content-Type 设置
          },
        });

        if (response.data.code === 1) {
          return response.data.data;  // 返回图片URL或其他数据
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        ElMessage.error('图片上传失败');
        throw error;  // 抛出异常供调用方捕获
      }
    };


    const saveRow = async (row) => {
      isLoading.value = true
      try {
        if (row.newImage) {
          const imageUrl = await uploadImage(row.newImage)
          row.imageUrl = imageUrl
        }

        const response = await api.put(`/api/advertisements/${row.id}`, {
          id: row.id,
          title: row.title,
          content: row.content,
          adType: row.adType,
          imageUrl: row.imageUrl,
          advertiserId: row.advertiserId,
          requesttimes:row.requesttimes,
          clicktimes:row.clicktimes,
        })
        if (response.data.code === 1) {
          row.isEditing = false
          ElMessage.success('更新成功')
        } else {
          throw new Error('Failed to update advertisement')
        }
      } catch (error) {
        console.error('Error updating advertisement:', error)
        ElMessage.error('更新失败')
      } finally {
        isLoading.value = false
      }
    }

    const deleteRow = async (row) => {
      try {
        const response = await api.delete(`/api/advertisements/${row.id}`)
        if (response.data.code === 1) {
          advertisementData.value = advertisementData.value.filter(ad => ad.id !== row.id)
          ElMessage.success('删除成功')
        } else {
          throw new Error('Failed to delete advertisement')
        }
      } catch (error) {
        console.error('Error deleting advertisement:', error)
        ElMessage.error('删除失败')
      }
    }

    const showAddDialog = () => {
      dialogVisible.value = true
    }

    const submitNewAdvertisement = async () => {
      isLoading.value = true
      try {
        if (newAdvertisement.value.newImage) {
          const imageUrl = await uploadImage(newAdvertisement.value.newImage)
          newAdvertisement.value.imageUrl = imageUrl
        }

        const response = await api.post('/api/advertisements', newAdvertisement.value)
        if (response.data.code === 1) {
          dialogVisible.value = false
          await fetchAdvertisementData()
          ElMessage.success('创建广告成功')
        } else {
          throw new Error('Failed to create advertisement')
        }
      } catch (error) {
        console.error('Error creating advertisement:', error)
        ElMessage.error('创建广告失败')
      } finally {
        isLoading.value = false
      }
    }

    const handleSizeChange = (val) => {
      pageSize.value = val
      currentPage.value = 1
    }

    const handleCurrentChange = (val) => {
      currentPage.value = val
    }

    const handleImageChange = (file, row) => {
      row.newImage = file.raw
      row.imageUrl = URL.createObjectURL(file.raw)
    }

    const handleNewAdvertisementImageChange = (file) => {
      newAdvertisement.value.newImage = file.raw
      newAdvertisement.value.imageUrl = URL.createObjectURL(file.raw)
    }

    onMounted(() => {
      fetchAdvertisementData()
    })

    return {
      advertisementData,
      paginatedAdvertisementData,
      isLoading,
      dialogVisible,
      newAdvertisement,
      currentPage,
      pageSize,
      error, // Added error to return
      loading, // Added loading to return
      editRow,
      saveRow,
      deleteRow,
      showAddDialog,
      submitNewAdvertisement,
      handleSizeChange,
      handleCurrentChange,
      handleImageChange,
      handleNewAdvertisementImageChange,
    }
  }
}
</script>

<style scoped>
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
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>



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

