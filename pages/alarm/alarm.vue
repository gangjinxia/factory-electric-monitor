<template>
  <view class="alarm-page">
    <!-- 告警标签切换 -->
    <view class="tab-bar">
      <view class="tab-item" :class="{ active: activeTab === 'unhandled' }" @click="activeTab = 'unhandled'">
        未处理告警 ({{ alarmData.unhandled.length }})
      </view>
      <view class="tab-item" :class="{ active: activeTab === 'handled' }" @click="activeTab = 'handled'">
        已处理告警 ({{ alarmData.handled.length }})
      </view>
    </view>

    <!-- 告警列表 -->
    <view class="alarm-list">
      <view class="alarm-item" v-for="item in currentAlarmList" :key="item.id">
        <view class="alarm-header">
          <text class="alarm-type">{{ item.type }}</text>
          <text class="alarm-status" :class="item.status === '未处理' ? 'unhandled' : 'handled'">
            {{ item.status }}
          </text>
        </view>
        <view class="alarm-body">
          <text class="item-text">设备：{{ item.device }}</text>
          <text class="item-text">时间：{{ item.time }}</text>
          <text class="item-text">数值：{{ item.value }}</text>
        </view>
        <view class="alarm-footer" v-if="item.status === '未处理'">
          <button class="handle-btn" @click="handleAlarm(item.id)">处理告警</button>
        </view>
      </view>
    </view>

    <!-- 告警类型统计（仅未处理标签显示） -->
    <view class="chart-card" v-if="activeTab === 'unhandled'">
      <text class="chart-title">告警类型统计</text>
      <l-echart ref="alarmTypeChart" @finished="initAlarmTypeChart" class="chart"></l-echart>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { alarmData } from '@/common/mockData.js';

// 响应式数据
const activeTab = ref('unhandled');
const alarmDataRef = ref({ ...alarmData }); // 深拷贝模拟数据

// 当前显示的告警列表
const currentAlarmList = computed(() => {
  return activeTab.value === 'unhandled' ? alarmDataRef.value.unhandled : alarmDataRef.value.handled;
});

// 图表Ref
const alarmTypeChart = ref(null);

// 小程序环境引入ECharts
// #ifdef MP
const echarts = require('../../static/echarts.js');
// #endif
// #ifndef MP
const echarts = null;
// #endif

// 处理告警（模拟）
const handleAlarm = (id) => {
  // 找到未处理告警中的对应项
  const unhandledIndex = alarmDataRef.value.unhandled.findIndex(item => item.id === id);
  if (unhandledIndex > -1) {
    const [handledItem] = alarmDataRef.value.unhandled.splice(unhandledIndex, 1);
    handledItem.status = '已处理';
    alarmDataRef.value.handled.unshift(handledItem); // 添加到已处理列表顶部
    uni.showToast({ title: '告警处理成功', icon: 'success' });
  }
};

// 初始化告警类型统计图表
const initAlarmTypeChart = async () => {
  if (!alarmTypeChart.value) return;
  try {
    const chart = await alarmTypeChart.value.init(echarts);
    chart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, confine: true },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: alarmDataRef.value.alarmTypeCount.map(item => item.name),
        axisLine: { lineStyle: { color: '#999' } },
        axisLabel: { color: '#666' }
      },
      yAxis: {
        type: 'value',
        name: '告警次数',
        axisLine: { lineStyle: { color: '#999' } },
        axisLabel: { color: '#666' }
      },
      series: [
        {
          name: '告警次数',
          type: 'bar',
          data: alarmDataRef.value.alarmTypeCount.map(item => item.value),
          itemStyle: { color: '#E63946' }
        }
      ]
    });
  } catch (error) {
    console.error('告警类型图表初始化失败:', error);
  }
};
</script>

<style scoped>
.alarm-page {
  padding: 10rpx;
  padding-bottom: 80rpx; /* 新增：留出TabBar空间 */
  background-color: #F8F8F8;
  min-height: 100vh;
}

.tab-bar {
  display: flex;
  background: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 20rpx;
  font-size: 30rpx;
  color: #666;
  border-bottom: 4rpx solid transparent;
}

.tab-item.active {
  color: #007AFF;
  border-bottom-color: #007AFF;
}

.alarm-list {
  margin-bottom: 20rpx;
}

.alarm-item {
  background: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 15rpx;
}

.alarm-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15rpx;
}

.alarm-type {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
}

.alarm-status {
  font-size: 28rpx;
  padding: 5rpx 15rpx;
  border-radius: 20rpx;
}

.alarm-status.unhandled {
  background: #FFE6E6;
  color: #E63946;
}

.alarm-status.handled {
  background: #E6FFE6;
  color: #33CC33;
}

.alarm-body {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.alarm-footer {
  margin-top: 15rpx;
  text-align: right;
}

.handle-btn {
  background: #007AFF;
  color: #fff;
  border: none;
  padding: 10rpx 20rpx;
  border-radius: 5rpx;
  font-size: 28rpx;
}

.chart-card {
  background: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
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