import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'securepassword', 
      status: 'active',
      role: 'USER',
      contributions: {
        create: [
          { amount: 100.50 },
        ],
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      name: 'Bob',
      email: 'bob@example.com',
      password: 'securepassword', 
      status: 'active',
      role: 'USER',
      contributions: {
        create: [
          { amount: 50.00 },
        ],
      },
    },
  });

  const reportAlice = await prisma.report.create({
    data: {
      description: 'Report sobre um problema técnico',
      status: 'pending',
      file: 'report_alice.pdf',
      userId: alice.id,  
    },
  });

  const reportBob = await prisma.report.create({
    data: {
      description: 'Report sobre um erro no sistema',
      status: 'resolved',
      file: 'report_bob.pdf',
      userId: bob.id,  
    },
  });

  console.log({ alice, bob, reportAlice, reportBob });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
