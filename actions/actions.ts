"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function createUser(formData: FormData) {

	const email = formData.get("email") as string;
	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (user !== null) {
		throw new Error('Usuario ja cadastrado');
	}

	try {
		const hashedPassword = bcrypt.hashSync(formData.get("password") as string, 10);
		await prisma.user.create({
			data: {
				name: formData.get("name") as string,
				email: formData.get("email") as string,
				password: hashedPassword,
				status: formData.get("status") as string,
				role: formData.get("role") as string,
			}
		});

	} catch (error) {
		console.log(error);
		throw new Error('Erro ao criar usuario');

	} finally {
		revalidatePath('/login');
	  }
};

export async function loginUser(email: string, password: string) {

	const user = await prisma.user.findUnique({
	  where: { email },
	});
  
	if (!user) {
	  throw new Error("Usuário não encontrado");
	}
  
	const isPasswordValid = bcrypt.compareSync(password, user.password);
	if (!isPasswordValid) {
	  throw new Error("Senha incorreta");
	}
  
	const token = jwt.sign(
	  { userId: user.id, role: user.role },
	  process.env.JWT_SECRET as string,
	  { expiresIn: '1h' }
	);
  
	return token;
  }