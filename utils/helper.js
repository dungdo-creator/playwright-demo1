// utils/helper.js
export function randomString(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}