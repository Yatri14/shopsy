import { NextResponse } from 'next/server';
import { verifyOtp } from '@/lib/authStore';

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || '').trim().toLowerCase();
  const otpCode = String(body.otpCode || '').trim();

  if (!email || !otpCode) {
    return NextResponse.json({ message: 'Email and OTP code are required' }, { status: 400 });
  }

  if (!verifyOtp(email, otpCode)) {
    return NextResponse.json({ message: 'Invalid OTP code' }, { status: 400 });
  }

  return NextResponse.json({ message: 'OTP verified successfully' });
}
