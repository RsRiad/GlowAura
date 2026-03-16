import { inngest } from "./client";
import prisma from "../lib/prisma";

export const syncUserCreation = inngest.createFunction(
    { id: "sync-user-creation" },
    { event: "clerk/user.created" },
    async ({ event, step }) => {
        const { data } = event;
        const { id, email_addresses, first_name, last_name, image_url } = data;        
        
        const email = email_addresses?.[0]?.email_address;
        const name = (first_name || last_name) ? `${first_name || ""} ${last_name || ""}`.trim() : "User";
        const image = image_url || "";

        await prisma.user.upsert({
            where: { id },
            update: { email, name, image },
            create: { id, email, name, image },
        });
    },
);

export const syncUserUpdate = inngest.createFunction(
    { id: "sync-user-update" },
    { event: "clerk/user.updated" },
    async ({ event, step }) => {
        const { data } = event;
        const { id, email_addresses, first_name, last_name, image_url } = data;
        
        const email = email_addresses?.[0]?.email_address;
        const name = (first_name || last_name) ? `${first_name || ""} ${last_name || ""}`.trim() : "User";
        const image = image_url || "";

        await prisma.user.upsert({
            where: { id },
            update: { email, name, image },
            create: { id, email, name, image },
        });
    },
);

export const syncUserDelete = inngest.createFunction(
    { id: "sync-user-delete" },
    { event: "clerk/user.deleted" },
    async ({ event, step }) => {
        const { data } = event;
        const { id } = data;
        
        if (!id) return;

        await prisma.user.delete({
            where: { id },
        });
    },
);
