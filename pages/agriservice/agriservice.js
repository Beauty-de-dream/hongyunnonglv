// pages/agriservice/agriservice.js
const app = getApp()

Page({
  data: {
    elderMode: false,
    stats: {},
    featuredMachinery: [],
    featuredJobs: []
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.setData({ elderMode: app.isElderMode() })
    this.loadData()
  },

  loadData() {
    const featuredMachinery = app.globalData.machinery.slice(0, 6).map(m => ({
      ...m,
      avgRating: app.getAverageRating('machinery', m.id),
      ratingCount: app.getRatingCount('machinery', m.id)
    }))
    const featuredJobs = app.globalData.jobs.slice(0, 4).map(j => ({
      ...j,
      avgRating: app.getAverageRating('jobs', j.id),
      ratingCount: app.getRatingCount('jobs', j.id)
    }))
    this.setData({
      stats: app.globalData.stats,
      featuredMachinery,
      featuredJobs
    })
  },

  onReadAloud() {
    wx.showModal({
      title: '🔊 为您朗读',
      content: '农事服务页面：提供农机共享和助农务工两大核心服务，还包括农业保险、劳务合同、纠纷调解等配套服务。',
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#2E7D32'
    })
    wx.vibrateShort({ type: 'medium' })
  },

  goToMachinery() {
    wx.navigateTo({ url: '/pages/machinery/machinery' })
  },

  goToJobs() {
    wx.navigateTo({ url: '/pages/jobs/jobs' })
  },

  goToMachineryDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/machinery-detail/machinery-detail?id=' + id })
  },

  goToJobDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/jobs-detail/jobs-detail?id=' + id })
  },

  applyJob(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/jobs-detail/jobs-detail?id=' + id + '&apply=1' })
  },

  goToInsurance() {
    wx.navigateTo({ url: '/pages/insurance/insurance' })
  },

  goToContract() {
    wx.navigateTo({ url: '/pages/contract/contract' })
  },

  goToDispute() {
    wx.navigateTo({ url: '/pages/dispute/dispute' })
  },

  goToEmergency() {
    wx.navigateTo({ url: '/pages/emergency/emergency' })
  },

  publishMachinery() {
    wx.navigateTo({ url: '/pages/publish/publish?tab=machinery' })
  },

  publishJob() {
    wx.navigateTo({ url: '/pages/publish/publish?tab=jobs' })
  },

  onShareAppMessage() {
    return {
      title: '滴滴打农 - 农事服务',
      path: '/pages/agriservice/agriservice'
    }
  }
})
