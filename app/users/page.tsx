import prisma from "../lib/db";
import Link from "next/link";

export default async function Users() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
							{user.name} 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
