const app = getApp()

Page({
  data: {
    elderMode: false,
    categories: ['全部', '苗绣', '银饰', '蜡染'],
    selectedCategory: '全部',
    allProducts: [],
    filteredProducts: []
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.setData({ elderMode: app.isElderMode() })
  },

  loadData() {
    const products = app.globalData.heritageProducts || []
    this.setData({
      elderMode: app.isElderMode(),
      allProducts: products,
      filteredProducts: products
    })
  },

  filterCategory(e) {
    const category = e.currentTarget.dataset.category
    const filteredProducts = category === '全部'
      ? this.data.allProducts
      : this.data.allProducts.filter(item => item.category === category)

    this.setData({
      selectedCategory: category,
      filteredProducts
    })
  },

  showProductDetail(e) {
    const index = e.currentTarget.dataset.index
    const product = this.data.filteredProducts[index]
    if (!product) return

    wx.showModal({
      title: product.name,
      content:
        '品类：' + product.category +
        '\n匠人：' + product.artisan +
        '\n所在地：' + product.location +
        '\n价格：¥' + product.price + '/' + product.unit +
        '\n库存：' + product.stock +
        '\n评分：' + product.rating +
        '\n\n' + product.description,
      confirmText: '立即咨询',
      cancelText: '关闭',
      confirmColor: '#7B1FA2',
      success(res) {
        if (res.confirm) {
          wx.showToast({ title: '已提交咨询意向', icon: 'success' })
        }
      }
    })
  },

  buyNow(e) {
    const index = e.currentTarget.dataset.index
    const product = this.data.filteredProducts[index]
    if (!product) return

    wx.showModal({
      title: '确认下单',
      content: '商品：' + product.name + '\n价格：¥' + product.price + '/' + product.unit,
      confirmText: '确认购买',
      confirmColor: '#7B1FA2',
      success(res) {
        if (res.confirm) {
          wx.showToast({ title: '下单成功', icon: 'success' })
        }
      }
    })
  },

  goToCourses() {
    wx.navigateTo({ url: '/pages/miao-courses/miao-courses' })
  },

  onShareAppMessage() {
    return {
      title: '苗族非遗文创销售',
      path: '/pages/miao-products/miao-products'
    }
  }
})
