<template>
  <div class="product-list">
    <h2>产品列表</h2>
    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" class="product-image">
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-price">¥{{ product.price.toFixed(2) }}</p>
          <p class="product-category">类别: {{ product.category }}</p>
          <button @click="addToCart(product)" class="add-to-cart-btn">加入购物车</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductList',
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    addToCart(product) {
      // 这里添加将产品添加到购物车的逻辑
      console.log(`Added ${product.name} to cart`);
      // 您可以在这里触发一个事件或调用一个 Vuex action
    }
  }
}
</script>

<style scoped>
.product-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

h3 {
  margin-top: 0;
  font-size: 1.2em;
}

.product-description {
  font-size: 0.9em;
  color: #666;
}

.product-price {
  font-weight: bold;
  color: #e44d26;
  font-size: 1.1em;
  margin: 10px 0;
}

.product-category {
  font-size: 0.8em;
  color: #888;
}

.add-to-cart-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #45a049;
}
</style>

