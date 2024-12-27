<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 右上角管理系统链接 -->
      <div class="admin-link">
        <el-link @click="goToAdminSystem">管理系统</el-link>
      </div>

      <!-- 左侧走马灯 -->
      <div class="carousel-area">
        <ImageCarousel :items="carouselItems" :height="300" :width="300" />
      </div>

      <!-- 右侧登录表单 -->
      <div class="form-area">
        <h2 class="login-title">欢迎来到订餐系统<br>━(*｀∀´*)ノ亻!</h2>

        <el-form :model="{ name, password }" class="login-form">
          <el-form-item label="账号" required>
            <el-input
                v-model="name"
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

          <el-form-item>
            <!-- 登录按钮 -->
            <div class="button-container">
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
import {ref} from 'vue';
import {ElMessage} from 'element-plus';
import {useRouter} from 'vue-router';
import api from "@/api/api";
import ImageCarousel from "@/components/ImageCarousel.vue";

// 表单数据
const name = ref('');
const password = ref('');

// 轮播图数据
const carouselItems = ref([
  { id: 1, imageUrl: 'https://ts1.cn.mm.bing.net/th/id/R-C.b3a7697d2793ba094a861d546c31190d?rik=NevOIW4XmkUuMA&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f50069%2f5445.jpg_wh1200.jpg&ehk=wuLPicg%2b9wXz8QAwp%2fAVFBtJQ6loBUiVfQZu2bbZODA%3d&risl=&pid=ImgRaw&r=0', altText: 'Image 1' },
  { id: 2, imageUrl: 'https://ts1.cn.mm.bing.net/th/id/R-C.802a0a8b66b9965de3fd49b33c970bea?rik=C%2fArDzfQPNA%2bVg&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f50014%2f9021.jpg_wh1200.jpg&ehk=MTs%2biICdAdXvbOYNkToV9AsVYT1Z%2fkC9T3eH%2fCQSlq4%3d&risl=&pid=ImgRaw&r=0', altText: 'Image 2' },
  { id: 3, imageUrl: 'https://ts1.cn.mm.bing.net/th/id/R-C.27cc12852d74bd9f8b86285fb5645723?rik=NnLHyob2rqjoWw&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f50127%2f2949.jpg_wh1200.jpg&ehk=OoCG2Q6HaRnNV8FKHgYH82oE%2fPKZ1cGLcRZ38AOcdoA%3d&risl=&pid=ImgRaw&r=0', altText: 'Image 3' },
  { id: 4, imageUrl: 'https://bpic.588ku.com/back_origin_min_pic/21/03/30/08b5c525d7ead8dfae119bbdffa9bc8c.jpg', altText: 'Image 4' },
]);

// 获取路由实例
const router = useRouter();

// 登录方法
const handleLogin = async () => {
  if (!name.value || !password.value) {
    ElMessage.error('请输入账号和密码');
    return;
  }

  let loginUrl = '/customerlogin'; // Remove the base URL as it's already set in the api instance

  try {
    const response = await api.post(loginUrl, {
      name: name.value,
      password: password.value
    });

    const {code, msg, data} = response.data;

    if (code === 1) {
      // 登录成功
      ElMessage.success(`登录成功！欢迎你，${name.value}`);

      // 保存 JWT 到本地存储，data 直接就是 JWT
      localStorage.setItem('jwt', data);
      goToPage('/customer-selection');
    } else {
      // 登录失败
      ElMessage.error(msg || '登录失败，请重试');
    }
  } catch (error) {
    console.error('登录请求失败:', error);
    ElMessage.error('登录请求失败，请检查网络连接');
  }
};

// 跳转方法
const goToPage = (path) => {
  router.push(path).catch(err => {
    console.error("跳转失败:", err);
  });
};

// 注册方法
const goToRegister = () => {
  goToPage('/customer-register'); // 假设注册页面路径为 /register
};

// 跳转到管理系统页面
const goToAdminSystem = () => {
  goToPage('/internalStaff-login');
};
</script>

<style scoped>
/* 登录页面布局 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff3e0; /* 橙黄色背景 */
}

.login-box {
  display: flex;
  background: white;
  padding: 40px;
  border-radius: 8px;
  max-width: 700px; /* 最大宽度，防止内容撑开 */
  width: 100%; /* 宽度自适应 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 左侧走马灯区域样式 */
.carousel-area {
  width: 300px;
  margin-right: 20px;
}

.carousel-text {
  color: #f57c00; /* 橙色字体 */
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #ffb74d; /* 橙色背景 */
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ffcc80; /* 更柔和的橙色背景 */
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
  color: #f57c00; /* 橙色标题 */
}

/* 按钮容器，居中排列 */
.button-container {
  display: flex;
  justify-content: center;
  gap: 10px; /* 按钮之间的间距 */
  margin-top: 20px;
}

.el-button--primary {
  background-color: #f57c00; /* 按钮橙色 */
  border-color: #f57c00; /* 按钮边框橙色 */
}

.el-button--primary:hover {
  background-color: #e65100; /* 按钮悬停时的深橙色 */
}

/* 注册按钮样式 */
.el-button--text {
  color: #f57c00; /* 注册按钮文本橙色 */
}

/* 右上角管理系统链接样式 */
.admin-link {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 16px;
  color: #f57c00;
  cursor: pointer;
}

.admin-link:hover {
  text-decoration: underline;
}
</style>

