import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const { rating, review, productId, orderId } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!rating || !productId || !orderId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if the order exists and is delivered
        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order || order.status !== "DELIVERED") {
            return NextResponse.json({ error: "Order must be delivered to provide a review" }, { status: 400 });
        }

        const newRating = await prisma.rating.create({
            data: {
                rating: parseInt(rating),
                review: review || "",
                userId,
                productId,
                orderId
            },
            include: {
                user: true
            }
        });

        return NextResponse.json({ success: true, rating: newRating }, { status: 201 });
    } catch (error) {
        console.error("POST rating error:", error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "You have already reviewed this product for this order" }, { status: 400 });
        }
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const ratings = await prisma.rating.findMany({
            where: {
                userId: userId
            },
            include: {
                product: true
            }
        });

        return NextResponse.json({ success: true, ratings }, { status: 200 });
    } catch (error) {
        console.error("GET ratings error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
