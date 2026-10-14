import { NextResponse } from 'next/server';
import { resetPassword, getUserByEmail } from '@/lib/authStore';

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || '').trim().toLowerCase();
  const otpCode = String(body.otpCode || '').trim();
  const newPassword = String(body.newPassword || '');

  if (!email || !otpCode || !newPassword) {
    return NextResponse.json({ message: 'Email, OTP, and new password are required' }, { status: 400 });
  }

  const user = getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ message: 'Invalid password reset request' }, { status: 400 });
  }

  if (!resetPassword(email, otpCode, newPassword)) {
    return NextResponse.json({ message: 'Invalid OTP code or reset request' }, { status: 400 });
  }

  return NextResponse.json({ message: 'Password reset successfully' });
}
