<template>
  <view class="statistics-page">
    <!-- 用电成本统计 -->
    <view class="cost-card">
      <text class="card-title">用电成本统计</text>
      <view class="cost-grid">
        <view class="cost-item">
          <text class="label">今日成本</text>
          <text class="value">¥{{ statisticsData.costStat.today }}</text>
        </view>
        <view class="cost-item">
          <text class="label">本月成本</text>
          <text class="value">¥{{ statisticsData.costStat.month }}</text>
        </view>
        <view class="cost-item">
          <text class="label">本年成本</text>
          <text class="value">¥{{ statisticsData.costStat.year }}</text>
        </view>
      </view>
    </view>

    <!-- 近7天用电统计 -->
    <view class="chart-card">
      <text class="chart-title">近7天用电量统计</text>
      <l-echart ref="dayConsumeChart" @finished="initDayConsumeChart" class="chart"></l-echart>
    </view>

    <!-- 近12个月用电统计 -->
    <view class="chart-card">
      <text class="chart-title">近12个月用电量统计</text>
      <l-echart ref="monthConsumeChart" @finished="initMonthConsumeChart" class="chart"></l-echart>
    </view>

    <!-- 用电类型占比 -->
    <view class="chart-card">
      <text class="chart-title">用电类型占比</text>
      <l-echart ref="powerTypeChart" @finished="initPowerTypeChart" class="chart"></l-echart>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { statisticsData } from '@/common/mockData.js';

// 图表Ref
const dayConsumeChart = ref(null);
const monthConsumeChart = ref(null);
const powerTypeChart = ref(null);

// 小程序环境引入ECharts
// #ifdef MP
const echarts = require('../../static/echarts.js');
// #endif
// #ifndef MP
const echarts = null;
// #endif

// 初始化近7天用电图表
const initDayConsumeChart = async () => {
  if (!dayConsumeChart.value) return;
  try {
    const chart = await dayConsumeChart.value.init(echarts);
    chart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, confine: true },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: statisticsData.dayConsume.xAxis,
        axisLine: { lineStyle: { color: '#999' } },
        axisLabel: { color: '#666' }
      },
      yAxis: {
        type: 'value',
        name: '用电量(kWh)',
        axisLine: { lineStyle: { color: '#999' } },
        axisLabel: { color: '#666' }
      },
      series: [
        {
          name: '日用电量',
          type: 'bar',
          data: statisticsData.dayConsume.yAxis,
          itemStyle: { color: '#007AFF' }
        }
      ]
    });
  } catch (error) {
    console.error('日用电图表初始化失败:', error);
  }
};

// 初始化近12个月用电图表
const initMonthConsumeChart = async () => {
  if (!monthConsumeChart.value) return;
  try {
    const chart = await monthConsumeChart.value.init(echarts);
    chart.setOption({
      tooltip: { trigger: 'axis', confine: true },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: statisticsData.monthConsume.xAxis,
        axisLine: { lineStyle: { color: '#999' } },
        axisLabel: { color: '#666' }
      },
      yAxis: {
        type: 'value',
        name: '用电量(kWh)',
        axisLine: { lineStyle: { color: '#999' } },
        axisLabel: { color: '#666' }
      },
      series: [
        {
          name: '月用电量',
          type: 'line',
          data: statisticsData.monthConsume.yAxis,
          smooth: true,
          itemStyle: { color: '#FF6600' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [{ offset: 0, color: '#FF660033' }, { offset: 1, color: '#FF660000' }]
            }
          }
        }
      ]
    });
  } catch (error) {
    console.error('月用电图表初始化失败:', error);
  }
};

// 初始化用电类型占比图表
const initPowerTypeChart = async () => {
  if (!powerTypeChart.value) return;
  try {
    const chart = await powerTypeChart.value.init(echarts);
    chart.setOption({
      tooltip: { trigger: 'item', confine: true },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        left: 'center',
        textStyle: { color: '#666' }
      },
      series: [
        {
          name: '用电类型',
          type: 'pie',
          radius: ['40%', '70%'],
          data: statisticsData.powerTypeRatio,
          label: {
            show: true,
            formatter: '{b}: {c}%'
          },
          itemStyle: {
            color: (params) => {
              const colorList = ['#007AFF', '#FF6600', '#33CC33'];
              return colorList[params.dataIndex];
            }
          }
        }
      ]
    });
  } catch (error) {
    console.error('用电类型图表初始化失败:', error);
  }
};
</script>

<style scoped>
.statistics-page {
  padding: 10rpx;
  padding-bottom: 80rpx; /* 新增：留出TabBar空间 */
  background-color: #F8F8F8;
  min-height: 100vh;
}

.cost-card {
  background: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.card-title {
  font-size: 30rpx;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.cost-grid {
  display: flex;
  justify-content: space-around;
}

.cost-item {
  text-align: center;
}

.label {
  font-size: 28rpx;
  color: #666;
  display: block;
  margin-bottom: 5rpx;
}

.value {
  font-size: 32rpx;
  color: #E63946;
  font-weight: bold;
}

.chart-card {
  background: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.chart-title {
  font-size: 30rpx;
  color: #333;
  margin-bottom: 15rpx;
  display: block;
}

.chart {
  width: 100%;
  height: 400rpx;
}
</style>