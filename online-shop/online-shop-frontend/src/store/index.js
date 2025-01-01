import { createStore } from 'vuex'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api';

export default createStore({
  state: {
    products: [],
    featuredProducts: [],
    cart: []
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    setFeaturedProducts(state, products) {
      state.featuredProducts = products
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
      state.cart = state.cart.filter(item => item.id !== productId)
    },
    increaseQuantity(state, productId) {
      const item = state.cart.find(item => item.id === productId)
      if (item) {
        item.quantity++
      }
    },
    decreaseQuantity(state, productId) {
      const item = state.cart.find(item => item.id === productId)
      if (item && item.quantity >= 1) {
        item.quantity--
      }
    },
    clearCart(state) {
      state.cart = []
    },
    updateProduct(state, updatedProduct) {
      const index = state.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct)
      }
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
    async fetchFeaturedProducts({ commit }) {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/featured`)
        commit('setFeaturedProducts', response.data)
      } catch (error) {
        console.error('Error fetching featured products:', error)
        commit('setFeaturedProducts', [])
      }
    },
    async addProductToCart({ commit, dispatch }, product) {
      commit('addToCart', product)
      try {
        await axios.post(`${API_BASE_URL}/products/${product.id}/increment-sales`)
        dispatch('fetchProducts')  // Refresh the product list to update sales count
      } catch (error) {
        console.error('Error incrementing sales count:', error)
      }
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
    async updateProduct({ commit }, product) {
      try {
        const response = await axios.put(`${API_BASE_URL}/products/${product.id}`, product)
        commit('updateProduct', response.data)
      } catch (error) {
        console.error('Error updating product:', error)
      }
    }
  },
  getters: {
    allProducts: state => state.products,
    featuredProducts: state => state.featuredProducts,
    cartItems: state => state.cart,
    cartTotal: state => state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }
})

