import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";  
import { authAdmin } from "@/lib/authAdmin";
import { inngest } from "@/inngest/client";
// add new coupon
export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const isAdmin = await authAdmin(userId);
        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { cupon } = await req.json();
        cupon.code = cupon.code.toUpperCase();
        
        await prisma.coupon.create({
            data: cupon
        }).then(async (coupon) => {
            await inngest.send({
                name: "app/delete-expired-cupon",
                data: {
                    expires_at: coupon.expires_at,
                    code: coupon.code,
                }
            })
        })
        return NextResponse.json({ success: true, message: "Coupon added successfully" });
    } catch (error) {
        console.error("POST /api/admin/cupon error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// delete coupon
export async function DELETE(req) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const isAdmin = await authAdmin(userId);
        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");
        
        if (!code) {
            return NextResponse.json({ error: "Coupon code is required" }, { status: 400 });
        }

        await prisma.coupon.delete({
            where: { code }
        })

        return NextResponse.json({ success: true, message: "Coupon deleted successfully" });
    } catch (error) {
        console.error("DELETE /api/admin/cupon error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// get all coupons
export async function GET(req) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const isAdmin = await authAdmin(userId);
        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const cupons = await prisma.coupon.findMany();
        return NextResponse.json({ success: true, cupons });
    } catch (error) {
        console.error("GET /api/admin/cupon error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
