import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { authSeller } from "@/lib/authSeller";
import prisma from "@/lib/prisma";

//get store info and store products
export async function GET(req){
    try{
        const {searchParams} = new URL(req.url)
        const userName = searchParams.get("userName")
        if(!userName){
            return NextResponse.json({error: "missing details: userName"}, {status:400})
        }

        // get store info including products and their ratings
        const store = await prisma.store.findUnique({
            where: {
                username: userName,
                isActive: true
            },
            include: {
                Product: {
                    include: {
                        rating: true
                    }
                }
            }
        })

        if (!store) {
            return NextResponse.json({ success: false, error: "Store sanctuary not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            store: {
                ...store,
                Product: undefined // Remove it from the root store object if we return it separately
            }, 
            products: store.Product 
        }, { status: 200 });
    } catch (error) {
        console.error("GET store data error:", error);
        return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
    }
}