import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL(`/login`, req.url), { headers: { 'Cache-Control': 'no-store' } });
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
  matcher: ['/forum/:path*', '/denuncias/:path*'],
};
