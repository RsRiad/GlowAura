import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//update user cart
export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const { cart } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                cart: cart
            }
        });

        return NextResponse.json({ success: true, message: "Cart updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("POST cart error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
} 

//get user cart
export async function GET(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        return NextResponse.json({ success: true, cart: user.cart }, { status: 200 });
    } catch (error) {
        console.error("GET cart error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}