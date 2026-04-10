// pages/picking-detail/picking-detail.js
const app = getApp()
const util = require('../../utils/util')

Page({
  data: {
    elderMode: false,
    spot: null,
    showBookForm: false,
    formData: {
      userName: '',
      phone: '',
      visitDate: '',
      peopleCount: ''
    }
  },

  onLoad(options) {
    const id = parseInt(options.id)
    const spot = app.globalData.pickingSpots.find(s => s.id === id)
    if (spot) {
      this.setData({
        spot,
        spotRating: app.getAverageRating('picking', id),
        spotRatingCount: app.getRatingCount('picking', id),
        elderMode: app.isElderMode()
      })
      wx.setNavigationBarTitle({ title: spot.name })
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
    const content = this.data.spot
      ? `${this.data.spot.name}。${this.data.spot.description}。地址：${this.data.spot.address}。采摘季节：${this.data.spot.season}。价格：${this.data.spot.price}。联系电话：${this.data.spot.phone}。`
      : '采摘点详情页面'
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

  onDateChange(e) {
    this.setData({
      'formData.visitDate': e.detail.value
    })
  },

  toggleBookForm() {
    this.setData({ showBookForm: !this.data.showBookForm })
  },

  submitBooking() {
    const { userName, phone, visitDate, peopleCount } = this.data.formData
    if (!userName || !phone || !visitDate || !peopleCount) {
      util.showError('请填写完整信息')
      return
    }

    const totalCost = this.data.spot.priceNum * parseInt(peopleCount)
    wx.showModal({
      title: '确认预订',
      content: `确认预订「${this.data.spot.name}」？\n到访日期：${visitDate}\n人数：${peopleCount}人\n预计费用：¥${totalCost}`,
      success: (res) => {
        if (res.confirm) {
          // 保存订单到全局数据
          app.addOrder({
            type: 'picking',
            itemId: this.data.spot.id,
            itemName: this.data.spot.name,
            userName,
            userPhone: phone,
            visitDate,
            peopleCount: parseInt(peopleCount),
            totalCost,
            unitPrice: this.data.spot.priceNum,
            location: this.data.spot.location,
            contactPhone: this.data.spot.phone,
            address: this.data.spot.address,
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

  callSpot() {
    if (this.data.spot && this.data.spot.phone) {
      util.makePhoneCall(this.data.spot.phone)
    }
  },

  openLocation() {
    if (!this.data.spot || typeof this.data.spot.latitude !== 'number' || typeof this.data.spot.longitude !== 'number') {
      util.showError('当前采摘点暂未配置导航坐标')
      return
    }
    wx.openLocation({
      latitude: this.data.spot.latitude,
      longitude: this.data.spot.longitude,
      name: this.data.spot.name,
      address: this.data.spot.address,
      scale: 15
    })
  },

  onShareAppMessage() {
    return {
      title: `滴滴打农 - ${this.data.spot.name}`,
      path: `/pages/picking-detail/picking-detail?id=${this.data.spot.id}`
    }
  }
})
