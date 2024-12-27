<script setup>
import {ref} from 'vue';
import axios from 'axios';
import {ElMessage} from "element-plus";
import api from "@/api/api";
import router from "@/router";  // 导入 axios

// 定义表单输入数据
const account = ref('');
const password = ref('');
const confirmPassword = ref('');
const role = ref(''); // 角色选择，0 为管理员，1 为服务员
const checkCode = ref('');

// 定义验证函数
const validateForm = () => {
  if (!account.value || !password.value || !confirmPassword.value || !role.value) {
    alert('请填写所有字段');
    return false;
  }

  // 密码和确认密码要一致
  if (password.value !== confirmPassword.value) {
    alert('密码和确认密码不一致');
    return false;
  }

  if (checkCode.value !== 'xiaohan') {
    ElMessage.error('校验码错误');
    return false;
  }
  // 其他业务逻辑验证
  return true;
};

// 提交表单
const handleSubmit = async () => {
  if (validateForm()) {
    const user = {
      username: account.value,
      password: password.value,
      role: role.value === 'admin' ? 0 : 1,  // 映射为 0 或 1
      status: 1,  // 默认设置为 1
    };

    try {
      api.post('/userregister', user).then(response => {
        const {code, msg} = response.data;
        if (code === 1) {
          ElMessage.success('注册成功');
          // 注册成功后跳转到登录页面
          router.push('/internalStaff-login');
        } else {
          ElMessage.error(msg || '注册失败，请重试');
        }
      });
    } catch (error) {
      console.error('注册请求失败', error);
      alert('请求失败，请稍后再试');
    }
  }
};
</script>


<template>
  <div class="app-container">
    <!-- 全页面容器 -->
    <div class="register-container">
      <h2 class="title">用户注册</h2>
      <form @submit.prevent="handleSubmit" class="register-form">
        <div class="form-item">
          <label for="account">账号</label>
          <input type="text" id="account" v-model="account" placeholder="请输入账号" required/>
        </div>
        <div class="form-item">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="password" placeholder="请输入密码" required/>
        </div>
        <div class="form-item">
          <label for="confirmPassword">确认密码</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="确认密码" required/>
        </div>
        <div class="form-item">
          <label for="role">角色</label>
          <select id="role" v-model="role" required>
            <option value="" disabled selected>请选择角色</option>
            <option value="admin">管理员</option>
            <option value="staff">服务员</option>
          </select>
        </div>
        <div class="form-item">
          <label for="check">校验码</label>
          <input type="password" id="checkCode" v-model="checkCode" required/>
        </div>
        <div class="form-item">
          <button type="submit" class="submit-btn">注册</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* 使html和body的高度为100% */
html, body {
  height: 100%;
  margin: 0;
  padding: 0; /* 确保没有默认的边距 */
}

/* App容器，保证整个页面包裹 */
.app-container {
  height: 100vh; /* 使用视口高度，确保填满整个屏幕 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  background-color: white; /* 页面背景颜色 */
  background-image: radial-gradient(circle, #e8eaf6 10%, transparent 50%); /* 设置蓝色波点背景 */
  background-size: 20px 10px; /* 波点的大小和间距 */
  background-repeat: repeat; /* 使背景重复 */
  width: 100%; /* 让宽度填满屏幕 */
  box-sizing: border-box; /* 包含内边距和边框 */
}

/* 注册容器 */
.register-container {
  width: 100%;
  max-width: 400px;
  padding: 40px 20px; /* 增加上下内边距 */
  background-color: #e8eaf6; /* 设置表单背景色 */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center; /* 使整个容器内的内容居中 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中注册表单内容 */
  align-items: center; /* 水平居中注册表单内容 */
  box-sizing: border-box; /* 包含内边距和边框 */
}

/* 标题 */
.title {
  color: #3f51b5;
  font-size: 24px;
  margin-bottom: 20px;
}

/* 表单容器 */
.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center; /* 使输入框居中 */
}

/* 表单项 */
.form-item {
  display: flex;
  justify-content: flex-start; /* 左对齐文字 */
  align-items: center;
  width: 100%;
  max-width: 350px; /* 控制输入框最大宽度 */
}

.form-item label {
  font-size: 16px;
  color: #3f51b5;
  width: 30%; /* 控制标签宽度 */
  text-align: left; /* 标签靠左对齐 */
  margin-right: 10px; /* 标签和输入框之间的间距 */
}

.form-item input,
.form-item select {
  width: 60%; /* 控制输入框宽度 */
  padding: 10px;
  font-size: 14px;
  border: 1px solid #3f51b5;
  border-radius: 5px;
  outline: none;
}

.form-item input:focus,
.form-item select:focus {
  border-color: #1a237e;
}

/* 提交按钮 */
.submit-btn {
  width: 100%;
  max-width: 350px; /* 控制按钮最大宽度 */
  padding: 12px;
  background-color: #3f51b5;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #1a237e;
}

.submit-btn:focus {
  outline: none;
}
</style>

