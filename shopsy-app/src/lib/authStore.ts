import { randomUUID } from 'crypto';

export type AuthRole = 'customer' | 'seller' | 'admin';

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: AuthRole;
  verified: boolean;
}

const users: StoredUser[] = [];
const otpStore = new Map<string, string>();
const resetOtpStore = new Map<string, string>();

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function getUserByEmail(email: string) {
  const normalized = normalizeEmail(email);
  return users.find((user) => user.email === normalized) ?? null;
}

export function createUser(name: string, email: string, password: string, role: AuthRole) {
  const normalizedEmail = normalizeEmail(email);
  const user: StoredUser = {
    id: randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    role,
    verified: false,
  };

  users.push(user);
  return user;
}

export function getPublicUser(user: StoredUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export function generateOtp(email: string) {
  const normalized = normalizeEmail(email);
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(normalized, code);
  return code;
}

export function verifyOtp(email: string, code: string) {
  const normalized = normalizeEmail(email);
  const storedCode = otpStore.get(normalized);
  if (!storedCode || storedCode !== code) {
    return false;
  }

  const user = getUserByEmail(normalized);
  if (!user) {
    return false;
  }

  user.verified = true;
  otpStore.delete(normalized);
  resetOtpStore.delete(normalized);
  return true;
}

export function requestPasswordReset(email: string) {
  const normalized = normalizeEmail(email);
  const user = getUserByEmail(normalized);
  if (!user) {
    return null;
  }

  const code = generateOtp(normalized);
  resetOtpStore.set(normalized, code);
  return code;
}

export function resetPassword(email: string, code: string, newPassword: string) {
  const normalized = normalizeEmail(email);
  const storedCode = resetOtpStore.get(normalized);
  if (!storedCode || storedCode !== code) {
    return false;
  }

  const user = getUserByEmail(normalized);
  if (!user) {
    return false;
  }

  user.password = newPassword;
  resetOtpStore.delete(normalized);
  return true;
}
