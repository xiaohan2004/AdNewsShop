<template>
  <div class="home-page">
    <section class="hero">
      <h1>欢迎来到我们的高端在线商店</h1>
      <p>探索精选商品，体验卓越购物</p>
    </section>

    <section class="search-bar">
      <h2>搜索商品</h2>
      <input
          type="text"
          v-model="searchTerm"
          placeholder="请输入商品名"
          class="search-input"
      />
    </section>

    <section class="categories">
      <h2>商品分类</h2>
      <div class="category-grid">
        <router-link
            v-for="category in categories"
            :key="category"
            :to="{ name: 'ProductsByCategory', params: { category } }"
            class="category-tag"
        >
          {{ category }}
        </router-link>
      </div>
    </section>

    <section class="featured-products">
      <h2>精选商品</h2>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <div v-if="filteredProducts.length === 0 && searchTerm">没有找到匹配的商品</div>
        <div v-else class="product-grid">
          <div v-for="product in filteredProducts" :key="product.id" class="product-card">
            <img :src="product.image" :alt="product.name" class="product-image">
            <h3>{{ product.name }}</h3>
            <p class="price">¥{{ product.price.toFixed(2) }}</p>
            <button @click="addToCart(product)" class="add-to-cart">加入购物车</button>
          </div>
        </div>
      </div>
    </section>
    <transition-group name="notification" tag="div" class="notifications">
      <div v-for="notification in notifications" :key="notification.id" class="notification">
        {{ notification.message }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'HomePage',
  setup() {
    const store = useStore()
    const categories = ['游戏', '数码产品', '汽车', '生活', '旅游', '娱乐', '美食', '时尚', '健康医疗', '体育']
    const loading = ref(true)
    const error = ref(null)
    const notifications = ref([])

    const searchTerm = ref('')

    const allProducts = computed(() => store.getters.allProducts)

    const filteredProducts = computed(() => {
      if (!searchTerm.value) {
        return allProducts.value.slice(0, 4)
      } else {
        return allProducts.value.filter(product =>
            product.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
      }
    })

    const addToCart = (product) => {
      store.dispatch('addProductToCart', product)
      showNotification()
    }

    const showNotification = () => {
      const notification = {
        message: '商品已成功加入购物车！',
        id: Date.now()
      }
      notifications.value.push(notification)
      setTimeout(() => {
        notifications.value = notifications.value.filter(n => n.id !== notification.id)
      }, 3000)
    }

    onMounted(async () => {
      try {
        await store.dispatch('fetchProducts')
        loading.value = false
      } catch (err) {
        error.value = '加载商品时出错，请稍后再试。'
        loading.value = false
      }
    })

    return {
      categories,
      loading,
      error,
      filteredProducts,
      addToCart,
      notifications,
      searchTerm
    }
  }
}
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 60px 20px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.hero p {
  font-size: 1.2em;
  opacity: 0.8;
}

.search-bar {
  text-align: center;
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.search-input::placeholder {
  color: #999;
}

.search-input:focus {
  border-color: #8e44ad;
}

.categories {
  margin-bottom: 40px;
}

.categories h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

.category-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.category-tag {
  padding: 10px 20px;
  border-radius: 25px;
  background: linear-gradient(135deg, #3498db, #8e44ad);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-tag:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #2980b9, #8e44ad);
}

.featured-products {
  margin-bottom: 40px;
}

.featured-products h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.product-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-card h3 {
  font-size: 1.2em;
  margin: 10px 0;
  padding: 0 10px;
}

.price {
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 10px;
  padding: 0 10px;
}

.add-to-cart {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.add-to-cart:hover {
  background-color: #2980b9;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  font-size: 18px;
}

.error {
  color: red;
}

.notifications {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.notification {
  background-color: #2ecc71;
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>