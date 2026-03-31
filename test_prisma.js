const { PrismaClient } = require('@prisma/client');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { Pool } = require('@neondatabase/serverless');

const connectionString = 'postgresql://neondb_owner:npg_2AUEpL9mVDOI@ep-blue-pond-adke19m6-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const stores = await prisma.store.findMany();
    console.log("Success!");
  } catch (e) {
    console.error("Error from Prisma:", e.message);
  }
}
main();
