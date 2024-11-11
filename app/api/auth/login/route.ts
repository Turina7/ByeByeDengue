import { NextResponse } from 'next/server';
import { loginUser } from '../../../../actions/actions';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const token = await loginUser(email, password);

    const res = NextResponse.json({ message: 'Login bem-sucedido' });
    res.cookies.set('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600,
      path: '/',
    });

    return res;
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 401 });
  }
}
