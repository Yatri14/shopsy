import { NextResponse } from 'next/server';
import { getPublicUser, getUserByEmail } from '@/lib/authStore';

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  const user = getUserByEmail(email);
  if (!user || user.password !== password) {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }

  if (!user.verified) {
    return NextResponse.json({ message: 'Email not verified. Please complete OTP verification.' }, { status: 403 });
  }

  return NextResponse.json({
    accessToken: `mock-token-${user.id}`,
    user: getPublicUser(user),
  });
}
