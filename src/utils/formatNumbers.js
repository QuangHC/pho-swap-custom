import { formatEther as ethersFormatEther } from '@ethersproject/units'
import { getCurrencySymbolDisplayType } from '~/constants/localCurrencies'
import usePrevious from '~/hooks/usePrevious.js'
import { useCallback, useMemo } from 'react'
import { Bound } from '~/state/mint/v3/actions.js'
import { DEFAULT_LOCAL_CURRENCY } from '~/packages/uniswap/src/features/fiatCurrency/constants'
import { useAppFiatCurrency } from '~/packages/uniswap/src/features/fiatCurrency/hooks'
import { useLocalizationContext } from '~/packages/uniswap/src/features/language/LocalizationContext'
import { DEFAULT_LOCALE } from '~/packages/uniswap/src/features/language/constants'
import { useCurrentLocale } from '~/packages/uniswap/src/features/language/hooks'


// Number formatting follows the standards laid out in this spec:
// https://www.notion.so/uniswaplabs/Number-standards-fbb9f533f10e4e22820722c2f66d23c0

const FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN = {
    notation: 'standard',
    maximumFractionDigits: 5,
    minimumFractionDigits: 2,
}

const FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN_NO_COMMAS = {
    notation: 'standard',
    maximumFractionDigits: 5,
    minimumFractionDigits: 2,
    useGrouping: false,
}

const NO_DECIMALS = {
    notation: 'standard',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
}

const NO_DECIMALS_CURRENCY = {
    notation: 'standard',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    currency: 'USD',
    style: 'currency',
}

const THREE_DECIMALS_NO_TRAILING_ZEROS = {
    notation: 'standard',
    maximumFractionDigits: 3,
    minimumFractionDigits: 0,
}

const THREE_DECIMALS = {
    notation: 'standard',
    maximumFractionDigits: 3,
    minimumFractionDigits: 3,
}

const THREE_DECIMALS_CURRENCY = {
    notation: 'standard',
    maximumFractionDigits: 3,
    minimumFractionDigits: 3,
    currency: 'USD',
    style: 'currency',
}

const THREE_DECIMALS_NO_TRAILING_ZEROS_CURRENCY = {
    ...THREE_DECIMALS_NO_TRAILING_ZEROS,
    currency: 'USD',
    style: 'currency',
}

const TWO_DECIMALS_NO_TRAILING_ZEROS = {
    notation: 'standard',
    maximumFractionDigits: 2,
}

const TWO_DECIMALS_NO_TRAILING_ZEROS_CURRENCY = {
    ...TWO_DECIMALS_NO_TRAILING_ZEROS,
    currency: 'USD',
    style: 'currency',
}

const TWO_DECIMALS = {
    notation: 'standard',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
}

const TWO_DECIMALS_CURRENCY = {
    notation: 'standard',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    currency: 'USD',
    style: 'currency',
}

const EIGHT_DECIMALS_CURRENCY = {
    notation: 'standard',
    maximumFractionDigits: 8,
    minimumFractionDigits: 2,
    currency: 'USD',
    style: 'currency',
}

const SHORTHAND_TWO_DECIMALS = {
    notation: 'compact',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}

const SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS = {
    notation: 'compact',
    maximumFractionDigits: 2,
}

const SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS_CURRENCY = {
    ...SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS,
    currency: 'USD',
    style: 'currency',
}

const SHORTHAND_ONE_DECIMAL = {
    notation: 'compact',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
}

const SHORTHAND_CURRENCY_TWO_DECIMALS = {
    notation: 'compact',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: 'USD',
    style: 'currency',
}

const SHORTHAND_CURRENCY_ONE_DECIMAL = {
    notation: 'compact',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    currency: 'USD',
    style: 'currency',
}

const SIX_SIG_FIGS_TWO_DECIMALS = {
    notation: 'standard',
    maximumSignificantDigits: 6,
    minimumSignificantDigits: 3,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
}

const SIX_SIG_FIGS_NO_COMMAS = {
    notation: 'standard',
    maximumSignificantDigits: 6,
    useGrouping: false,
}

const SIX_SIG_FIGS_TWO_DECIMALS_NO_COMMAS = {
    notation: 'standard',
    maximumSignificantDigits: 6,
    minimumSignificantDigits: 3,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    useGrouping: false,
}

const ONE_SIG_FIG_CURRENCY = {
    notation: 'standard',
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 1,
    currency: 'USD',
    style: 'currency',
}

const THREE_SIG_FIGS_CURRENCY = {
    notation: 'standard',
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 3,
    currency: 'USD',
    style: 'currency',
}

const SEVEN_SIG_FIGS__SCI_NOTATION_CURRENCY = {
    notation: 'scientific',
    minimumSignificantDigits: 7,
    maximumSignificantDigits: 7,
    currency: 'USD',
    style: 'currency',
}

// each rule must contain either an `upperBound` or an `exact` value.
// upperBound => number will use that formatter as long as it is < upperBound
// exact => number will use that formatter if it is === exact
// if hardcoded input is supplied it will override the input value or use the hardcoded output

// these formatter objects dictate which formatter rule to use based on the interval that
// the number falls into. for example, based on the rule set below, if your number
// falls between 1 and 1e6, you'd use TWO_DECIMALS as the formatter.
const tokenNonTxFormatter = [
    { exact: 0, formatterOptions: NO_DECIMALS },
    { upperBound: 0.001, hardCodedInput: { input: 0.001, prefix: '<' }, formatterOptions: THREE_DECIMALS },
    { upperBound: 1, formatterOptions: THREE_DECIMALS },
    { upperBound: 1e6, formatterOptions: TWO_DECIMALS },
    { upperBound: 1e15, formatterOptions: SHORTHAND_TWO_DECIMALS },
    {
        upperBound: Infinity,
        hardCodedInput: { input: 999_000_000_000_000, prefix: '>' },
        formatterOptions: SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS,
    },
]

const tokenQuantityStatsFormatter = [
    // if token stat value is 0, we probably don't have the data for it, so show '-' as a placeholder
    { exact: 0, hardCodedInput: { hardcodedOutput: '-' }, formatterOptions: NO_DECIMALS },
    { upperBound: 0.01, hardCodedInput: { input: 0.01, prefix: '<' }, formatterOptions: TWO_DECIMALS },
    { upperBound: 1000, formatterOptions: TWO_DECIMALS },
    { upperBound: Infinity, formatterOptions: SHORTHAND_ONE_DECIMAL },
]

const tokenTxFormatter = [
    { exact: 0, formatterOptions: NO_DECIMALS },
    {
        upperBound: 0.00001,
        hardCodedInput: { input: 0.00001, prefix: '<' },
        formatterOptions: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN,
    },
    { upperBound: 1, formatterOptions: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN },
    { upperBound: 10000, formatterOptions: SIX_SIG_FIGS_TWO_DECIMALS },
    { upperBound: Infinity, formatterOptions: TWO_DECIMALS },
]

const swapTradeAmountFormatter = [
    { exact: 0, formatterOptions: NO_DECIMALS },
    { upperBound: 0.1, formatterOptions: SIX_SIG_FIGS_NO_COMMAS },
    { upperBound: 1, formatterOptions: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN_NO_COMMAS },
    { upperBound: Infinity, formatterOptions: SIX_SIG_FIGS_TWO_DECIMALS_NO_COMMAS },
]

const swapDetailsAmountFormatter = [{ upperBound: Infinity, formatterOptions: SIX_SIG_FIGS_NO_COMMAS }]

const swapPriceFormatter = [
    { exact: 0, formatterOptions: NO_DECIMALS },
    {
        upperBound: 0.00001,
        hardCodedInput: { input: 0.00001, prefix: '<' },
        formatterOptions: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN,
    },
    ...swapTradeAmountFormatter,
]

const fiatTokenDetailsFormatter = [
    { exact: 0, formatterOptions: TWO_DECIMALS_CURRENCY },
    {
        upperBound: 0.00000001,
        hardCodedInput: { input: 0.00000001, prefix: '<' },
        formatterOptions: ONE_SIG_FIG_CURRENCY,
    },
    { upperBound: 0.1, formatterOptions: THREE_SIG_FIGS_CURRENCY },
    { upperBound: 1.05, formatterOptions: THREE_DECIMALS_CURRENCY },
    { upperBound: 1e6, formatterOptions: TWO_DECIMALS_CURRENCY },
    { upperBound: Infinity, formatterOptions: SHORTHAND_CURRENCY_TWO_DECIMALS },
]

const chartVolumePriceScale = [
    {
        upperBound: 0.001,
        hardCodedInput: { input: 0.001, prefix: '<' },
        formatterOptions: ONE_SIG_FIG_CURRENCY,
    },
    { upperBound: 2, formatterOptions: TWO_DECIMALS_CURRENCY },
    { upperBound: 1000, formatterOptions: NO_DECIMALS_CURRENCY },
    { upperBound: Infinity, formatterOptions: SHORTHAND_CURRENCY_ONE_DECIMAL },
]

const chartFiatValueFormatter = [
    // if token stat value is 0, we probably don't have the data for it, so show '-' as a placeholder
    { exact: 0, hardCodedInput: { hardcodedOutput: '-' }, formatterOptions: ONE_SIG_FIG_CURRENCY },
    { upperBound: 1.05, formatterOptions: EIGHT_DECIMALS_CURRENCY },
    { upperBound: 1e6, formatterOptions: TWO_DECIMALS_CURRENCY },
    { upperBound: Infinity, formatterOptions: SHORTHAND_CURRENCY_TWO_DECIMALS },
]

const fiatTokenPricesFormatter = [
    { exact: 0, formatterOptions: TWO_DECIMALS_CURRENCY },
    {
        upperBound: 0.00000001,
        hardCodedInput: { input: 0.00000001, prefix: '<' },
        formatterOptions: ONE_SIG_FIG_CURRENCY,
    },
    { upperBound: 1, formatterOptions: THREE_SIG_FIGS_CURRENCY },
    { upperBound: 1e6, formatterOptions: TWO_DECIMALS_CURRENCY },
    { upperBound: 1e16, formatterOptions: SHORTHAND_CURRENCY_TWO_DECIMALS },
    { upperBound: Infinity, formatterOptions: SEVEN_SIG_FIGS__SCI_NOTATION_CURRENCY },
]

const fiatTokenStatsFormatter = [
    // if token stat value is 0, we probably don't have the data for it, so show '-' as a placeholder
    { exact: 0, hardCodedInput: { hardcodedOutput: '-' }, formatterOptions: ONE_SIG_FIG_CURRENCY },
    { upperBound: 0.01, hardCodedInput: { input: 0.01, prefix: '<' }, formatterOptions: TWO_DECIMALS_CURRENCY },
    { upperBound: 1000, formatterOptions: TWO_DECIMALS_CURRENCY },
    { upperBound: Infinity, formatterOptions: SHORTHAND_CURRENCY_ONE_DECIMAL },
]

const fiatGasPriceFormatter = [
    { exact: 0, formatterOptions: NO_DECIMALS_CURRENCY },
    { upperBound: 0.01, hardCodedInput: { input: 0.01, prefix: '<' }, formatterOptions: TWO_DECIMALS_CURRENCY },
    { upperBound: 1e6, formatterOptions: TWO_DECIMALS_CURRENCY },
    { upperBound: Infinity, formatterOptions: SHORTHAND_CURRENCY_TWO_DECIMALS },
]

const fiatTokenQuantityFormatter = [
    { exact: 0, formatterOptions: TWO_DECIMALS_CURRENCY },
    ...fiatGasPriceFormatter,
]

const portfolioBalanceFormatter = [
    { exact: 0, formatterOptions: TWO_DECIMALS_CURRENCY },
    { upperBound: Infinity, formatterOptions: TWO_DECIMALS_CURRENCY },
]

const ntfTokenFloorPriceFormatterTrailingZeros = [
    { exact: 0, formatterOptions: NO_DECIMALS },
    { upperBound: 0.001, hardCodedInput: { input: 0.001, prefix: '<' }, formatterOptions: THREE_DECIMALS },
    { upperBound: 1, formatterOptions: THREE_DECIMALS },
    { upperBound: 1000, formatterOptions: TWO_DECIMALS },
    { upperBound: 1e15, formatterOptions: SHORTHAND_TWO_DECIMALS },
    {
        upperBound: Infinity,
        hardCodedInput: { input: 999_000_000_000_000, prefix: '>' },
        formatterOptions: SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS,
    },
]

const ntfTokenFloorPriceFormatter = [
    { exact: 0, formatterOptions: NO_DECIMALS },
    { upperBound: 0.001, hardCodedInput: { input: 0.001, prefix: '<' }, formatterOptions: THREE_DECIMALS },
    { upperBound: 1, formatterOptions: THREE_DECIMALS_NO_TRAILING_ZEROS },
    { upperBound: 1000, formatterOptions: TWO_DECIMALS_NO_TRAILING_ZEROS },
    { upperBound: 1e15, formatterOptions: SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS },
    {
        upperBound: Infinity,
        hardCodedInput: { input: 999_000_000_000_000, prefix: '>' },
        formatterOptions: SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS,
    },
]

const ntfCollectionStatsFormatter = [
    { upperBound: 1000, formatterOptions: NO_DECIMALS },
    { upperBound: Infinity, formatterOptions: SHORTHAND_ONE_DECIMAL },
]

const nftTokenFormatter = [
    { exact: 0, hardCodedInput: { hardcodedOutput: '-' }, formatterOptions: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN },
    {
        upperBound: 0.0001,
        hardCodedInput: { input: 0.0001, prefix: '<' },
        formatterOptions: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN,
    },
    { upperBound: 1.0, formatterOptions: THREE_DECIMALS },
    { upperBound: 1000, formatterOptions: TWO_DECIMALS_NO_TRAILING_ZEROS },
    { upperBound: 1e15, formatterOptions: SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS },
    {
        upperBound: Infinity,
        hardCodedInput: { input: 999_000_000_000_000, prefix: '>' },
        formatterOptions: SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS,
    },
]

const fiatNftTokenFormatter = [
    { exact: 0, hardCodedInput: { hardcodedOutput: '-' }, formatterOptions: NO_DECIMALS },
    {
        upperBound: 0.0001,
        hardCodedInput: { input: 0.0001, prefix: '<' },
        formatterOptions: ONE_SIG_FIG_CURRENCY,
    },
    { upperBound: 1.0, formatterOptions: THREE_DECIMALS_NO_TRAILING_ZEROS_CURRENCY },
    { upperBound: 1000, formatterOptions: TWO_DECIMALS_NO_TRAILING_ZEROS_CURRENCY },
    { upperBound: 1e15, formatterOptions: SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS_CURRENCY },
    {
        upperBound: Infinity,
        hardCodedInput: { input: 999_000_000_000_000, prefix: '>' },
        formatterOptions: SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS_CURRENCY,
    },
]

const wholeNumberFormatter = [{ upperBound: Infinity, formatterOptions: NO_DECIMALS }]

export const NumberType =  {
    // used for token quantities in non-transaction contexts (e.g. portfolio balances)
    TokenNonTx : 'token-non-tx',

    // used for token quantity stats where shorthand is okay (e.g. pool stats balances)
    TokenQuantityStats : 'token-quantity-stats',

    // used for token quantities in transaction contexts (e.g. swap, send)
    TokenTx : 'token-tx',

    // this formatter is used for displaying swap price conversions
    // below the input/output amounts
    SwapPrice : 'swap-price',

    // this formatter is only used for displaying the swap trade output amount
    // in the text input boxes. Output amounts on review screen should use the above TokenTx formatter
    SwapTradeAmount : 'swap-trade-amount',

    SwapDetailsAmount : 'swap-details-amount',

    // fiat values for price, volume, tvl, etc in a chart header or scale
    ChartFiatValue : 'chart-fiat-value',

    // fiat values for volume bar chart scales (y axis ticks)
    ChartVolumePriceScale : 'chart-volume-price-scale',

    // fiat prices in any component that belongs in the Token Details flow (except for token stats)
    FiatTokenDetails : 'fiat-token-details',

    // fiat prices everywhere except Token Details flow
    FiatTokenPrice : 'fiat-token-price',

    // fiat values for market cap, TVL, volume in the Token Details screen
    FiatTokenStats : 'fiat-token-stats',

    // fiat price of token balances
    FiatTokenQuantity : 'fiat-token-quantity',

    // fiat gas prices
    FiatGasPrice : 'fiat-gas-price',

    // portfolio balance
    PortfolioBalance : 'portfolio-balance',

    // nft floor price denominated in a token (e.g, ETH)
    NFTTokenFloorPrice : 'nft-token-floor-price',

    // nft collection stats like number of items, holder, and sales
    NFTCollectionStats : 'nft-collection-stats',

    // nft floor price with trailing zeros
    NFTTokenFloorPriceTrailingZeros : 'nft-token-floor-price-trailing-zeros',

    // nft token price in currency
    NFTToken : 'nft-token',

    // nft token price in local fiat currency
    FiatNFTToken : 'fiat-nft-token',

    // whole number formatting
    WholeNumber : 'whole-number',
}


const TYPE_TO_FORMATTER_RULES = {
    [NumberType.TokenNonTx]: tokenNonTxFormatter,
    [NumberType.TokenQuantityStats]: tokenQuantityStatsFormatter,
    [NumberType.TokenTx]: tokenTxFormatter,
    [NumberType.SwapPrice]: swapPriceFormatter,
    [NumberType.SwapTradeAmount]: swapTradeAmountFormatter,
    [NumberType.SwapDetailsAmount]: swapDetailsAmountFormatter,
    [NumberType.FiatTokenQuantity]: fiatTokenQuantityFormatter,
    [NumberType.FiatTokenDetails]: fiatTokenDetailsFormatter,
    [NumberType.ChartFiatValue]: chartFiatValueFormatter,
    [NumberType.ChartVolumePriceScale]: chartVolumePriceScale,
    [NumberType.FiatTokenPrice]: fiatTokenPricesFormatter,
    [NumberType.FiatTokenStats]: fiatTokenStatsFormatter,
    [NumberType.FiatGasPrice]: fiatGasPriceFormatter,
    [NumberType.PortfolioBalance]: portfolioBalanceFormatter,
    [NumberType.NFTTokenFloorPrice]: ntfTokenFloorPriceFormatter,
    [NumberType.NFTTokenFloorPriceTrailingZeros]: ntfTokenFloorPriceFormatterTrailingZeros,
    [NumberType.NFTCollectionStats]: ntfCollectionStatsFormatter,
    [NumberType.NFTToken]: nftTokenFormatter,
    [NumberType.FiatNFTToken]: fiatNftTokenFormatter,
    [NumberType.WholeNumber]: wholeNumberFormatter,
}

function getFormatterRule(input, type, conversionRate) {
    const rules = Array.isArray(type) ? type : TYPE_TO_FORMATTER_RULES[type]
    for (const rule of rules) {
        const shouldConvertInput = rule.formatterOptions.currency && conversionRate
        const convertedInput = shouldConvertInput ? input * conversionRate : input

        if (
            (rule.exact !== undefined && convertedInput === rule.exact) ||
            (rule.upperBound !== undefined && convertedInput < rule.upperBound)
        ) {
            return rule
        }
    }

    throw new Error(`formatter for type ${type} not configured correctly for value ${input}`)
}

function formatNumber({
                          input,
                          type = NumberType.TokenNonTx,
                          placeholder = '-',
                          locale = DEFAULT_LOCALE,
                          localCurrency = DEFAULT_LOCAL_CURRENCY,
                          conversionRate,
                          forceShowCurrencySymbol = false,
                      }) {
    if (input === null || input === undefined) {
        if (forceShowCurrencySymbol) {
            const parts = new Intl.NumberFormat(locale, { style: 'currency', currency: localCurrency }).formatToParts(0)
            const currencySymbol = parts.find((part) => part.type === 'currency')?.value
            const isSymbolBeforeNumber = parts[0].type === 'currency'

            return isSymbolBeforeNumber ? `${currencySymbol}${placeholder}` : `${placeholder}${currencySymbol}`
        }

        return placeholder
    }

    const { hardCodedInput, formatterOptions } = getFormatterRule(input, type, conversionRate)

    if (formatterOptions.currency) {
        input = conversionRate ? input * conversionRate : input
        formatterOptions.currency = localCurrency
        formatterOptions.currencyDisplay = getCurrencySymbolDisplayType(localCurrency)
    }

    if (!hardCodedInput) {
        return new Intl.NumberFormat(locale, formatterOptions).format(input)
    }

    if (hardCodedInput.hardcodedOutput) {
        return hardCodedInput.hardcodedOutput
    }

    const { input: hardCodedInputValue, prefix } = hardCodedInput
    if (hardCodedInputValue === undefined) {
        return placeholder
    }
    return (prefix ?? '') + new Intl.NumberFormat(locale, formatterOptions).format(hardCodedInputValue)
}


export function formatCurrencyAmount({
                                         amount,
                                         type = NumberType.TokenNonTx,
                                         placeholder,
                                         locale = DEFAULT_LOCALE,
                                         localCurrency = DEFAULT_LOCAL_CURRENCY,
                                         conversionRate,
                                     }) {
    return formatNumber({
        input: amount ? parseFloat(amount.toSignificant()) : undefined,
        type,
        placeholder,
        locale,
        localCurrency,
        conversionRate,
    })
}

function formatPercent(percent, locale) {
    if (!percent) {
        return '-'
    }

    return `${Number(percent.toFixed(3)).toLocaleString(locale, {
        maximumFractionDigits: 3,
        useGrouping: false,
    })}%`
}

// Used to format floats representing percent change with fixed decimal places
function formatDelta(delta, locale) {
    if (delta === null || delta === undefined || delta === Infinity || isNaN(delta)) {
        return '-'
    }

    return `${Number(Math.abs(delta).toFixed(2)).toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false,
    })}%`
}

function formatPrice({
                         price,
                         type = NumberType.FiatTokenPrice,
                         locale = DEFAULT_LOCALE,
                         localCurrency = DEFAULT_LOCAL_CURRENCY,
                         conversionRate,
                     }) {
    if (price === null || price === undefined) {
        return '-'
    }

    return formatNumber({
        input: parseFloat(price.toSignificant()),
        type,
        locale,
        localCurrency,
        conversionRate,
    })
}

function formatTickPrice({
                             price,
                             atLimit,
                             direction,
                             placeholder,
                             numberType,
                             locale,
                             localCurrency,
                             conversionRate,
                         }) {
    if (atLimit[direction]) {
        return direction === Bound.LOWER ? '0' : '∞'
    }

    if (!price && placeholder !== undefined) {
        return placeholder
    }

    return formatPrice({ price, type: numberType ?? NumberType.TokenNonTx, locale, localCurrency, conversionRate })
}

function formatNumberOrString({
                                  input,
                                  type,
                                  locale,
                                  localCurrency,
                                  conversionRate,
                              }) {
    if (input === null || input === undefined) {
        return '-'
    }
    if (typeof input === 'string') {
        return formatNumber({ input: parseFloat(input), type, locale, localCurrency, conversionRate })
    }
    return formatNumber({ input, type, locale, localCurrency, conversionRate })
}

function formatEther({ input, type, locale, localCurrency }) {
    if (input === null || input === undefined) {
        return '-'
    }
    return formatNumber({ input: parseFloat(ethersFormatEther(input.toString())), type, locale, localCurrency })
}

function formatFiatPrice({
                             price,
                             type = NumberType.FiatTokenPrice,
                             locale,
                             localCurrency,
                             conversionRate,
                         }) {
    return formatNumberOrString({ input: price, type, locale, localCurrency, conversionRate })
}

const MAX_AMOUNT_STR_LENGTH = 9

function formatReviewSwapCurrencyAmount(amount, locale) {
    let formattedAmount = formatCurrencyAmount({ amount, type: NumberType.TokenTx, locale })
    if (formattedAmount.length > MAX_AMOUNT_STR_LENGTH) {
        formattedAmount = formatCurrencyAmount({ amount, type: NumberType.SwapTradeAmount, locale })
    }
    return formattedAmount
}

function handleFallbackCurrency(
    selectedCurrency,
    previousSelectedCurrency,
    previousConversionRate,
    shouldFallbackToUSD,
    shouldFallbackToPrevious,
) {
    if (shouldFallbackToUSD) {
        return DEFAULT_LOCAL_CURRENCY
    }
    if (shouldFallbackToPrevious) {
        return previousConversionRate ? previousSelectedCurrency : DEFAULT_LOCAL_CURRENCY
    }
    return selectedCurrency
}

// Constructs an object that injects the correct locale and local currency into each of the above formatter functions.
export function useFormatter() {
    const activeLocale = useCurrentLocale()
    const activeLocalCurrency = useAppFiatCurrency()
    const { convertFiatAmount, conversionRate: localCurrencyConversionRate } = useLocalizationContext()

    const previousSelectedCurrency = usePrevious(activeLocalCurrency)
    const previousConversionRate = usePrevious(localCurrencyConversionRate)

    const shouldFallbackToPrevious = !localCurrencyConversionRate
    const shouldFallbackToUSD = !localCurrencyConversionRate
    const currencyToFormatWith = handleFallbackCurrency(
        activeLocalCurrency,
        previousSelectedCurrency,
        previousConversionRate,
        shouldFallbackToUSD,
        shouldFallbackToPrevious,
    )
    const localCurrencyConversionRateToFormatWith = shouldFallbackToPrevious
        ? previousConversionRate
        : localCurrencyConversionRate


    const formatNumberWithLocales = useCallback(
        (options) =>
            formatNumber({
                ...options,
                locale: activeLocale,
                localCurrency: currencyToFormatWith,
                conversionRate: localCurrencyConversionRateToFormatWith,
            }),
        [currencyToFormatWith, activeLocale, localCurrencyConversionRateToFormatWith],
    )

    const formatCurrencyAmountWithLocales = useCallback(
        (options) =>
            formatCurrencyAmount({
                ...options,
                locale: activeLocale,
                localCurrency: currencyToFormatWith,
                conversionRate: localCurrencyConversionRateToFormatWith,
            }),
        [currencyToFormatWith, activeLocale, localCurrencyConversionRateToFormatWith],
    )

    const formatPriceWithLocales = useCallback(
        (options) =>
            formatPrice({
                ...options,
                locale: activeLocale,
                localCurrency: currencyToFormatWith,
                conversionRate: localCurrencyConversionRateToFormatWith,
            }),
        [currencyToFormatWith, activeLocale, localCurrencyConversionRateToFormatWith],
    )

    const formatReviewSwapCurrencyAmountWithLocales = useCallback(
        (amount) => formatReviewSwapCurrencyAmount(amount, activeLocale),
        [activeLocale],
    )

    const formatTickPriceWithLocales = useCallback(
        (options) =>
            formatTickPrice({
                ...options,
                locale: activeLocale,
                localCurrency: currencyToFormatWith,
                conversionRate: localCurrencyConversionRateToFormatWith,
            }),
        [currencyToFormatWith, activeLocale, localCurrencyConversionRateToFormatWith],
    )

    const formatNumberOrStringWithLocales = useCallback(
        (options) =>
            formatNumberOrString({
                ...options,
                locale: activeLocale,
                localCurrency: currencyToFormatWith,
                conversionRate: localCurrencyConversionRateToFormatWith,
            }),
        [currencyToFormatWith, activeLocale, localCurrencyConversionRateToFormatWith],
    )

    const formatFiatPriceWithLocales = useCallback(
        (options) =>
            formatFiatPrice({
                ...options,
                locale: activeLocale,
                localCurrency: currencyToFormatWith,
                conversionRate: localCurrencyConversionRateToFormatWith,
            }),
        [currencyToFormatWith, activeLocale, localCurrencyConversionRateToFormatWith],
    )

    const formatDeltaWithLocales = useCallback(
        (percent) => formatDelta(percent, activeLocale),
        [activeLocale],
    )

    const formatPercentWithLocales = useCallback(
        (percent) => formatPercent(percent, activeLocale),
        [activeLocale],
    )

    const formatEtherwithLocales = useCallback(
        (options) =>
            formatEther({
                ...options,
                locale: activeLocale,
                localCurrency: currencyToFormatWith,
            }),
        [currencyToFormatWith, activeLocale],
    )

    const formatConvertedFiatNumberOrString = useCallback(
        (options) =>
            formatNumberOrString({
                ...options,
                locale: activeLocale,
                localCurrency: currencyToFormatWith,
                conversionRate: undefined,
            }),
        [currencyToFormatWith, activeLocale],
    )

    return useMemo(
        () => ({
            convertToFiatAmount: convertFiatAmount,
            formatConvertedFiatNumberOrString,
            formatCurrencyAmount: formatCurrencyAmountWithLocales,
            formatEther: formatEtherwithLocales,
            formatFiatPrice: formatFiatPriceWithLocales,
            formatNumber: formatNumberWithLocales,
            formatNumberOrString: formatNumberOrStringWithLocales,
            formatDelta: formatDeltaWithLocales,
            formatPercent: formatPercentWithLocales,
            formatPrice: formatPriceWithLocales,
            formatReviewSwapCurrencyAmount: formatReviewSwapCurrencyAmountWithLocales,
            formatTickPrice: formatTickPriceWithLocales,
        }),
        [
            convertFiatAmount,
            formatConvertedFiatNumberOrString,
            formatCurrencyAmountWithLocales,
            formatDeltaWithLocales,
            formatEtherwithLocales,
            formatFiatPriceWithLocales,
            formatNumberOrStringWithLocales,
            formatNumberWithLocales,
            formatPercentWithLocales,
            formatPriceWithLocales,
            formatReviewSwapCurrencyAmountWithLocales,
            formatTickPriceWithLocales,
        ],
    )
}
