import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const { address } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const newAddress = await prisma.address.create({
            data: {
                ...address,
                userId: userId,
            }
        });

        return NextResponse.json({ success: true, newAddress }, { status: 200 });
    } catch (error) {
        console.error("POST address error:", error);
        return NextResponse.json({ error: error.message || error.code || "Internal server error" }, { status: 500 });
    }
}

//Get all update for a user
export async function GET(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const addresses = await prisma.address.findMany({
            where: {
                userId: userId
            }
        });

        return NextResponse.json({ success: true, addresses }, { status: 200 });
    } catch (error) {
        console.error("GET address error:", error);
        return NextResponse.json({ error: error.message || error.code || "Internal server error" }, { status: 500 });
    }
}

