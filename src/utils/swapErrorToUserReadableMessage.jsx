import { t } from '~/packages/uniswap/src/i18n';
import { logger } from '~/packages/utilities/src/logger/logger';
import { UserRejectedRequestError } from '~/packages/utils/errors';

/**
 * Trích xuất "reason" (lý do lỗi) từ chuỗi lỗi và lặp qua các lỗi lồng nhau.
 *
 * @param {any} error - Đối tượng lỗi.
 * @returns {string|undefined} - Chuỗi lý do lỗi.
 */
function getReason(error) {
  let reason;
  while (error) {
    reason = error.reason ?? error.message ?? reason;
    error = error.error ?? error.data?.originalError;
  }
  return reason;
}

/**
 * Kiểm tra xem lỗi có bị từ chối bởi người dùng hay không.
 *
 * @param {any} error - Đối tượng lỗi.
 * @returns {boolean} - Trả về `true` nếu lỗi là do người dùng từ chối, ngược lại trả về `false`.
 */
export function didUserReject(error) {
  const reason = getReason(error);
  if (
      error?.code === 4001 || // Mã lỗi phổ biến
      error?.code === 'ACTION_REJECTED' || // ethers v5.7.0 wrapped error
      (reason?.match(/request/i) && reason?.match(/reject/i)) || // Rainbow Wallet
      reason?.match(/declined/i) || // Frame
      reason?.match(/cancell?ed by user/i) || // SafePal
      reason?.match(/user cancell?ed/i) || // Trust Wallet
      reason?.match(/user denied/i) || // Coinbase Wallet
      reason?.match(/user rejected/i) || // Fireblocks
      error instanceof UserRejectedRequestError
  ) {
    return true;
  }
  return false;
}

/**
 * Chuyển đổi lỗi xảy ra khi swap sang thông điệp dễ hiểu với người dùng.
 *
 * @param {any} error - Đối tượng lỗi từ ethers provider.
 * @returns {string} - Thông điệp lỗi dễ hiểu với người dùng.
 */
export function swapErrorToUserReadableMessage(error) {
  if (didUserReject(error)) {
    return t('swap.error.rejected');
  }

  let reason = getReason(error);
  if (reason?.indexOf('execution reverted: ') === 0) {
    reason = reason.substr('execution reverted: '.length);
  }

  // Tra cứu lỗi dựa trên lý do.
  switch (reason) {
    case 'UniswapV2Router: EXPIRED':
      return t('swap.error.v2.expired');
    case 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT':
    case 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT':
      return t('swap.error.v2.slippage');
    case 'TransferHelper: TRANSFER_FROM_FAILED':
      return t('swap.error.v2.transferInput');
    case 'UniswapV2: TRANSFER_FAILED':
      return t('swap.error.v2.transferOutput');
    case 'UniswapV2: K':
      return t('swap.error.v2.k');
    case 'Too little received':
    case 'Too much requested':
    case 'STF':
      return t('swap.error.v3.slippage');
    case 'TF':
      return t('swap.error.v3.transferOutput');
    default:
      // Xử lý các lỗi đặc biệt như "undefined is not an object".
      if (reason?.indexOf('undefined is not an object') !== -1) {
        logger.warn(
            'swapErrorToUserReadableMessage',
            'swapErrorToUserReadableMessage',
            'Undefined object error',
            reason,
        );
        return t('swap.error.undefinedObject');
      }
      // Thông báo lỗi không xác định.
      return `${reason ?? t('swap.error.unknown')} ${t('swap.error.default')}`;
  }
}