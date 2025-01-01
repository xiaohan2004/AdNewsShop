<template>
  <div class="product-detail-page">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="product-detail-container">
      <div class="product-image-container">
        <img :src="product.image" :alt="product.name" class="product-image">
      </div>
      <div class="product-info">
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-price">¥{{ product.price.toFixed(2) }}</p>
        <p class="product-category">类别: {{ product.category }}</p>
        <p class="product-sales">销量: {{ product.salesCount }}</p>
        <div class="product-description">
          <h2>商品描述</h2>
          <p>{{ product.description }}</p>
        </div>
        <div class="quantity-selector">
          <button @click="decreaseQuantity" class="quantity-btn">-</button>
          <span class="quantity">{{ quantity }}</span>
          <button @click="increaseQuantity" class="quantity-btn">+</button>
        </div>
        <div class="action-buttons">
          <button @click="addToCart" class="add-to-cart-btn">加入购物车</button>
          <button @click="buyNow" class="buy-now-btn">立即购买</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'ProductDetail',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const loading = ref(true)
    const error = ref(null)
    const quantity = ref(1)

    const product = computed(() => {
      const productId = parseInt(route.params.id)
      return store.getters.allProducts.find(p => p.id === productId)
    })

    const increaseQuantity = () => {
      quantity.value++
    }

    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--
      }
    }

    const addToCart = () => {
      for (let i = 0; i < quantity.value; i++) {
        store.dispatch('addProductToCart', product.value)
      }
      alert('商品已添加到购物车')
    }

    const buyNow = () => {
      for (let i = 0; i < quantity.value; i++) {
        store.dispatch('addProductToCart', product.value)
      }
      router.push('/cart')
    }

    onMounted(async () => {
      try {
        await store.dispatch('fetchProducts')
        loading.value = false
      } catch (err) {
        error.value = '加载商品详情时出错，请稍后再试。'
        loading.value = false
      }
    })

    return {
      product,
      loading,
      error,
      quantity,
      increaseQuantity,
      decreaseQuantity,
      addToCart,
      buyNow
    }
  }
}
</script>

<style scoped>
.product-detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.product-detail-container {
  display: flex;
  gap: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.product-image-container {
  flex: 1;
  max-width: 50%;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  flex: 1;
  padding: 40px;
}

.product-name {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #2c3e50;
}

.product-price {
  font-size: 2em;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 20px;
}

.product-category,
.product-sales {
  font-size: 1.1em;
  color: #7f8c8d;
  margin-bottom: 10px;
}

.product-description {
  margin-top: 30px;
  margin-bottom: 30px;
}

.product-description h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #2c3e50;
}

.product-description p {
  font-size: 1.1em;
  line-height: 1.6;
  color: #34495e;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.quantity-btn {
  background-color: #3498db;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  font-size: 1.5em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantity-btn:hover {
  background-color: #2980b9;
}

.quantity {
  font-size: 1.2em;
  margin: 0 20px;
  min-width: 40px;
  text-align: center;
}

.action-buttons {
  display: flex;
  gap: 20px;
}

.add-to-cart-btn,
.buy-now-btn {
  flex: 1;
  padding: 15px 30px;
  font-size: 1.1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn {
  background-color: #3498db;
  color: white;
}

.add-to-cart-btn:hover {
  background-color: #2980b9;
}

.buy-now-btn {
  background-color: #e74c3c;
  color: white;
}

.buy-now-btn:hover {
  background-color: #c0392b;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
}

.error {
  color: #e74c3c;
}
</style>

