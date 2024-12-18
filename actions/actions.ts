"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { put } from '@vercel/blob';
import { randomUUID } from "crypto";


export async function createUser(formData: FormData) {

	const email = formData.get("email") as string;
	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (user !== null) {
		throw new Error('Usuário já cadastrado');
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

  const isPasswordValid = bcrypt.compareSync(password, user?.password || '');

  if (!user || !isPasswordValid) {
    const error = new Error("Usuário ou senha inválidos");
    (error as any).status = 401;
    throw error;
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  revalidatePath("/users");
  return token;
}

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

export type ForumPost = {
  id: number;
  header: string;
  post: string;
  message: string;
  comments: string[];
  userId: number;
  status: string;
  section: string;
};

export async function createForumPost(formData: FormData) {
  try {
    let imageUrl = null;
    const file = formData.get('image') as File;
    
    if (file && file.size > 0) {
      try {
        const extension = file.name.split('.').pop();
        const uniqueName = `forum/${randomUUID()}.${extension}`;
        
        const { url } = await put(uniqueName, file, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN!
        });
        
        imageUrl = url;
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        throw new Error('Failed to upload image');
      }
    }

    const post = await prisma.forumMessage.create({
      data: {
        userId: parseInt(formData.get('userId') as string),
        message: formData.get('message') as string,
        imageUrl: imageUrl,
        status: 'active',
        section: formData.get('section') as string,
      },
    });

    revalidatePath("/forum");
    return { success: true, postId: post.id };
  } catch (error) {
    console.error("Error creating forum post:", error);
    throw new Error("Failed to create forum post");
  }
}

export async function updateForumPost(postId: number, message: string) {
  try {
    await prisma.forumMessage.update({
      where: { id: postId },
      data: {
        message,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/forum");
    return { success: true };
  } catch (error) {
    console.error("Error updating forum post:", error);
    throw new Error("Failed to update forum post");
  }
}

export async function getUserForumPosts(userId: number) {
  try {
    const posts = await prisma.forumMessage.findMany({
      where: {
        userId,
        status: "active",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    console.error("Error fetching user forum posts:", error);
    throw new Error("Failed to fetch user forum posts");
  }
}

export async function createComment(formData: FormData) {
  try {
    const comment = await prisma.comment.create({
      data: {
        content: formData.get('content') as string,
        postId: parseInt(formData.get('postId') as string),
        userId: parseInt(formData.get('userId') as string),
        status: 'active',
      },
    });

    revalidatePath("/forum");
    return { success: true, commentId: comment.id };
  } catch (error) {
    console.error('Error creating comment:', error);
    throw new Error('Failed to create comment');
  }
}


export async function getPostComments(postId: number) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        status: "active",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      userId: comment.userId,
      userName: comment.user.name,
      createdAt: comment.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Failed to fetch comments");
  }
}

export async function getForumPosts() {
  try {
    const posts = await prisma.forumMessage.findMany({
      where: {
        status: "active",
      },
      include: {
        user: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
        comments: {
          where: {
            status: "active",
          },
          include: {
            user: {
              select: {
                name: true,
                imageUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts.map((post) => ({
      id: post.id,
      header: `${post.user.name} publicou:`,
      post: post.message,
      imageUrl: post.imageUrl,
      message: "",
      comments: post.comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        userId: comment.userId,
        userName: comment.user.name,
        userImageUrl: comment.user.imageUrl,
        createdAt: comment.createdAt,
      })),
      userId: post.userId,
      userName: post.user.name,
      userImageUrl: post.user.imageUrl,
    }));
  } catch (error) {
    console.error("Error fetching forum posts:", error);
    throw new Error("Failed to fetch forum posts");
  }
}

export async function deleteForumPost(postId: number, userId: number) {
  try {
    const post = await prisma.forumMessage.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await prisma.forumMessage.update({
      where: { id: postId },
      data: {
        status: "deleted",
      },
    });

    await prisma.comment.updateMany({
      where: { postId },
      data: {
        status: "deleted",
      },
    });

    revalidatePath("/forum");
    return { success: true };
  } catch (error) {
    console.error("Error deleting forum post:", error);
    throw new Error("Failed to delete forum post");
  }
}

export async function deleteForumComment(commentId: number, userId: number) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await prisma.comment.update({
      where: { id: commentId },
      data: {
        status: "deleted",
      },
    });

    revalidatePath("/forum");
    return { success: true };
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Failed to delete comment");
  }
}

export async function getRecentImagePosts() {
  try {
    const posts = await prisma.forumMessage.findMany({
      where: {
        status: "active",
        imageUrl: {
          not: null
        }
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 2,
    });

    return posts.map((post) => ({
      id: post.id,
      imageUrl: post.imageUrl,
      message: post.message,
      userName: post.user.name,
    }));
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}

export async function createFeedback(formData: FormData) {
  try {
    const userId = parseInt(formData.get("userId") as string);
    const feedback = formData.get("feedback") as string;

    const newFeedback = await prisma.feedback.create({
      data: {
        userId,
        feedback,
      },
    });
    return newFeedback;
  } catch (error) {
    console.error("Error creating feedback:", error);
    throw error;
  }
}

export async function getFeedbacks() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      take: 3,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return feedbacks;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    throw error;
  }
}

export async function updateUser(formData: FormData) {
  try {
    const data: Record<string, any> = {};
    const userId = parseInt(formData.get('userId') as string);
    const name = formData.get("name") as string || "";
    const password = formData.get("password") as string || "";
    const imageFile = formData.get("imageFile") as File || null;

    const hashedPassword = password ? bcrypt.hashSync(formData.get("password") as string, 10) : undefined;

    if (name) data.name = name;
    if (hashedPassword) data.password = hashedPassword;
    if (imageFile && imageFile.size > 0) {
      try {
        const extension = imageFile.name.split('.').pop();
        const uniqueName = `${randomUUID()}.${extension}`;
        
        const { url } = await put(uniqueName, imageFile, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN!
        });
        
        data.imageUrl = url;
      } catch (uploadError) {
        console.error('Error uploading file:', uploadError);
        throw new Error('Failed to upload file');
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data
    });

    return updatedUser;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw new Error("Não foi possível atualizar o usuário");
  }
}

export async function getUserPic(userId: number) {
  try {
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      return user?.imageUrl;
    }
    else {
      throw new Error("Id inválido");
    }
  } catch (error) {
    console.error("Erro ao consultar usuário:", error);
    throw new Error("Não foi possível consultar usuário");
  }
}

export async function createArticle(formData: FormData) {
  try {
    let imageUrl = null;
    const file = formData.get('file') as File;
    
    if (file && file.size > 0) {
      try {
        const extension = file.name.split('.').pop();
        const uniqueName = `${randomUUID()}.${extension}`;
        
        const { url } = await put(uniqueName, file, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN!
        });
        
        imageUrl = url;
      } catch (uploadError) {
        console.error('Error uploading file:', uploadError);
        throw new Error('Failed to upload file');
      }
    }

    const article = await prisma.article.create({
      data: {
        title: formData.get('title') as string,
        summary: formData.get('summary') as string,
        description: formData.get('description') as string,
        text: formData.get('text') as string,
        section: formData.get('section') as string,
        keywords: formData.get('keywords') as string,
        status: 'pending',
        imageUrl: imageUrl,
        userId: parseInt(formData.get('userId') as string),
      }
    });

    return { success: true, id: article.id };
  } catch (error) {
    console.error('Error creating article:', error);
    throw new Error('Failed to create article');
  }
}

export interface FeaturedArticle {
  id: number;
  title: string;
  summary: string;
  imageUrl: string | null;
}

export async function getFeaturedArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        imageUrl: {
          not: null
        },
        status: 'approved'
      },
      select: {
        id: true,
        title: true,
        summary: true,
        imageUrl: true
      },
      take: 3,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return articles;
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    throw new Error('Failed to load featured articles');
  }
}

export async function getHealthFacilities() {
  try {
    const facilities = await prisma.healthFacility.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return facilities;
  } catch (error) {
    console.error("Error fetching health facilities:", error);
    throw error;
  }
}

export async function getNGOs() {
  try {
    const ngos = await prisma.nGO.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return ngos;
  } catch (error) {
    console.error("Error fetching NGOs:", error);
    throw error;
  }
}

export async function createHealthFacility(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      address: formData.get("address") as string,
      latitude: parseFloat(formData.get("latitude") as string),
      longitude: parseFloat(formData.get("longitude") as string),
      phone: formData.get("phone") as string,
      website: formData.get("website") as string || null,
    };

    const facility = await prisma.healthFacility.create({ data });
    return facility;
  } catch (error) {
    console.error("Error creating health facility:", error);
    throw error;
  }
}

export async function createNGO(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      address: formData.get("address") as string,
      latitude: parseFloat(formData.get("latitude") as string),
      longitude: parseFloat(formData.get("longitude") as string),
      phone: formData.get("phone") as string,
      email: formData.get("email") as string || null,
      website: formData.get("website") as string || null,
    };

    const ngo = await prisma.nGO.create({ data });
    return ngo;
  } catch (error) {
    console.error("Error creating NGO:", error);
    throw error;
  }
}