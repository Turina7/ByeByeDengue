import { NextResponse } from 'next/server';
import { loginUser } from '../../../../actions/actions';
import { AxiosError } from 'axios';

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
  } catch (error: unknown) {
    let status = 0;
    if (error instanceof AxiosError) {
      status = error.response?.status || 500;
    } else {
      status = 500;
    }
    const message = (error as Error).message.includes("Usuário ou senha inválidos") ? 
                    (error as Error).message : "";
      return NextResponse.json({ message: message }, { status: status });
  }
}
