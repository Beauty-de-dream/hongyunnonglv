// pages/miao/miao.js
const app = getApp()

Page({
  data: {
    elderMode: false,
    cultures: [],
    festivals: [],
    miaoArts: []
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.setData({ elderMode: app.isElderMode() })
    this.loadData()
  },

  loadData() {
    const { miaoCultures, miaoFestivals, miaoArts } = app.globalData
    this.setData({
      cultures: miaoCultures || [],
      festivals: miaoFestivals || [],
      miaoArts: miaoArts || []
    })
  },

  onReadAloud() {
    wx.showModal({
      title: '🔊 为您朗读',
      content: '苗乡风情页面：介绍苗族服饰、银饰、刺绣、芦笙等特色文化，节庆活动预告，以及非遗技艺展示。',
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#6A1B9A'
    })
    wx.vibrateShort({ type: 'medium' })
  },

  scrollToSection(e) {
    const id = e.currentTarget.dataset.id
    wx.pageScrollTo({ selector: '#' + id, duration: 300 })
  },

  showCultureDetail(e) {
    const index = e.currentTarget.dataset.index
    const culture = this.data.cultures[index]
    wx.showModal({
      title: culture.icon + ' ' + culture.name,
      content: culture.description + '\n\n特点：' + culture.features.join('、'),
      showCancel: false,
      confirmText: '了解了',
      confirmColor: '#6A1B9A'
    })
  },

  showFestivalDetail(e) {
    const index = e.currentTarget.dataset.index
    const festival = this.data.festivals[index]
    wx.showModal({
      title: festival.icon + ' ' + festival.name,
      content: '举办地点：' + festival.location + '\n活动日期：' + festival.date + '\n\n' + festival.description + '\n\n主要活动：' + festival.activities.join('、'),
      confirmText: '我要参加',
      cancelText: '关闭',
      confirmColor: '#6A1B9A',
      success(res) {
        if (res.confirm) {
          wx.showToast({ title: '已标记行程！', icon: 'success' })
        }
      }
    })
  },

  watchArt(e) {
    const index = e.currentTarget.dataset.index
    const art = this.data.miaoArts[index]
    wx.showModal({
      title: art.name + ' · ' + art.artisan,
      content: '传承人：' + art.artisan + '（' + art.age + '岁）\n等级：' + art.level + '\n\n' + art.description + '\n\n视频内容：《' + art.videoTitle + '》\n（视频功能即将上线）',
      confirmText: '期待上线',
      cancelText: '关闭',
      confirmColor: '#6A1B9A'
    })
  },

  goToTourism() {
    wx.switchTab({ url: '/pages/tourism/tourism' })
  },

  onShareAppMessage() {
    return {
      title: '苗乡风情 - 千年苗韵，风情无限',
      path: '/pages/miao/miao'
    }
  }
})
