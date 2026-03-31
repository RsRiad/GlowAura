import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const authSeller = async (userId) => {
    try {
        if (!userId) return false;
        
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                store: true
            }
        });

        if (!user) return false;

        if (user.store) {
            if (user.store.status === "approved") {
                return user.store.id;
            }
        }
        
        return false;
    }
    catch (error) {
        console.error("authSeller error:", error);
        return false;
    }
} 
