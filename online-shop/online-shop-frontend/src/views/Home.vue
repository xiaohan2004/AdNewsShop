<template>
  <div class="home-page">
    <section class="hero">
      <h1>欢迎来到我们的高端在线商店</h1>
      <p>探索精选商品，体验卓越购物</p>
    </section>

    <section class="categories">
      <h2>商品分类</h2>
      <div class="category-grid">
        <div v-for="category in categories" :key="category" class="category-item">
          <router-link :to="{ name: 'ProductsByCategory', params: { category } }">
            {{ category }}
          </router-link>
        </div>
      </div>
    </section>

    <section class="featured-products">
      <h2>精选商品</h2>
      <div class="product-grid">
        <div v-for="product in featuredProducts" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name" class="product-image">
          <h3>{{ product.name }}</h3>
          <p class="price">¥{{ product.price.toFixed(2) }}</p>
          <button @click="addToCart(product)" class="add-to-cart">加入购物车</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HomePage',
  data() {
    return {
      categories: ['游戏', '数码产品', '汽车', '生活', '旅游', '娱乐', '美食', '时尚', '健康医疗', '体育']
    }
  },
  computed: {
    ...mapGetters(['allProducts']),
    featuredProducts() {
      return this.allProducts.slice(0, 4) // 显示前4个产品作为精选
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'addProductToCart']),
    addToCart(product) {
      this.addProductToCart(product)
      // 这里可以添加一些用户反馈，比如提示消息
    }
  },
  created() {
    this.fetchProducts()
  }
}
</script>

<style scoped>
/* 样式保持不变 */
</style>

