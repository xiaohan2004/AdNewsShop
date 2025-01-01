<template>
  <div class="products-page">
    <section class="hero">
      <h1>{{ pageTitle }}</h1>
      <p>{{ pageDescription }}</p>
    </section>


    <section class="search-bar">
      <input
          type="text"
          v-model="searchTerm"
          placeholder="搜索商品名称"
          class="search-input"
      />
    </section>

    <section class="categories">
      <div v-for="cat in categories" :key="cat"
           class="category-tag"
           :class="{ active: category === cat }"
           @click="setCategory(cat)">
        {{ cat }}
      </div>
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
        <label for="min-price">最低价格：</label>
        <input type="number" id="min-price" v-model="minPrice" min="0" step="1" placeholder="最低价格">
      </div>
      <div class="filter-group">
        <label for="max-price">最高价格：</label>
        <input type="number" id="max-price" v-model="maxPrice" min="0" step="1" placeholder="最高价格">
      </div>
    </section>

    <section class="product-list">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <div v-if="filteredAndSortedProducts.length === 0" class="no-results">没有找到匹配的商品</div>
        <div v-else class="product-grid">
          <div v-for="product in filteredAndSortedProducts" :key="product.id" class="product-card">
            <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">
              <img :src="product.image" :alt="product.name" class="product-image">
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p class="price">¥{{ product.price.toFixed(2) }}</p>
                <p class="description">{{ product.description }}</p>
              </div>
            </router-link>
            <button @click="addToCart(product)" class="add-to-cart">
              加入购物车
            </button>
          </div>
        </div>
      </div>
    </section>

    <div class="pagination">
      <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="pagination-btn"
      >
        上一页
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="pagination-btn"
      >
        下一页
      </button>
    </div>
    <transition-group name="notification" tag="div" class="notifications">
      <div v-for="notification in notifications" :key="notification.id" class="notification">
        {{ notification.message }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'ProductsPage',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const categories = ['全部', '游戏', '数码产品', '汽车', '生活', '旅游', '娱乐', '美食', '时尚', '健康医疗', '体育']
    const category = ref('')
    const sortBy = ref('price-asc')
    const minPrice = ref('')
    const maxPrice = ref('')
    const searchTerm = ref('') // 搜索关键词
    const loading = ref(true)
    const error = ref(null)
    const notifications = ref([])
    const itemsPerPage = 12
    const currentPage = ref(1)

    const allProducts = computed(() => store.getters.allProducts)

    const pageTitle = computed(() => category.value ? `${category.value} 商品` : '所有商品')
    const pageDescription = computed(() => category.value ? `探索我们精选的${category.value}商品系列` : '浏览我们的全部商品')

    const filteredAndSortedProducts = computed(() => {
      let products = allProducts.value

      // 按类别过滤
      if (category.value && category.value !== '全部') {
        products = products.filter(product => product.category === category.value)
      }

      // 按搜索关键词过滤
      if (searchTerm.value) {
        products = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
      }

      // 按价格过滤
      if (minPrice.value !== '') {
        products = products.filter(product => product.price >= Number(minPrice.value))
      }
      if (maxPrice.value !== '') {
        products = products.filter(product => product.price <= Number(maxPrice.value))
      }

      // 排序
      switch(sortBy.value) {
        case 'price-asc':
          products = products.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          products = products.sort((a, b) => b.price - a.price)
          break
        case 'name-asc':
          products = products.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'name-desc':
          products = products.sort((a, b) => b.name.localeCompare(a.name))
          break
      }

      // 分页
      const startIndex = (currentPage.value - 1) * itemsPerPage
      return products.slice(startIndex, startIndex + itemsPerPage)
    })

    const totalPages = computed(() => {
      const filteredProducts = allProducts.value.filter(product => {
        if (category.value && category.value !== '全部' && product.category !== category.value) {
          return false
        }
        if (minPrice.value !== '' && product.price < Number(minPrice.value)) {
          return false
        }
        if (maxPrice.value !== '' && product.price > Number(maxPrice.value)) {
          return false
        }
        if (searchTerm.value && !product.name.toLowerCase().includes(searchTerm.value.toLowerCase())) {
          return false
        }
        return true
      })
      return Math.ceil(filteredProducts.length / itemsPerPage)
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

    const fetchProducts = async () => {
      try {
        await store.dispatch('fetchProducts')
        loading.value = false
      } catch (error) {
        error.value = '加载商品时出错，请稍后再试。'
        loading.value = false
      }
    }

    const setCategory = (cat) => {
      category.value = cat
      if (cat === '全部') {
        router.push({ name: 'ProductsPage' })
      } else {
        router.push({ name: 'ProductsByCategory', params: { category: cat } })
      }
    }

    onMounted(() => {
      category.value = route.params.category || '全部'
      fetchProducts()
    })

    watch(() => route.params.category, (newCategory) => {
      category.value = newCategory || '全部'
    })

    return {
      categories,
      category,
      sortBy,
      minPrice,
      maxPrice,
      searchTerm,
      loading,
      error,
      pageTitle,
      pageDescription,
      filteredAndSortedProducts,
      addToCart,
      setCategory,
      notifications,
      itemsPerPage,
      currentPage,
      totalPages
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.category-tag {
  padding: 10px 20px;
  border-radius: 25px;
  background: linear-gradient(135deg, #3498db, #8e44ad);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-tag:hover, .category-tag.active {
  transform: translateY(-3px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #2980b9, #8e44ad);
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

.filter-group input[type="number"] {
  width: 100px;
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
  transition: all 0.3s ease;
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
.no-results {
  text-align: center;
  font-size: 18px;
  color: #666;
  padding: 20px;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #2980b9;
}

.pagination-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group {
    margin-bottom: 15px;
  }

  .filter-group input[type="number"] {
    width: 100%;
  }
}
</style>

