// pages/machinery-detail/machinery-detail.js
const app = getApp()
const util = require('../../utils/util')

Page({
  data: {
    elderMode: false,
    machine: null,
    showBookForm: false,
    formData: {
      userName: '',
      phone: '',
      startDate: '',
      duration: ''
    }
  },

  onLoad(options) {
    const id = parseInt(options.id)
    const machine = app.globalData.machinery.find(m => m.id === id)
    if (machine) {
      this.setData({
        machine,
        machineRating: app.getAverageRating('machinery', id),
        machineRatingCount: app.getRatingCount('machinery', id),
        elderMode: app.isElderMode()
      })
      wx.setNavigationBarTitle({ title: machine.name })
    }

    if (options.book === '1') {
      this.setData({ showBookForm: true })
    }
  },

  onShow() {
    this.setData({
      elderMode: app.isElderMode()
    })
  },

  onReadAloud() {
    const content = this.data.machine
      ? `${this.data.machine.name}。${this.data.machine.description}。所在地区：${this.data.machine.location}。租金每天${this.data.machine.price}元。机主：${this.data.machine.owner}。联系电话：${this.data.machine.phone}。`
      : '农机详情页面'
    wx.showModal({
      title: '🔊 为您朗读',
      content: content,
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#4CAF50'
    })
    wx.vibrateShort({ type: 'medium' })
  },

  // 表单输入
  onInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  // 日期选择
  onDateChange(e) {
    this.setData({
      'formData.startDate': e.detail.value
    })
  },

  // 切换表单
  toggleBookForm() {
    if (!this.data.machine.available) return
    this.setData({
      showBookForm: !this.data.showBookForm
    })
  },

  // 提交预订
  submitBooking() {
    const { userName, phone, startDate, duration } = this.data.formData
    if (!userName || !phone || !startDate || !duration) {
      util.showError('请填写完整信息')
      return
    }
    
    const totalCost = this.data.machine.price * parseInt(duration)
    wx.showModal({
      title: '确认预订',
      content: `确认租用 ${this.data.machine.name}？\n开始日期：${startDate}\n租用天数：${duration}天\n预计费用：¥${totalCost}`,
      success: (res) => {
        if (res.confirm) {
          // 保存订单到全局数据
          app.addOrder({
            type: 'machinery',
            itemId: this.data.machine.id,
            itemName: this.data.machine.name,
            userName,
            userPhone: phone,
            startDate,
            duration: parseInt(duration),
            totalCost,
            unitPrice: this.data.machine.price,
            location: this.data.machine.location,
            contactPhone: this.data.machine.phone,
            ownerName: this.data.machine.owner,
            status: 'pending'
          })
          util.showSuccess('预订成功')
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        }
      }
    })
  },

  // 拨打电话
  callOwner() {
    if (this.data.machine && this.data.machine.phone) {
      util.makePhoneCall(this.data.machine.phone)
    }
  },

  onShareAppMessage() {
    return {
      title: `滴滴打农 - ${this.data.machine.name}`,
      path: `/pages/machinery-detail/machinery-detail?id=${this.data.machine.id}`
    }
  }
})
