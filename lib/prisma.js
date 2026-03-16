import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// 1. Required for Node.js environments to support WebSockets
neonConfig.webSocketConstructor = ws
neonConfig.pipelineConnect = false

// 2. Setup the connection pool
const rawConnectionString = `${process.env.DATABASE_URL}`
const connectionString = rawConnectionString.split(' ')[0].replace(/['"]/g, '')
const pool = new Pool({ connectionString })

// 3. Initialize the Neon adapter
const adapter = new PrismaNeon(pool)

// 4. Instantiate the Prisma Client with the adapter
const prisma = global.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma;