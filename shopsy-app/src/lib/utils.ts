import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const USD_TO_INR_RATE = 95.28;

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertUsdToInr(amount: number) {
  return amount * USD_TO_INR_RATE;
}

export function formatInr(amount: number) {
  return inrFormatter.format(amount);
}

export function formatUsdAsInr(amount: number) {
  return formatInr(convertUsdToInr(amount));
}
