<template>
  <view class="mine-container">
    <!-- 用户信息区域 -->
    <view class="user-info-wrap">
      <image class="avatar" src="/static/images/avatar.png" mode="widthFix"></image>
      <view class="user-info">
        <text class="user-name">{{ userInfo.name }}</text>
        <text class="user-role">{{ userInfo.role }}</text>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="func-list">
      <view class="func-item" @click="handleFunc('setting')">
        <text class="func-icon">⚙</text>
        <text class="func-name">系统设置</text>
        <text class="func-arrow">></text>
      </view>
      <view class="func-item" @click="handleFunc('password')">
        <text class="func-icon">🔒</text>
        <text class="func-name">修改密码</text>
        <text class="func-arrow">></text>
      </view>
      <view class="func-item" @click="handleFunc('help')">
        <text class="func-icon">❓</text>
        <text class="func-name">帮助中心</text>
        <text class="func-arrow">></text>
      </view>
      <view class="func-item" @click="handleFunc('about')">
        <text class="func-icon">ℹ</text>
        <text class="func-name">关于我们</text>
        <text class="func-arrow">></text>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <button class="logout-btn" @click="logout">退出登录</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 模拟用户信息
const userInfo = ref({
  name: '工厂管理员',
  role: '管理员'
})

// 功能点击处理
const handleFunc = (type) => {
  uni.showToast({
    title: `点击了${type}`,
    icon: 'none'
  })
}

// 退出登录
const logout = () => {
  uni.showModal({
    title: '提示',
    content: '是否确认退出登录？',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '退出成功',
          icon: 'success'
        })
        // 实际项目中可跳转到登录页
      }
    }
  })
}
</script>

<style scoped>
.mine-page {
  padding: 10rpx;
  padding-bottom: 80rpx; /* 新增：留出TabBar空间 */
  background-color: #F8F8F8;
  min-height: 100vh;
}

/* 用户信息样式 */
.user-info-wrap {
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.user-role {
  font-size: 14px;
  color: #666;
}

/* 功能列表样式 */
.func-list {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.func-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.func-item:last-child {
  border-bottom: none;
}

.func-icon {
  font-size: 20px;
  color: #007AFF;
}

.func-name {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.func-arrow {
  font-size: 14px;
  color: #999;
}

/* 退出按钮样式 */
.logout-btn {
  width: 100%;
  background-color: #F44336;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
}
</style>