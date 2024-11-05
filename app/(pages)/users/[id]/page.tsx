import prisma from '@/lib/db';

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return (
    <div>
      <h1>User</h1>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.status}</p>
      <p>{user?.role}</p>
    </div>
  );
}
