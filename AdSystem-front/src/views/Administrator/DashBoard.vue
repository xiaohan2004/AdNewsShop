<template>
  <div class="overview-dashboard">
    <div class="stats-summary">
      <div class="stat-card" v-for="(value, key) in groupedOverview" :key="key" :class="getCardClass(key)">
        <div class="stat-title">{{ formatStatTitle(key) }}</div>
        <div class="stat-value">{{ formatStatValue(value) }}</div>
      </div>
    </div>
    <div class="charts">
      <div v-if="loading" class="flex items-center justify-center h-64">
        <Loader2Icon class="w-12 h-12 text-blue-500 animate-spin" />加载中。。。。。。
      </div>
      <div v-else-if="!showPieChart" class="flex items-center justify-center h-64">
        <PieChartIcon class="w-12 h-12 text-gray-500 animate-pulse" />加载中。。。。。。
      </div>
      <div class="chart-container" v-else>
        <pie-chart :data="orderStatusData" :options="chartOptions"/>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Loader2Icon, PieChartIcon } from 'lucide-vue-next';
import api from "@/api/api";

ChartJS.register(ArcElement, Tooltip, Legend);

export default defineComponent({
  components: {
    PieChart: Pie,
    Loader2Icon,
    PieChartIcon,
  },
  setup() {
    const overview = ref({});
    const loading = ref(true);
    const showPieChart = ref(false);

    const fetchData = async () => {
      try {
        const response = await api.get('/api/overview');
        if (response.data.code === 1) {
          overview.value = response.data.data;
        } else {
          throw new Error('Data get failed');
        }
      } catch (error) {
        console.error("数据加载失败：", error);
      } finally {
        loading.value = false;

        // 5秒后显示饼图
        setTimeout(() => {
          showPieChart.value = true;
        }, 0);
      }
    };

    onMounted(() => {
      fetchData();
    });

    const groupedOverview = computed(() => ({
      '总广告数量': `${overview.value.totalAds} `,
      '总广告商数量': `${overview.value.totalAdvertisers}`,
      '总用户数量': `${overview.value.totalUsers}`,
      '总网站运营者数量': `${overview.value.totalOperators} `,
      '平均操作耗时': `${overview.value.avgOperationTime} ms`,
      '最常见广告类型': `${overview.value.mostCommonAdType} `,
      '用户最感兴趣的类别': `${overview.value.mostPopularInterest} `,
    }));

    const getCardClass = (key) => {
      return 'card-general';
    };

    const orderStatusData = computed(() => ({
      labels: ['总广告请求次数', '总广告点击次数'],
      datasets: [{
        data: [
          overview.value.totalAdRequests,
          overview.value.totalAdClicks,
        ],
        backgroundColor: ['#FF6384', '#36A2EB'],
        borderColor: ['#FF6384', '#36A2EB'],
        borderWidth: 1
      }]
    }));

    const formatStatTitle = (key) => {
      return key
          .split(/(?=[A-Z])/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    };

    const formatStatValue = (value) => {
      if (typeof value === 'number') {
        return value.toLocaleString();
      }
      return value;
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          // position: 'bottom',
        },
      },
    };

    return {
      groupedOverview,
      orderStatusData,
      formatStatTitle,
      formatStatValue,
      getCardClass,
      loading,
      showPieChart,
      chartOptions
    };
  }
});
</script>

<style scoped>
.overview-dashboard {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.stats-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: calc(33% - 20px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-title {
  font-size: 18px;
  color: #7f8c8d;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
}

.card-general {
  background-color: #ecf0f1;
  color: #2c3e50;
}

.charts {
  margin-top: 10px;
}

.chart-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto 30px;
}

.chart-container {
  @apply w-full max-w-2xl mx-auto mb-8 h-[400px];
}
</style>