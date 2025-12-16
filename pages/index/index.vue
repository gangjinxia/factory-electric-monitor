<template>
  <view class="monitor-page">
    <!-- 工厂信息与实时指标 -->
    <view class="info-card">
      <view class="factory-name">{{ monitorData.realTimeIndicators.factoryName }}</view>
      <view class="indicators-grid">
        <view class="indicator-item">
          <text class="label">当前功率</text>
          <text class="value">{{ monitorData.realTimeIndicators.currentPower }} kW</text>
        </view>
        <view class="indicator-item">
          <text class="label">电压</text>
          <text class="value">{{ monitorData.realTimeIndicators.voltage }} V</text>
        </view>
        <view class="indicator-item">
          <text class="label">电流</text>
          <text class="value">{{ monitorData.realTimeIndicators.current }} A</text>
        </view>
        <view class="indicator-item">
          <text class="label">功率因数</text>
          <text class="value">{{ monitorData.realTimeIndicators.powerFactor }}</text>
        </view>
      </view>
    </view>

    <!-- 功率趋势图表 -->
    <view class="chart-card">
      <text class="chart-title">近15分钟功率趋势</text>
      <l-echart ref="powerTrendChart" @finished="initPowerTrendChart" class="chart"></l-echart>
    </view>

    <!-- 设备用电排行图表 -->
    <view class="chart-card">
      <text class="chart-title">设备用电排行</text>
      <l-echart ref="deviceRankChart" @finished="initDeviceRankChart" class="chart"></l-echart>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { monitorData } from '@/common/mockData.js';

// 图表Ref
const powerTrendChart = ref(null);
const deviceRankChart = ref(null);

// 小程序环境引入ECharts，H5/App不引入
// #ifdef MP
const echarts = require('../../static/echarts.js');
// #endif
// #ifndef MP
const echarts = null;
// #endif

// 初始化功率趋势图表
const initPowerTrendChart = async () => {
  if (!powerTrendChart.value) return;
  try {
    const chart = await powerTrendChart.value.init(echarts);
    chart.setOption({
      tooltip: { trigger: 'axis', confine: true },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: monitorData.powerTrend.xAxis,
        axisLine: { lineStyle: { color: '#999' } },
        axisLabel: { color: '#666' }
      },
      yAxis: {
        type: 'value',
        name: '功率(kW)',
        axisLine: { lineStyle: { color: '#999' } },
        axisLabel: { color: '#666' }
      },
      series: [
        {
          name: '实时功率',
          type: 'line',
          data: monitorData.powerTrend.yAxis,
          smooth: true,
          itemStyle: { color: '#007AFF' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [{ offset: 0, color: '#007AFF33' }, { offset: 1, color: '#007AFF00' }]
            }
          }
        }
      ]
    });
  } catch (error) {
    console.error('功率趋势图表初始化失败:', error);
  }
};

// 初始化设备用电排行图表
const initDeviceRankChart = async () => {
  if (!deviceRankChart.value) return;
  try {
    const chart = await deviceRankChart.value.init(echarts);
    chart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, confine: true },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: monitorData.devicePowerRank.map(item => item.name),
        axisLine: { lineStyle: { color: '#999' } },
        axisLabel: { color: '#666' }
      },
      yAxis: {
        type: 'value',
        name: '功率(kW)',
        axisLine: { lineStyle: { color: '#999' } },
        axisLabel: { color: '#666' }
      },
      series: [
        {
          name: '设备功率',
          type: 'bar',
          data: monitorData.devicePowerRank.map(item => item.power),
          itemStyle: { color: '#007AFF' }
        }
      ]
    });
  } catch (error) {
    console.error('设备排行图表初始化失败:', error);
  }
};
</script>

<style scoped>
.monitor-page {
  padding: 10rpx;
  padding-bottom: 80rpx; /* 新增：留出TabBar空间 */
  background-color: #F8F8F8;
  min-height: 100vh;
}

.info-card {
  background: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.factory-name {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.indicators-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.indicator-item {
  width: 48%;
  margin-bottom: 15rpx;
}

.label {
  font-size: 28rpx;
  color: #666;
  display: block;
  margin-bottom: 5rpx;
}

.value {
  font-size: 32rpx;
  color: #333;
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