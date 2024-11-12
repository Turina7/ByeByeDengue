import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import prisma from "@/lib/db";
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Não autenticado' },
        { status: 401 }
      );
    }

    const decoded = verify(token, process.env.JWT_SECRET as string) as { userId: number };
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
		console.error('Error fetching user:', error);
    return NextResponse.json(
      { message: 'Erro ao obter dados do usuário' },
      { status: 500 }
    );
  }
}