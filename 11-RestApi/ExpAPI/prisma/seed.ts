import { PrismaClient } from '@prisma/client';
import { UserTypes } from '../src/resources/userType/userType.consts';

const prisma = new PrismaClient();

async function main() {
  await prisma.userType.createMany({
    data: [
      { id: UserTypes.admin, label: 'admin' },
      { id: UserTypes.client, label: 'client' },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
