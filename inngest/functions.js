import { inngest } from "./client";
import { neon } from "@neondatabase/serverless";
import prisma from "@/lib/prisma";

// Use Neon HTTP driver — works in ALL serverless environments, no WebSocket needed
function getSql() {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not set");
    }
    return neon(process.env.DATABASE_URL);
}

export const syncUserCreation = inngest.createFunction(
    { id: "sync-user-creation" },
    { event: "clerk/user.created" },
    async ({ event, step }) => {
        const { data } = event;

        await step.run("save-user-to-db", async () => {
            const sql = getSql();
            const { id, email_addresses, first_name, last_name, image_url } = data;

            const email = email_addresses?.[0]?.email_address ?? null;
            const name = (first_name || last_name)
                ? `${first_name || ""} ${last_name || ""}`.trim()
                : "User";
            const image = image_url ?? "";

            await sql`
                INSERT INTO "User" (id, email, name, image, cart)
                VALUES (${id}, ${email}, ${name}, ${image}, '{}')
                ON CONFLICT (id)
                DO UPDATE SET
                    email = EXCLUDED.email,
                    name  = EXCLUDED.name,
                    image = EXCLUDED.image
            `;
        });
    }
);

export const syncUserUpdate = inngest.createFunction(
    { id: "sync-user-update" },
    { event: "clerk/user.updated" },
    async ({ event, step }) => {
        const { data } = event;

        await step.run("update-user-in-db", async () => {
            const sql = getSql();
            const { id, email_addresses, first_name, last_name, image_url } = data;

            const email = email_addresses?.[0]?.email_address ?? null;
            const name = (first_name || last_name)
                ? `${first_name || ""} ${last_name || ""}`.trim()
                : "User";
            const image = image_url ?? "";

            await sql`
                INSERT INTO "User" (id, email, name, image, cart)
                VALUES (${id}, ${email}, ${name}, ${image}, '{}')
                ON CONFLICT (id)
                DO UPDATE SET
                    email = EXCLUDED.email,
                    name  = EXCLUDED.name,
                    image = EXCLUDED.image
            `;
        });
    }
);

export const syncUserDelete = inngest.createFunction(
    { id: "sync-user-delete" },
    { event: "clerk/user.deleted" },
    async ({ event, step }) => {
        const { data } = event;
        const { id } = data;

        if (!id) return;

        await step.run("delete-user-from-db", async () => {
            const sql = getSql();
            await sql`DELETE FROM "User" WHERE id = ${id}`;
        });
    }
);

// function for delete cupon after expiry date
export const deleteExpiredCoupons = inngest.createFunction(
    { id: "delete-cupon-on-expiry" },
    { event: "app/delete-expired-cupon" },
    async ({ event, step }) => {
        const { data } = event;
        const expiryDate = new Date(data.expires_at);
        
        await step.sleepUntil("wait-for-expiry", expiryDate);
        
        await step.run("delete-cupon-on-expiry", async () => {
            await prisma.coupon.delete({
                where: {
                    code: data.code
                }
            });
        });
    }
);
