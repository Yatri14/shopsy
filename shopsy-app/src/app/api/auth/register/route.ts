import { NextResponse } from 'next/server';
import { createUser, generateOtp, getUserByEmail } from '@/lib/authStore';

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');
  const role = String(body.role || 'customer') as 'customer' | 'seller' | 'admin';

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400 });
  }

  if (getUserByEmail(email)) {
    return NextResponse.json({ message: 'An account already exists with this email' }, { status: 409 });
  }

  const user = createUser(name, email, password, role);
  const otp = generateOtp(email);

  return NextResponse.json({ message: 'Account created', debugOtp: otp }, { status: 201 });
}
