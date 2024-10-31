"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from 'bcryptjs';

export async function createUser(formData: FormData) {

	const email = formData.get("email") as string;
	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (user !== null) {
		throw new Error('Usuario ja existe');
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
		throw new Error('Failed to create user');

	} finally {
		revalidatePath('/login');
	  }
};