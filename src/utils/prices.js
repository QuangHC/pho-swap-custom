import { Trade } from '@uniswap/router-sdk';
import { Currency, CurrencyAmount, Fraction, Percent, TradeType } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';
import { FeeAmount } from '@uniswap/v3-sdk';
import {
  ALLOWED_PRICE_IMPACT_HIGH,
  ALLOWED_PRICE_IMPACT_LOW,
  ALLOWED_PRICE_IMPACT_MEDIUM,
  BIPS_BASE,
  BLOCKED_PRICE_IMPACT_NON_EXPERT,
  ONE_HUNDRED_PERCENT,
  ZERO_PERCENT,
} from '~/constants/misc';

/**
 * Fee percent for 30 bips.
 */
const THIRTY_BIPS_FEE = new Percent(30, BIPS_BASE);
/**
 * Fraction after LP fee of 30 bips is deducted.
 */
const INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(THIRTY_BIPS_FEE);

/**
 * Computes the realized price impact of a trade.
 *
 * @param {Trade} trade - The Uniswap trade object.
 * @returns {Percent} The realized price impact.
 */
export function computeRealizedPriceImpact(trade) {
  const realizedLpFeePercent = computeRealizedLPFeePercent(trade);
  return trade.priceImpact.subtract(realizedLpFeePercent);
}

/**
 * Computes the realized liquidity provider fee as a percent.
 *
 * @param {Trade} trade - The Uniswap trade object.
 * @returns {Percent} The realized LP fee as a percent.
 */
function computeRealizedLPFeePercent(trade) {
  let percent;

  // Process routes differently for v2 and v3 pools
  if (trade.swaps[0].route.pools instanceof Pair) {
    percent = ONE_HUNDRED_PERCENT.subtract(
        trade.swaps.reduce(
            (currentFee) => currentFee.multiply(INPUT_FRACTION_AFTER_FEE),
            ONE_HUNDRED_PERCENT,
        ),
    );
  } else {
    percent = ZERO_PERCENT;
    for (const swap of trade.swaps) {
      const { numerator, denominator } = swap.inputAmount.divide(trade.inputAmount);
      const overallPercent = new Percent(numerator, denominator);

      const routeRealizedLPFeePercent = overallPercent.multiply(
          ONE_HUNDRED_PERCENT.subtract(
              swap.route.pools.reduce((currentFee, pool) => {
                const fee =
                    pool instanceof Pair
                        ? FeeAmount.MEDIUM
                        : pool.fee;
                return currentFee.multiply(ONE_HUNDRED_PERCENT.subtract(new Fraction(fee, 1_000_000)));
              }, ONE_HUNDRED_PERCENT),
          ),
      );

      percent = percent.add(routeRealizedLPFeePercent);
    }
  }

  return new Percent(percent.numerator, percent.denominator);
}

/**
 * Computes the realized liquidity provider fee amount for a trade.
 *
 * @param {Trade|null} trade - The trade object.
 * @returns {CurrencyAmount|undefined} The realized LP fee amount.
 */
export function computeRealizedLPFeeAmount(trade) {
  if (trade) {
    const realizedLPFee = computeRealizedLPFeePercent(trade);

    return CurrencyAmount.fromRawAmount(
        trade.inputAmount.currency,
        trade.inputAmount.multiply(realizedLPFee).quotient,
    );
  }

  return undefined;
}

const IMPACT_TIERS = [
  BLOCKED_PRICE_IMPACT_NON_EXPERT,
  ALLOWED_PRICE_IMPACT_HIGH,
  ALLOWED_PRICE_IMPACT_MEDIUM,
  ALLOWED_PRICE_IMPACT_LOW,
];

/**
 * Calculates the warning severity level based on price impact.
 *
 * @param {Percent} priceImpact - The price impact percentage.
 * @returns {number} The warning severity level (0-4).
 */
export function warningSeverity(priceImpact) {
  if (!priceImpact) {
    return 0;
  }
  if (priceImpact.lessThan(0)) {
    return 0;
  }

  let impact = IMPACT_TIERS.length;
  for (const impactLevel of IMPACT_TIERS) {
    if (impactLevel.lessThan(priceImpact)) {
      return impact;
    }
    impact--;
  }
  return 0;
}

/**
 * Determines the warning level for a given price impact.
 *
 * @param {Percent} priceImpact - The price impact percentage.
 * @returns {string|undefined} 'warning', 'error', or undefined.
 */
export function getPriceImpactWarning(priceImpact) {
  if (priceImpact.greaterThan(ALLOWED_PRICE_IMPACT_HIGH)) {
    return 'error';
  }
  if (priceImpact.greaterThan(ALLOWED_PRICE_IMPACT_MEDIUM)) {
    return 'warning';
  }
  return undefined;
}

/**
 * Gets the appropriate color based on the price impact warning level.
 *
 * @param {Percent} priceImpact - The price impact percentage.
 * @returns {string|undefined} The theme color key (e.g., 'critical', 'deprecated_accentWarning').
 */
export function getPriceImpactColor(priceImpact) {
  switch (getPriceImpactWarning(priceImpact)) {
    case 'error':
      return 'critical';
    case 'warning':
      return 'deprecated_accentWarning';
    default:
      return undefined;
  }
}