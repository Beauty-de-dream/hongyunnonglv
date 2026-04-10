/**
 * 加载状态管理工具
 * 提供统一的 loading 状态管理
 */

/**
 * 显示全局 loading
 * @param {string} title - 提示文字
 * @param {boolean} mask - 是否显示透明蒙层，防止触摸穿透
 */
function showLoading(title = '加载中...', mask = true) {
  wx.showLoading({
    title,
    mask,
  });
}

/**
 * 隐藏全局 loading
 */
function hideLoading() {
  wx.hideLoading();
}

/**
 * 显示 Toast 提示
 * @param {string} title - 提示文字
 * @param {string} icon - 图标类型：success, error, loading, none
 * @param {number} duration - 持续时间（毫秒）
 */
function showToast(title, icon = 'none', duration = 2000) {
  wx.showToast({
    title,
    icon,
    duration,
  });
}

/**
 * 创建页面级别的 loading 状态管理
 * 在页面的 data 中添加 loading 字段，并提供 setLoading 方法
 *
 * 使用方法：
 * 在页面的 onLoad 中调用：loadingHelper.setupPageLoading(this)
 * 然后可以使用：this.setLoading(true) 或 this.setLoading(false)
 *
 * @param {Object} page - 页面实例
 */
function setupPageLoading(page) {
  // 初始化 loading 状态
  if (!page.data.hasOwnProperty('loading')) {
    page.setData({ loading: false });
  }

  // 添加 setLoading 方法
  page.setLoading = function(loading) {
    this.setData({ loading });
  };
}

/**
 * 异步操作包装器，自动处理 loading 状态
 * @param {Function} asyncFn - 异步函数
 * @param {Object} options - 配置选项
 * @returns {Promise} 异步函数的结果
 */
async function withLoading(asyncFn, options = {}) {
  const {
    loadingText = '加载中...',
    successText = '',
    errorText = '操作失败',
    showSuccess = false,
  } = options;

  try {
    showLoading(loadingText);
    const result = await asyncFn();
    hideLoading();

    if (showSuccess && successText) {
      showToast(successText, 'success');
    }

    return result;
  } catch (error) {
    hideLoading();
    showToast(errorText, 'none');
    throw error;
  }
}

module.exports = {
  showLoading,
  hideLoading,
  showToast,
  setupPageLoading,
  withLoading,
};
