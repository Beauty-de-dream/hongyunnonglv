const app = getApp()

Page({
  data: {
    elderMode: false,
    cultures: [],
    festivals: [],
    miaoArts: [],
    serviceCards: []
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.setData({ elderMode: app.isElderMode() })
    this.loadData()
  },

  loadData() {
    const {
      miaoCultures,
      miaoFestivals,
      miaoArts,
      heritageProducts,
      heritageCourses
    } = app.globalData

    this.setData({
      cultures: miaoCultures || [],
      festivals: miaoFestivals || [],
      miaoArts: miaoArts || [],
      serviceCards: [
        {
          id: 'products',
          icon: '🛍️',
          title: '苗族非遗文创销售',
          desc: '为苗绣、银饰、蜡染等非遗文创产品提供线上展销服务。',
          stats: (heritageProducts || []).length + ' 款在售文创',
          tags: ['苗绣', '银饰', '蜡染'],
          action: 'goToHeritageProducts',
          actionText: '进入文创展销'
        },
        {
          id: 'courses',
          icon: '🧶',
          title: '非遗体验课程',
          desc: '预约苗绣、银饰、蜡染等非遗体验课程，沉浸式感受苗乡技艺魅力。',
          stats: (heritageCourses || []).length + ' 门可预约课程',
          tags: ['手作体验', '亲子研学', '小班预约'],
          action: 'goToHeritageCourses',
          actionText: '预约体验课程'
        }
      ]
    })
  },

  onReadAloud() {
    wx.showModal({
      title: '语音朗读',
      content: '苗乡风情页面：介绍苗族文化、节庆活动、非遗技艺，以及文创展销和体验课程服务。',
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
    if (!culture) return

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
    if (!festival) return

    wx.showModal({
      title: festival.icon + ' ' + festival.name,
      content:
        '举办地点：' + festival.location +
        '\n活动日期：' + festival.date +
        '\n\n' + festival.description +
        '\n\n主要活动：' + festival.activities.join('、'),
      confirmText: '我要参加',
      cancelText: '关闭',
      confirmColor: '#6A1B9A',
      success(res) {
        if (res.confirm) {
          wx.showToast({ title: '已标记行程', icon: 'success' })
        }
      }
    })
  },

  watchArt(e) {
    const index = e.currentTarget.dataset.index
    const art = this.data.miaoArts[index]
    if (!art) return

    wx.showModal({
      title: art.name + ' · ' + art.artisan,
      content:
        '传承人：' + art.artisan + '（' + art.age + '岁）' +
        '\n等级：' + art.level +
        '\n\n' + art.description +
        '\n\n视频内容：《' + art.videoTitle + '》\n视频功能即将上线',
      confirmText: '期待上线',
      cancelText: '关闭',
      confirmColor: '#6A1B9A'
    })
  },

  goToTourism() {
    wx.switchTab({ url: '/pages/tourism/tourism' })
  },

  goToHeritageProducts() {
    wx.navigateTo({ url: '/pages/miao-products/miao-products' })
  },

  goToHeritageCourses() {
    wx.navigateTo({ url: '/pages/miao-courses/miao-courses' })
  },

  handleServiceAction(e) {
    const action = e.currentTarget.dataset.action
    if (action && typeof this[action] === 'function') {
      this[action]()
    }
  },

  onShareAppMessage() {
    return {
      title: '苗乡风情 - 千年苗韵，风情无限',
      path: '/pages/miao/miao'
    }
  }
})
