/**
 * 错误处理工具
 * 提供统一的错误处理和提示
 */

/**
 * 错误类型枚举
 */
const ErrorType = {
  NETWORK: 'network',      // 网络错误
  BUSINESS: 'business',    // 业务错误
  PERMISSION: 'permission', // 权限错误
  UNKNOWN: 'unknown',      // 未知错误
};

/**
 * 错误信息映射
 */
const ErrorMessages = {
  [ErrorType.NETWORK]: '网络连接失败，请检查网络设置',
  [ErrorType.BUSINESS]: '操作失败，请稍后重试',
  [ErrorType.PERMISSION]: '权限不足，请授权后重试',
  [ErrorType.UNKNOWN]: '未知错误，请稍后重试',
};

/**
 * 显示错误提示
 * @param {string} message - 错误信息
 * @param {number} duration - 持续时间（毫秒）
 */
function showError(message, duration = 2500) {
  wx.showToast({
    title: message,
    icon: 'none',
    duration,
  });
}

/**
 * 显示错误对话框
 * @param {string} title - 标题
 * @param {string} content - 内容
 */
function showErrorModal(title = '错误', content) {
  wx.showModal({
    title,
    content,
    showCancel: false,
    confirmText: '我知道了',
    confirmColor: '#F44336',
  });
}

/**
 * 处理错误
 * @param {Error|string} error - 错误对象或错误信息
 * @param {string} type - 错误类型
 * @param {boolean} useModal - 是否使用对话框显示
 */
function handleError(error, type = ErrorType.UNKNOWN, useModal = false) {
  const message = typeof error === 'string'
    ? error
    : error.message || ErrorMessages[type];

  if (useModal) {
    showErrorModal('提示', message);
  } else {
    showError(message);
  }

  // 可以在这里添加错误日志上报
  console.error('[ErrorHelper]', type, error);
}

/**
 * 网络请求错误处理
 * @param {Error} error - 错误对象
 */
function handleNetworkError(error) {
  handleError(error, ErrorType.NETWORK);
}

/**
 * 业务错误处理
 * @param {string} message - 错误信息
 */
function handleBusinessError(message) {
  handleError(message, ErrorType.BUSINESS);
}

/**
 * 权限错误处理
 * @param {string} message - 错误信息
 */
function handlePermissionError(message) {
  handleError(message, ErrorType.PERMISSION);
}

/**
 * 创建错误处理包装器
 * @param {Function} fn - 需要包装的函数
 * @param {Object} options - 配置选项
 * @returns {Function} 包装后的函数
 */
function createErrorHandler(fn, options = {}) {
  const {
    errorType = ErrorType.UNKNOWN,
    useModal = false,
    onError = null,
  } = options;

  return async function(...args) {
    try {
      return await fn.apply(this, args);
    } catch (error) {
      handleError(error, errorType, useModal);
      if (onError) {
        onError(error);
      }
    }
  };
}

module.exports = {
  ErrorType,
  showError,
  showErrorModal,
  handleError,
  handleNetworkError,
  handleBusinessError,
  handlePermissionError,
  createErrorHandler,
};
