import { clerkClient } from "@clerk/nextjs/server";

export const authAdmin = async (userId) => {
   try {
    if (!userId) {
        return false;
    }
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const adminEmails = (process.env.ADMIN_EMAIL || "").split(",").map(email => email.trim().replace(/['"]/g, ''));
    return adminEmails.includes(user.emailAddresses[0].emailAddress);
   }
   catch (e) {
    console.log(e);
    return false;
   }
}
