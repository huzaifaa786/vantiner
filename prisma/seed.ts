import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.category.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Test Category',
        },
    })
    console.log({ user })
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })