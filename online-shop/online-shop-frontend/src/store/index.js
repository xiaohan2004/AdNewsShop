import { createStore } from 'vuex'

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
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        // 这里应该是从后端API获取产品的逻辑
        // 暂时使用模拟数据
        const products = [
          { id: 1, name: 'PlayStation 5', price: 3999.99, category: '游戏', image: 'https://example.com/ps5.jpg', description: '次世代游戏主机，带来极致游戏体验。' },
          { id: 2, name: 'iPhone 13', price: 5999.99, category: '数码产品', image: 'https://example.com/iphone13.jpg', description: '新一代智能手机，搭载A15仿生芯片。' },
          { id: 3, name: 'Tesla Model 3', price: 279900.00, category: '汽车', image: 'https://example.com/tesla3.jpg', description: '高性能电动汽车，科技与环保的完美结合。' },
          { id: 4, name: '智能电饭煲', price: 299.99, category: '生活', image: 'https://example.com/ricecooker.jpg', description: 'AI控温，让每一粒米都恰到好处。' },
          { id: 5, name: '日本温泉旅行套餐', price: 9999.99, category: '旅游', image: 'https://example.com/japantrip.jpg', description: '体验日本传统温泉文化，放松身心。' },
          { id: 6, name: '电影票', price: 49.99, category: '娱乐', image: 'https://example.com/movieticket.jpg', description: '观看最新大片，享受视听盛宴。' },
          { id: 7, name: '米其林三星餐厅套餐', price: 1999.99, category: '美食', image: 'https://example.com/michelin.jpg', description: '顶级厨师精心烹饪，味蕾的极致享受。' },
          { id: 8, name: 'Gucci手提包', price: 15999.99, category: '时尚', image: 'https://example.com/guccibag.jpg', description: '奢华品质，彰显个人品味。' },
          { id: 9, name: '年度体检套餐', price: 2999.99, category: '健康医疗', image: 'https://example.com/healthcheck.jpg', description: '全面体检，呵护您的健康。' },
          { id: 10, name: 'Nike跑鞋', price: 799.99, category: '体育', image: 'https://example.com/nikeshoes.jpg', description: '专业跑步鞋，为您的运动保驾护航。' }
        ]
        commit('setProducts', products)
      } catch (error) {
        console.error('Error fetching products:', error)
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
    }
  },
  getters: {
    allProducts: state => state.products,
    cartItems: state => state.cart,
    cartTotal: state => state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }
})

