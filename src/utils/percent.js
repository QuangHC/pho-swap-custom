import { Percent } from '@uniswap/sdk-core'

export function largerPercentValue(a, b) {
  if (a && b) {
    return a.greaterThan(b) ? a : b
  } else if (a) {
    return a
  } else if (b) {
    return b
  }
  return undefined
}
