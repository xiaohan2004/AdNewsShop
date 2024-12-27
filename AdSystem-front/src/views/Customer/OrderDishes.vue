<template>
  <div class="order-container">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <h3>菜品种类</h3>
      <el-menu :default-active="activeCategory" class="category-menu">
        <el-menu-item index="all" @click="filterCategory('all')">全部</el-menu-item>
        <el-menu-item v-for="category in categories" :key="category.categoryId" :index="category.categoryId" @click="filterCategory(category.categoryId)">
          {{ category.categoryName }}
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 点菜展示区域 -->
    <div class="menu-area">
      <div class="menu-header">
        <h2 class="menu-title">请选择菜品(✧◡✧)</h2>
        <div class="menu-actions">
          <!-- 服务按钮 -->
          <div class="circle-btn" @click="handleServiceClick">
            服务
          </div>
          <!-- 结账按钮 -->
          <div class="circle-btn" @click="handleCheckoutClick">
            结账
          </div>
        </div>
      </div>
      <div class="menu-items">
        <div
            v-for="item in filteredMenu"
            :key="item.dishId"
            class="menu-item"
            @click.stop="openItemDialog(item)"
        >
          <img :src="item.img" alt="菜品图片" class="menu-image" />
          <div class="item-info">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-price">￥{{ item.price }}</p>
          </div>
          <div class="item-actions">
            <button class="decrease-btn" @click.stop="decreaseCount(item)" :disabled="item.count <= 0">
              <span>-</span>
            </button>
            <span class="item-count">{{ item.count || 0 }}</span>
            <button class="increase-btn" @click.stop="increaseCount(item)">
              <span>+</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 购物车区域 -->
    <div class="cart-area">
      <h3>购物车</h3>

      <!-- 输入桌号 -->
      <div class="table-selection">
        <el-input
            v-model="selectedTable"
            placeholder="请输入桌号"
            style="width: 120px;"
        />
      </div>

      <div v-if="cart.length > 0">
        <ul>
          <li v-for="item in cart.filter(item => item.count > 0)" :key="item.dishId">
            {{ item.name }} x{{ item.count }} - ￥{{ item.price * item.count }}
          </li>
        </ul>
        <p><strong>总计：</strong>￥{{ totalPrice }}</p>
        <el-button type="primary" @click="placeOrder" class="order-button">下单</el-button>
      </div>
      <div v-else>
        <p>购物车为空</p>
      </div>
    </div>
  </div>

  <!-- 弹窗显示菜品详情 -->
  <el-dialog
      v-model="dialogVisible"
      width="40%"
      :show-close="true"
  >
    <template #title>
      <div class="custom-title">{{ selectedItem.name }}</div>
    </template>

    <div class="item-detail">
      <img :src="selectedItem.img" alt="菜品图片" class="item-detail-image" />
      <div class="item-detail-info">
        <p><strong>价格：</strong>￥{{ selectedItem.price }}</p>
        <p><strong>介绍：</strong>{{ selectedItem.description }}</p>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import api from '@/api/api';

// 菜品数据
const menu = ref([]);
const categories = ref([]);

// 当前选中的菜品种类
const activeCategory = ref('all');
const filteredMenu = computed(() => {
  if (activeCategory.value === 'all') {
    return menu.value;
  } else {
    return menu.value.filter(item => item.categoryId === activeCategory.value);
  }
});

// 购物车状态
const cart = ref([]);

// 菜品详情弹窗状态
const dialogVisible = ref(false);
const selectedItem = ref({});

// 选择桌号
const selectedTable = ref('');

// 计算购物车总价
const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => total + item.price * item.count, 0);
});

// 选择菜品种类
const filterCategory = (category) => {
  activeCategory.value = category;
};

// 增加菜品份数
const increaseCount = (item) => {
  if (!item.count) {
    item.count = 0;
  }
  item.count++;
  updateCart(item);
};

// 减少菜品份数
const decreaseCount = (item) => {
  if (item.count > 0) {
    item.count--;
    updateCart(item);
  }
};

// 更新购物车
const updateCart = (item) => {
  const existingItem = cart.value.find(cartItem => cartItem.dishId === item.dishId);
  if (existingItem) {
    existingItem.count = item.count;
  } else if (item.count > 0) {
    cart.value.push({ ...item });
  } else {
    cart.value = cart.value.filter(cartItem => cartItem.dishId !== item.dishId);
  }
};

// 下单处理
const placeOrder = () => {
  if (cart.value.length > 0 && selectedTable.value) {
    ElMessage.success(`成功下单！桌号：${selectedTable.value} 总计：￥${totalPrice.value}`);
    // 清空购物车
    cart.value = [];
    // 清空菜品数量
    menu.value.forEach(item => item.count = 0);
  } else {
    ElMessage.warning("购物车为空或未输入桌号，无法下单");
  }
};

// 打开菜品详情弹窗
const openItemDialog = (item) => {
  selectedItem.value = item;
  dialogVisible.value = true;
};

// 提示服务员正在赶来
const handleServiceClick = () => {
  ElMessage.info('服务员正在赶来...');
};

// 提示请前往前台结账
const handleCheckoutClick = () => {
  ElMessage.info('请前往前台结账...');
};

// 获取菜品数据
const fetchDishData = async () => {
  try {
    const [dishesResponse, categoriesResponse] = await Promise.all([
      api.get('/api/dishes'),
      api.get('/api/categories')
    ]);

    if (dishesResponse.data.code === 1 && categoriesResponse.data.code === 1) {
      menu.value = dishesResponse.data.data
          .filter(dish => dish.isActive === 1)
          .map(dish => ({
            ...dish,
            count: 0
          }));
      categories.value = categoriesResponse.data.data;
    } else {
      console.error('Failed to fetch data');
      ElMessage.error('获取数据失败');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    ElMessage.error('获取数据失败');
  }
};

onMounted(() => {
  fetchDishData();
});
</script>


<style scoped>
.order-container {
  display: flex;
  flex-direction: row;
  height: 100% !important;
  background-color: #fff3e0;
}

.sidebar {
  width: 250px;
  padding: 20px;
  background-color: #f57c00;
  color: white;
}

.category-menu {
  background-color: transparent;
  border: none;
}

/* 选中和hover状态保持一致 */
.category-menu .el-menu-item {
  color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
}


.category-menu .el-menu-item:hover,
.category-menu .el-menu-item.is-active {
  background-color: #e65100; /* 鼠标悬停和选中时的背景颜色 */
  color: #fff; /* 保持字体颜色为白色 */
}

.sidebar h3 {
  padding-bottom: 20px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}

.menu-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.menu-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #f57c00;
}

.menu-items {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.menu-item {
  width: 150px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px;
  text-align: center;
  cursor: pointer;
}

.menu-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto; /* 添加垂直滚动 */
}

.menu-items {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-height: 600px; /* 设置最大高度，可以根据需求调整 */
  overflow-y: auto; /* 启用垂直滚动 */
  justify-content: center; /* 水平居中对齐菜品 */
  align-items: center; /* 垂直居中对齐菜品 */
}


.menu-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info {
  margin-top: 10px;
}

.item-name {
  font-size: 16px;
  font-weight: bold;
}

.item-price {
  color: #f57c00;
  margin-top: 5px;
}

.item-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.increase-btn, .decrease-btn {
  background-color: #f57c00;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  font-size: 20px;
}

.increase-btn:hover, .decrease-btn:hover {
  background-color: #e65100;
}

.item-count {
  margin: 0 10px;
  font-size: 16px;
}

.decrease-btn:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}


/* 购物车区域 */
.cart-area {
  width: 250px;
  padding: 20px;
  background-color: #ffcc80;
  color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 启用垂直滚动 */
  max-height: 730px; /* 最大高度为视口高度的70%，可以根据需要调整 */
}

.cart-area h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.cart-area ul {
  list-style: none;
  padding: 0;
}

.cart-area ul li {
  margin-bottom: 10px;
}

.cart-area p {
  font-size: 18px;
  font-weight: bold;
}

.table-selection {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.table-selection .table-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #f57c00;
  border-radius: 5px;
}

.table-selection input[type="checkbox"] {
  margin-right: 10px;
}

/* 下单按钮样式 */
.order-button {
  background-color: #f57c00;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  margin-top: 20px;
  width: 100%;
  text-align: center;
  border-radius: 5px;
  outline: none; /* 去除焦点时的蓝色外圈 */
  border: none; /* 去除可能的边框 */
}

.order-button:hover {
  background-color: #e65100;
}

.order-button:focus {
  outline: none; /* 去除按钮被点击后的焦点边框 */
}

/* 自定义标题样式 */
.custom-title {
  text-align: center; /* 水平居中标题 */
  font-size: 20px; /* 设置字体大小 */
  font-weight: bold; /* 设置字体加粗 */
  color: #f57c00; /* 设置标题颜色 */
}

.item-detail {
  display: flex;
  align-items: center;
  padding: 20px;
  background: radial-gradient(circle, rgba(255, 223, 148, 0.4) 10%, transparent 10%) center/20px 20px repeat;
  border-radius: 8px;
}

.item-detail-image {
  width: 150px; /* 固定图片大小 */
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px; /* 图片和文字之间的间距 */
}

.item-detail-info {
  flex: 1; /* 让信息部分占据剩余空间 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.item-detail-info p {
  margin: 10px 0; /* 给每一行文字增加间距 */
  font-size: 16px;
}

.item-detail-info strong {
  font-weight: bold;
}

/* 橙黄色主题 */
.table-selection .el-input {
  background-color: #FFA500; /* 橙黄色背景 */
  border: 1px solid #FF8C00; /* 深橙色边框 */
  padding: 10px; /* 设置padding */
  margin-bottom: 20px; /* 距离下方信息有一定间距 */
  border-radius: 5px; /* 圆角 */
}

/* 为了使输入框内部文字颜色更好看，设置文字颜色 */
.table-selection .el-input input {
  color: #fff; /* 设置文字颜色为白色 */
  font-size: 16px; /* 调整文字大小，保持一致 */
}

.menu-header {
  display: flex;
  justify-content: space-between; /* 左右分布 */
  align-items: center; /* 垂直居中对齐 */
}

.menu-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #f57c00;
  flex-grow: 1; /* 让标题占据剩余空间 */
}

.menu-actions {
  display: flex;
  gap: 10px; /* 按钮之间的间距 */
}

.circle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%; /* 圆形 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  cursor: pointer;
  color: white; /* 设置文字颜色为白色 */
  font-weight: bold;
  transition: background-color 0.3s ease;
  background-image: linear-gradient(45deg, #ff9800 25%, transparent 25%, transparent 50%, #ff9800 50%, #ff9800 75%, transparent 75%, transparent);
  background-size: 2px 2px; /* 设置条纹的大小 */
  transform: translateY(-10px); /* 向上移动10px */
}

.circle-btn:hover {
  background-color: #ffe0b2; /* 悬停时稍微变浅 */
}


</style>



