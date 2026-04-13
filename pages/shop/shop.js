// pages/shop/shop.js
const app = getApp()

Page({
  data: {
    elderMode: false,
    allProducts: [],
    filteredProducts: [],
    selectedCat: ''
  },

  onLoad(options) {
    const products = app.globalData.products || []
    this.setData({
      elderMode: app.isElderMode(),
      allProducts: products,
      filteredProducts: products
    })
  },

  onShow() {
    this.setData({ elderMode: app.isElderMode() })
  },

  filterCat(e) {
    const cat = e.currentTarget.dataset.cat
    this.setData({ selectedCat: cat })
    const filtered = cat
      ? this.data.allProducts.filter(p => p.category === cat)
      : this.data.allProducts
    this.setData({ filteredProducts: filtered })
  },

  goToDetail(e) {
    const index = e.currentTarget.dataset.index
    const product = this.data.filteredProducts[index]
    if (!product) return
    wx.showModal({
      title: product.name,
      content: product.description + '\n\n价格：¥' + product.price + '/' + product.unit + '\n评分：⭐ ' + product.rating + '\n已售：' + product.sales + '件\n\n标签：' + product.tags.join('、'),
      confirmText: '立即购买',
      cancelText: '继续浏览',
      confirmColor: '#E65100',
      success(res) {
        if (res.confirm) {
          wx.showToast({ title: '下单成功！', icon: 'success' })
        }
      }
    })
  },

  buyProduct(e) {
    const index = e.currentTarget.dataset.index
    const product = this.data.filteredProducts[index]
    wx.showModal({
      title: '确认购买',
      content: '商品：' + product.name + '\n单价：¥' + product.price + '/' + product.unit,
      confirmText: '立即下单',
      confirmColor: '#E65100',
      success(res) {
        if (res.confirm) {
          wx.showToast({ title: '下单成功！', icon: 'success' })
        }
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '苗家特产商城 - 地道好物直供',
      path: '/pages/shop/shop'
    }
  }
})
