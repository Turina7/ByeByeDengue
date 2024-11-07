import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logout bem-sucedido' });

  res.cookies.delete('token');

  return res;
}
