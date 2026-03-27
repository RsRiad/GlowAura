import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set')
    }

    return new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    })
}

const prisma = globalThis.__prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
    globalThis.__prisma = prisma
}

export default prisma