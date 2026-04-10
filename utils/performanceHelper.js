/**
 * 性能优化工具
 * 提供防抖、节流等性能优化函数
 */

/**
 * 防抖函数
 * 在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
 * 适用场景：搜索框输入、窗口 resize、表单验证等
 *
 * @param {Function} fn - 需要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(fn, delay = 300) {
  let timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

/**
 * 节流函数
 * 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效
 * 适用场景：滚动事件、鼠标移动、按钮点击等
 *
 * @param {Function} fn - 需要节流的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(fn, delay = 300) {
  let timer = null;
  let lastTime = 0;

  return function(...args) {
    const now = Date.now();

    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    } else {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, args);
        lastTime = Date.now();
        timer = null;
      }, delay - (now - lastTime));
    }
  };
}

/**
 * setData 优化包装器
 * 合并多个 setData 调用，减少渲染次数
 *
 * 使用方法：
 * const batchSetData = performanceHelper.createBatchSetData(this);
 * batchSetData({ key1: value1 });
 * batchSetData({ key2: value2 });
 * // 在下一个事件循环中，会合并为一次 setData 调用
 *
 * @param {Object} page - 页面实例
 * @returns {Function} 批量 setData 函数
 */
function createBatchSetData(page) {
  let pendingData = {};
  let timer = null;

  return function(data) {
    Object.assign(pendingData, data);

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if (Object.keys(pendingData).length > 0) {
        page.setData(pendingData);
        pendingData = {};
      }
      timer = null;
    }, 0);
  };
}

/**
 * 创建防抖搜索函数
 * 专门用于搜索场景的防抖函数
 *
 * @param {Function} searchFn - 搜索函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖后的搜索函数
 */
function createDebouncedSearch(searchFn, delay = 500) {
  return debounce(searchFn, delay);
}

/**
 * 创建节流滚动处理函数
 * 专门用于滚动事件的节流函数
 *
 * @param {Function} scrollFn - 滚动处理函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 节流后的滚动处理函数
 */
function createThrottledScroll(scrollFn, delay = 100) {
  return throttle(scrollFn, delay);
}

/**
 * 延迟执行函数
 * 将函数推迟到下一个事件循环执行
 *
 * @param {Function} fn - 需要延迟执行的函数
 * @returns {Promise} Promise 对象
 */
function nextTick(fn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn && fn();
      resolve();
    }, 0);
  });
}

/**
 * 分批处理数据
 * 将大量数据分批处理，避免长时间阻塞主线程
 *
 * @param {Array} data - 需要处理的数据数组
 * @param {Function} processFn - 处理函数
 * @param {number} batchSize - 每批处理的数量
 * @returns {Promise} Promise 对象
 */
async function processBatch(data, processFn, batchSize = 50) {
  const total = data.length;
  let processed = 0;

  while (processed < total) {
    const batch = data.slice(processed, processed + batchSize);
    await nextTick(() => {
      batch.forEach(processFn);
    });
    processed += batchSize;
  }
}

module.exports = {
  debounce,
  throttle,
  createBatchSetData,
  createDebouncedSearch,
  createThrottledScroll,
  nextTick,
  processBatch,
};
