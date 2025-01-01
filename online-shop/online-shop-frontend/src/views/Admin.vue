<template>
  <div class="admin-page">
    <h1 class="admin-title">商品管理系统</h1>

    <div class="admin-content">
      <div class="product-list">
        <div class="list-header">
          <h2>商品列表</h2>
          <button @click="showAddForm" class="btn btn-primary">新增商品</button>
        </div>
        <div class="table-container">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>图片</th>
              <th>名称</th>
              <th>价格</th>
              <th>类别</th>
              <th>销量</th>
              <th>精选</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td><img :src="product.image" :alt="product.name" class="product-thumbnail"></td>
              <td>{{ product.name }}</td>
              <td>¥{{ product.price.toFixed(2) }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.salesCount }}</td>
              <td>
                <input
                    type="checkbox"
                    :checked="product.featured"
                    @change="toggleFeatured(product)"
                    :disabled="!product.featured && featuredProductsCount >= 4"
                >
              </td>
              <td>
                <button @click="editProduct(product)" class="btn btn-edit">编辑</button>
                <button @click="deleteProduct(product.id)" class="btn btn-delete">删除</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <transition name="slide-fade">
      <div v-if="showForm" class="product-form-container">
        <div class="form-header">
          <h2>{{ formTitle }}</h2>
          <button @click="cancelForm" class="btn btn-close">&times;</button>
        </div>
        <form @submit.prevent="submitForm" class="product-form">
          <div class="form-group">
            <label for="name">名称：</label>
            <input id="name" v-model="currentProduct.name" required>
          </div>
          <div class="form-group">
            <label for="price">价格：</label>
            <input id="price" v-model="currentProduct.price" type="number" step="0.01" required>
          </div>
          <div class="form-group">
            <label for="category">类别：</label>
            <select id="category" v-model="currentProduct.category" required>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="image">图片 URL：</label>
            <input id="image" v-model="currentProduct.image" required>
          </div>
          <div class="form-group">
            <label for="description">描述：</label>
            <textarea id="description" v-model="currentProduct.description" required></textarea>
          </div>
          <div class="form-group">
            <label for="salesCount">销量：</label>
            <input id="salesCount" v-model="currentProduct.salesCount" type="number" required>
          </div>
          <div class="form-group">
            <label for="featured">精选：</label>
            <input id="featured" v-model="currentProduct.featured" type="checkbox">
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">保存</button>
            <button type="button" @click="cancelForm" class="btn btn-secondary">取消</button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'AdminPage',
  setup() {
    const store = useStore()
    const showForm = ref(false)
    const currentProduct = ref({})
    const formTitle = ref('')

    const categories = ['游戏', '数码产品', '汽车', '生活', '旅游', '娱乐', '美食', '时尚', '健康医疗', '体育']

    const products = computed(() => store.getters.allProducts)
    const featuredProductsCount = computed(() => products.value.filter(p => p.featured).length)

    const fetchProducts = () => {
      store.dispatch('fetchProducts')
    }

    onMounted(() => {
      fetchProducts()
    })

    const showAddForm = () => {
      showForm.value = true
      currentProduct.value = { featured: false, salesCount: 0 }
      formTitle.value = '添加新商品'
    }

    const editProduct = (product) => {
      showForm.value = true
      currentProduct.value = { ...product }
      formTitle.value = '编辑商品'
    }

    const submitForm = async () => {
      await store.dispatch('updateProduct', currentProduct.value)
      showForm.value = false
      fetchProducts()
    }

    const cancelForm = () => {
      showForm.value = false
    }

    const deleteProduct = async (id) => {
      if (confirm('确定要删除这个商品吗？')) {
        await store.dispatch('deleteProduct', id)
        fetchProducts()
      }
    }

    const toggleFeatured = async (product) => {
      if (!product.featured && featuredProductsCount.value >= 4) {
        alert('最多只能选择4个精选商品')
        return
      }
      await store.dispatch('updateProduct', { ...product, featured: !product.featured })
      fetchProducts()
    }

    return {
      products,
      showForm,
      currentProduct,
      formTitle,
      categories,
      featuredProductsCount,
      showAddForm,
      editProduct,
      submitForm,
      cancelForm,
      deleteProduct,
      toggleFeatured
    }
  }
}
</script>

<style scoped>
.admin-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  position: relative;
  min-height: 100vh;
}

.admin-title {
  font-size: 2.5em;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
}

.admin-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 80px; /* Space for the form */
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.list-header h2 {
  font-size: 1.5em;
  color: #34495e;
  margin: 0;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #2c3e50;
}

.product-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #2ecc71;
  color: white;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-edit {
  background-color: #3498db;
  color: white;
  margin-right: 5px;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.btn-close {
  background-color: transparent;
  color: #34495e;
  font-size: 1.5em;
  padding: 0;
  width: 30px;
  height: 30px;
}

.btn-primary:hover, .btn-secondary:hover, .btn-edit:hover, .btn-delete:hover, .btn-close:hover {
  opacity: 0.8;
}

.product-form-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
  max-height: 80vh;
  overflow-y: auto;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.form-header h2 {
  font-size: 1.5em;
  color: #34495e;
  margin: 0;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #34495e;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

@media (max-width: 768px) {
  .admin-content {
    margin-bottom: 60px;
  }

  .product-form-container {
    max-height: 90vh;
  }
}
</style>

