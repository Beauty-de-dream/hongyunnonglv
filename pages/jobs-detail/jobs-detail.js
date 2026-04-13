// pages/jobs-detail/jobs-detail.js
const app = getApp()
const util = require('../../utils/util')

Page({
  data: {
    elderMode: false,
    job: null,
    showApplyForm: false,
    formData: {
      userName: '',
      phone: '',
      age: '',
      experience: ''
    }
  },

  onLoad(options) {
    const id = parseInt(options.id)
    const job = app.globalData.jobs.find(j => j.id === id)
    if (job) {
      this.setData({
        job,
        jobRating: app.getAverageRating('jobs', id),
        jobRatingCount: app.getRatingCount('jobs', id),
        elderMode: app.isElderMode()
      })
      wx.setNavigationBarTitle({ title: job.title })
    }

    if (options.apply === '1') {
      this.setData({ showApplyForm: true })
    }
  },

  onShow() {
    this.setData({
      elderMode: app.isElderMode()
    })
  },

  onReadAloud() {
    const content = this.data.job
      ? `${this.data.job.title}。${this.data.job.description}。工作地点：${this.data.job.location}。工作时长：${this.data.job.duration}。任职要求：${this.data.job.requirements}。薪资待遇：${this.data.job.salary}。联系电话：${this.data.job.contact}。`
      : '工作详情页面'
    wx.showModal({
      title: '🔊 为您朗读',
      content: content,
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#4CAF50'
    })
    wx.vibrateShort({ type: 'medium' })
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  toggleApplyForm() {
    this.setData({ showApplyForm: !this.data.showApplyForm })
  },

  submitApply() {
    const { userName, phone, age } = this.data.formData
    if (!userName || !phone || !age) {
      util.showError('请填写完整信息')
      return
    }

    // 跳转到合约确认页面
    const contractData = {
      type: 'jobs',
      itemId: this.data.job.id,
      itemName: this.data.job.title,
      userName,
      userPhone: phone,
      age: parseInt(age),
      experience: this.data.formData.experience,
      salary: this.data.job.salary,
      location: this.data.job.location,
      jobDuration: this.data.job.duration,
      contactPhone: this.data.job.contact
    }
    // 将合约数据存入全局临时变量
    getApp().globalData.pendingContract = contractData
    wx.navigateTo({ url: '/pages/contract/contract' })
  },

  callContact() {
    if (this.data.job && this.data.job.contact) {
      util.makePhoneCall(this.data.job.contact)
    }
  },

  goToDispute() {
    wx.navigateTo({
      url: '/pages/dispute/dispute?jobId=' + (this.data.job ? this.data.job.id : '')
    })
  },

  onShareAppMessage() {
    return {
      title: `滴滴打农 - ${this.data.job.title}`,
      path: `/pages/jobs-detail/jobs-detail?id=${this.data.job.id}`
    }
  }
})
