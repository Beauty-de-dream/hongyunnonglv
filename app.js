/**
 * 滴滴打农小程序 - 应用主文件
 *
 * 功能说明：
 * - 管理全局数据和状态
 * - 提供订单管理功能（添加、查询、更新、取消）
 * - 提供评价管理功能（添加评价、获取评分）
 * - 提供发布管理功能（发布农机、工作、采摘点）
 * - 提供老人模式管理功能
 *
 * 数据管理：
 * - 基础数据从独立的数据文件导入（data/ 目录）
 * - 运行时数据存储在 globalData 中
 * - 用户数据持久化到本地存储（wx.setStorageSync）
 *
 * @author 滴滴打农团队
 * @version 1.0.0
 */

// 引入工具函数
const { deepClone, mergeListById, formatTime } = require('./utils/dataHelper.js');

// 引入数据文件
const machineryData = require('./data/machinery.js');
const jobsData = require('./data/jobs.js');
const pickingSpotsData = require('./data/pickingSpots.js');
const minsuSpotsData = require('./data/minsuSpots.js');
const redCultureData = require('./data/redCulture.js');
const miaoCultureData = require('./data/miaoCulture.js');
const miaoHeritageData = require('./data/miaoHeritage.js');
const tourismData = require('./data/tourism.js');
const productsData = require('./data/products.js');
const commonData = require('./data/common.js');

App({
  onLaunch() {
    this.captureDefaultData();
    // 小程序启动时执行
    console.log("滴滴打农小程序启动");
    // 从本地存储恢复订单数据
    const orders = wx.getStorageSync("orders");
    if (orders) {
      this.globalData.orders = this.normalizeStoredOrders(orders);
      wx.setStorageSync("orders", this.globalData.orders);
    }
    // 从本地存储恢复用户发布数据
    const userMachinery = wx.getStorageSync("userMachinery");
    if (userMachinery) {
      this.globalData.userMachinery = userMachinery;
    }
    const userJobs = wx.getStorageSync("userJobs");
    if (userJobs) {
      this.globalData.userJobs = userJobs;
    }
    const userPickingSpots = wx.getStorageSync("userPickingSpots");
    if (userPickingSpots) {
      this.globalData.userPickingSpots = userPickingSpots;
    }
    // 从本地存储恢复评价数据
    const ratings = wx.getStorageSync("ratings");
    if (ratings) {
      this.globalData.ratings = ratings;
    }
    // 恢复老人模式设置
    const elderMode = wx.getStorageSync("elderMode");
    this.globalData.elderMode = !!elderMode;
    this.rebuildPublishedLists();
  },

  /**
   * 捕获默认数据
   * 在首次调用时保存 globalData 中的初始数据，用于重置功能
   * 避免重复捕获，提高性能
   */
  captureDefaultData() {
    if (this._defaultData) {
      return;
    }
    this._defaultData = {
      machinery: deepClone(this.globalData.machinery),
      jobs: deepClone(this.globalData.jobs),
      pickingSpots: deepClone(this.globalData.pickingSpots),
      minsuSpots: deepClone(this.globalData.minsuSpots),
      testimonials: deepClone(this.globalData.testimonials),
      stats: deepClone(this.globalData.stats),
    };
  },

  /**
   * 规范化存储的订单数据
   * 修复历史数据中的类型不一致问题
   *
   * @param {Array} orders - 订单数组
   * @returns {Array} 规范化后的订单数组
   */
  normalizeStoredOrders(orders = []) {
    return orders.map((order) => {
      if (order.orderCategory === "minsu" && order.type !== "minsu") {
        return {
          ...order,
          type: "minsu",
        };
      }
      return order;
    });
  },

  /**
   * 重建发布列表
   * 将用户发布的内容合并到基础数据中
   * 确保用户发布的内容在列表中显示
   */
  rebuildPublishedLists() {
    this.captureDefaultData();
    this.globalData.machinery = mergeListById(
      this._defaultData.machinery,
      this.globalData.userMachinery
    );
    this.globalData.jobs = mergeListById(
      this._defaultData.jobs,
      this.globalData.userJobs
    );
    this.globalData.pickingSpots = mergeListById(
      this._defaultData.pickingSpots,
      this.globalData.userPickingSpots
    );
  },

  resetRuntimeData() {
    this.captureDefaultData();
    this.globalData.orders = [];
    this.globalData.ratings = {};
    this.globalData.userMachinery = [];
    this.globalData.userJobs = [];
    this.globalData.userPickingSpots = [];
    this.globalData.userInfo = null;
    this.globalData.elderMode = false;
    this.globalData.pendingContract = null;
    this.globalData.machinery = deepClone(this._defaultData.machinery);
    this.globalData.jobs = deepClone(this._defaultData.jobs);
    this.globalData.pickingSpots = deepClone(this._defaultData.pickingSpots);
    this.globalData.minsuSpots = deepClone(this._defaultData.minsuSpots);
    this.globalData.testimonials = deepClone(this._defaultData.testimonials);
    this.globalData.stats = deepClone(this._defaultData.stats);
  },

  getOrderType(order) {
    if (!order) {
      return "";
    }
    return order.orderCategory === "minsu" ? "minsu" : order.type;
  },

  // ============ 订单管理方法 ============

  /**
   * 添加订单
   * 创建新订单并保存到本地存储
   *
   * @param {Object} order - 订单信息
   * @param {string} order.type - 订单类型（machinery/jobs/picking/minsu）
   * @param {string} order.itemName - 项目名称
   * @param {number} order.itemId - 项目ID
   * @param {string} order.status - 订单状态（可选，默认为 pending）
   * @returns {Object} 创建的订单对象（包含 orderId 和 createTime）
   */
  addOrder(order) {
    const orderData = {
      ...order,
      orderId: "DD" + Date.now() + Math.floor(Math.random() * 1000),
      createTime: formatTime(new Date()),
      status: order.status || "pending", // pending, confirmed, completed, cancelled
    };
    this.globalData.orders.unshift(orderData);
    wx.setStorageSync("orders", this.globalData.orders);
    return orderData;
  },

  /**
   * 获取指定类型的订单
   *
   * @param {string} type - 订单类型（machinery/jobs/picking/minsu/all）
   * @returns {Array} 订单数组
   */
  getOrders(type) {
    if (!type || type === "all") {
      return this.globalData.orders;
    }
    return this.globalData.orders.filter((order) => {
      const orderType = this.getOrderType(order);
      if (type === "picking") {
        return orderType === "picking" || orderType === "minsu";
      }
      return orderType === type;
    });
  },

  /**
   * 获取订单统计数据
   *
   * @returns {Object} 订单统计对象
   * @returns {number} return.machinery - 农机订单数量
   * @returns {number} return.jobs - 务工订单数量
   * @returns {number} return.picking - 采摘订单数量（包含民宿）
   * @returns {number} return.minsu - 民宿订单数量
   * @returns {number} return.all - 总订单数量
   */
  getOrderCounts() {
    const orders = this.globalData.orders;
    const getTypeCount = (type) =>
      orders.filter((order) => this.getOrderType(order) === type).length;
    const minsu = getTypeCount("minsu");
    return {
      machinery: getTypeCount("machinery"),
      jobs: getTypeCount("jobs"),
      picking: getTypeCount("picking") + minsu,
      minsu,
      all: orders.length,
    };
  },

  // 更新订单状态
  updateOrderStatus(orderId, status) {
    const order = this.globalData.orders.find((o) => o.orderId === orderId);
    if (order) {
      order.status = status;
      order.updateTime = formatTime(new Date());
      wx.setStorageSync("orders", this.globalData.orders);
    }
  },

  // 取消订单
  cancelOrder(orderId) {
    this.updateOrderStatus(orderId, "cancelled");
  },

  // ============ 评价管理方法 ============

  /**
   * 添加评价
   * 为指定项目添加评分
   *
   * @param {string} type - 项目类型（machinery/jobs/picking/minsu）
   * @param {number} itemId - 项目ID
   * @param {number} score - 评分（1-5）
   */
  addRating(type, itemId, score) {
    const key = type + "_" + itemId;
    if (!this.globalData.ratings[key]) {
      this.globalData.ratings[key] = [];
    }
    this.globalData.ratings[key].push(score);
    wx.setStorageSync("ratings", this.globalData.ratings);
  },

  /**
   * 获取平均评分
   * 如果没有评价，返回默认值 4 星
   *
   * @param {string} type - 项目类型
   * @param {number} itemId - 项目ID
   * @returns {number} 平均评分（保留一位小数）
   */
  getAverageRating(type, itemId) {
    const key = type + "_" + itemId;
    const scores = this.globalData.ratings[key];
    if (!scores || scores.length === 0) {
      return 4;
    }
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(avg * 10) / 10;
  },

  // 获取评价数量
  getRatingCount(type, itemId) {
    const key = type + "_" + itemId;
    const scores = this.globalData.ratings[key];
    return scores ? scores.length : 0;
  },

  // 为订单设置评价
  rateOrder(orderId, score) {
    const order = this.globalData.orders.find((o) => o.orderId === orderId);
    if (order) {
      order.rating = score;
      order.rateTime = formatTime(new Date());
      this.addRating(this.getOrderType(order), order.itemId, score);
      wx.setStorageSync("orders", this.globalData.orders);
    }
  },

  // ============ 发布管理方法 ============

  /**
   * 发布农机
   * 用户发布闲置农机信息
   *
   * @param {Object} data - 农机信息
   * @param {string} data.name - 农机名称
   * @param {string} data.type - 农机类型
   * @param {number} data.price - 租金（元/天）
   * @param {string} data.location - 所在地区
   * @param {string} data.owner - 机主姓名
   * @param {string} data.phone - 联系电话
   * @param {string} data.description - 描述信息
   * @param {string} data.image - 图片路径
   * @returns {Object} 发布的农机对象（包含 id 和 publishTime）
   */
  publishMachinery(data) {
    const item = {
      ...data,
      id: Date.now(),
      available: true,
      isUserPublished: true,
      publishTime: formatTime(new Date()),
    };
    this.globalData.machinery.push(item);
    this.globalData.userMachinery.push(item);
    wx.setStorageSync("userMachinery", this.globalData.userMachinery);
    return item;
  },

  // 发布务工招聘
  publishJob(data) {
    const item = {
      ...data,
      id: Date.now(),
      isUserPublished: true,
      publishTime: formatTime(new Date()),
    };
    this.globalData.jobs.push(item);
    this.globalData.userJobs.push(item);
    wx.setStorageSync("userJobs", this.globalData.userJobs);
    return item;
  },

  // 发布采摘点
  publishPickingSpot(data) {
    const item = {
      ...data,
      id: Date.now(),
      isUserPublished: true,
      publishTime: formatTime(new Date()),
    };
    this.globalData.pickingSpots.push(item);
    this.globalData.userPickingSpots.push(item);
    wx.setStorageSync("userPickingSpots", this.globalData.userPickingSpots);
    return item;
  },

  // ============ 老人模式管理 ============

  // 切换老人模式
  toggleElderMode(enabled) {
    this.globalData.elderMode = enabled;
    wx.setStorageSync("elderMode", enabled);
  },

  // 获取老人模式状态
  isElderMode() {
    return this.globalData.elderMode;
  },

  // 获取当前页面可朗读内容
  getPageReadContent(pageName) {
    const contentMap = {
      index:
        "欢迎使用滴滴打农平台。这是一个连接农机租赁、助农务工和乡村采摘的综合服务平台。您可以在这里查找农机租赁信息、寻找工作机会、预订采摘体验。",
      machinery:
        "这是农机共享页面。您可以在这里浏览各类农机设备，包括拖拉机、收割机、插秧机等。选择心仪的农机后可以进行租用预订。",
      jobs: "这是助农务工页面。这里展示各类农业工作机会，包括果园管理、田间种植等岗位。您可以筛选地区，找到适合的工作并申请。",
      picking:
        "这是乡村采摘页面。您可以浏览各地的采摘园信息，了解可采摘的水果种类、价格和位置，进行在线预订。",
      mine: "这是个人中心页面。您可以查看我的订单、发布信息、联系客服和修改设置。",
      settings:
        "这是设置页面。您可以在这里开启或关闭老人模式。老人模式将使用更大的字体，简化页面内容，让操作更方便。",
    };
    return contentMap[pageName] || "当前页面暂无朗读内容";
  },

  globalData: {
    // 订单数据
    orders: [],
    // 评价数据 { 'machinery_1': [5, 4], 'jobs_2': [3] }
    ratings: {},
    // 用户发布数据
    userMachinery: [],
    userJobs: [],
    userPickingSpots: [],
    userInfo: null,
    // 老人模式
    elderMode: false,
    // 基础数据（从数据文件导入）
    machinery: machineryData,
    jobs: jobsData,
    pickingSpots: pickingSpotsData,
    minsuSpots: minsuSpotsData,
    testimonials: commonData.testimonials,
    stats: commonData.stats,

    // 红色文化数据
    redStories: redCultureData.stories,
    redSites: redCultureData.sites,
    redGuides: redCultureData.guides,
    redComments: redCultureData.comments,

    // 苗族文化数据
    miaoCultures: miaoCultureData.cultures,
    miaoFestivals: miaoCultureData.festivals,
    miaoArts: miaoCultureData.arts,
    heritageProducts: miaoHeritageData.heritageProducts,
    heritageCourses: miaoHeritageData.heritageCourses,

    // 旅游数据
    tourGuides: tourismData.guides,

    // 商品数据
    products: productsData,
  },
});
