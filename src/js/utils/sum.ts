// Veux
import { Seller } from '@/store/modules/order'

// Types
type selector = keyof Seller

// Function
export const sum = (array: Seller[], key: selector) => {
  return array.reduce((a, b) => a + (b[key] || 0), 0)
}
