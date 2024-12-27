<template>
  <div class="profile-container">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <h3>个人信息</h3>
      <el-menu :default-active="activeTab" class="profile-menu">
        <el-menu-item index="basic" @click="setActiveTab('basic')">基础信息</el-menu-item>
        <el-menu-item index="history" @click="setActiveTab('history')">消费历史</el-menu-item>
      </el-menu>
    </div>

    <!-- 内容区域 -->
    <div class="content-area">
      <!-- 基础信息 -->
      <div v-if="activeTab === 'basic'" class="basic-info">
        <el-form v-if="!loading" @submit.prevent="updateInfo" class="profile-form">
          <h2 class="section-title">基础信息</h2>
          <div class="form-row">
            <el-form-item label="客户编号" class="form-item">
              <el-input v-model="formData.customerId" disabled />
            </el-form-item>
            <el-form-item label="客户用户名" class="form-item">
              <el-input v-model="formData.name" />
            </el-form-item>
          </div>
          <div class="form-row">
            <el-form-item label="客户电话" class="form-item">
              <el-input v-model="formData.phone" />
            </el-form-item>
            <el-form-item label="客户电子邮件" class="form-item">
              <el-input v-model="formData.email" />
            </el-form-item>
          </div>
          <div class="form-row">
            <el-form-item label="客户地址" class="form-item">
              <el-input v-model="formData.address" />
            </el-form-item>
            <el-form-item label="注册日期" class="form-item">
              <el-input :value="formatDate(formData.registrationDate)" disabled />
            </el-form-item>
          </div>
          <div class="form-row">
            <el-form-item label="客户生日" class="form-item">
              <el-date-picker v-model="formData.birthday" type="date" placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="累计消费金额" class="form-item">
              <el-input v-model="formData.totalSpent" disabled />
            </el-form-item>
          </div>
          <div class="form-row">
            <el-form-item label="新密码" class="form-item">
              <el-input v-model="formData.newPassword" type="password" placeholder="输入新密码以更改" />
            </el-form-item>
            <el-form-item label="确认新密码" class="form-item">
              <el-input v-model="formData.confirmPassword" type="password" placeholder="再次输入新密码" />
            </el-form-item>
          </div>
          <el-button type="primary" native-type="submit">修改并提交</el-button>
        </el-form>
        <el-skeleton v-else :rows="8" animated />
      </div>

      <!-- 消费历史 -->
      <div v-if="activeTab === 'history'" class="purchase-history">
        <h2 class="section-title">消费历史</h2>
        <el-table :data="purchaseHistory" style="width: 100%">
          <el-table-column prop="purchaseId" label="消费记录编号" width="180"></el-table-column>
          <el-table-column prop="orderId" label="订单编号" width="180"></el-table-column>
          <el-table-column prop="purchaseDate" label="消费日期"></el-table-column>
          <el-table-column prop="totalAmount" label="总金额" width="150"></el-table-column>
          <el-table-column prop="paymentMethod" label="支付方式" width="150"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElSkeleton } from 'element-plus';
import api from '@/api/api';

function parseJWT(token) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format');
  }

  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));

  return { header, payload };
}

// 基本信息数据
const formData = ref({
  customerId: '',
  name: '',
  phone: '',
  email: '',
  address: '',
  registrationDate: '',
  birthday: '',
  totalSpent: '',
  newPassword: '',
  confirmPassword: ''
});

// 消费历史数据
const purchaseHistory = ref([]);

// 当前选中的tab
const activeTab = ref('basic');

// 加载状态
const loading = ref(true);

// 错误状态
const error = ref(null);

// 设置当前tab
const setActiveTab = (tab) => {
  activeTab.value = tab;
};

// 获取用户信息
const fetchCustomerInfo = async () => {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No token found');
    }

    const { payload } = parseJWT(token);
    const customerId = payload.customerId;

    const response = await api.get(`/api/customers/${customerId}`);
    if (response.data.code === 1) {
      const customerData = response.data.data;
      formData.value = {
        customerId: customerData.customerId,
        name: customerData.name,
        phone: customerData.phone,
        email: customerData.email,
        address: customerData.address,
        registrationDate: formatDate(customerData.registrationDate),
        birthday: customerData.birthday,
        totalSpent: customerData.totalSpent.toFixed(2),
        newPassword: '',
        confirmPassword: ''
      };
      return customerData;
    } else {
      throw new Error(response.data.msg || 'Failed to fetch customer info');
    }
  } catch (err) {
    console.error('Error fetching customer info:', err);
    error.value = '获取客户信息失败';
    ElMessage.error('获取客户信息失败');
  } finally {
    loading.value = false;
  }
};

// 获取消费历史
const fetchPurchaseHistory = async () => {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No token found');
    }

    const { payload } = parseJWT(token);
    const customerId = payload.customerId;

    const response = await api.get(`/api/purchase-history/customer/${customerId}`);
    if (response.data.code === 1) {
      purchaseHistory.value = response.data.data.map(item => ({
        ...item,
        purchaseDate: formatDate(item.purchaseDate),
        paymentMethod: formatPaymentMethod(item.paymentMethod)
      }));
    } else {
      throw new Error(response.data.msg || 'Failed to fetch purchase history');
    }
  } catch (err) {
    console.error('Error fetching purchase history:', err);
    ElMessage.error('获取消费历史失败');
  }
};

const formatPaymentMethod = (method) => {
  const methods = {
    0: '现金',
    1: '信用卡',
    2: '借记卡',
    3: '电子支付'
  };
  return methods[method] || '未知';
};

// 更新用户信息
const updateInfo = async () => {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No token found');
    }

    const { payload } = parseJWT(token);
    const customerId = payload.customerId;

    const updateData = {
      name: formData.value.name,
      phone: formData.value.phone,
      email: formData.value.email,
      address: formData.value.address,
      birthday: formData.value.birthday,
      registrationDate: formData.value.registrationDate,
      totalSpent: parseFloat(formData.value.totalSpent)
    };

    if (formData.value.newPassword) {
      if (formData.value.newPassword !== formData.value.confirmPassword) {
        ElMessage.error('新密码和确认密码不匹配');
        return;
      }
      updateData.password = formData.value.newPassword;
    }

    console.log('Sending update data:', updateData); // Add this line for debugging

    const response = await api.put(`/api/customers/${customerId}`, updateData);
    if (response.data.code === 1) {
      ElMessage.success('信息已更新!');
      formData.value.newPassword = '';
      formData.value.confirmPassword = '';

      // 重新获取用户信息以确保数据是最新的
      await fetchCustomerInfo();
    } else {
      throw new Error(response.data.msg || 'Failed to update customer info');
    }
  } catch (err) {
    console.error('Error updating customer info:', err);
    ElMessage.error('更新信息失败: ' + (err.response?.data?.msg || err.message));
  }
};

onMounted(() => {
  fetchCustomerInfo();
  fetchPurchaseHistory();
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.getFullYear() + '-' +
      String(date.getMonth() + 1).padStart(2, '0') + '-' +
      String(date.getDate()).padStart(2, '0') + 'T' +
      String(date.getHours()).padStart(2, '0') + ':' +
      String(date.getMinutes()).padStart(2, '0') + ':' +
      String(date.getSeconds()).padStart(2, '0');
};
</script>



<style scoped>
.profile-container {
  display: flex;
  height: 100%;
  background-color: #fff3e0;
}

.sidebar {
  width: 250px;
  padding: 20px;
  background-color: #f57c00;
  color: white;
}

.sidebar h3 {
  margin-bottom: 10px;
  padding-bottom: 15px;
}

.profile-menu {
  background-color: transparent;
  border: none;
}

.profile-menu .el-menu-item {
  color: white;
  font-size: 16px;
}

.profile-menu .el-menu-item:hover,
.profile-menu .el-menu-item.is-active {
  background-color: #e65100;
  color: white;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #f57c00;
  margin-bottom: 30px;
  text-align: left;
}

.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  height: 100%;
}

.basic-info {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.profile-form {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.form-item {
  flex: 1 1 calc(50% - 20px);
  min-width: 250px;
}

:deep(.el-form-item__label) {
  font-size: 16px;
  color: #f57c00;
  font-weight: bold;
}

:deep(.el-input__inner) {
  border-color: #f57c00;
  border-radius: 4px;
}

:deep(.el-input__inner:focus) {
  border-color: #e65100;

}

:deep(.el-date-editor.el-input),
:deep(.el-date-editor.el-input__inner) {
  width: 100%;
}

.el-button--primary {
  margin-top: 30px;
  background-color: #f57c00;
  border-color: #f57c00;
  color: white;
  padding: 12px;
  font-size: 18px;
  width: 100%;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.el-button--primary:hover,
.el-button--primary:focus {
  background-color: #e65100;
  border-color: #e65100;
  transform: translateY(-2px);
}

.purchase-history {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.purchase-history .el-table th {
  background-color: #f57c00;
  color: white;
}

.purchase-history .el-table td {
  color: #333;
}
</style>

