<template>
  <div class="reservation-container">
    <!-- 头部 -->
    <div class="header">
      <div style="width: 150px; text-align: center; font-weight: bold; color: dodgerblue;"></div>
      <div style="flex: 1;"></div>
      <div style="width: 100px;">
        <el-dropdown>
          <span class="el-dropdown-link">
            用户
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goToPage('/customer/customer-user')">个人信息</el-dropdown-item>
              <el-dropdown-item @click="goToPage('/customer-login')">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- 标题 -->
    <h2 class="reservation-title">在线预定~o( =∩ω∩= )m</h2>

    <div class="reservation-form">
      <!-- 选择区域 -->
      <el-form-item label="选择区域">
        <el-select v-model="reservation.area" placeholder="请选择预定区域" @change="handleAreaChange">
          <el-option label="大厅" value="0" />
          <el-option label="包间" value="1" />
          <el-option label="私密房间" value="2" />
        </el-select>
      </el-form-item>

      <!-- 餐桌选择 -->
      <el-form-item label="选择餐桌">
        <el-select v-model="reservation.tableId" placeholder="请选择餐桌" :disabled="!reservation.area">
          <el-option v-for="table in filteredTables" :key="table.tableId" :label="table.tableId.toString()" :value="table.tableId" />
        </el-select>
      </el-form-item>

      <!-- 预定时间 -->
      <el-form-item label="预定时间">
        <el-date-picker
            v-model="reservation.reservationTime"
            type="datetime"
            placeholder="选择预定时间"
            :disabled-date="disabledDate"
        />
      </el-form-item>

      <!-- 预定需求 -->
      <el-form-item label="预定需求">
        <el-input v-model="reservation.specialRequests" placeholder="请输入您的特殊需求（例如，过敏信息、座位要求等）" />
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitReservation">提交预定</el-button>
      </el-form-item>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import api from '@/api/api'

const router = useRouter()

// 跳转到个人信息页面
const goToPage = (path) => {
  router.push(path)
}

// JWT解析函数
function parseJWT(token) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format');
  }

  const payload = JSON.parse(atob(parts[1]));
  return payload;
}

// 预定数据
const reservation = ref({
  customerId: null,
  area: '',
  tableId: null,
  reservationTime: '',
  specialRequests: '',
  status: 0 // 默认状态为0（待确认）
});

// 餐桌数据
const tables = ref([]);

// 当前选择的区域对应的桌号
const filteredTables = ref([]);

// 获取餐桌数据
const fetchTableData = async () => {
  try {
    const response = await api.get('/api/tables');
    if (response.data.code === 1) {
      tables.value = response.data.data.map(table => ({
        tableId: table.tableId,
        status: table.status,
        location: table.location
      }));
    } else {
      console.error('Failed to fetch table data');
      ElMessage.error('获取餐桌数据失败');
    }
  } catch (error) {
    console.error('Error fetching table data:', error);
    ElMessage.error('获取餐桌数据失败');
  }
};

// 根据区域筛选桌号
const filterTables = () => {
  if (reservation.value.area !== '') {
    filteredTables.value = tables.value.filter(table =>
        table.location.toString() === reservation.value.area && table.status === 0
    );
  } else {
    filteredTables.value = [];
  }
};

// 处理区域变化
const handleAreaChange = () => {
  reservation.value.tableId = null; // 重置选中的餐桌
  filterTables();
};

// 禁止选择过去的日期
const disabledDate = (date) => {
  return date.getTime() < Date.now();
};

// 手动格式化日期为 yyyy-MM-dd HH:mm:ss
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

// 提交预定
const submitReservation = async () => {
  if (!reservation.value.tableId || !reservation.value.reservationTime) {
    return ElMessage.error('请填写完整的预定信息');
  }

  // 手动格式化时间
  const formattedTime = formatDate(reservation.value.reservationTime);

  // 将格式化后的时间更新到reservation对象中
  reservation.value.reservationTime = formattedTime;

  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No token found');
    }

    const payload = parseJWT(token);
    reservation.value.customerId = payload.customerId;

    const response = await api.post('/api/reservations', reservation.value);
    if (response.data.code === 1) {
      ElMessage.success('预定成功！');
      // 重置表单
      reservation.value = {
        customerId: null,
        area: '',
        tableId: null,
        reservationTime: '',
        specialRequests: '',
        status: 0
      };
    } else {
      throw new Error(response.data.msg || 'Failed to submit reservation');
    }
  } catch (error) {
    console.error('Error submitting reservation:', error);
    ElMessage.error('预定失败，请稍后重试');
  }
};

onMounted(() => {
  fetchTableData();
});
</script>

<style scoped>
/* 页面布局 */
.reservation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff3e0; /* 橙黄色背景 */
  min-height: 100vh;
  height: 100% !important;
}


.reservation-title {
  font-size: 32px;
  color: #f57c00;
  margin-bottom: 30px;
  margin-top: 80px;
}

.reservation-form {
  width: 100%;
  max-width: 600px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 表单项样式 */
.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
  background-color: #f57c00;
  border-color: #f57c00;
}

.el-button:hover {
  background-color: #e65100;
}

.el-select, .el-date-picker, .el-input {
  width: 100%;
}

.header {
  width: 100%;  /* 占满整行 */
  height: 60px; /* 调整头栏高度，增加一些空间 */
  position: fixed; /* 固定在页面顶部 */
  top: 0;  /* 置顶 */
  left: 0; /* 确保从左侧开始 */
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 左右对齐内容 */
  padding: 0 20px; /* 左右内边距，保持内容不贴边 */
  background-color: #ff9800; /* 橙黄色背景 */
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px); /* 波点背景 */
  background-size: 10px 10px; /* 控制波点大小 */
  z-index: 1000; /* 保证头部在最上层 */
}

.el-dropdown-link:focus {
  outline: none;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}


.el-dropdown-link:focus {
  outline: none;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

/* 按钮样式 */
.buttons {
  display: flex;
  justify-content: flex-start; /* 更紧凑的布局 */
  gap: 10px; /* 设置按钮之间的间距 */
  width: 130px; /* 可以适当缩小容器宽度 */
  margin-left: auto; /* 将按钮放置到右边 */
}

.circle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%; /* 圆形按钮 */
  background-color: #fff3e0; /* 淡黄色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #ff9800;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.circle-btn:hover {
  background-color: #ffe0b2; /* 悬停时稍微深一些的黄色 */
}
</style>

