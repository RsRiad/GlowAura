import { Webhook } from "svix";
import { inngest } from "@/inngest/client";

export async function POST(req) {
    const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!CLERK_WEBHOOK_SECRET) {
        console.error("Missing CLERK_WEBHOOK_SECRET environment variable");
        return new Response("Server misconfigured", { status: 500 });
    }

    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Missing svix headers", { status: 400 });
    }

    const body = await req.text();

    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    let payload;

    try {
        payload = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        console.error("Webhook verification failed:", err.message);
        return new Response("Invalid webhook signature", { status: 400 });
    }

    const { type, data } = payload;

    const eventMap = {
        "user.created": "clerk/user.created",
        "user.updated": "clerk/user.updated",
        "user.deleted": "clerk/user.deleted",
    };

    const eventName = eventMap[type];

    if (!eventName) {
        return new Response("Event ignored", { status: 200 });
    }

    try {
        await inngest.send({ name: eventName, data });
        console.log(`✅ Sent ${eventName} to Inngest`);
    } catch (err) {
        console.error(`❌ Failed to send event to Inngest:`, err.message);
        return new Response("Failed to send to Inngest", { status: 500 });
    }

    return new Response("OK", { status: 200 });
}
