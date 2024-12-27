<template>
  <div class="app-container">
    <div class="register-container">
      <h2 class="title">用户注册</h2>
      <form @submit.prevent="handleSubmit" class="register-form">
        <div class="form-item">
          <label for="name">姓名</label>
          <input type="text" id="name" v-model="customer.name" placeholder="请输入姓名" required/>
        </div>
        <div class="form-item">
          <label for="phone">手机号</label>
          <input type="text" id="phone" v-model="customer.phone" placeholder="请输入手机号" required/>
        </div>
        <div class="form-item">
          <label for="email">邮箱</label>
          <input type="email" id="email" v-model="customer.email" placeholder="请输入邮箱" required/>
        </div>
        <div class="form-item">
          <label for="address">地址</label>
          <input type="text" id="address" v-model="customer.address" placeholder="请输入地址" required/>
        </div>
        <div class="form-item">
          <label for="birthday">生日</label>
          <input
              type="text"
              id="birthday"
              ref="birthdayInput"
              v-model="customer.birthday"
              placeholder="YYYY-MM-DD"
              @focus="handleBirthdayFocus"
              @blur="handleBirthdayBlur"
              required
          />
        </div>
        <div class="form-item">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="customer.password" placeholder="请输入密码" required/>
        </div>
        <div class="form-item">
          <label for="confirmPassword">确认密码</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="确认密码" required/>
        </div>
        <div class="form-item">
          <button type="submit" class="submit-btn">注册</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from "element-plus";
import { format } from 'date-fns'
import api from "@/api/api";
import router from "@/router";

const customer = ref({
  name: '',
  password: '',
  phone: '',
  email: '',
  address: '',
  birthday: '',
});

const confirmPassword = ref('');
const birthdayInput = ref(null);

onMounted(() => {
  if (birthdayInput.value) {
    birthdayInput.value.type = 'text';
    birthdayInput.value.placeholder = 'YYYY-MM-DD';
  }
});

const handleBirthdayFocus = (event) => {
  event.target.type = 'date';
};

const handleBirthdayBlur = (event) => {
  if (!event.target.value) {
    event.target.type = 'text';
  }
};

const validateForm = () => {
  if (!customer.value.name || !customer.value.password || !customer.value.phone || !customer.value.email || !customer.value.address || !customer.value.birthday) {
    ElMessage.error('请填写所有字段');
    return false;
  }

  const phoneRegex = /^[0-9]{11}$/;
  if (!phoneRegex.test(customer.value.phone)) {
    ElMessage.error('请输入有效的手机号');
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(customer.value.email)) {
    ElMessage.error('请输入有效的邮箱地址');
    return false;
  }

  if (customer.value.password !== confirmPassword.value) {
    ElMessage.error('密码和确认密码不一致');
    return false;
  }

  return true;
};

const handleSubmit = () => {
  if (validateForm()) {
    try {
      const formattedCustomer = {
        ...customer.value,
        birthday: format(new Date(customer.value.birthday), 'yyyy-MM-dd'),
        registrationDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
        totalSpent: 0
      };

      api.post('/customerregister', formattedCustomer).then(response => {
        const { code, msg } = response.data;
        if (code === 1) {
          ElMessage.success('注册成功');
          router.push('/customer-login');
        } else {
          ElMessage.error(msg || '注册失败，请重试');
        }
      });
    } catch (error) {
      console.error('注册失败:', error);
      ElMessage.error('注册请求失败，请检查网络连接');
    }
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.app-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  background-image: radial-gradient(circle, #fff3e0 10%, transparent 50%);
  background-size: 20px 10px;
  background-repeat: repeat;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
}

.register-container {
  width: 100%;
  max-width: 600px;
  padding: 40px;
  background-color: #fff3e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.title {
  color: #f57c00;
  font-size: 24px;
  margin-bottom: 20px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100%;
}

.form-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.form-item label {
  font-size: 16px;
  color: #f57c00;
  margin-bottom: 5px;
}

.form-item input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #f57c00;
  border-radius: 5px;
  outline: none;
}

.form-item input:focus {
  border-color: #e65100;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #f57c00;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #e65100;
}

.submit-btn:focus {
  outline: none;
}

@media (min-width: 768px) {
  .form-item {
    flex-direction: row;
    align-items: center;
  }

  .form-item label {
    width: 30%;
    margin-bottom: 0;
    margin-right: 10px;
  }

  .form-item input {
    width: 70%;
  }
}
</style>