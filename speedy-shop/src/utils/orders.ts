// Order management utilities using localStorage

import { CartItem } from '@/hooks/useCart';
import { ShippingInfo } from './shipping';

export interface Order {
  id: string;
  items: CartItem[];
  usdTotal: number;
  btcAmount: string;
  btcAddress: string;
  btcPrice: number;
  createdAt: string;
  status: 'pending' | 'paid' | 'completed';
  shippingInfo?: ShippingInfo;
}

const ORDERS_STORAGE_KEY = 'btc-store-orders';

// Load orders from localStorage
export const loadOrders = (): Order[] => {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save order to localStorage
export const saveOrder = (order: Order): void => {
  const orders = loadOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
};

// Get order by ID
export const getOrderById = (orderId: string): Order | undefined => {
  const orders = loadOrders();
  return orders.find(order => order.id === orderId);
};

// Update order status
export const updateOrderStatus = (orderId: string, status: Order['status']): void => {
  const orders = loadOrders();
  const updatedOrders = orders.map(order =>
    order.id === orderId ? { ...order, status } : order
  );
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
};
