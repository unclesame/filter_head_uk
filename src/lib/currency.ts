export function formatPrice(amount: number): string {
  return `\u00A3${amount.toFixed(2)}`;
}

export const FREE_SHIPPING_THRESHOLD = 29;
export const VAT_RATE = 0.2;
export const SHIPPING_COST = 4.99;
export const ADMIN_EMAIL = 'orders@pureshowers.co.uk';
