import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// Required for Node.js environments to support WebSockets
neonConfig.webSocketConstructor = ws
neonConfig.pipelineConnect = false

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error("❌ DATABASE_URL is missing in environment variables!")
}

// Setup the connection pool using the pooler URL (for serverless)
const pool = new Pool({ connectionString })

// Initialize the Neon adapter
const adapter = new PrismaNeon(pool)

// Instantiate Prisma Client with the adapter (singleton pattern for dev)
const prisma = global.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma