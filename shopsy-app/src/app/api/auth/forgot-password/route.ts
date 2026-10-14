import { NextResponse } from 'next/server';
import { requestPasswordReset, getUserByEmail } from '@/lib/authStore';

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || '').trim().toLowerCase();

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  const user = getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ message: 'If this account exists, a reset OTP will be sent' });
  }

  const otp = requestPasswordReset(email);
  return NextResponse.json({ message: 'Password reset OTP sent', debugOtp: otp });
}
