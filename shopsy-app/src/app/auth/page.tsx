'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, KeyRound, Mail, ShieldCheck, UserRound } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'otp' | 'reset'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [role, setRole] = useState<'customer' | 'seller' | 'admin'>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { login, signup, verifyOtp, forgotPassword, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      if (mode === 'login') {
        await login(email, password, rememberMe);
        setMessage('Logged in successfully');
      } else if (mode === 'signup') {
        await signup(name, email, password, role);
        setMessage('Account created. Check your inbox for the OTP.');
        setMode('otp');
      } else if (mode === 'otp') {
        await verifyOtp(email, otpCode);
        setMessage('Email verified successfully');
        setMode('login');
      } else if (mode === 'forgot') {
        await forgotPassword(email);
        setMessage('Reset OTP sent to your email');
        setMode('reset');
      } else if (mode === 'reset') {
        await resetPassword(email, otpCode, newPassword);
        setMessage('Password reset successfully');
        setMode('login');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_55%)] px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-slate-950 p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Shopsy Authentication</p>
            <h1 className="mt-4 text-3xl font-semibold">Secure access for every shopper.</h1>
            <p className="mt-4 text-slate-300">Login, verify, reset, and grow with a trusted account experience built for customers, sellers, and admins.</p>
            <div className="mt-8 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-blue-300" /><span>JWT + refresh token flow</span></div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-blue-300" /><span>OTP and email verification</span></div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-center gap-3"><KeyRound className="h-5 w-5 text-blue-300" /><span>Reset password and secure cookies</span></div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">{mode === 'signup' ? 'Create account' : mode === 'forgot' ? 'Forgot password' : mode === 'otp' ? 'Verify email' : mode === 'reset' ? 'Reset password' : 'Welcome back'}</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-100">{mode === 'login' ? 'Sign in to Shopsy' : mode === 'signup' ? 'Join Shopsy' : mode === 'forgot' ? 'Recover your account' : mode === 'otp' ? 'Enter your OTP' : 'Create a new password'}</h2>
              </div>
            </div>

            {message ? <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{message}</div> : null}
            {error ? <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              {(mode === 'signup' || mode === 'login') && (
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
                  {['customer', 'seller', 'admin'].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRole(value as 'customer' | 'seller' | 'admin')}
                      className={`flex-1 rounded-full px-3 py-2 text-sm font-medium ${role === value ? 'bg-slate-950 text-white dark:bg-blue-500 dark:text-slate-950' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              )}

              {mode === 'signup' ? (
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-full border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 outline-none dark:border-slate-700 dark:bg-slate-900" placeholder="Full name" required />
                </div>
              ) : null}

              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-full border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 outline-none dark:border-slate-700 dark:bg-slate-900" placeholder="Email address" required />
              </div>

              {mode !== 'forgot' && mode !== 'otp' ? (
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-full border border-slate-300 bg-slate-50 py-3 pl-12 pr-12 outline-none dark:border-slate-700 dark:bg-slate-900" placeholder="Password" required />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-3.5 text-slate-500">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              ) : null}

              {mode === 'otp' || mode === 'reset' ? (
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} className="w-full rounded-full border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 outline-none dark:border-slate-700 dark:bg-slate-900" placeholder="OTP code" required />
                </div>
              ) : null}

              {mode === 'reset' ? (
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input type={showPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full rounded-full border border-slate-300 bg-slate-50 py-3 pl-12 pr-12 outline-none dark:border-slate-700 dark:bg-slate-900" placeholder="New password" required />
                </div>
              ) : null}

              {mode === 'login' ? (
                <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe((v) => !v)} />
                  Remember me
                </label>
              ) : null}

              <button type="submit" className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-blue-500 dark:text-slate-950">
                {mode === 'login' ? 'Login' : mode === 'signup' ? 'Create account' : mode === 'forgot' ? 'Send reset OTP' : mode === 'otp' ? 'Verify OTP' : 'Reset password'}
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
              {mode === 'login' ? (
                <>
                  <button type="button" onClick={() => setMode('forgot')} className="font-medium text-blue-500">Forgot password?</button>
                  <button type="button" onClick={() => setMode('signup')} className="font-medium text-blue-500">Create account</button>
                </>
              ) : (
                <button type="button" onClick={() => setMode('login')} className="font-medium text-blue-500">Back to login</button>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="flex-1 rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">Google Login</button>
              <button className="flex-1 rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">Facebook Login</button>
            </div>

            <div className="mt-6 text-center text-sm text-slate-500">
              <Link href="/" className="font-medium text-blue-500">Return to store</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
