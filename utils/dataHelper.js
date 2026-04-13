/**
 * 数据处理工具函数
 * 提供深拷贝、数据合并等功能
 */

/**
 * 深拷贝函数 - 改进版
 * 相比 JSON.parse(JSON.stringify())，支持更多数据类型
 * @param {*} data - 需要拷贝的数据
 * @returns {*} 拷贝后的数据
 */
function deepClone(data) {
  // 处理 null 和 undefined
  if (data === null || data === undefined) {
    return data;
  }

  // 处理基本类型
  if (typeof data !== 'object') {
    return data;
  }

  // 处理日期对象
  if (data instanceof Date) {
    return new Date(data.getTime());
  }

  // 处理数组
  if (Array.isArray(data)) {
    return data.map(item => deepClone(item));
  }

  // 处理普通对象
  const clonedObj = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(data[key]);
    }
  }
  return clonedObj;
}

/**
 * 根据 ID 合并列表
 * 将 extraList 中不存在于 baseList 的项添加到结果中
 * @param {Array} baseList - 基础列表
 * @param {Array} extraList - 额外列表
 * @returns {Array} 合并后的列表
 */
function mergeListById(baseList = [], extraList = []) {
  const merged = deepClone(baseList);
  extraList.forEach((item) => {
    if (!merged.some((existing) => existing.id === item.id)) {
      merged.push(item);
    }
  });
  return merged;
}

/**
 * 格式化时间
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的时间字符串 YYYY-MM-DD HH:mm
 */
function formatTime(date) {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  const h = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  return `${y}-${m}-${d} ${h}:${min}`;
}

module.exports = {
  deepClone,
  mergeListById,
  formatTime,
};
