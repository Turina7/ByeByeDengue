import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    const redirectResponse = NextResponse.redirect(new URL('/login', req.url));

    redirectResponse.headers.set(
      'Set-Cookie',
      `redirectPath=${req.nextUrl.pathname}; Path=/; Max-Age=600`
    );

    return redirectResponse;
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET as string));
    return NextResponse.next();
  } catch (error) {
    console.log('error:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/forum/:path*', '/denuncias/:path*', '/settings/:path*'],
};
