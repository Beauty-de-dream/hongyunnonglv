const app = getApp()

Page({
  data: {
    elderMode: false,
    categories: ['全部', '苗绣', '银饰', '蜡染'],
    selectedCategory: '全部',
    allCourses: [],
    filteredCourses: []
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.setData({ elderMode: app.isElderMode() })
  },

  loadData() {
    const courses = app.globalData.heritageCourses || []
    this.setData({
      elderMode: app.isElderMode(),
      allCourses: courses,
      filteredCourses: courses
    })
  },

  filterCategory(e) {
    const category = e.currentTarget.dataset.category
    const filteredCourses = category === '全部'
      ? this.data.allCourses
      : this.data.allCourses.filter(item => item.category === category)

    this.setData({
      selectedCategory: category,
      filteredCourses
    })
  },

  bookCourse(e) {
    const index = e.currentTarget.dataset.index
    const course = this.data.filteredCourses[index]
    if (!course) return

    wx.showModal({
      title: '预约课程',
      content:
        '课程：' + course.name +
        '\n讲师：' + course.instructor +
        '\n地点：' + course.location +
        '\n时间：' + course.schedule +
        '\n时长：' + course.duration +
        '\n费用：¥' + course.price +
        '\n余位：' + course.seats + ' 人',
      confirmText: '确认预约',
      confirmColor: '#6A1B9A',
      success(res) {
        if (res.confirm) {
          wx.showToast({ title: '预约成功', icon: 'success' })
        }
      }
    })
  },

  showCourseDetail(e) {
    const index = e.currentTarget.dataset.index
    const course = this.data.filteredCourses[index]
    if (!course) return

    wx.showModal({
      title: course.name,
      content:
        '类别：' + course.category +
        '\n适合人群：' + course.suitable +
        '\n授课地点：' + course.location +
        '\n开课时间：' + course.schedule +
        '\n\n' + course.description,
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#6A1B9A'
    })
  },

  goToProducts() {
    wx.navigateTo({ url: '/pages/miao-products/miao-products' })
  },

  onShareAppMessage() {
    return {
      title: '非遗体验课程',
      path: '/pages/miao-courses/miao-courses'
    }
  }
})
