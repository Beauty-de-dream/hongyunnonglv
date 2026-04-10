// pages/guide/guide.js
const app = getApp()

Page({
  data: {
    elderMode: false,
    guides: []
  },

  onLoad() {
    this.setData({
      elderMode: app.isElderMode(),
      guides: app.globalData.tourGuides || []
    })
  },

  onShow() {
    this.setData({ elderMode: app.isElderMode() })
  },

  bookGuide(e) {
    const index = e.currentTarget.dataset.index
    const guide = this.data.guides[index]
    if (!guide.available) {
      wx.showToast({ title: '该向导暂时约满', icon: 'none' })
      return
    }
    wx.showModal({
      title: '预约向导 · ' + guide.name,
      content: '专业方向：' + guide.specialty + '\n费用：' + guide.price + '\n从业经验：' + guide.experience + '年\n\n确认后向导会在24小时内与您联系安排行程。',
      confirmText: '确认预约',
      cancelText: '再想想',
      confirmColor: '#1565C0',
      success(res) {
        if (res.confirm) {
          wx.showToast({ title: '预约成功！', icon: 'success' })
        }
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '乡村向导 - 带您深度游览苗乡',
      path: '/pages/guide/guide'
    }
  }
})
