// Bitcoin utility functions

// BTC address for payments
export const BTC_ADDRESS = '1BjzXaypGt9knasWRHLeJ5M7BLEGESHhvG';

// Fetch current BTC price from CoinGecko
export const fetchBtcPrice = async (): Promise<number> => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch BTC price');
    }

    const data = await response.json();
    return data.bitcoin.usd;
  } catch (error) {
    console.error('Error fetching BTC price:', error);
    // Fallback price if API fails (should be updated regularly in production)
    return 95000;
  }
};

// Convert USD to BTC
export const usdToBtc = (usdAmount: number, btcPrice: number): number => {
  if (btcPrice <= 0) return 0;
  return usdAmount / btcPrice;
};

// Format BTC amount with appropriate decimals
export const formatBtc = (amount: number): string => {
  // Use 8 decimal places for precision
  return amount.toFixed(8);
};

// Format USD amount
export const formatUsd = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Generate order ID
export const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `BTC-${timestamp}-${randomPart}`.toUpperCase();
};

// Build WhatsApp message for order (with optional shipping info)
export const buildWhatsAppMessage = (
  orderId: string,
  items: { name: string; quantity: number; price: number }[],
  usdTotal: number,
  btcAmount: string,
  shippingInfo?: string
): string => {
  const itemsList = items
    .map(item => `• ${item.name} x${item.quantity} - ${formatUsd(item.price * item.quantity)}`)
    .join('\n');

  let message = `🛒 *New Order*

*Order ID:* ${orderId}

*Items:*
${itemsList}

*Total (USD):* ${formatUsd(usdTotal)}
*Total (BTC):* ₿${btcAmount}

*Payment Address:*
${BTC_ADDRESS}`;

  if (shippingInfo) {
    message += `

📦 *Shipping Details:*
${shippingInfo}`;
  }

  message += `

I have sent the BTC payment. Please confirm receipt.`;

  return encodeURIComponent(message);
};

// WhatsApp number for orders (replace with your number)
export const WHATSAPP_NUMBER = '1234567890';

// Generate WhatsApp URL
export const getWhatsAppUrl = (message: string): string => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};
