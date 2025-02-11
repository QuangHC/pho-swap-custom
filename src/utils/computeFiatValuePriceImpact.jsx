import { Percent } from '@uniswap/sdk-core'
import { BIPS_BASE } from '~/packages/uniswap/src/constants/misc.js'

export function computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput) {
  if (!fiatValueOutput || !fiatValueInput) {
    return undefined
  }
  if (fiatValueInput === 0) {
    return undefined
  }

  const ratio = 1 - fiatValueOutput / fiatValueInput
  const numerator = Math.floor(ratio * BIPS_BASE)
  return new Percent(numerator, BIPS_BASE)
}
