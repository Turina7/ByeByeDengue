import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logout bem-sucedido' });

  res.cookies.set('token', '', { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    path: '/',
  });

  return res;
}
