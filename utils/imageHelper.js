/**
 * 图片处理工具函数
 * 提供图片加载失败处理、占位图等功能
 */

/**
 * 默认占位图路径
 */
const DEFAULT_PLACEHOLDER = '/images/placeholder.svg';

/**
 * 图片加载失败处理函数
 * 在 WXML 中使用：<image src="{{item.image}}" binderror="handleImageError" data-index="{{index}}" />
 * 在 JS 中调用：handleImageError: imageHelper.createImageErrorHandler('listData')
 *
 * @param {string} dataKey - 数据在 this.data 中的键名
 * @param {string} placeholder - 占位图路径（可选）
 * @returns {Function} 事件处理函数
 */
function createImageErrorHandler(dataKey, placeholder = DEFAULT_PLACEHOLDER) {
  return function(e) {
    const index = e.currentTarget.dataset.index;
    if (index !== undefined && this.data[dataKey]) {
      const updateKey = `${dataKey}[${index}].image`;
      this.setData({
        [updateKey]: placeholder
      });
    }
  };
}

/**
 * 批量预加载图片
 * @param {Array<string>} imageUrls - 图片 URL 数组
 * @returns {Promise<Array>} 加载结果数组
 */
function preloadImages(imageUrls) {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise((resolve) => {
        wx.getImageInfo({
          src: url,
          success: () => resolve({ url, success: true }),
          fail: () => resolve({ url, success: false })
        });
      });
    })
  );
}

/**
 * 获取图片信息（带缓存）
 * @param {string} url - 图片 URL
 * @returns {Promise<Object>} 图片信息
 */
function getImageInfo(url) {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: url,
      success: resolve,
      fail: reject
    });
  });
}

module.exports = {
  DEFAULT_PLACEHOLDER,
  createImageErrorHandler,
  preloadImages,
  getImageInfo,
};
