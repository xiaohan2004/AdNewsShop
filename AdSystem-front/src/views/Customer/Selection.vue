<template>
  <div class="page-container">
    <div class="page-box">
      <!-- 左侧的点餐按钮 -->
      <el-button
          type="primary"
          class="action-button left-button"
          @click="goToOrder"
      >
        我要点餐
      </el-button>

      <!-- 右侧的预定按钮 -->
      <el-button
          type="primary"
          class="action-button right-button"
          @click="goToReservation"
      >
        我要预定
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// 获取路由实例
const router = useRouter();

// 跳转到点餐页面
const goToOrder = () => {
  router.push('/customer/order-dishes'); // 假设点餐页面路径为 /order
};

// 跳转到预定页面
const goToReservation = () => {
  router.push('/customer-reservation'); // 假设预定页面路径为 /reservation
};
</script>

<style scoped>
/* 页面容器 */
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff3e0; /* 橙黄色背景 */
  position: relative;
  overflow: hidden; /* 防止波点溢出 */
}

/* 添加波点背景 */
.page-container::before {
  content: "";
  position: absolute;
  top: 20%;
  left: 10%;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #f57c00;
  opacity: 0.2;
  animation: wave 3s infinite;
}

.page-container::after {
  content: "";
  position: absolute;
  bottom: 10%;
  right: 5%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #f57c00;
  opacity: 0.2;
  animation: wave 5s infinite;
}

@keyframes wave {
  0% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.4;
  }
  100% {
    transform: scale(1);
    opacity: 0.2;
  }
}

/* 按钮容器 */
.page-box {
  display: flex;
  gap: 30px; /* 按钮之间的间距 */
  width: 100%;
  max-width: 700px; /* 最大宽度 */
  justify-content: center; /* 水平居中 */
}

/* 按钮通用样式 */
.action-button {
  width: 200px; /* 按钮宽度增加 */
  height: 200px; /* 按钮高度增加 */
  font-size: 22px; /* 字体大小增大 */
  border-radius: 20px; /* 增大圆角 */
  padding: 0; /* 去除内边距 */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* 更深的阴影 */
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; /* 增加过渡效果 */
  font-weight: bold; /* 加粗字体 */
}

.action-button:hover {
  background-color: #e65100; /* 悬停时的深橙色 */
  transform: scale(1.1); /* 鼠标悬停时稍微放大按钮 */
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3); /* 增加悬停时的阴影效果 */
}

/* 点餐按钮样式 */
.left-button {
  background-color: #f57c00; /* 橙色按钮 */
  border-color: #f57c00; /* 橙色边框 */
}

.left-button:hover {
  background-color: #e65100; /* 深橙色悬停 */
}

/* 预定按钮样式 */
.right-button {
  background-color: #ff7043; /* 较浅的橙色按钮 */
  border-color: #ff7043; /* 较浅的橙色边框 */
}

.right-button:hover {
  background-color: #e64a19; /* 较深的橙色悬停 */
}
</style>

