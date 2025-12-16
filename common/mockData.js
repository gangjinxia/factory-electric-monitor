// common/mockData.js

// 实时监控页面数据
export const monitorData = {
  // 工厂实时用电核心指标
  realTimeIndicators: {
    factoryName: "光明区XX五金加工厂",
    currentPower: 132.5, // 当前功率(kW)
    voltage: 380.5, // 电压(V)
    current: 215.3, // 电流(A)
    powerFactor: 0.93, // 功率因数
    activePower: 123.8, // 有功功率(kW)
    reactivePower: 45.2, // 无功功率(kVar)
  },
  // 近15分钟功率趋势数据
  powerTrend: {
    xAxis: ["08:00", "08:01", "08:02", "08:03", "08:04", "08:05", "08:06", "08:07", "08:08", "08:09", "08:10", "08:11", "08:12", "08:13", "08:14"],
    yAxis: [128.2, 130.5, 129.8, 131.2, 130.9, 132.1, 132.5, 131.8, 132.0, 132.3, 131.9, 132.2, 132.5, 132.4, 132.5],
  },
  // 车间设备用电排行
  devicePowerRank: [
    { name: "数控车床1", power: 38.2, ratio: 28.8 },
    { name: "折弯机", power: 32.5, ratio: 24.5 },
    { name: "数控车床2", power: 25.8, ratio: 19.5 },
    { name: "空压机", power: 18.6, ratio: 14.0 },
    { name: "照明系统", power: 10.1, ratio: 7.6 },
    { name: "其他设备", power: 7.3, ratio: 5.6 },
  ],
};

// 统计分析页面数据
export const statisticsData = {
  // 近7天用电量统计
  dayConsume: {
    xAxis: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    yAxis: [320.5, 335.2, 328.8, 340.1, 336.5, 310.2, 325.8], // 单位：kWh
  },
  // 近12个月用电量统计
  monthConsume: {
    xAxis: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    yAxis: [9200, 8800, 9500, 9800, 10200, 9900, 10500, 10800, 10300, 9700, 9400, 9600], // 单位：kWh
  },
  // 用电类型占比
  powerTypeRatio: [
    { name: "生产设备", value: 78.5 },
    { name: "辅助设备", value: 12.3 },
    { name: "照明/办公", value: 9.2 },
  ],
  // 用电成本统计
  costStat: {
    today: 265.2, // 今日成本（元）
    month: 7850.5, // 本月成本（元）
    year: 95200.8, // 本年成本（元）
  },
};

// 告警提醒页面数据
export const alarmData = {
  // 未处理告警
  unhandled: [
    { id: 1, type: "过压告警", device: "数控车床1", time: "2025-12-17 08:10", value: "425V", status: "未处理" },
    { id: 2, type: "功率超限", device: "折弯机", time: "2025-12-17 08:05", value: "35kW", status: "未处理" },
    { id: 3, type: "电流异常", device: "空压机", time: "2025-12-17 08:00", value: "260A", status: "未处理" },
  ],
  // 已处理告警
  handled: [
    { id: 4, type: "欠压告警", device: "数控车床2", time: "2025-12-16 18:30", value: "355V", status: "已处理" },
    { id: 5, type: "功率因数低", device: "总线路", time: "2025-12-16 10:15", value: "0.82", status: "已处理" },
    { id: 6, type: "过载告警", device: "照明系统", time: "2025-12-16 09:20", value: "12kW", status: "已处理" },
  ],
  // 告警类型统计
  alarmTypeCount: [
    { name: "过压/欠压", value: 15 },
    { name: "功率超限", value: 9 },
    { name: "电流异常", value: 7 },
    { name: "功率因数低", value: 5 },
    { name: "过载告警", value: 4 },
  ],
};

// 我的页面数据
export const mineData = {
  userInfo: {
    avatar: "/static/icon/avatar.png",
    userName: "张管理员",
    factory: "光明区XX五金加工厂",
    phone: "13900139000",
    role: "工厂管理员",
  },
  functionList: [
    { icon: "/static/icon/device.png", name: "设备管理", path: "/pages/device/device" },
    { icon: "/static/icon/setting.png", name: "参数设置", path: "/pages/setting/setting" },
    { icon: "/static/icon/help.png", name: "帮助中心", path: "/pages/help/help" },
    { icon: "/static/icon/about.png", name: "关于我们", path: "/pages/about/about" },
  ],
};