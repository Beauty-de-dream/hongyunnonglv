// pages/orders/orders.js
const app = getApp()

Page({
  data: {
    elderMode: false,
    currentTab: 'all',
    tabs: [
      { key: 'all', label: '全部' },
      { key: 'machinery', label: '农机' },
      { key: 'jobs', label: '务工' },
      { key: 'picking', label: '采摘/民宿' }
    ],
    orders: [],
    showRatingModal: false,
    ratingOrderId: '',
    ratingScore: 0,
    statusMap: {
      pending: '待确认',
      confirmed: '已确认',
      completed: '已完成',
      cancelled: '已取消'
    },
    statusColorMap: {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    }
  },

  onLoad(options) {
    if (options.tab) {
      this.setData({ currentTab: options.tab })
    }
    this.setData({
      elderMode: app.isElderMode()
    })
  },

  onShow() {
    this.setData({
      elderMode: app.isElderMode()
    })
    this.loadOrders()
  },

  onReadAloud() {
    const orderCount = this.data.orders.length
    const tabName = this.data.tabs.find(t => t.key === this.data.currentTab)?.label || '全部'
    const content = orderCount > 0
      ? `我的订单页面。当前显示${tabName}订单，共${orderCount}条。您可以查看订单详情、联系对方、取消订单或评价服务。`
      : `我的订单页面。当前显示${tabName}订单，暂无订单记录。`
    wx.showModal({
      title: '🔊 为您朗读',
      content: content,
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#4CAF50'
    })
    wx.vibrateShort({ type: 'medium' })
  },

  // 切换标签
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab })
    this.loadOrders()
  },

  // 加载订单
  loadOrders() {
    const type = this.data.currentTab === 'all' ? null : this.data.currentTab
    const orders = app.getOrders(type).map(order => ({
      ...order,
      displayType: app.getOrderType(order)
    }))
    this.setData({ orders })
  },

  // 取消订单
  onCancelOrder(e) {
    const orderId = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认取消',
      content: '确定要取消此订单吗？',
      success: (res) => {
        if (res.confirm) {
          app.cancelOrder(orderId)
          this.loadOrders()
          wx.showToast({ title: '订单已取消', icon: 'success' })
        }
      }
    })
  },

  // 确认完成
  onCompleteOrder(e) {
    const orderId = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认完成',
      content: '确定此订单已完成？',
      success: (res) => {
        if (res.confirm) {
          app.updateOrderStatus(orderId, 'completed')
          this.loadOrders()
          wx.showToast({ title: '订单已完成', icon: 'success' })
          // 完成后自动弹出评价
          setTimeout(() => {
            this.setData({
              showRatingModal: true,
              ratingOrderId: orderId,
              ratingScore: 0
            })
          }, 1500)
        }
      }
    })
  },

  // 显示评价弹窗
  onShowRating(e) {
    const orderId = e.currentTarget.dataset.id
    this.setData({
      showRatingModal: true,
      ratingOrderId: orderId,
      ratingScore: 0
    })
  },

  // 选择星级
  onSelectStar(e) {
    const star = e.currentTarget.dataset.star
    this.setData({ ratingScore: star })
  },

  // 关闭评价弹窗
  onCloseRating() {
    this.setData({
      showRatingModal: false,
      ratingOrderId: '',
      ratingScore: 0
    })
  },

  // 提交评价
  onSubmitRating() {
    if (this.data.ratingScore === 0) {
      wx.showToast({ title: '请选择星级', icon: 'none' })
      return
    }
    app.rateOrder(this.data.ratingOrderId, this.data.ratingScore)
    this.setData({
      showRatingModal: false,
      ratingOrderId: '',
      ratingScore: 0
    })
    this.loadOrders()
    wx.showToast({ title: '评价成功', icon: 'success' })
  },

  // 查看详情导航
  goToDetail(e) {
    const order = e.currentTarget.dataset.order
    const orderType = app.getOrderType(order)
    let url = ''
    if (orderType === 'machinery') {
      url = `/pages/machinery-detail/machinery-detail?id=${order.itemId}`
    } else if (orderType === 'jobs') {
      url = `/pages/jobs-detail/jobs-detail?id=${order.itemId}`
    } else if (orderType === 'picking') {
      url = `/pages/picking-detail/picking-detail?id=${order.itemId}`
    } else if (orderType === 'minsu') {
      url = `/pages/minsu-detail/minsu-detail?id=${order.itemId}`
    }
    if (url) {
      wx.navigateTo({ url })
    }
  },

  // 拨打电话
  callPhone(e) {
    const phone = e.currentTarget.dataset.phone
    if (phone) {
      wx.makePhoneCall({
        phoneNumber: phone,
        fail() {}
      })
    }
  }
})
