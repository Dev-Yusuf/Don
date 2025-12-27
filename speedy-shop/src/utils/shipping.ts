// Shipping information utilities using localStorage
import { z } from 'zod';

// Validation schema for shipping information
export const shippingSchema = z.object({
  fullName: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z.string()
    .trim()
    .min(7, 'Phone number must be at least 7 digits')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[+\d\s\-()]+$/, 'Please enter a valid phone number'),
  address: z.string()
    .trim()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters'),
  city: z.string()
    .trim()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters'),
  state: z.string()
    .trim()
    .max(100, 'State must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  postalCode: z.string()
    .trim()
    .min(3, 'Postal code must be at least 3 characters')
    .max(20, 'Postal code must be less than 20 characters'),
  country: z.string()
    .trim()
    .min(2, 'Country must be at least 2 characters')
    .max(100, 'Country must be less than 100 characters'),
});

export type ShippingInfo = z.infer<typeof shippingSchema>;

const SHIPPING_STORAGE_KEY = 'btc-store-shipping';

// Load shipping info from localStorage
export const loadShippingInfo = (): Partial<ShippingInfo> => {
  try {
    const stored = localStorage.getItem(SHIPPING_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Save shipping info to localStorage
export const saveShippingInfo = (info: ShippingInfo): void => {
  localStorage.setItem(SHIPPING_STORAGE_KEY, JSON.stringify(info));
};

// Format shipping info for WhatsApp message (sanitized)
export const formatShippingForMessage = (info: ShippingInfo): string => {
  const lines = [
    `*Name:* ${info.fullName}`,
    `*Email:* ${info.email}`,
    `*Phone:* ${info.phone}`,
    `*Address:* ${info.address}`,
    `*City:* ${info.city}`,
  ];
  
  if (info.state) {
    lines.push(`*State:* ${info.state}`);
  }
  
  lines.push(`*Postal Code:* ${info.postalCode}`);
  lines.push(`*Country:* ${info.country}`);
  
  return lines.join('\n');
};
