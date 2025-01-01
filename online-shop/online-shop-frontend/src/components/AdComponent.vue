<template>
  <div class="ad-container">
    <div v-if="bannerAd" class="banner-ad">
      <img :src="bannerAd.imageUrl" :alt="bannerAd.altText">
    </div>
    <template v-if="randomAds.length">
      <div v-for="ad in randomAds" :key="ad.type" :class="ad.type + '-ad'">
        <img v-if="ad.type !== 'scrolling-text'" :src="ad.imageUrl" :alt="ad.altText">
        <div v-else class="scrolling-text">{{ ad.text }}</div>
        <button v-if="ad.type === 'popup'" @click="closeAd(ad)" class="close-btn">X</button>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AdComponent',
  setup() {
    const router = useRouter()
    const ads = ref([
      { type: 'banner', imageUrl: '/ads/banner1.jpg', altText: '横幅广告1' },
      { type: 'popup', imageUrl: '/ads/popup1.jpg', altText: '弹出广告1' },
      { type: 'floating', imageUrl: '/ads/floating1.jpg', altText: '浮动广告1' },
      { type: 'scrolling-text', text: '限时优惠：全场8折！' },
      { type: 'large-insert', imageUrl: '/ads/large1.jpg', altText: '大幅插入广告1' },
    ])
    const bannerAd = ref(null)
    const randomAds = ref([])

    const setBannerAd = () => {
      bannerAd.value = ads.value.find(ad => ad.type === 'banner') || null
    }

    const setRandomAds = () => {
      const nonBannerAds = ads.value.filter(ad => ad.type !== 'banner')
      if (nonBannerAds.length) {
        randomAds.value = shuffleArray(nonBannerAds).slice(0, Math.floor(Math.random() * 2) + 2)
      } else {
        randomAds.value = []
      }
    }

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }

    const closeAd = (ad) => {
      randomAds.value = randomAds.value.filter(a => a !== ad)
    }

    onMounted(() => {
      try {
        setBannerAd()
        setRandomAds()
        router.afterEach(setRandomAds)
      } catch (error) {
        console.error('Error in AdComponent mounted hook:', error)
      }
    })

    onUnmounted(() => {
      router.afterEach(setRandomAds)
    })

    return {
      bannerAd,
      randomAds,
      closeAd
    }
  }
}
</script>

<style scoped>
.ad-container {
  position: relative;
  width: 100%;
}

.banner-ad {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.banner-ad img {
  max-width: 100%;
  height: auto;
}

.popup-ad {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  z-index: 1000;
}

.floating-ad {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.scrolling-text {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  animation: scroll-left 20s linear infinite;
}

.large-insert-ad {
  width: 100%;
  text-align: center;
  margin: 20px 0;
}

.large-insert-ad img {
  max-width: 100%;
  height: auto;
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

@keyframes scroll-left {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
</style>

