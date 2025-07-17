import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const email = 'leandre@gmail.com';
  const password = '$2b$12$D0UEGYhgZhal5P82F2hr0e57p7qhHYHQAdj5iiXWCIzYB72.NTxX6'; // bcrypt hash for 'leandre123'
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    await prisma.user.create({
      data: {
        firstName: 'leandre',
        lastName: 'leandre',
        email,
        password,
        role: 'ADMIN',
      },
    });
    console.log('Admin user created:', email);
  } else {
    console.log('Admin user already exists:', email);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 