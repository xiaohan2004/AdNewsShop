<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 左侧走马灯 -->
      <div class="carousel-area">
        <ImageCarousel :items="carouselItems" :height="300" :width="300" />
      </div>

      <!-- 右侧登录表单 -->
      <div class="form-area">
        <h2 class="login-title">广告推送管理系统</h2>

        <el-form :model="{ username, password, role }" class="login-form">
          <el-form-item label="账号" required>
            <el-input
                v-model="username"
                placeholder="请输入账号"
                clearable
                prefix-icon="el-icon-user"
            />
          </el-form-item>

          <el-form-item label="密码" required>
            <el-input
                v-model="password"
                placeholder="请输入密码"
                type="password"
                show-password
                clearable
                prefix-icon="el-icon-lock"
            />
          </el-form-item>

          <el-form-item label="身份">
            <el-radio-group v-model="role">
              <el-radio label="admin">管理员</el-radio>
              <el-radio label="advertiser">广告商</el-radio>
              <el-radio label="websiteOperator">互联网站长</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <!-- 按钮容器，登录和注册按钮并排显示 -->
            <div class="button-container">
              <!-- 登录按钮 -->
              <el-button type="primary" block @click="handleLogin">登录</el-button>
              <!-- 注册按钮 -->
              <el-button type="text" @click="goToRegister">注册</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import api from "@/api/api";
import ImageCarousel from "@/components/ImageCarousel.vue";

// 轮播图数据
const carouselItems = ref([
  { id: 1, imageUrl: 'https://img1.baidu.com/it/u=2858330742,3003911759&fm=253&fmt=auto&app=138&f=JPEG?w=660&h=440', altText: 'Image 1' },
  { id: 2, imageUrl: 'https://pic.52112.com/2019/05/10/EPS-190510_31/4BgoqDahzU_small.jpg', altText: 'Image 2' },
  { id: 3, imageUrl: 'https://pic.52112.com/2019/11/13/EPS-191113_334/SOprKaOvmK_small.jpg', altText: 'Image 3' },
  { id: 4, imageUrl: 'https://pic.52112.com/2019/11/13/EPS-191113_334/CuS4tanRuo_small.jpg', altText: 'Image 4' },
]);

// 表单数据
const username = ref('');
const password = ref('');
const role = ref('admin'); // 默认选择管理员

// 获取路由实例
const router = useRouter();

// 登录方法
const handleLogin = async () => {
  if (!username.value || !password.value) {
    ElMessage.error('请输入账号和密码');
    return;
  }

  let loginUrl;
  switch (role.value) {
    case 'admin':
      loginUrl = '/administratorlogin';
      break;
    case 'advertiser':
      loginUrl = '/advertiserlogin';
      break;
    case 'websiteOperator':
      loginUrl = '/websiteoperatorlogin';
      break;
    default:
      ElMessage.error('无效的角色选择');
      return;
  }

  try {
    const response = await api.post(loginUrl, {
      username: username.value,
      password: password.value
    });

    const { code, msg, data } = response.data;

    if (code === 1) {
      // 登录成功
      ElMessage.success(`登录成功！身份：${getRoleName(role.value)}`);

      // 保存 JWT 到本地存储，data 直接就是 JWT
      localStorage.setItem('jwt', data);

      // 根据角色跳转到不同页面
      if (role.value === 'admin') {
        goToPage('/admin-dashboard');  // 管理员跳转到管理员主页
      }
      else if (role.value === 'advertiser') {
        goToPage('/advertiser-dashboard');  // 广告商跳转到广告商主页
      }
      else if (role.value === 'websiteOperator') {
        goToPage('/websiteOperator-dashboard');  // 网站长跳转到网站长主页
      }
    } else {
      // 登录失败
      ElMessage.error(msg || '登录失败，请重试');
    }
  } catch (error) {
    console.error('登录请求失败:', error);
    ElMessage.error('登录请求失败，请检查网络连接');
  }
};

// 获取角色名称
const getRoleName = (role) => {
  switch (role) {
    case 'admin':
      return '管理员';
    case 'advertiser':
      return '广告商';
    case 'websiteOperator':
      return '互联网站长';
    default:
      return '未知角色';
  }
};

// 跳转方法
const goToPage = (path) => {
  router.push(path).catch(err => {
    console.error("跳转失败:", err);
  });
};

// 注册方法：根据角色跳转到不同的注册页面
const goToRegister = () => {
  if (role.value === 'admin') {
    goToPage('/administrator-register');  // 管理员注册页面
  } else if (role.value === 'advertiser') {
    goToPage('/advertiser-register');  // 广告商注册页面
  } else if (role.value === 'websiteOperator') {
    goToPage('/websiteOperator-register');  // 网站长注册页面
  }
};
</script>


<style scoped>
/* 登录页面布局 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f8ff; /* 背景色改为浅蓝色 */
}

.login-box {
  display: flex;
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 700px; /* 最大宽度，防止内容撑开 */
  width: 100%; /* 宽度自适应 */
  box-sizing: border-box;
}

/* 左侧走马灯区域样式 */
.carousel-area {
  width: 300px;
  margin-right: 20px;
}

.carousel-text {
  color: #ffffff; /* 文本颜色改为白色 */
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
  font-size: 20px;
}

.el-carousel__item {
  background-color: #a8c7f7; /* 使用浅蓝色作为背景 */
  border-radius: 8px; /* 圆角效果 */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease; /* 过渡效果 */
}

.el-carousel__item:hover {
  background-color: #87b7f1; /* 悬停时变为更亮的蓝色 */
}

.el-carousel__item:nth-child(2n) {
  background-color: #b9d8ff; /* 第二项使用较浅的蓝色 */
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #a8c7f7; /* 第一项使用主色调的浅蓝色 */
}

/* 右侧表单区域样式 */
.form-area {
  flex: 1;
  text-align: center;
}

.login-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* 输入框样式 */
.el-input__inner {
  width: 100%; /* 保证输入框宽度适应容器 */
  max-width: 400px; /* 输入框最大宽度 */
  border-radius: 8px;
  border-color: #7a9eff; /* 更柔和的蓝色边框 */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.el-input__inner:focus {
  border-color: #87b7f1; /* 输入框聚焦时边框变亮蓝色 */
  box-shadow: 0 0 6px rgba(64, 158, 255, 0.5);
}

/* 按钮容器，居中排列 */
.button-container {
  display: flex;
  justify-content: center;
  gap: 10px; /* 按钮之间的间距 */
  margin-top: 20px;
}

.el-button--primary {
  background-color: #7a9eff; /* 更柔和的按钮蓝色 */
  border-color: #7a9eff; /* 按钮边框蓝色 */
  color: white;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
}

.el-button--primary:hover {
  background-color: #87b7f1; /* 悬停时按钮变为更亮的蓝色 */
}

.el-button--text {
  color: #7a9eff; /* 注册按钮文本蓝色 */
}

/* 保证表单项的间距一致 */
.el-form-item {
  margin-bottom: 16px;
}

.login-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #7a9eff;
}

/* 右上角订餐系统链接样式 */
.order-link {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 16px;
  color: #7a9eff;
  cursor: pointer;
}

.order-link:hover {
  text-decoration: underline;
}
</style>



