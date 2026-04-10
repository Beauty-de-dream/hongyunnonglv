// pages/redculture/redculture.js
const app = getApp();

Page({
  data: {
    elderMode: false,
    articles: [],
    sites: [],
    redGuides: [],
    comments: [],
    commentText: "",
    showCommentInput: false,
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.setData({ elderMode: app.isElderMode() });
    this.loadData();
  },

  loadData() {
    const { redStories, redSites, redGuides, redComments } = app.globalData;
    this.setData({
      articles: redStories || [],
      sites: redSites || [],
      redGuides: redGuides || [],
      comments: redComments || [],
    });
  },

  onReadAloud() {
    wx.showModal({
      title: "🔊 为您朗读",
      content:
        "红色传承页面：传承红色基因，弘扬革命精神。包含红色故事、遗址打卡、讲解员预约和心得墙四个板块。",
      showCancel: false,
      confirmText: "我知道了",
      confirmColor: "#C62828",
    });
    wx.vibrateShort({ type: "medium" });
  },

  scrollToSection(e) {
    const id = e.currentTarget.dataset.id;
    wx.pageScrollTo({ selector: "#" + id, duration: 300 });
  },

  goToArticle(e) {
    const id = e.currentTarget.dataset.id;
    const article = this.data.articles.find((a) => a.id === id);
    if (!article) return;
    wx.showModal({
      title: article.title,
      content: article.fullContent || article.summary,
      showCancel: false,
      confirmText: "已阅读",
      confirmColor: "#C62828",
    });
    const articles = this.data.articles.map((a) =>
      a.id === id ? { ...a, readCount: a.readCount + 1 } : a,
    );
    this.setData({ articles });
  },

  goToSite(e) {
    const index = e.currentTarget.dataset.index;
    const site = this.data.sites[index];
    wx.showModal({
      title: site.name,
      content:
        site.description +
        "\n\n📍 " +
        site.address +
        "\n🕐 开放时间：" +
        site.openTime +
        "\n🎫 门票：" +
        site.price,
      showCancel: false,
      confirmText: "我知道了",
      confirmColor: "#C62828",
    });
  },

  checkIn(e) {
    const id = e.currentTarget.dataset.id;
    const sites = this.data.sites.map((s) =>
      s.id === id ? { ...s, checked: s.checked + 1 } : s,
    );
    this.setData({ sites });
    wx.showToast({ title: "打卡成功！", icon: "success" });
    wx.vibrateShort({ type: "medium" });
  },

  bookGuide(e) {
    const index = e.currentTarget.dataset.index;
    const guide = this.data.redGuides[index];
    if (!guide.available) {
      wx.showToast({ title: "该讲解员暂时约满", icon: "none" });
      return;
    }
    wx.showModal({
      title: '预约讲解员 · ' + guide.name,
      content: '专业方向：' + guide.specialty + '\n讲解费用：' + guide.price + '\n\n是否确认预约？',
      confirmText: '确认预约',
      confirmColor: '#C62828',
      success(res) {
        if (res.confirm) {
          wx.showToast({ title: "预约成功！", icon: "success" });
        }
      },
    });
  },

  showCommentInput() {
    this.setData({ showCommentInput: true });
  },

  cancelComment() {
    this.setData({ showCommentInput: false, commentText: "" });
  },

  onCommentInput(e) {
    this.setData({ commentText: e.detail.value });
  },

  submitComment() {
    const text = this.data.commentText.trim();
    if (!text) {
      wx.showToast({ title: "请输入内容", icon: "none" });
      return;
    }
    const userInfo = app.globalData.userInfo;
    const newComment = {
      id: Date.now(),
      author: userInfo ? userInfo.nickName : "游客",
      content: text,
      date: new Date().toLocaleDateString("zh-CN"),
      likes: 0,
    };
    const comments = [newComment, ...app.globalData.redComments];
    app.globalData.redComments = comments;
    this.setData({ comments, commentText: "", showCommentInput: false });
    wx.showToast({ title: "发布成功！", icon: "success" });
  },

  likeComment(e) {
    const id = e.currentTarget.dataset.id;
    const comments = this.data.comments.map((c) =>
      c.id === id ? { ...c, likes: c.likes + 1 } : c,
    );
    app.globalData.redComments = comments;
    this.setData({ comments });
    wx.vibrateShort({ type: "light" });
  },

  onShareAppMessage() {
    return {
      title: "红色传承 - 不忘初心，牢记使命",
      path: "/pages/redculture/redculture",
    };
  },
});
