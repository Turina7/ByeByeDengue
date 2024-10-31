"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { put } from '@vercel/blob';
import { randomUUID } from "crypto";

export async function createUser(formData: FormData) {
	try {
		await prisma.user.create({
			data: {
				name: formData.get("name") as string,
				email: formData.get("email") as string,
				password: formData.get("password") as string,
				status: formData.get("status") as string,
				role: formData.get("role") as string,
			}
		});
	} catch (error) {
		console.log(error);
	}

	revalidatePath("/users");
};

function generateProtocol() {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `DG${year}${random}`;
}

export async function createReport(formData: FormData) {
  try {
    let fileUrl = null;
    const file = formData.get('file') as File;
    
    if (file && file.size > 0) {
      try {
        const extension = file.name.split('.').pop();
        const uniqueName = `${randomUUID()}.${extension}`;
        
        const { url } = await put(uniqueName, file, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN!
        });
        
        fileUrl = url;
      } catch (uploadError) {
        console.error('Error uploading file:', uploadError);
        throw new Error('Failed to upload file');
      }
    }

    const report = await prisma.report.create({
      data: {
        protocol: generateProtocol(),
        userId: parseInt(formData.get('userId') as string),
        focusType: formData.get('focusType') as string,
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        observationDate: new Date(formData.get('observationDate') as string),
        status: 'Em análise',
        fileUrl: fileUrl,
        fileDescription: file && file.size > 0 ? formData.get('fileDescription') as string : null,
      }
    });

    return { success: true, protocol: report.protocol };
  } catch (error) {
    console.error('Error creating report:', error);
    throw new Error('Failed to create report');
  }
}

export async function getReportByProtocol(protocol: string) {
  try {
    const report = await prisma.report.findUnique({
      where: { protocol },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    if (!report) {
      throw new Error('Report not found');
    }

    return report;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw new Error('Failed to fetch report');
  }
}

export async function getUserReports(userId: number) {
  try {
    const reports = await prisma.report.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    return reports;
  } catch (error) {
    console.error('Error fetching user reports:', error);
    throw new Error('Failed to fetch user reports');
  }
}

export async function updateReportStatus(protocol: string, status: string) {
  try {
    await prisma.report.update({
      where: { protocol },
      data: {
        status,
        resolvedAt: status === 'resolved' ? new Date() : null
      }
    });

    revalidatePath('/denuncias');
    return { success: true };
  } catch (error) {
    console.error('Error updating report status:', error);
    throw new Error('Failed to update report status');
  }
}