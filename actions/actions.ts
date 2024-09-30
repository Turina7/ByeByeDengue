"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  await prisma.user.create({
    data: {
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			password: formData.get("password") as string,
			status: formData.get("status") as string,
			role: formData.get("role") as string,
		}
	});

	revalidatePath("/users");
};