import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// WebSocket config is safe at module level (no env vars needed)
neonConfig.webSocketConstructor = ws
neonConfig.pipelineConnect = false

let _prismaClient = null

function getPrismaClient() {
    if (_prismaClient) return _prismaClient

    // This runs at REQUEST TIME (not build time), so DATABASE_URL is available
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is not set')
    }

    const pool = new Pool({ connectionString })
    const adapter = new PrismaNeon(pool)
    _prismaClient = new PrismaClient({ adapter })
    return _prismaClient
}

// Proxy ensures getPrismaClient() is only called when a property is actually
// accessed (i.e. during a real request), NOT during Next.js build phase
const prisma = new Proxy(Object.create(null), {
    get(_, prop) {
        const client = getPrismaClient()
        const value = client[prop]
        return typeof value === 'function' ? value.bind(client) : value
    },
    has(_, prop) {
        return prop in getPrismaClient()
    }
})

export default prisma