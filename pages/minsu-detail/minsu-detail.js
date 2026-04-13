// pages/minsu-detail/minsu-detail.js
const app = getApp()
const util = require('../../utils/util')

Page({
  data: {
    elderMode: false,
    minsu: null,
    minsuRating: 4,
    minsuRatingCount: 0,
    showBookForm: false,
    formData: {
      userName: '',
      phone: '',
      checkinDate: '',
      nights: '',
      guestCount: ''
    }
  },

  onLoad(options) {
    const id = parseInt(options.id)
    const minsu = (app.globalData.minsuSpots || []).find(m => m.id === id)
    if (minsu) {
      this.setData({
        minsu,
        minsuRating: app.getAverageRating('minsu', id),
        minsuRatingCount: app.getRatingCount('minsu', id),
        elderMode: app.isElderMode()
      })
      wx.setNavigationBarTitle({ title: minsu.name })
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
    const content = this.data.minsu
      ? `${this.data.minsu.name}。${this.data.minsu.description}。地址：${this.data.minsu.address}。客房数量：${this.data.minsu.rooms}间。价格：${this.data.minsu.price}。联系电话：${this.data.minsu.phone}。`
      : '民宿详情页面'
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

  onCheckinChange(e) {
    this.setData({
      'formData.checkinDate': e.detail.value
    })
  },

  toggleBookForm() {
    this.setData({ showBookForm: !this.data.showBookForm })
  },

  submitBooking() {
    const { userName, phone, checkinDate, nights } = this.data.formData
    if (!userName || !phone || !checkinDate || !nights) {
      util.showError('请填写完整信息')
      return
    }

    const totalCost = this.data.minsu.priceNum * parseInt(nights)
    wx.showModal({
      title: '确认预订',
      content: `确认预订「${this.data.minsu.name}」？\n入住日期：${checkinDate}\n入住晚数：${nights}晚\n预计费用：¥${totalCost}`,
      success: (res) => {
        if (res.confirm) {
          app.addOrder({
            type: 'minsu',
            itemId: this.data.minsu.id,
            itemName: this.data.minsu.name,
            userName,
            userPhone: phone,
            visitDate: checkinDate,
            peopleCount: parseInt(this.data.formData.guestCount) || 1,
            totalCost,
            unitPrice: this.data.minsu.priceNum,
            location: this.data.minsu.location,
            contactPhone: this.data.minsu.phone,
            address: this.data.minsu.address,
            orderCategory: 'minsu',
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

  callMinsu() {
    if (this.data.minsu && this.data.minsu.phone) {
      util.makePhoneCall(this.data.minsu.phone)
    }
  },

  onShareAppMessage() {
    return {
      title: `滴滴打农 - ${this.data.minsu.name}`,
      path: `/pages/minsu-detail/minsu-detail?id=${this.data.minsu.id}`
    }
  }
})
