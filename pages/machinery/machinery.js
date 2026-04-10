// pages/machinery/machinery.js
const app = getApp()
const util = require('../../utils/util')
const imageHelper = require('../../utils/imageHelper')
const loadingHelper = require('../../utils/loadingHelper')
const errorHelper = require('../../utils/errorHelper')
const performanceHelper = require('../../utils/performanceHelper')

Page({
  data: {
    elderMode: false,
    loading: false,
    allMachinery: [],
    filteredMachinery: [],
    typeOptions: ['全部类型', '拖拉机', '收割机', '插秧机', '播种机'],
    locationOptions: ['全部地区', '河南省', '山东省', '湖南省', '湖北省'],
    selectedType: '',
    selectedLocation: ''
  },

  onLoad() {
    // 设置页面级 loading 管理
    loadingHelper.setupPageLoading(this);
    // 加载数据
    this.loadData();
  },

  // 加载数据（模拟异步加载，为将来接入 API 做准备）
  async loadData() {
    try {
      this.setLoading(true);

      // 模拟网络延迟（实际使用时替换为 API 调用）
      await new Promise(resolve => setTimeout(resolve, 500));

      const machinery = app.globalData.machinery;
      this.setData({
        allMachinery: machinery,
        filteredMachinery: machinery
      });

      this.setLoading(false);
    } catch (error) {
      this.setLoading(false);
      errorHelper.handleError(error, errorHelper.ErrorType.NETWORK);
    }
  },

  onShow() {
    // 刷新数据（包含用户发布的）
    this.setData({
      allMachinery: app.globalData.machinery,
      elderMode: app.isElderMode()
    })
    this.filterMachinery()
  },

  // 朗读当前页面
  onReadAloud() {
    const content = app.getPageReadContent('machinery')
    wx.showModal({
      title: '🔊 为您朗读',
      content: content,
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#4CAF50'
    })
    wx.vibrateShort({ type: 'medium' })
  },

  // 类型筛选
  onTypeChange(e) {
    const index = e.detail.value
    const type = index == 0 ? '' : this.data.typeOptions[index]
    this.setData({ selectedType: type })
    this.filterMachinery()
  },

  // 地区筛选
  onLocationChange(e) {
    const index = e.detail.value
    const location = index == 0 ? '' : this.data.locationOptions[index]
    this.setData({ selectedLocation: location })
    this.filterMachinery()
  },

  // 重置筛选
  resetFilter() {
    this.setData({
      selectedType: '',
      selectedLocation: ''
    })
    this.filterMachinery()
  },

  // 执行筛选（性能优化：避免不必要的重复计算）
  filterMachinery() {
    let result = this.data.allMachinery;
    const { selectedType, selectedLocation } = this.data;

    // 筛选逻辑
    if (selectedType) {
      result = result.filter(m => m.type === selectedType);
    }
    if (selectedLocation) {
      result = result.filter(m => m.location.includes(selectedLocation.replace('省', '')));
    }

    // 为每个农机添加评分数据（性能优化：只在数据变化时计算）
    result = result.map(m => ({
      ...m,
      avgRating: app.getAverageRating('machinery', m.id),
      ratingCount: app.getRatingCount('machinery', m.id)
    }));

    // 性能优化：只更新必要的数据
    this.setData({
      filteredMachinery: result
    });
  },

  // 跳转详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/machinery-detail/machinery-detail?id=${id}`
    })
  },

  // 预订农机
  onBookMachinery(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/machinery-detail/machinery-detail?id=${id}&book=1`
    })
  },

  // 发布农机
  goToPublish() {
    wx.navigateTo({
      url: '/pages/publish/publish?tab=machinery'
    })
  },

  // 图片加载失败处理
  handleImageError: imageHelper.createImageErrorHandler('filteredMachinery'),

  onShareAppMessage() {
    return {
      title: '滴滴打农 - 农机共享',
      path: '/pages/machinery/machinery'
    }
  }
})
