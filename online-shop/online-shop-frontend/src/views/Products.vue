<template>
  <div class="products-page">
    <section class="hero">
      <h1>{{ pageTitle }}</h1>
      <p>{{ pageDescription }}</p>
    </section>

    <section class="filters">
      <div class="filter-group">
        <label for="sort">排序方式：</label>
        <select id="sort" v-model="sortBy">
          <option value="price-asc">价格从低到高</option>
          <option value="price-desc">价格从高到低</option>
          <option value="name-asc">名称 A-Z</option>
          <option value="name-desc">名称 Z-A</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="price-range">价格范围：</label>
        <input type="range" id="price-range" v-model="maxPrice" min="0" :max="highestPrice" step="100">
        <span>¥{{ maxPrice }}</span>
      </div>
    </section>

    <section class="product-list">
      <div class="product-grid">
        <div v-for="product in filteredAndSortedProducts" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name" class="product-image">
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="price">¥{{ product.price.toFixed(2) }}</p>
            <p class="description">{{ product.description }}</p>
            <button @click="addToCart(product)" class="add-to-cart">加入购物车</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductsPage',
  data() {
    return {
      category: '',
      sortBy: 'price-asc',
      maxPrice: 10000
    }
  },
  computed: {
    ...mapGetters(['allProducts']),
    pageTitle() {
      return this.category ? `${this.category} 商品` : '所有商品'
    },
    pageDescription() {
      return this.category ? `探索我们精选的${this.category}商品系列` : '浏览我们的全部商品'
    },
    filteredAndSortedProducts() {
      let products = this.allProducts

      // 按类别过滤
      if (this.category) {
        products = products.filter(product => product.category === this.category)
      }

      // 按价格过滤
      products = products.filter(product => product.price <= this.maxPrice)

      // 排序
      switch(this.sortBy) {
        case 'price-asc':
          return products.sort((a, b) => a.price - b.price)
        case 'price-desc':
          return products.sort((a, b) => b.price - a.price)
        case 'name-asc':
          return products.sort((a, b) => a.name.localeCompare(b.name))
        case 'name-desc':
          return products.sort((a, b) => b.name.localeCompare(a.name))
        default:
          return products
      }
    },
    highestPrice() {
      return Math.max(...this.allProducts.map(p => p.price))
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
    this.category = this.$route.params.category || ''
    this.fetchProducts()
  },
  watch: {
    '$route.params.category'(newCategory) {
      this.category = newCategory || ''
    }
  }
}
</script>

<style scoped>
.products-page {
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

.filters {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.filter-group label {
  margin-right: 10px;
  font-weight: bold;
}

.filter-group select,
.filter-group input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-group input[type="range"] {
  width: 200px;
}

.product-list {
  display: flex;
  flex-direction: column;
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

.product-info {
  padding: 15px;
}

.product-info h3 {
  font-size: 1.2em;
  margin: 0 0 10px 0;
}

.price {
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 10px;
}

.description {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 15px;
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

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group {
    margin-bottom: 15px;
  }

  .filter-group input[type="range"] {
    width: 100%;
  }
}
</style>

