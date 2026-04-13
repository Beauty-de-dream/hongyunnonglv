// pages/tourism/tourism.js
const app = getApp()

Page({
  data: {
    elderMode: false,
    featuredSpots: [],
    tourGuides: [],
    featuredProducts: []
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.setData({ elderMode: app.isElderMode() })
    this.loadData()
  },

  loadData() {
    const spots = app.globalData.pickingSpots.slice(0, 4).map(s => ({
      ...s,
      avgRating: app.getAverageRating('picking', s.id),
      ratingCount: app.getRatingCount('picking', s.id)
    }))
    this.setData({
      featuredSpots: spots,
      tourGuides: app.globalData.tourGuides || [],
      featuredProducts: (app.globalData.products || []).slice(0, 4)
    })
  },

  onReadAloud() {
    wx.showModal({
      title: '🔊 为您朗读',
      content: '乡村旅游页面：提供农事体验、向导预约和特产商城三大服务，带您深度游览苗乡美景。',
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#1565C0'
    })
    wx.vibrateShort({ type: 'medium' })
  },

  scrollToSection(e) {
    const id = e.currentTarget.dataset.id
    wx.pageScrollTo({ selector: '#' + id, duration: 300 })
  },

  goToExperience() {
    wx.navigateTo({ url: '/pages/picking/picking' })
  },

  goToPicking() {
    wx.navigateTo({ url: '/pages/picking/picking' })
  },

  showFarmActivity(e) {
    const type = e.currentTarget.dataset.type
    wx.showModal({
      title: type + '体验预约',
      content: '该活动将为您安排专属农事体验，包含：' + type + '、农家讲解、农耕工具使用等。\n\n是否前往预约？',
      confirmText: '去预约',
      confirmColor: '#1565C0',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({ url: '/pages/picking/picking' })
        }
      }
    })
  },

  goToPickingDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/picking-detail/picking-detail?id=' + id })
  },

  goToMinsu() {
    wx.navigateTo({ url: '/pages/picking/picking' })
  },

  goToGuide() {
    wx.navigateTo({ url: '/pages/guide/guide' })
  },

  bookGuide(e) {
    const index = e.currentTarget.dataset.index
    const guide = this.data.tourGuides[index]
    if (!guide.available) {
      wx.showToast({ title: '该向导暂时约满', icon: 'none' })
      return
    }
    wx.showModal({
      title: '预约向导 · ' + guide.name,
      content: '专业：' + guide.specialty + '\n费用：' + guide.price + '\n\n是否确认预约？',
      confirmText: '确认预约',
      confirmColor: '#1565C0',
      success(res) {
        if (res.confirm) {
          wx.showToast({ title: '预约成功！', icon: 'success' })
        }
      }
    })
  },

  goToShop() {
    wx.navigateTo({ url: '/pages/shop/shop' })
  },

  addToCart(e) {
    wx.showToast({ title: '已加入购物车', icon: 'success' })
    wx.vibrateShort({ type: 'light' })
  },

  onShareAppMessage() {
    return {
      title: '乡村旅游 - 探索苗乡秘境',
      path: '/pages/tourism/tourism'
    }
  }
})
