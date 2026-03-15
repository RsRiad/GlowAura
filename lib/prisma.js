import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// 1. Required for Node.js environments to support WebSockets
neonConfig.webSocketConstructor = ws
neonConfig.poolQueryViaFetch = true
// 2. Setup the connection pool
const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })

// 3. Initialize the Neon adapter
const adapter = new PrismaNeon({ connectionString })

// 4. Instantiate the Prisma Client with the adapter
const prisma = global.prisma || new PrismaClient({ adapter, datasourceUrl: connectionString })

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma;