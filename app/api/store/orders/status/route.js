import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { authSeller } from "@/lib/authSeller";
import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const { orderId, status } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const storeId = await authSeller(userId);

        if (!storeId) {
            return NextResponse.json({ error: "Unauthorized or store not approved" }, { status: 401 });
        }

        if (!orderId || !status) {
            return NextResponse.json({ error: "Missing orderId or status" }, { status: 400 });
        }

        // Verify the order belongs to the store
        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
                storeId: storeId
            }
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: status
            }
        });

        return NextResponse.json({ success: true, message: "Order status updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("POST order status error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
