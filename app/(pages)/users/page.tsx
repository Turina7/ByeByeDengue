import prisma from "@/lib/db";
import { createUser } from "@/actions/actions";
import Link from "next/link";
import styles from './user.module.css';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  role: string;
}

export default async function Users() {
  const users: User[] = await prisma.user.findMany();

  return (
    <div className={styles.container}>
      <h1>Users ({users.length})</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
      <br/>
      <h1>Create User</h1>
      <form action={createUser} className={styles.form}>
        <input type="text"
          name="name" 
          placeholder="Name"
        />
        <input type="text"
          name="email"
          placeholder="Email"
        />
        <input type="text"
          name="password"
          placeholder="Password"
        />
        <input type="text"
          name="status"
          placeholder="Status"
        />
        <input type="text"
          name="role"
          placeholder="Role"
        />
        <button type="submit">Create User</button>
      </form>
      
    </div>
  );
}
