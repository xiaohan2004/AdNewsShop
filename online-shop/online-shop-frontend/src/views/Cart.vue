<template>
  <div class="cart-page">
    <h1>购物车</h1>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>您的购物车是空的</p>
      <router-link to="/products" class="continue-shopping">继续购物</router-link>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" class="item-image">
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p>单价: ¥{{ item.price.toFixed(2) }}</p>
          <div class="quantity-control">
            <button @click="decreaseQuantity(item.id)" class="quantity-btn">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.id)" class="quantity-btn">+</button>
          </div>
          <p>小计: ¥{{ (item.price * item.quantity).toFixed(2) }}</p>
          <button @click="removeFromCart(item.id)" class="remove-item">移除</button>
        </div>
      </div>
      <div class="cart-summary">
        <h2>总计: ¥{{ cartTotal.toFixed(2) }}</h2>
        <button @click="checkout" class="checkout-button">结算</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'CartPage',
  setup() {
    const store = useStore()

    const cartItems = computed(() => store.getters.cartItems)
    const cartTotal = computed(() => store.getters.cartTotal)

    const removeFromCart = (productId) => {
      if (confirm('确定要从购物车中移除此商品吗？')) {
        store.dispatch('removeProductFromCart', productId)
      }
    }

    const increaseQuantity = (productId) => {
      store.dispatch('increaseCartItemQuantity', productId)
    }

    const decreaseQuantity = (productId) => {
      const item = cartItems.value.find(item => item.id === productId)
      if (item && item.quantity >= 1) {
        store.dispatch('decreaseCartItemQuantity', productId)
      }
      if (item && item.quantity == 0){
        store.dispatch('removeProductFromCart',productId)
      }
    }



    const checkout = () => {
      // 这里应该实现结算逻辑
      alert('感谢您的购买！')
      store.dispatch('clearCart')
    }

    return {
      cartItems,
      cartTotal,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      checkout
    }
  }
}
</script>

<style scoped>
.cart-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.empty-cart {
  text-align: center;
  margin-top: 50px;
}

.continue-shopping {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.cart-item {
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 20px 0;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.item-details {
  flex-grow: 1;
}

.quantity-control {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.quantity-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1.2em;
}

.quantity {
  margin: 0 10px;
  font-size: 1.2em;
}

.remove-item {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
  margin-top: 10px;
}

.cart-summary {
  margin-top: 20px;
  text-align: right;
}

.checkout-button {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.1em;
  cursor: pointer;
  border-radius: 5px;
}
</style>


