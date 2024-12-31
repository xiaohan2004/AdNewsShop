<template>
  <div class="ad-container">
    <div v-if="currentAd" :class="adClass">
      <img :src="currentAd.imageUrl" :alt="currentAd.altText">
      <button v-if="currentAd.type === 'popup'" @click="closeAd" class="close-btn">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdComponent',
  data() {
    return {
      ads: [
        { type: 'banner', imageUrl: '/ads/banner1.jpg', altText: '横幅广告1' },
        { type: 'popup', imageUrl: '/ads/popup1.jpg', altText: '弹出广告1' },
        { type: 'floating', imageUrl: '/ads/floating1.jpg', altText: '浮动广告1' },
      ],
      currentAd: null
    }
  },
  computed: {
    adClass() {
      return this.currentAd ? `${this.currentAd.type}-ad` : ''
    }
  },
  mounted() {
    this.rotateAds()
  },
  methods: {
    rotateAds() {
      setInterval(() => {
        const randomIndex = Math.floor(Math.random() * this.ads.length)
        this.currentAd = this.ads[randomIndex]
      }, 10000) // 每10秒更换一次广告
    },
    closeAd() {
      this.currentAd = null
    }
  }
}
</script>

<style scoped>
.ad-container {
  position: fixed;
  z-index: 1000;
}

.banner-ad {
  width: 100%;
  text-align: center;
}

.popup-ad {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.floating-ad {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>

