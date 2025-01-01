import { createStore } from 'vuex'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api';

export default createStore({
  state: {
    products: [],
    cart: []
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    addToCart(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(state, productId) {
      const index = state.cart.findIndex(item => item.id === productId)
      if (index !== -1) {
        if (state.cart[index].quantity > 1) {
          state.cart[index].quantity--
        } else {
          state.cart.splice(index, 1)
        }
      }
    },
    increaseQuantity(state, productId) {
      const item = state.cart.find(item => item.id === productId)
      if (item) {
        item.quantity++
      }
    },
    decreaseQuantity(state, productId) {
      const item = state.cart.find(item => item.id === productId)
      if (item && item.quantity > 1) {
        item.quantity--
      }
    },
    clearCart(state) {
      state.cart = []
    },
    addProduct(state, product) {
      state.products.push(product)
    },
    updateProduct(state, updatedProduct) {
      const index = state.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct)
      }
    },
    deleteProduct(state, productId) {
      state.products = state.products.filter(p => p.id !== productId)
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`)
        commit('setProducts', response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
        commit('setProducts', [])
      }
    },
    addProductToCart({ commit }, product) {
      commit('addToCart', product)
    },
    removeProductFromCart({ commit }, productId) {
      commit('removeFromCart', productId)
    },
    increaseCartItemQuantity({ commit }, productId) {
      commit('increaseQuantity', productId)
    },
    decreaseCartItemQuantity({ commit }, productId) {
      commit('decreaseQuantity', productId)
    },
    clearCart({ commit }) {
      commit('clearCart')
    },
    async addProduct({ commit, dispatch }, product) {
      try {
        const response = await axios.post(`${API_BASE_URL}/products`, product)
        commit('addProduct', response.data)
        dispatch('fetchProducts')  // 重新获取所有产品以确保ID正确
      } catch (error) {
        console.error('Error adding product:', error)
      }
    },
    async updateProduct({ commit, dispatch }, product) {
      try {
        const response = await axios.put(`${API_BASE_URL}/products/${product.id}`, product)
        commit('updateProduct', response.data)
        dispatch('fetchProducts')  // 重新获取所有产品以确保ID正确
      } catch (error) {
        console.error('Error updating product:', error)
      }
    },
    async deleteProduct({ commit, dispatch }, productId) {
      try {
        await axios.delete(`${API_BASE_URL}/products/${productId}`)
        commit('deleteProduct', productId)
        dispatch('fetchProducts')  // 重新获取所有产品以确保ID正确
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  },
  getters: {
    allProducts: state => state.products,
    cartItems: state => state.cart,
    cartTotal: state => state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }
})

